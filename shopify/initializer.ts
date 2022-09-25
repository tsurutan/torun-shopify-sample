import Shopify, {ApiVersion} from "@shopify/shopify-api";
import ShopifySession from "@shopify/shopify-api/dist/auth/session";

export const setupShopify = () => {
  const {API_KEY, API_SECRET_KEY, SCOPES, SHOP, HOST, HOST_SCHEME} = process.env;

  Shopify.Context.initialize({
    API_KEY: API_KEY!,
    API_SECRET_KEY: API_SECRET_KEY!,
    SCOPES: [SCOPES!],
    HOST_NAME: HOST!,
    HOST_SCHEME,
    IS_EMBEDDED_APP: false,
    API_VERSION: ApiVersion.April22,
    SESSION_STORAGE: new ShopifySession.MemorySessionStorage()
  });
}