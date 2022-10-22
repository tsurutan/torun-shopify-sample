import Shopify from "@shopify/shopify-api";

const shopifyAccessToken = process.env.SHOPIFY_ACCESS_TOKEN
export const storefrontAPI = new Shopify.Clients.Storefront(
  'torun-dev.myshopify.com',
  shopifyAccessToken
);
