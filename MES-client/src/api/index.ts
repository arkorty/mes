import axios from "axios";

const baseURL = `${process.env.REACT_APP_API_URL}/api`;

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json"
  }
});

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