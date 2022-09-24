import {NextApiRequest, NextApiResponse} from "next";
import Shopify, {ApiVersion, AuthQuery} from "@shopify/shopify-api";

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

export default async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const session = await Shopify.Auth.validateAuthCallback(req, res, req.query as unknown as AuthQuery);

  console.log(session.accessToken);
  return res.redirect(`/?host=${req.query.host}&shop=${req.query.shop}`);
}

