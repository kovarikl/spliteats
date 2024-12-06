import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "@/pages/home";
import { Checkout } from "@/pages/checkout";
import { Restaurants } from "@/pages/restaurants";
import { Meals } from "@/pages/meals";
import { SlaveCheckout } from "@/pages/slave-checkout";
import { Provider } from "./components/ui/provider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// TODO: theming, background colors, ...
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/",
        element: <Restaurants />,
      },
      {
        path: "/restaurants",
        element: <Restaurants />,
      },
      {
        path: "/meals/:restaurantId",
        element: <Meals />,
      },
    ],
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/slave-checkout/:orderId",
    element: <SlaveCheckout />,
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider>
        <RouterProvider router={router} />
      </Provider>
    </QueryClientProvider>
  </StrictMode>
);
