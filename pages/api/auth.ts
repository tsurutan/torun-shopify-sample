import {NextApiRequest, NextApiResponse} from "next";
import Shopify, {AuthQuery} from "@shopify/shopify-api";
import {setupShopify} from "shopify/initializer";

setupShopify()

export default async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  try {
    const session = await Shopify.Auth.validateAuthCallback(req, res, req.query as unknown as AuthQuery);
    return res.redirect(`/?host=${req.query.host}&shop=${req.query.shop}`);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message})
  }
}

