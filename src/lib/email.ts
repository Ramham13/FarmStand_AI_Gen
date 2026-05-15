import { Resend } from "resend"

// Initialize Resend - will fail gracefully if no API key
const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY)
  : null

const FROM_EMAIL = process.env.FROM_EMAIL || "Virtual Farm Stand <noreply@resend.dev>"
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

interface EmailParams {
  to: string
  subject: string
  html: string
}

async function sendEmail({ to, subject, html }: EmailParams): Promise<boolean> {
  if (!resend) {
    console.log("📧 Email (mock):", { to, subject })
    return true // Return true in dev mode without API key
  }

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      html,
    })

    if (error) {
      console.error("Resend error:", error)
      return false
    }

    console.log("📧 Email sent:", { to, subject })
    return true
  } catch (err) {
    console.error("Email send error:", err)
    return false
  }
}

// === Waitlist Notification ===

interface WaitlistNotifyParams {
  customerEmail: string
  customerName: string
  productName: string
  farmName: string
  farmEmail: string
}

export async function sendWaitlistNotification({
  customerEmail,
  customerName,
  productName,
  farmName,
  farmEmail,
}: WaitlistNotifyParams): Promise<boolean> {
  const subject = `🎉 ${productName} is now available!`
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1f2937; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">🎉 Good News!</h1>
      </div>
      
      <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
        <p style="font-size: 16px; margin-top: 0;">Hi ${customerName},</p>
        
        <p style="font-size: 16px;">Great news! <strong>${productName}</strong> from <strong>${farmName}</strong> is now available!</p>
        
        <p style="font-size: 16px;">You've been moved to the front of the queue. Order now before it sells out again!</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${APP_URL}/farm" style="background: #22c55e; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block;">
            Browse Products
          </a>
        </div>
        
        <p style="font-size: 14px; color: #6b7280; margin-bottom: 0;">
          Questions? Reply to this email or contact ${farmName} at ${farmEmail}
        </p>
      </div>
      
      <div style="text-align: center; padding: 20px; color: #9ca3af; font-size: 12px;">
        <p style="margin: 0;">You're receiving this because you're on the waitlist for ${productName}.</p>
        <p style="margin: 5px 0;">© ${new Date().getFullYear()} Virtual Farm Stand</p>
      </div>
    </body>
    </html>
  `

  return sendEmail({ to: customerEmail, subject, html })
}

// === Order Confirmation (Customer) ===

interface OrderConfirmationParams {
  customerEmail: string
  customerName: string
  orderId: string
  productName: string
  quantity: number
  totalPrice: number
  farmName: string
  farmLocation: string
}

export async function sendOrderConfirmation({
  customerEmail,
  customerName,
  orderId,
  productName,
  quantity,
  totalPrice,
  farmName,
  farmLocation,
}: OrderConfirmationParams): Promise<boolean> {
  const subject = `✅ Order Confirmed - #${orderId.slice(0, 8)}`
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1f2937; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: #22c55e; padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">✅ Order Confirmed!</h1>
      </div>
      
      <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
        <p style="font-size: 16px; margin-top: 0;">Hi ${customerName},</p>
        
        <p style="font-size: 16px;">Your order has been confirmed! Here's your order summary:</p>
        
        <div style="background: #f9fafb; border-radius: 8px; padding: 20px; margin: 20px 0;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #6b7280;">Order ID</td>
              <td style="padding: 8px 0; text-align: right; font-family: monospace;">#${orderId.slice(0, 8)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280;">Product</td>
              <td style="padding: 8px 0; text-align: right;">${productName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280;">Quantity</td>
              <td style="padding: 8px 0; text-align: right;">${quantity}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280;">Farm</td>
              <td style="padding: 8px 0; text-align: right;">${farmName}</td>
            </tr>
            <tr style="border-top: 2px solid #e5e7eb;">
              <td style="padding: 12px 0 8px 0; font-weight: bold;">Total</td>
              <td style="padding: 12px 0 8px 0; text-align: right; font-weight: bold; color: #16a34a;">$${totalPrice.toFixed(2)}</td>
            </tr>
          </table>
        </div>
        
        <p style="font-size: 14px; color: #6b7280;">
          The farmer will contact you to arrange pickup or delivery from their location in ${farmLocation}.
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${APP_URL}/orders" style="background: #22c55e; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block;">
            View My Orders
          </a>
        </div>
      </div>
      
      <div style="text-align: center; padding: 20px; color: #9ca3af; font-size: 12px;">
        <p style="margin: 0;">© ${new Date().getFullYear()} Virtual Farm Stand</p>
      </div>
    </body>
    </html>
  `

  return sendEmail({ to: customerEmail, subject, html })
}

// === New Order Notification (Farmer) ===

interface FarmerOrderNotificationParams {
  farmerEmail: string
  farmerName: string
  orderId: string
  productName: string
  quantity: number
  totalPrice: number
  customerName: string
  customerEmail: string
  customerPhone?: string
}

export async function sendFarmerOrderNotification({
  farmerEmail,
  farmerName,
  orderId,
  productName,
  quantity,
  totalPrice,
  customerName,
  customerEmail,
  customerPhone,
}: FarmerOrderNotificationParams): Promise<boolean> {
  const subject = `🛒 New Order Received - #${orderId.slice(0, 8)}`
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1f2937; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: #8b5cf6; padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">🛒 New Order!</h1>
      </div>
      
      <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
        <p style="font-size: 16px; margin-top: 0;">Hi ${farmerName},</p>
        
        <p style="font-size: 16px;">You've received a new order! Here are the details:</p>
        
        <div style="background: #f9fafb; border-radius: 8px; padding: 20px; margin: 20px 0;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #6b7280;">Order ID</td>
              <td style="padding: 8px 0; text-align: right; font-family: monospace;">#${orderId.slice(0, 8)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280;">Product</td>
              <td style="padding: 8px 0; text-align: right;">${productName} × ${quantity}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280;">Earnings</td>
              <td style="padding: 8px 0; text-align: right; font-weight: bold; color: #16a34a;">$${totalPrice.toFixed(2)}</td>
            </tr>
          </table>
        </div>
        
        <p style="font-size: 16px; margin-bottom: 5px;"><strong>Customer Info:</strong></p>
        <div style="background: #f9fafb; border-radius: 8px; padding: 15px; margin-bottom: 20px;">
          <p style="margin: 5px 0; font-size: 14px;">👤 ${customerName}</p>
          <p style="margin: 5px 0; font-size: 14px;">✉️ ${customerEmail}</p>
          ${customerPhone ? `<p style="margin: 5px 0; font-size: 14px;">📞 ${customerPhone}</p>` : ''}
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${APP_URL}/dashboard/orders" style="background: #8b5cf6; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block;">
            View Orders
          </a>
        </div>
        
        <p style="font-size: 14px; color: #6b7280;">
          Contact the customer to arrange pickup or delivery.
        </p>
      </div>
      
      <div style="text-align: center; padding: 20px; color: #9ca3af; font-size: 12px;">
        <p style="margin: 0;">© ${new Date().getFullYear()} Virtual Farm Stand</p>
      </div>
    </body>
    </html>
  `

  return sendEmail({ to: farmerEmail, subject, html })
}

// === Order Status Update (Customer) ===

interface OrderStatusUpdateParams {
  customerEmail: string
  customerName: string
  orderId: string
  productName: string
  quantity: number
  totalPrice: number
  status: "CONFIRMED" | "CANCELLED" | "COMPLETED"
  farmName: string
}

export async function sendOrderStatusUpdate({
  customerEmail,
  customerName,
  orderId,
  productName,
  quantity,
  totalPrice,
  status,
  farmName,
}: OrderStatusUpdateParams): Promise<boolean> {
  const statusConfig = {
    CONFIRMED: { emoji: "✅", title: "Order Confirmed!", color: "#22c55e", text: "Great news! Your order has been confirmed by the farmer." },
    CANCELLED: { emoji: "❌", title: "Order Cancelled", color: "#ef4444", text: "Unfortunately, this order has been cancelled by the farmer." },
    COMPLETED: { emoji: "🎉", title: "Order Completed", color: "#8b5cf6", text: "Your order has been completed. Enjoy your fresh produce!" },
  }
  
  const config = statusConfig[status]
  const subject = `${config.emoji} Order ${config.title} - #${orderId.slice(0, 8)}`
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1f2937; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: ${config.color}; padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">${config.emoji} ${config.title}</h1>
      </div>
      
      <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
        <p style="font-size: 16px; margin-top: 0;">Hi ${customerName},</p>
        
        <p style="font-size: 16px;">${config.text}</p>
        
        <div style="background: #f9fafb; border-radius: 8px; padding: 20px; margin: 20px 0;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #6b7280;">Order ID</td>
              <td style="padding: 8px 0; text-align: right; font-family: monospace;">#${orderId.slice(0, 8)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280;">Product</td>
              <td style="padding: 8px 0; text-align: right;">${productName} × ${quantity}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280;">Farm</td>
              <td style="padding: 8px 0; text-align: right;">${farmName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7280;">Status</td>
              <td style="padding: 8px 0; text-align: right; font-weight: bold; color: ${config.color};">${status}</td>
            </tr>
            <tr style="border-top: 2px solid #e5e7eb;">
              <td style="padding: 12px 0 8px 0; font-weight: bold;">Total</td>
              <td style="padding: 12px 0 8px 0; text-align: right; font-weight: bold;">$${totalPrice.toFixed(2)}</td>
            </tr>
          </table>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${APP_URL}/orders" style="background: ${config.color}; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block;">
            View My Orders
          </a>
        </div>
        
        <p style="font-size: 14px; color: #6b7280;">
          Questions? Reply to this email or contact ${farmName}.
        </p>
      </div>
      
      <div style="text-align: center; padding: 20px; color: #9ca3af; font-size: 12px;">
        <p style="margin: 0;">© ${new Date().getFullYear()} Virtual Farm Stand</p>
      </div>
    </body>
    </html>
  `

  return sendEmail({ to: customerEmail, subject, html })
}