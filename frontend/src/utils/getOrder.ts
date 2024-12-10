const getOrder = async (orderId: string) => {
  const response = await fetch(
    `http://192.168.0.116:8000/api/orders/${orderId}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch order");
  }
  const data = await response.json();
  return data;
};

export { getOrder };
