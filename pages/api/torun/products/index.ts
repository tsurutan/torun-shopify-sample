import type {NextApiRequest, NextApiResponse} from 'next'
import {storefrontAPI} from "shopify/client";
import Shopify from "@shopify/shopify-api";

const query = (tag: string) => `{
  products(first: 5, query:"tag:${tag}") {
    edges {
      node {
        id
        handle
        title
        images(first:1) {
          edges {
            node {
              url
            }
          }
        }
        variants(first: 2) {
          edges {
            node {
              id
            }
          }
        }
      }
    }
    pageInfo {
      hasNextPage
    }
  }
}`

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const session = await Shopify.Utils.loadCurrentSession(req, res, true);
  const products = await storefrontAPI.query({ data: query(session!.shop) })
  res.status(200).json(products.body)
}
