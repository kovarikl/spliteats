import { AppLogo } from "@/components/app-logo";
import { CheckoutComplete } from "@/components/checkout-complete";
import { Avatar } from "@/components/ui/avatar";
import { restaurants } from "@/data/restaurants";
import { useAppStateStore } from "@/stores/appState";
import { useOrderStore } from "@/stores/order";
import { DELIVERY_FEE, SERVICE_FEE } from "@/utils/const";
import { getOrder } from "@/utils/getOrder";
import { payOrder } from "@/utils/payOrder";
import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  HStack,
  Separator,
  Spinner,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

interface SelectedItem {
  restaurantId: string;
  mealId: string;
  quantity: number;
}

const SlaveCheckout = () => {
  const { orderId } = useParams();
  const [params] = useSearchParams();
  const mockName = useAppStateStore((state) => state.name);
  const paidOwnPart = useOrderStore((state) => state.paidOwnPart);
  const setPaidOwnPart = useOrderStore((state) => state.setPaidOwnPart);

  const [payInProgress, setPayInProgress] = useState(false);

  const splitCount = parseInt(params.get("split") ?? "1");

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

  const [paid, setPaid] = useState(false);
  const [selected, setSelected] = useState<SelectedItem[]>([]);

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
      setPaid(true);
      setPaidOwnPart(true);
    }, 3000);
  }, [selected, refetch, setPaid, setPayInProgress, setPaidOwnPart]);

  useEffect(() => {
    if (dataOrder && dataOrder.status === "Completed") {
      setPaid(true);
    }
  }, [dataOrder, setPaid]);

  return (
    <>
      <Box
        position="sticky"
        justifyContent="center"
        display="flex"
        top={0}
        zIndex={1000}
        backgroundColor={"white"}
        shadow="lg"
        height={55}
      >
        <HStack justifyContent="space-between" w="100%" pl={2} pr={2}>
          <AppLogo size={8} />
          <HStack justifySelf="end" gap={6}>
            <HStack gap="2">
              <Avatar name={`${mockName.name} ${mockName.surname}`} size="xs" />
              <Stack gap="0">
                <Text
                  textStyle="xs"
                  fontWeight="medium"
                >{`${mockName.name} ${mockName.surname}`}</Text>
                <Text color="fg.muted" textStyle="xs">
                  {`${mockName.name.toLocaleLowerCase()}.${mockName.surname.toLocaleLowerCase()}`}
                  @outlook.com
                </Text>
              </Stack>
            </HStack>
          </HStack>
        </HStack>
      </Box>

      {!paid ? (
        <Container p={4} mb={20}>
          <Text fontSize="xl" fontWeight="bold" mt={4} mb={4} p={0}>
            Select Meals to Pay
          </Text>

          <VStack>
            <Box width="100%">
              {dataOrder?.items.map((item: any) => (
                <Card.Root width="100%" p={0} mb={4} key={item.meal_id}>
                  <Card.Body gap="0" p={4}>
                    <VStack w="100%">
                      <HStack justifyContent="space-between" w="100%">
                        <Text fontSize="lg" fontWeight="bold">
                          {
                            dataMeals?.meals.find((m) => m.id === item.meal_id)
                              ?.name
                          }
                        </Text>
                        <Text fontWeight="bold">{item.unit_price} CZK/pp</Text>
                      </HStack>
                      <HStack justifyContent="space-between" w="100%" mt={4}>
                        <Text justifySelf="flex-end">
                          {item.quantity_paid} / {item.quantity} paid
                        </Text>
                        <HStack justifySelf="flex-end">
                          <Button
                            disabled={
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
                      </HStack>
                    </VStack>
                  </Card.Body>
                </Card.Root>
              ))}
            </Box>

            <Separator />

            <Text
              fontSize="lg"
              fontWeight="bold"
              mt={4}
              color="black"
              alignSelf="start"
            >
              You Pay
            </Text>

            <VStack gap={0} w="100%">
              {selected
                .filter((item) => item.quantity !== 0)
                .map((item) => (
                  <HStack
                    justifyContent="space-between"
                    w="100%"
                    key={item.mealId}
                  >
                    <Text>
                      {dataMeals?.meals.find((m) => m.id === item.mealId)?.name}{" "}
                      ({item.quantity} portion
                      {item.quantity > 1 ? "s" : ""})
                    </Text>
                    <Text justifySelf="flex-end">
                      {(dataMeals?.meals.find((m) => m.id === item.mealId)
                        ?.price ?? 0) * item.quantity}{" "}
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
                    (dataMeals?.meals.find((m) => m.id === curr.mealId)
                      ?.price ?? 0) *
                      curr.quantity,
                  0
                ) +
                  Math.round(DELIVERY_FEE / splitCount) +
                  Math.round(SERVICE_FEE / splitCount)}
                {" CZK"}
              </Text>
            </HStack>

            <HStack justifySelf="center" mt={4}>
              {!paidOwnPart && !payInProgress ? (
                <Button
                  size="xl"
                  onClick={() => handlePay()}
                  disabled={
                    !selected.length || selected.some((s) => s.quantity === 0)
                  }
                >
                  <Text>Pay</Text>
                </Button>
              ) : (
                <>
                  <Spinner size="xl" color="primary.500" />
                  <Text>Payment in progress</Text>
                </>
              )}
            </HStack>
          </VStack>
        </Container>
      ) : (
        <Container p={4}>
          <CheckoutComplete withRedirect={false} />
        </Container>
      )}
    </>
  );
};

export { SlaveCheckout };
