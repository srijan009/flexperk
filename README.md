# Flexperk - BLO CUSTOMER DISCOUNT APP

This Shopify app creates automatic discounts at both the shipping and product level using a single extension.  
It leverages Shopify's GraphQL Admin API with the latest **2025-04 API version** via a mutation.

---

## Prerequisites

- Node.js installed
- Shopify API credentials (API key, secret, and access token)
- Your app running and authenticated with Shopify Admin API with appropriate permissions to create discounts

---

## Running the App

1. Clone the repository and install dependencies:

    ```bash
    npm install
    ```

2. Start the app (adjust command as needed):

    ```bash
    npm run dev
    ```

3. Ensure your app is authenticated and has access to the Shopify Admin API with permissions to create discounts.

---

## Running the Discount Creation Mutation

You can create an automatic discount by sending the following GraphQL mutation:

### Mutation

```graphql
mutation discountAutomaticAppCreate($automaticAppDiscount: DiscountAutomaticAppInput!) {
  discountAutomaticAppCreate(automaticAppDiscount: $automaticAppDiscount) {
    userErrors {
      field
      message
    }
    automaticAppDiscount {
      discountId
      title
      startsAt
      endsAt
      status
      appDiscountType {
        appKey
        functionId
      }
      combinesWith {
        orderDiscounts
        productDiscounts
        shippingDiscounts
      }
    }
  }
}
```
### Input Variable ###

```
{
  "automaticAppDiscount": {
    "title": "Combined Discount X BLO customer",
    "functionId": "Extension API KEY",
    "discountClasses": ["PRODUCT", "SHIPPING"],
    "combinesWith": {
      "orderDiscounts": true,
      "productDiscounts": true,
      "shippingDiscounts": true
    },
    "startsAt": "2025-02-02T17:09:21Z",
    "endsAt": "2027-02-02T17:09:21Z"
  }
}
```
