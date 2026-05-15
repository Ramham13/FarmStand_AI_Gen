// CSS imports are handled by webpack in Next.js
// This file just tells TypeScript to allow CSS imports
declare module "*.css" {
  const content: { readonly [key: string]: string };
  export default content;
}
declare module "*.module.css" {
  const classes: { readonly [key: string]: string };
  export default classes;
}
declare module "*.scss" {
  const content: { readonly [key: string]: string };
  export default content;
}
declare module "*.sass" {
  const content: { readonly [key: string]: string };
  export default content;
}
declare module "*.less" {
  const content: { readonly [key: string]: string };
  export default content;
}