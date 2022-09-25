// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import Shopify from "@shopify/shopify-api";
import {setupShopify} from "shopify/initializer";

setupShopify();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const shop = req.query.shop;
  const authRoute = await Shopify.Auth.beginAuth(req, res, shop as string, "/api/auth", false)
  res.status(302).setHeader("Location", authRoute).end()
}
