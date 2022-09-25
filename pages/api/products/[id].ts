import type {NextApiRequest, NextApiResponse} from 'next'
import Shopify from "@shopify/shopify-api";
import {Product} from '@shopify/shopify-api/dist/rest-resources/2022-04/index.js';
import {setupShopify} from "shopify/initializer";


setupShopify()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const session = await Shopify.Utils.loadCurrentSession(req, res, true);
  if (!session) {
    res.status(403).end()
    return;
  }
  const product = new Product({session: session!})
  product.id = Number(req.query.id);
  product.images = [{
    src: "https://blogger.googleusercontent.com/img/a/AVvXsEjyeJgJIrzCF5Ck3iDJAS25qLd7P02PixI-UWNgtSyq5YHPa9v5ngQgeJIjoRypNDVpQrAyKh3I4EZnFXMAgQIrsDfF5dCTNY_VPrOmkNWO18doT6xehVo70halIYqycSTnfxjffLXgcrGmRu-F4KweGragY9pRkKtvB40s7FrvuI4sUD0XRRkqh0pltw=s805"
  }]
  await product.save();
  res.status(200).end()
}
