import { Cart } from "../Models/Cart"

export class CartService{    
    public async ClearUserCart(userId: string): Promise<boolean> {
            try {
                const userCart = await Cart.findOne({ userId: userId });
                if (userCart) {
                    await Cart.deleteOne({ userId: userId });
                    return true;
                }
                return false; // Cart not found
            } catch (error: any) {
                console.error('Error clearing user cart:', error);
                return false; // Return false in case of an error
            }
    }
}
