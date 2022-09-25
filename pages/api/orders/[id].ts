import type {NextApiRequest, NextApiResponse} from 'next'
import Shopify, {ApiVersion} from "@shopify/shopify-api";
import {Order} from '@shopify/shopify-api/dist/rest-resources/2022-04/index.js';
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

  if(req.method === 'GET') {
    const order = await Order.find({ session, id: Number(req.query.id)})
    res.status(200).json(order);
    return;
  }

  const order = new Order({session: session!})
  order.billing_address = {
    address1: "港区",
    address2: "東京都",
    company: "Torun"
  }
  order.customer = {
    email: "sample@troun.jp",
    first_name: "Torun",
    last_name: "山田",
    default_address: {
      address1: "港区",
      address2: "東京都",
      company: "Torun"
    }
  }
  order.shipping_address = {
    "address1": "山田ビルディング",
    "address2": "",
    "city": "目黒区",
    "company": null,
    "country": "Japan",
    "first_name": "Torun",
    "last_name": "ですよ",
    "phone": "555-625-1199",
    "province": "Ontario",
    "zip": "K2P0V6",
    "name": "Torun事務局",
    "country_code": "JP",
    "province_code": "ON"
  }
  order.line_items = [{
    variant_id: Number(req.query.id),
    price: 0,
    quantity: 1,
    name: "name",
    title: "Torunへの支給品"
  }]
  await order.save({ update: true });
  res.status(200).json({ id: order.id })
}
