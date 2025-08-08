import {
  DiscountClass,
  ProductDiscountSelectionStrategy,
  CartInput,
  CartLinesDiscountsGenerateRunResult,
} from '../generated/api';


export function cartLinesDiscountsGenerateRun(
  input: CartInput,
): CartLinesDiscountsGenerateRunResult {
  if (!input.cart.lines.length) {
    throw new Error('No cart lines found');
  }
  const buyerIdentity = input?.cart?.buyerIdentity
  if (!buyerIdentity || !buyerIdentity?.customer?.hasTags[0].hasTag) {
    return { operations: [] };
  }
  const hasProductDiscountClass = input.discount.discountClasses.includes(
    DiscountClass.Product,
  );

  const operations: any = [];
  const candidates: any = []
  if (hasProductDiscountClass) {
    for (let line of input.cart.lines) {
      if (line?.merchandise?.product) {
        let isHairProduct = line.merchandise?.product.hasTags.some((tagResponse: any) =>
          (tagResponse.hasTag && tagResponse.tag === "Hair Extensions")
        )
        if (isHairProduct) {
          candidates.push({
            message: 'BLO 40% OFF',
            targets: [
              {
                cartLine: {
                  id: line.id,
                },
              },
            ],
            value: {
              percentage: {
                value: 40,
              },
            },
          });
        }
        let isToolProduct = line.merchandise?.product.hasTags.some((tagResponse: any) =>
          (tagResponse.hasTag && tagResponse.tag === "tools-axs-starterkits")
        )
        if (isToolProduct) {
          candidates.push({
            message: 'BLO 50% OFF',
            targets: [
              {
                cartLine: {
                  id: line.id,
                },
              },
            ],
            value: {
              percentage: {
                value: 50,
              },
            },
          });
        }
      }
    }

  }
  operations.push({
    productDiscountsAdd: {
      candidates,
      selectionStrategy: ProductDiscountSelectionStrategy.All,
    }
  })
  return {
    operations: (operations.length === 0)? [] : operations,
  };
}