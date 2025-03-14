import { Product } from "../Models/Product";
import { Cart, ICart } from "../Models/Cart";
import { ProductVariation } from "../Models/ProductVariation";
import { baseUrl, FilePaths } from "../Common/Common";
import { ProductImage } from "../Models/ProductImage";
import { Category } from "../Models/Category";
import {
  ICategory,
  ISubCategory,
  ISubSubCategory,
} from "../Models/Interface/ICategoryList";

interface ICartService {
  ClearUserCart(userId: string): Promise<boolean>;
  AddProductToCart(productCartDto: IProductCartDto): Promise<boolean>;
  RemoveProductFromCart(productId: string, userId: string): Promise<boolean>;
  UpdateProductFromCart(productCartDto: IProductCartDto): Promise<boolean>;
  GetUserCart(userId: string): Promise<any>;
  GetCartSummary(userId: string): Promise<any>;
}

export class CartService implements ICartService {
  public async ClearUserCart(userId: string): Promise<boolean> {
    try {
      const userCart = await Cart.findOne({ userId: userId });
      if (userCart) {
        await Cart.deleteOne({ userId: userId });
        return true;
      }
      return false; // Cart not found
    } catch (error: any) {
      console.error("Error clearing user cart:", error);
      return false; // Return false in case of an error
    }
  }

  public async AddProductToCart(
    productCartDto: IProductCartDto
  ): Promise<boolean> {
    try {
      //check if product exist
      let prod = await Product.findById(productCartDto.productId);
      if (!prod) return false;

      //check if particular product variation has quantity left
      let variation = await ProductVariation.findById(
        productCartDto.productVariationId
      );
      if (variation) {
        if (variation.quantity < productCartDto.quantity) return false;

        let cart = await Cart.findOne({
          userId: productCartDto.userId,
        });

        if (cart) {
          // Cart exists, check if the product is already in the cart
          const existingProduct = cart.items.find((product: any) =>
            product.productId.equals(productCartDto.productId)
          );

          if (existingProduct)
            existingProduct.quantity += productCartDto.quantity;
          else
            cart.items.push({
              productId: productCartDto.productId,
              productVariationId: productCartDto.productVariationId,
              quantity: productCartDto.quantity,
            });

          await cart.save();
        } else {
          //cart does not exist so create new
          cart = new Cart({
            userId: productCartDto.userId,
            items: [
              {
                productId: productCartDto.productId,
                productVariationId: productCartDto.productVariationId,
                quantity: productCartDto.quantity,
              },
            ],
          });
          this.CalculateCartTotalPrice(cart);
          await cart.save();
        }
      }

      return true;
    } catch (error: any) {
      return false;
    }
  }

  public async RemoveProductFromCart(
    productId: string,
    userId: string
  ): Promise<boolean> {
    try {
      // Check if the cart exists for the user
      const cart = await Cart.findOne({ userId });
      if (!cart) return false; // Cart not found
      // Check if the product exists in the cart
      const productIndex = cart.items.findIndex((product: any) =>
        product.productId.equals(productId)
      );
      if (productIndex === -1) return false; // Product not found in cart
      // Remove the product from the cart
      cart.items.splice(productIndex, 1);
      this.CalculateCartTotalPrice(cart);
      await cart.save();
      return true;
    } catch (error: any) {
      console.error("Error removing product from cart:", error);
      return false; // Return false in case of an error
    }
  }

  public async UpdateProductFromCart(
    productCartDto: IProductCartDto
  ): Promise<boolean> {
    try {
      const cart = await Cart.findOne({ userId: productCartDto.userId });
      if (!cart) return false;

      // Check if the product exists in the cart
      const productIndex = cart.items.findIndex((product: any) =>
        product.productId.equals(productCartDto.productId)
      );
      if (productIndex === -1) return false;

      const prodVariation = await ProductVariation.findById(
        productCartDto.productVariationId
      );
      if (!prodVariation) return false;
      // Check if the quantity is greater than 0 && qty is less than available qty
      if (
        productCartDto.quantity < 1 ||
        productCartDto.quantity > prodVariation.quantity
      )
        return false;
      // Update the product quantity
      const currentProduct = cart.items[productIndex];
      currentProduct.quantity = productCartDto.quantity;
      this.CalculateCartTotalPrice(cart);
      await cart.save();
      return true;
    } catch (error: any) {
      console.error("Error updating product in cart:", error);
      return false; // Return false in case of an error
    }
  }

  public async GetUserCart(userId: string): Promise<any> {
    let userItems: any[] = [];
    try {
      let userCart = await Cart.findOne({ userId })
        .populate("items.productId")
        .populate("items.productVariationId");
      //
      if (userCart) {
        let items = userCart.items.map((item: any) => {
          return {
            id: item.productId._id,
            name: item.productId.name,
            productVariationId: item.productVariationId._id,
            variationName: item.productVariationId.size,
            quantity: item.quantity,
          };
        });

        for (let index = 0; index < items.length; index++) {
          const element = items[index];
          let productInfos = await Promise.all([
            await ProductImage.findOne({
              productId: element.id,
              isCover: true,
            }),
            await ProductVariation.findById(element.productVariationId),
          ]);
          let currentCoverPic = productInfos[0];
          let variation = productInfos[1];
          const coverFilePath = `${baseUrl}${FilePaths.productFilePath}/${element.id}/thumbnail_${currentCoverPic.image}`;

          if (variation) {
            userItems.push({
              ...element,
              picture: coverFilePath,
              price: variation.retailPrice * element.quantity,
            });
          }
        }

        return {
          success: true,
          data: userItems,
          itemCount: userItems.length,
        };
      } else return null;
    } catch (error: any) {
      console.error("Error getting user cart:", error);
      return null; // Return null in case of an error
    }
  }

  public async GetCartSummary(userId: string): Promise<any> {
    try {
      let userCart = await Cart.findOne({ userId });
      if (userCart)
        return {
          success: true,
          data: {
            items: userCart.items,
            subTotal: userCart.subTotal,
            total: userCart.total,
          },
        };
      else return null;
    } catch (error: any) {
      console.error("Error getting cart summary:", error);
      return null; // Return null in case of an error
    }
  }

  private async CalculateCartTotalPrice(cart: ICart) {
    try {
      let totalPrice = 0;
      // Collect all promises for fetching variations
      const variationPromises = cart.items.map(async (product: any) => {
        const variation = await ProductVariation.findById(
          product.productVariationId
        );
        return variation ? product.quantity * variation.retailPrice : 0; // Return 0 if variation not found
      });
      // Wait for all promises to resolve
      const prices = await Promise.all(variationPromises);

      // Calculate total price
      totalPrice = prices.reduce((acc, price) => acc + price, 0);
      cart.subTotal = totalPrice;
      cart.total = totalPrice;
    } catch (error: any) {
      console.error("Error calculating cart total price:", error);
    }
  }
}
