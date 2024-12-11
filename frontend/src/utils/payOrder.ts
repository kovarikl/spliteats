import { API_URL } from "./const";

const payOrder = async (
  orderId: string,
  items: { restaurant_id: string; meal_id: string; quantity_paid: number }[]
) => {
  const payload = {
    items,
  };

  const response = await fetch(`${API_URL}/orders/${orderId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to pay order");
  }
  const data = await response.json();
  return data;
};

export { payOrder };
