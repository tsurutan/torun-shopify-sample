// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Shopify, {ApiVersion} from "@shopify/shopify-api";

type Data = {
  name: string
}

const { API_KEY, API_SECRET_KEY, SCOPES, SHOP, HOST, HOST_SCHEME } = process.env;

Shopify.Context.initialize({
  API_KEY: API_KEY!,
  API_SECRET_KEY: API_SECRET_KEY!,
  SCOPES: [SCOPES!],
  HOST_NAME: HOST!,
  HOST_SCHEME,
  IS_EMBEDDED_APP: false,
  API_VERSION: ApiVersion.April22
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const shop = req.query.shop;
  const authRoute = await Shopify.Auth.beginAuth(req, res, shop as string, "/api/auth", false)
  res.status(302).setHeader("Location", authRoute).end()
}
