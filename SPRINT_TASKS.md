# Sprint Tasks - 2026-05-15 07:29 UTC

## Priority 1
- [ ] **Fix broken checkout flow**: The cart "Checkout" button redirects to farm page with `?checkout=true` but there's no checkout page handling this. Need to create a checkout form that submits to POST /api/orders.

## Priority 2
- [ ] **Resolve multi-farm cart UX issue**: Users can add items from multiple farms but checkout only works for single farms. Either: (a) prevent adding items from different farms, or (b) implement multi-farm checkout that creates separate orders per farm.

## Priority 3
- [ ] **Add customer order tracking**: Customers have no way to view their order history or track order status. Need a customer-facing orders page or order confirmation with status link.

## Priority 4
- [ ] **Connect search to API**: The search functionality on homepage only filters the hardcoded mock data. Should integrate with the /api/farms/search endpoint for consistent results.

## Priority 5
- [ ] **Mobile checkout improvements**: The cart drawer is functional but the checkout flow needs mobile-friendly form inputs, proper touch targets, and error handling for the order submission.