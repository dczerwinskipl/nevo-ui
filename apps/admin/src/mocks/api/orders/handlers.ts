import { http, HttpResponse, PathParams } from "msw";
import { withScenarios, getCurrentScenario } from "@nevo/api-mocks";
import { getOrdersCursor, getOrder } from "./database";

export const orderHandlers = [
  http.get(
    "/api/orders",
    withScenarios(async ({ request }: { request: Request }) => {
      const url = new URL(request.url);
      const page = Number(url.searchParams.get("page")) || 1;
      const limit = Number(url.searchParams.get("limit")) || 10;
      const search = url.searchParams.get("search");
      const status = url.searchParams.get("status");

      const scenario = getCurrentScenario();

      if (scenario === "empty") {
        return HttpResponse.json({
          data: [],
          page,
          limit,
          hasNext: false,
        });
      }

      const result = getOrdersCursor({
        page,
        limit,
        search,
        status,
      });

      return HttpResponse.json(result);
    })
  ),

  http.get(
    "/api/orders/:id",
    withScenarios(async ({ params }: { params: PathParams }) => {
      const order = getOrder(params.id as string);

      if (!order) {
        return HttpResponse.json({ error: "Order not found" }, { status: 404 });
      }

      return HttpResponse.json(order);
    })
  ),
];
