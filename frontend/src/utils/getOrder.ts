import { API_URL } from "./const";

const getOrder = async (orderId: string) => {
  const response = await fetch(`${API_URL}/orders/${orderId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch order");
  }
  const data = await response.json();
  return data;
};

export { getOrder };
