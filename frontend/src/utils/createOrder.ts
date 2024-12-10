import { OrderItem } from "@/stores/order";
import { API_URL } from "./const";

const createOrder = async (order: OrderItem[]) => {
  const payload = {
    items: order.map((o) => ({
      restaurant_id: o.meal.restaurantId,
      meal_id: o.meal.id,
      quantity: o.quantity,
      unit_price: o.meal.price,
      quantity_paid: 0,
    })),
    total_price: order.reduce(
      (acc, curr) => acc + curr.meal.price * curr.quantity,
      0
    ),
  };

  const response = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  return [response, data];
};

export { createOrder };
