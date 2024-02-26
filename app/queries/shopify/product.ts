export const PRODUCT_VARIANT_FIELDS = `#graphql
  fragment ProductVariantFields on ProductVariant {
    availableForSale
    compareAtPrice {
      currencyCode
      amount
    }
    id
    image {
      altText
      height
      id
      url
      width
    }
    price {
      currencyCode
      amount
    }
    selectedOptions {
      name
      value
    }
    title
    sku
    unitPrice {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
  }
`as const

export const PRODUCT_FIELDS = `#graphql
  fragment ProductFields on Product {
    handle
    id
    options {
      name
      values
    }
    title
    vendor
  }
`as const

export const PRODUCT_QUERY = `#graphql
  query product($country: CountryCode, $language: LanguageCode, $handle: String!, $selectedOptions: [SelectedOptionInput!]!)
  @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...ProductFields
      media(first: 20) {
        nodes {
          ... on MediaImage {
            id
            mediaContentType
            image {
              id
              url
              altText
              width
              height
            }
          }
          ... on Model3d {
            id
            mediaContentType
            sources {
              mimeType
              url
            }
          }
        }
      }
      selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions) {
        ...ProductVariantFields
      }
      variants(first: 1) {
        nodes {
          ...ProductVariantFields
        }
      }
    }
  }
  ${PRODUCT_FIELDS}
  ${PRODUCT_VARIANT_FIELDS}
`as const

export const PRODUCTS_AND_VARIANTS = `#graphql
  query productsAndVariants(
    $country: CountryCode
    $language: LanguageCode
    $ids: [ID!]!
    $variantIds: [ID!]!
  ) @inContext(country: $country, language: $language) {
    products: nodes(ids: $ids) {
      ... on Product {
        ...ProductFields
      }
    }
    productVariants: nodes(ids: $variantIds) {
      ... on ProductVariant {
        ...ProductVariantFields
      }
    }
  }
  ${PRODUCT_FIELDS}
  ${PRODUCT_VARIANT_FIELDS}
`as const

export const PRODUCT_AND_VARIANT = `#graphql
  query productAndVariant(
    $country: CountryCode
    $language: LanguageCode
    $id: ID!
    $variantId: ID!
  ) @inContext(country: $country, language: $language) {
    product: product(id: $id) {
      ...ProductFields
    }
    productVariant: node(id: $variantId) {
      ... on ProductVariant {
        ...ProductVariantFields
      }
    }
  }
  ${PRODUCT_FIELDS}
  ${PRODUCT_VARIANT_FIELDS}
`as const

export const PRODUCTS_AND_COLLECTIONS = `#graphql
  query productsAndCollections(
    $country: CountryCode
    $language: LanguageCode
    $ids: [ID!]!
  ) @inContext(country: $country, language: $language) {
    productsAndCollections: nodes(ids: $ids) {
      ... on Product {
        ...ProductFields
        variants(first: 250) {
          nodes {
            ...ProductVariantFields
          }
        }
      }
      ... on Collection {
        id
        title
        description
        handle
      }
    }
  }
  ${PRODUCT_FIELDS}
  ${PRODUCT_VARIANT_FIELDS}
`as const

export const VARIANTS_QUERY = `#graphql
  query variants(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      variants(first: 250) {
        nodes {
          ...ProductVariantFields
        }
      }
    }
  }
  ${PRODUCT_VARIANT_FIELDS}
`as const

export const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  query productRecommendations(
    $country: CountryCode
    $language: LanguageCode
    $productId: ID!
  ) @inContext(country: $country, language: $language) {
    productRecommendations(productId: $productId) {
      ...ProductFields
      variants(first: 1) {
        nodes {
          ...ProductVariantFields
        }
      }
    }
  }
  ${PRODUCT_FIELDS}
  ${PRODUCT_VARIANT_FIELDS}
`as const
