import axios from "axios";

const baseURL = `${process.env.REACT_APP_API_URL}/api`;

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json"
  }
});

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * A wrapper function that catches and handles any errors that occur when making a request to the API.
 * It returns an object with two properties: `data` and `error`.
 * If the request is successful, `data` will contain the response and `error` will be null.
 * If the request fails, `data` will be null and `error` will contain the error message.
 * @param fn - The function to be called to make the request to the API.
 * @returns An object with two properties: `data` and `error`.
 */
/*******  2f32d53f-7e61-4aa7-a4a1-2b718ae05ec0  *******/
const handleRequest = async (fn: () => Promise<any>) => {
  try {
    const response = await fn();
    return { data: response.data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: error.response?.data?.message || error.message || "Unknown error"
    };
  }
};

// ========== AUTH ==========

export const registerUser = async ({
  name = "",
  email = "",
  mobile = "",
  password = "",
  role = 1,
  address = "",
  picture = ""
}) =>
  handleRequest(() =>
    api.post("/user/register", {
      name,
      email,
      mobile,
      password,
      role,
      address,
      picture
    })
  );

export const loginUser = async ({ email = "", password = "" }) =>
  handleRequest(() => api.post("/user/login", { email, password }));

export const getUserDetails = async (token = "") =>
  handleRequest(() =>
    api.get("/user/getUser", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  );

// ========== CART ==========

export const getCartDetails = async (userId = "") =>
  handleRequest(() => api.get(`/cart/${userId}`));

export const addToCart = async ({
  productId,
  productVariationId,
  quantity,
  userId
}: {
  productId: string;
  productVariationId: string;
  quantity: number;
  userId: string;
}) =>
  handleRequest(() =>
    api.post(`/cart/add/${userId}`, {
      productId,
      productVariationId,
      quantity
    })
  );

export const removeFromCart = async ({
  productId,
  userId
}: {
  productId: string;
  userId: string;
}) =>
  handleRequest(() =>
    api.delete(`/cart/remove/${productId}/${userId}`)
  );

export const updateCart = async ({
  productId,
  productVariationId,
  quantity,
  userId
}: {
  productId: string;
  productVariationId: string;
  quantity: number;
  userId: string;
}) =>
  handleRequest(() =>
    api.put(`/cart/update/${userId}`, {
      productId,
      productVariationId,
      quantity
    })
  );


// ========== WISHLIST ==========

type WishlistParams = {
  productId: string;
  productVariationId: string;
  userId: string;
};

export const addToWishlist = async ({
  productId,
  productVariationId,
  userId
}: WishlistParams) =>
  handleRequest(() =>
    api.post(`/wishlist/add`, {
      productId,
      productVariationId,
      userId
    })
  );

export const removeFromWishlist = async ({
  productId,
  userId,
  productVariationId
}: WishlistParams) =>
  handleRequest(() =>
    api.delete(`/wishlist/remove`, {
      data: {
        productId,
        productVariationId,
        userId
      }
    })
  );

export const getWishlist = async (userId: string) =>
  handleRequest(() => api.get(`/wishlist/${userId}`));



  /**
   * 
   * Example usage
   * 
   *
 const { data, error } = await registerUser({
  name: "John",
  email: "john@example.com",
  mobile: "1234567890",
  password: "password123",
  role: 1
});

if (error) {
  console.error("Error:", error);
} else {
  console.log("User Registered:", data);
}

   * 
   */