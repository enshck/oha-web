import { Box, SimpleGrid, VStack } from "@chakra-ui/react";
import { useState } from "react";

import { useGetCities } from "@/shared/api";
import { EmptyState } from "@/shared/components";

import CityCard from "./components/CityCard";
import Header from "./components/Header";
import type { IFilters } from "./types";

const DashboardContainer = () => {
  const [filters, setFilters] = useState<IFilters>({
    city: "",
    country: null,
    continent: null,
  });

  const { data: cities = [], isLoading: citiesLoading } = useGetCities({
    search: filters.city.length ? filters.city : undefined,
    country: filters.country || undefined,
    continent: filters.continent || undefined,
  });

  return (
    <VStack w="full" align="stretch" gap={4}>
      <Header filters={filters} setFilters={setFilters} />
      <Box px={{ base: 4, md: 6 }} pb={{ base: 4, md: 6 }}>
        {!cities.length && !citiesLoading ? (
          <EmptyState
            title="No cities found"
            description="Try changing the search query or clearing the active filters."
            minH="320px"
          />
        ) : (
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 3, xl: 4 }} gap={4}>
            {cities.map((city) => (
              <CityCard key={city.id} city={city} onDetailsClick={() => undefined} />
            ))}
          </SimpleGrid>
        )}
      </Box>
    </VStack>
  );
};

export default DashboardContainer;
