import type { NextApiRequest, NextApiResponse } from 'next'
import Shopify, {ApiVersion} from "@shopify/shopify-api";
import {Product} from '@shopify/shopify-api/dist/rest-resources/2022-07/index.js';

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
  res: NextApiResponse<any>
) {
  const session = await Shopify.Utils.loadCurrentSession(req, res, true);
  if(!session) {
    res.status(403).end()
    return;
  }
  if(req.method === 'GET') {
    const client = new Shopify.Clients.Rest(session!.shop, session!.accessToken);
    const response = await client.get<any>({ path: "products" })
    res.status(200).json(response.body.products)
  } else {
    const product = new Product({ session: session!})
    product.id = Number(req.query.id);
    product.images = [{
      src: "https://blogger.googleusercontent.com/img/a/AVvXsEjyeJgJIrzCF5Ck3iDJAS25qLd7P02PixI-UWNgtSyq5YHPa9v5ngQgeJIjoRypNDVpQrAyKh3I4EZnFXMAgQIrsDfF5dCTNY_VPrOmkNWO18doT6xehVo70halIYqycSTnfxjffLXgcrGmRu-F4KweGragY9pRkKtvB40s7FrvuI4sUD0XRRkqh0pltw=s805"
    }]
    await product.save();
    res.status(200).end()
  }
}
