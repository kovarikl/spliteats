import {
  Grid,
  Box,
  VStack,
  HStack,
  Separator,
  Button,
  Flex,
  ClipboardRoot,
  Text,
  Card,
  Spinner,
} from "@chakra-ui/react";
import QRCode from "react-qr-code";
import { ClipboardButton } from "../ui/clipboard";
import { useQuery } from "@tanstack/react-query";
import { restaurants } from "@/data/restaurants";
import { useOrderStore } from "@/stores/order";
import { useCallback, useEffect, useState } from "react";
import { DELIVERY_FEE, SERVICE_FEE } from "@/utils/const";
import { getOrder } from "@/utils/getOrder";
import { payOrder } from "@/utils/payOrder";

interface SelectedItem {
  restaurantId: string;
  mealId: string;
  quantity: number;
}

interface Props {
  orderId: string;
  onOrderComplete: () => void;
}

const CheckoutPay = ({ orderId, onOrderComplete }: Props) => {
  const splitCount = useOrderStore((state) => state.splitCount);
  const paidOwnPart = useOrderStore((state) => state.paidOwnPart);
  const setPaidOwnPart = useOrderStore((state) => state.setPaidOwnPart);

  const [selected, setSelected] = useState<SelectedItem[]>([]);
  const [payInProgress, setPayInProgress] = useState(false);

  const { data: dataOrder, refetch } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrder(orderId ?? ""),
    refetchInterval: 2000,
  });

  const restaurantId = dataOrder?.items[0]?.restaurant_id;

  const { data: dataMeals } = useQuery({
    queryKey: ["restaurant", restaurantId],
    queryFn: () => restaurants.getRestaurant(restaurantId!),
  });

  const handleAdd = (item: any) => {
    setSelected((prev) => {
      const existing = prev.find((i) => i.mealId === item.meal_id);

      if (existing) {
        return prev.map((i) =>
          i.mealId === item.meal_id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }

      return [
        ...prev,
        {
          restaurantId: item.restaurant_id,
          mealId: item.meal_id,
          quantity: 1,
        },
      ];
    });
  };

  const handleRemove = (item: any) => {
    setSelected((prev) => {
      const existing = prev.find((i) => i.mealId === item.meal_id);

      if (existing) {
        return prev.map((i) =>
          i.mealId === item.meal_id ? { ...i, quantity: i.quantity - 1 } : i
        );
      }

      return prev;
    });
  };

  const handlePay = useCallback(async () => {
    if (!selected.length) {
      return;
    }

    const items = selected.map((item) => ({
      restaurant_id: item.restaurantId,
      meal_id: item.mealId,
      quantity_paid: item.quantity,
    }));

    setPayInProgress(true);
    setTimeout(async () => {
      await payOrder(orderId ?? "", items);
      refetch();
      setPaidOwnPart(true);
      setPayInProgress(false);
    }, 3000);
  }, [selected, refetch]);

  useEffect(() => {
    if (dataOrder && dataOrder.status === "Completed") {
      onOrderComplete();
    }
  }, [dataOrder, onOrderComplete, setPaidOwnPart, setPayInProgress]);

  return (
    <Grid
      gridTemplateColumns="3fr 1fr "
      gap={0}
      mt={8}
      mb={8}
      alignItems="start"
    >
      <Box borderRight="1px solid rgb(228, 228, 231)" p={4}>
        <HStack justifyContent={"space-between"}>
          <Text fontSize="lg" fontWeight="bold" mb={4} color="black">
            Select Your Meals
          </Text>
          <Button
            variant="outline"
            disabled={paidOwnPart || payInProgress}
            onClick={() =>
              setSelected(
                dataOrder?.items.map((item: any) => ({
                  restaurantId: item.restaurant_id,
                  mealId: item.meal_id,
                  quantity: item.quantity - item.quantity_paid,
                })) ?? []
              )
            }
          >
            Select All
          </Button>
        </HStack>

        <VStack>
          <Grid
            gridTemplateColumns="2fr 1fr 1fr 1fr 1.5fr"
            alignItems="center"
            pl={4}
            pr={4}
            mb={2}
            width="100%"
          >
            <Text>Meal</Text>
            <Text justifySelf="flex-end">Unit Price</Text>
            <Text justifySelf="flex-end">Quantity</Text>
            <Text justifySelf="flex-end">Remains to pay</Text>
            <Text justifySelf="flex-end">You pay</Text>
          </Grid>
        </VStack>

        <VStack>
          <Box width="100%">
            {dataOrder?.items.map((item: any) => (
              <Card.Root width="100%" p={0} mb={4} key={item.meal_id}>
                <Card.Body gap="0" p={4}>
                  <Grid
                    gridTemplateColumns="2fr 1fr 1fr 1fr 1.5fr"
                    alignItems="center"
                  >
                    <Text>
                      {
                        dataMeals?.meals.find((m) => m.id === item.meal_id)
                          ?.name
                      }
                    </Text>
                    <Text justifySelf="flex-end">{item.unit_price} CZK</Text>
                    <Text justifySelf="flex-end">
                      {item.quantity} portion{item.quantity > 1 ? "s" : ""}
                    </Text>
                    <Text justifySelf="flex-end">
                      {item.quantity - item.quantity_paid} portion
                      {item.quantity - item.quantity_paid > 1 ? "s" : ""}
                    </Text>
                    <HStack justifySelf="flex-end">
                      <Button
                        disabled={
                          paidOwnPart ||
                          payInProgress ||
                          item.quantity_paid === item.quantity ||
                          selected.find((i) => i.mealId === item.meal_id)
                            ?.quantity === 0
                        }
                        variant="outline"
                        onClick={() => handleRemove(item)}
                      >
                        -
                      </Button>
                      <Flex minWidth={5} justifyContent="center">
                        <Text>
                          {selected.find((i) => i.mealId === item.meal_id)
                            ?.quantity ?? 0}
                        </Text>
                      </Flex>
                      <Button
                        disabled={
                          paidOwnPart ||
                          payInProgress ||
                          item.quantity_paid === item.quantity ||
                          (selected.find((i) => i.mealId === item.meal_id)
                            ?.quantity ?? 0) >=
                            item.quantity - item.quantity_paid
                        }
                        variant="solid"
                        onClick={() => handleAdd(item)}
                      >
                        +
                      </Button>
                    </HStack>
                  </Grid>
                </Card.Body>
              </Card.Root>
            ))}
          </Box>
        </VStack>

        <Separator orientation="horizontal" />
        <HStack justifyContent="space-between" w="100%" mt={4}>
          <Text>Delivery Fee</Text>
          <Text>{DELIVERY_FEE} CZK</Text>
        </HStack>
        <HStack justifyContent="space-between" w="100%">
          <Text>Service Fee</Text>
          <Text>{SERVICE_FEE} CZK</Text>
        </HStack>
        <HStack justifyContent="space-between" w="100%" fontSize="lg">
          <Text fontWeight="bold">Order Total</Text>
          <Text fontWeight="bold">
            {dataOrder?.total_price + DELIVERY_FEE + SERVICE_FEE} CZK
          </Text>
        </HStack>

        <Separator orientation="horizontal" mt={4} />

        <Text fontSize="lg" fontWeight="bold" mt={4} color="black">
          You Pay
        </Text>

        <VStack gap={0}>
          {selected
            .filter((item) => item.quantity !== 0)
            .map((item) => (
              <HStack justifyContent="space-between" w="100%" key={item.mealId}>
                <Text>
                  {dataMeals?.meals.find((m) => m.id === item.mealId)?.name} (
                  {item.quantity} portion
                  {item.quantity > 1 ? "s" : ""})
                </Text>
                <Text justifySelf="flex-end">
                  {(dataMeals?.meals.find((m) => m.id === item.mealId)?.price ??
                    0) * item.quantity}{" "}
                  CZK
                </Text>
              </HStack>
            ))}
        </VStack>

        <HStack justifyContent="space-between" w="100%" mt={4}>
          <Text>Delivery Fee (split with {splitCount} people)</Text>
          <Text>{Math.round(DELIVERY_FEE / splitCount)} CZK</Text>
        </HStack>
        <HStack justifyContent="space-between" w="100%">
          <Text>Service Fee (split with {splitCount} people)</Text>
          <Text>{Math.round(SERVICE_FEE / splitCount)} CZK</Text>
        </HStack>
        <HStack justifyContent="space-between" w="100%" fontSize="lg">
          <Text fontWeight="bold">Your Total</Text>
          <Text fontWeight="bold">
            {selected.reduce(
              (acc, curr) =>
                acc +
                (dataMeals?.meals.find((m) => m.id === curr.mealId)?.price ??
                  0) *
                  curr.quantity,
              0
            ) +
              Math.round(DELIVERY_FEE / splitCount) +
              Math.round(SERVICE_FEE / splitCount)}
            {" CZK"}
          </Text>
        </HStack>

        <HStack justifySelf="center" mt={8}>
          {payInProgress && (
            <>
              <Spinner size="xl" color="primary.500" />
              <Text>Payment in progress</Text>
            </>
          )}

          {paidOwnPart && (
            <VStack>
              <Text fontSize="lg" fontWeight="bold">
                You have paid your part!
              </Text>
              <Text>Waiting for others to pay...</Text>
              <Spinner />
            </VStack>
          )}

          {!payInProgress && !paidOwnPart && (
            <Button
              size="xl"
              onClick={handlePay}
              disabled={
                !selected.length || selected.some((s) => s.quantity === 0)
              }
            >
              <Text>Pay</Text>
            </Button>
          )}
        </HStack>
      </Box>
      <VStack p={4} gap={8}>
        <Text fontSize="lg" fontWeight="bold" color="black" alignSelf="start">
          Shared payment
        </Text>
        <QRCode
          value={`https://${location.host}/slave-checkout/${dataOrder?.id}?split=${splitCount}`}
        />
        <ClipboardRoot
          value={`https://${location.host}/slave-checkout/${dataOrder?.id}?split=${splitCount}`}
          timeout={2000}
        >
          <ClipboardButton />
        </ClipboardRoot>
      </VStack>
    </Grid>
  );
};

export { CheckoutPay };
