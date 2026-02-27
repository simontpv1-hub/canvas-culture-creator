import { createStorefrontApiClient } from "@shopify/storefront-api-client";

const STORE_DOMAIN = "canvas-culture-8888.myshopify.com";
const STOREFRONT_TOKEN = "7da0a912c59c5ed51a4c32e3dda82431";

export const shopifyClient = createStorefrontApiClient({
  storeDomain: `https://${STORE_DOMAIN}`,
  apiVersion: "2024-10",
  publicAccessToken: STOREFRONT_TOKEN,
});

// ── GraphQL Fragments ──

const PRODUCT_FRAGMENT = `
  fragment ProductFields on Product {
    id
    title
    handle
    description
    productType
    tags
    priceRange {
      minVariantPrice { amount currencyCode }
      maxVariantPrice { amount currencyCode }
    }
    compareAtPriceRange {
      minVariantPrice { amount currencyCode }
      maxVariantPrice { amount currencyCode }
    }
    images(first: 40) {
      edges {
        node {
          url
          altText
          width
          height
        }
      }
    }
    variants(first: 20) {
      edges {
        node {
          id
          title
          availableForSale
          priceV2: price { amount currencyCode }
        }
      }
    }
  }
`;

// ── Queries ──

export const PRODUCTS_QUERY = `
  query Products($first: Int!, $after: String) {
    products(first: $first, after: $after) {
      pageInfo { hasNextPage endCursor }
      edges {
        node { ...ProductFields }
      }
    }
  }
  ${PRODUCT_FRAGMENT}
`;

export const COLLECTION_PRODUCTS_QUERY = `
  query CollectionProducts($handle: String!, $first: Int!, $after: String) {
    collection(handle: $handle) {
      id
      title
      description
      image { url altText }
      products(first: $first, after: $after) {
        pageInfo { hasNextPage endCursor }
        edges {
          node { ...ProductFields }
        }
      }
    }
  }
  ${PRODUCT_FRAGMENT}
`;

export const COLLECTIONS_QUERY = `
  query Collections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          image { url altText width height }
          productsCount: products(first: 0) { edges { node { id } } }
        }
      }
    }
  }
`;

export const PRODUCT_BY_HANDLE_QUERY = `
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      ...ProductFields
    }
  }
  ${PRODUCT_FRAGMENT}
`;

// ── Checkout Mutations ──

export const CREATE_CHECKOUT_MUTATION = `
  mutation checkoutCreate($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
      checkout {
        id
        webUrl
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }
`;

export const ADD_TO_CHECKOUT_MUTATION = `
  mutation checkoutLineItemsAdd($checkoutId: ID!, $lineItems: [CheckoutLineItemInput!]!) {
    checkoutLineItemsAdd(checkoutId: $checkoutId, lineItems: $lineItems) {
      checkout {
        id
        webUrl
        lineItems(first: 50) {
          edges {
            node {
              id
              title
              quantity
              variant {
                id
                title
                priceV2: price { amount currencyCode }
                image { url altText }
                product {
                  handle
                  title
                }
              }
            }
          }
        }
        subtotalPriceV2: subtotalPrice { amount currencyCode }
      }
      checkoutUserErrors { code field message }
    }
  }
`;

export const UPDATE_CHECKOUT_MUTATION = `
  mutation checkoutLineItemsUpdate($checkoutId: ID!, $lineItems: [CheckoutLineItemUpdateInput!]!) {
    checkoutLineItemsUpdate(checkoutId: $checkoutId, lineItems: $lineItems) {
      checkout {
        id
        webUrl
        lineItems(first: 50) {
          edges {
            node {
              id
              title
              quantity
              variant {
                id
                title
                priceV2: price { amount currencyCode }
                image { url altText }
                product { handle title }
              }
            }
          }
        }
        subtotalPriceV2: subtotalPrice { amount currencyCode }
      }
      checkoutUserErrors { code field message }
    }
  }
`;

export const REMOVE_FROM_CHECKOUT_MUTATION = `
  mutation checkoutLineItemsRemove($checkoutId: ID!, $lineItemIds: [ID!]!) {
    checkoutLineItemsRemove(checkoutId: $checkoutId, lineItemIds: $lineItemIds) {
      checkout {
        id
        webUrl
        lineItems(first: 50) {
          edges {
            node {
              id
              title
              quantity
              variant {
                id
                title
                priceV2: price { amount currencyCode }
                image { url altText }
                product { handle title }
              }
            }
          }
        }
        subtotalPriceV2: subtotalPrice { amount currencyCode }
      }
      checkoutUserErrors { code field message }
    }
  }
`;

