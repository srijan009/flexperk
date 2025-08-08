import {
  DeliveryDiscountSelectionStrategy,
  DiscountClass,
  DeliveryInput,
  CartDeliveryOptionsDiscountsGenerateRunResult,
} from "../generated/api";

export function cartDeliveryOptionsDiscountsGenerateRun(
  input: DeliveryInput,
): CartDeliveryOptionsDiscountsGenerateRunResult {
  const firstDeliveryGroup = input.cart.deliveryGroups[0];
  const buyerIdentity = input?.cart?.buyerIdentity
  if (!firstDeliveryGroup) {
    throw new Error("No delivery groups found");
  }

  const hasShippingDiscountClass = input.discount.discountClasses.includes(
    DiscountClass.Shipping,
  );

  if (!hasShippingDiscountClass) {
    return {operations: []};
  }
  // check the country code only for NP
  if(!buyerIdentity || !buyerIdentity?.customer?.hasTags[0].hasTag){
    return {operations: []};
  }
  if(firstDeliveryGroup?.deliveryAddress?.countryCode != 'NP'){
        return {operations: []};
  }
  let option
  for(let deliveryOption of firstDeliveryGroup.deliveryOptions){
    if(deliveryOption.title == 'FedEx 2 Day (2 business days)'){
        option = deliveryOption
    }
  }
  if(!option){
      return {operations: []};
  }

  return {
    operations: [
      {
        deliveryDiscountsAdd: {
          candidates: [
            {
              message: "OFF 100%",
              targets: [
                {
                  deliveryOption: {
                    handle: option.handle,
                  },
                },
              ],
              value: {
                percentage: {
                  value: 100,
                },
              },
            },
          ],
          selectionStrategy: DeliveryDiscountSelectionStrategy.All,
        },
      },
    ],
  };
}