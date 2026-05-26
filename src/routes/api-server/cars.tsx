import { createServerFn } from "@tanstack/react-start";
import { getAllCars, getCarsByCategory } from "@/lib/data.server";

type FetchCarsInput = {
  category?: string;
};

export const fetchCars = createServerFn({ method: "POST" })
  .inputValidator((data: FetchCarsInput) => data)
  .handler(async ({ data }) => {
    if (data.category && data.category !== "all") {
      return getCarsByCategory(data.category);
    }
    return getAllCars();
  });