// ── Helper: normalize Shopify product to app format ──

export interface ShopifyProduct {
  id: string;
  title: string;
  slug: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  images: string[];
  hoverImage?: string;
  category: string[];
  tags: string[];
  sizes: { label: string; price: number; variantId: string }[];
  description: string;
  inStock: boolean;
}

export interface ShopifyCollection {
  slug: string;
  title: string;
  image: string;
  count: number;
}

export function normalizeProduct(node: any): ShopifyProduct {
  const allImages = node.images?.edges?.map((e: any) => e.node.url) ?? [];
  const variants = node.variants?.edges?.map((e: any) => e.node) ?? [];
  const minPrice = parseFloat(node.priceRange?.minVariantPrice?.amount ?? "0");
  const compareAt = parseFloat(node.compareAtPriceRange?.minVariantPrice?.amount ?? "0");

  // 🚨 TRI DES IMAGES : On garde uniquement la 27, 26 et 25 🚨
  const imageOrder = [26, 27, 25];

  const customImages = imageOrder
    .map((index) => allImages[index])
    .filter((url) => url !== undefined);

  // Sécurité : si un produit n'a pas 27 images, on affiche au moins la première
  const finalImages = customImages.length > 0 ? customImages : [allImages[0] ?? "/placeholder.svg"];

  return {
    id: node.id,
    title: node.title,
    slug: node.handle,
    price: minPrice,
    compareAtPrice: compareAt > minPrice ? compareAt : undefined,
    image: finalImages[0], 
    images: finalImages, 
    hoverImage: finalImages[1],
    category: node.productType ? [node.productType.toLowerCase()] : [],
    tags: node.tags ?? [],
    sizes: variants.length > 0
      ? variants.map((v: any) => ({
          label: v.title,
          price: parseFloat(v.priceV2?.amount ?? "0"),
          variantId: v.id,
        }))
      : [{ label: "Default", price: minPrice, variantId: "" }],
    description: node.description ?? "",
    inStock: variants.some((v: any) => v.availableForSale),
  };
}

export function normalizeCollection(node: any): ShopifyCollection {
  return {
    slug: node.handle,
    title: node.title,
    image: node.image?.url ?? "/placeholder.svg",
    count: node.productsCount?.edges?.length ?? 0,
  };
}

// ── Fetch helpers ──

export async function fetchAllProducts(first = 50): Promise<ShopifyProduct[]> {
  const { data, errors } = await shopifyClient.request(PRODUCTS_QUERY, {
    variables: { first },
  });
  if (errors) console.error("Shopify products error:", errors);
  return (data?.products?.edges ?? []).map((e: any) => normalizeProduct(e.node));
}

export async function fetchCollectionProducts(
  handle: string,
  first = 50
): Promise<{ collection: ShopifyCollection | null; products: ShopifyProduct[] }> {
  const { data, errors } = await shopifyClient.request(COLLECTION_PRODUCTS_QUERY, {
    variables: { handle, first },
  });
  if (errors) console.error("Shopify collection error:", errors);
  if (!data?.collection) return { collection: null, products: [] };
  return {
    collection: normalizeCollection(data.collection),
    products: (data.collection.products?.edges ?? []).map((e: any) =>
      normalizeProduct(e.node)
    ),
  };
}

export async function fetchCollections(first = 30): Promise<ShopifyCollection[]> {
  const { data, errors } = await shopifyClient.request(COLLECTIONS_QUERY, {
    variables: { first },
  });
  if (errors) console.error("Shopify collections error:", errors);
  return (data?.collections?.edges ?? []).map((e: any) => normalizeCollection(e.node));
}

export async function fetchProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  const { data, errors } = await shopifyClient.request(PRODUCT_BY_HANDLE_QUERY, {
    variables: { handle },
  });
  if (errors) console.error("Shopify product error:", errors);
  if (!data?.product) return null;
  return normalizeProduct(data.product);
}

// ── Checkout helpers ──

export async function createCheckout(
  lineItems: { variantId: string; quantity: number }[]
): Promise<{ checkoutId: string; webUrl: string } | null> {
  const { data, errors } = await shopifyClient.request(CREATE_CHECKOUT_MUTATION, {
    variables: {
      input: { lineItems },
    },
  });
  if (errors || data?.checkoutCreate?.checkoutUserErrors?.length) {
    console.error("Checkout error:", errors, data?.checkoutCreate?.checkoutUserErrors);
    return null;
  }
  return {
    checkoutId: data.checkoutCreate.checkout.id,
    webUrl: data.checkoutCreate.checkout.webUrl,
  };
}
