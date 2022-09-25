import {NextApiRequest, NextApiResponse} from "next";
import Shopify, {AuthQuery} from "@shopify/shopify-api";
import {setupShopify} from "shopify/initializer";

setupShopify()

export default async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const session = await Shopify.Auth.validateAuthCallback(req, res, req.query as unknown as AuthQuery);

  console.log(session.accessToken);
  return res.redirect(`/?host=${req.query.host}&shop=${req.query.shop}`);
}

