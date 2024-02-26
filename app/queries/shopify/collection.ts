import {
  PRODUCT_FIELDS,
  PRODUCT_VARIANT_FIELDS,
} from '~/queries/shopify/product'

export const COLLECTION_FIELDS = `#graphql
  fragment CollectionFields on Collection {
    id
    title
    description
    handle
    products(first: $count, after: $cursor, sortKey: $sortKey, reverse: $reverse) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        ...ProductFields
        variants(first: 1) {
          nodes {
            ...ProductVariantFields
          }
        }
      }
    }
  }
` as const

export const COLLECTION_QUERY = `#graphql
  query CollectionDetails($country: CountryCode, $language: LanguageCode, $handle: String!, $count: Int!, $cursor: String, $sortKey: ProductCollectionSortKeys, $reverse: Boolean)
    @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      ...CollectionFields
    }
  }

  ${PRODUCT_FIELDS}
  ${PRODUCT_VARIANT_FIELDS}
  ${COLLECTION_FIELDS}
` as const

export const COLLECTION_QUERY_ID = `#graphql

  query CollectionDetails($country: CountryCode, $language: LanguageCode, $id: ID!, $count: Int!, $cursor: String, $sortKey: ProductCollectionSortKeys, $reverse: Boolean)
    @inContext(country: $country, language: $language) {
    collection(id: $id) {
      ...CollectionFields
    }
  }
  ${PRODUCT_FIELDS}
  ${PRODUCT_VARIANT_FIELDS}
  ${COLLECTION_FIELDS}
` as const
