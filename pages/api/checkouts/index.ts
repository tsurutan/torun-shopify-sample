import type {NextApiRequest, NextApiResponse} from 'next'
import Shopify from "@shopify/shopify-api";
import {Product} from '@shopify/shopify-api/dist/rest-resources/2022-04/index.js';
import {setupShopify} from "shopify/initializer";
import {storefrontAPI} from "shopify/client";


setupShopify()

const query = (ids: string[]) => `
mutation {
  checkoutCreate(input: {
    lineItems: ${JSON.stringify(ids.map(id => ({ variantId: id, quantity: 1 }))).replace(/"([^"]+?)":/g, '$1:')} }) {
    checkout {
       id
       webUrl
       lineItems(first: 5) {
         edges {
           node {
             title
             quantity
           }
         }
       }
    }
  }
}
`


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const session = await Shopify.Utils.loadCurrentSession(req, res, true);
  if (!session) {
    res.status(403).end()
    return;
  }
  const ids =JSON.parse(req.body).ids
  console.log(query(ids))
  const result = await storefrontAPI.query({ data: query(ids) })
  res.status(200).json(result)
}
