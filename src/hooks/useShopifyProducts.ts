import { useQuery } from "@tanstack/react-query";
import {
  fetchAllProducts,
  fetchCollectionProducts,
  fetchCollections,
  fetchProductByHandle,
  fetchProductsByTag,
} from "@/lib/shopify";

export function useShopifyProducts(first = 50) {
  return useQuery({
    queryKey: ["shopify-products", first],
    queryFn: () => fetchAllProducts(first),
    staleTime: 5 * 60 * 1000,
  });
}

export function useShopifyCollection(handle: string | undefined) {
  return useQuery({
    queryKey: ["shopify-collection", handle],
    queryFn: () => fetchCollectionProducts(handle!, 100),
    enabled: !!handle,
    staleTime: 5 * 60 * 1000,
  });
}

export function useShopifyCollections() {
  return useQuery({
    queryKey: ["shopify-collections"],
    queryFn: () => fetchCollections(30),
    staleTime: 10 * 60 * 1000,
  });
}

export function useShopifyProduct(handle: string | undefined) {
  return useQuery({
    queryKey: ["shopify-product", handle],
    queryFn: () => fetchProductByHandle(handle!),
    enabled: !!handle,
    staleTime: 5 * 60 * 1000,
  });
}

export function useShopifyProductsByTag(tag: string | undefined) {
  return useQuery({
    queryKey: ["shopify-products-tag", tag],
    queryFn: () => fetchProductsByTag(tag!, 10),
    enabled: !!tag,
    staleTime: 5 * 60 * 1000,
  });
}
