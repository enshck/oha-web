import { VStack } from "@chakra-ui/react";
import { useState } from "react";

import { useGetCities } from "@/shared/api";

import Header from "./components/Header";
import type { IFilters } from "./types";

const DashboardContainer = () => {
  const [filters, setFilters] = useState<IFilters>({
    city: "",
    country: null,
    continent: null,
  });

  const { data: cities } = useGetCities({
    search: filters.city.length ? filters.city : undefined,
    country: filters.country || undefined,
    continent: filters.continent || undefined,
  });

  console.log(cities, ">>>filters");

  return (
    <VStack>
      <Header filters={filters} setFilters={setFilters} />
      DashboardContainer
    </VStack>
  );
};

export default DashboardContainer;
