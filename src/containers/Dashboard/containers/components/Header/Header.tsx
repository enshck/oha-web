import { HStack } from "@chakra-ui/react";
import type { Dispatch, FC } from "react";

import { useGetCountries, useGetContinents } from "@/shared/api";
import { Select, SearchInput } from "@/shared/components";
import { getOptions } from "@/shared/utils/functions";

import type { IFilters } from "../../types";

interface IHeaderProps {
  filters: IFilters;
  setFilters: Dispatch<React.SetStateAction<IFilters>>;
}

const Header: FC<IHeaderProps> = ({ filters, setFilters }) => {
  const { data: countries = [] } = useGetCountries();
  const { data: continents = [] } = useGetContinents();

  const onSelectFilter = (value: string | null, filterType: keyof IFilters) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }));
  };

  return (
    <HStack
      w={"full"}
      bg={"sidebarBgColor"}
      p={4}
      justifyContent={"flex-end"}
      shadow={"normal"}
      position={"sticky"}
      top={0}
      zIndex={10}
      backdropFilter={"blur(8px)"}
    >
      <SearchInput onChange={(value) => onSelectFilter(value, "city")} placeholder="Find city" />
      <Select
        options={getOptions(countries)}
        value={filters.country ? [filters.country] : []}
        onSelect={(data) => onSelectFilter(data.value, "country")}
        onClear={() => onSelectFilter(null, "country")}
        placeholder="Filter by country"
      />
      <Select
        options={getOptions(continents)}
        value={filters.continent ? [filters.continent] : []}
        onSelect={(data) => onSelectFilter(data.value, "continent")}
        onClear={() => onSelectFilter(null, "continent")}
        placeholder="Filter by continent"
      />
    </HStack>
  );
};

export default Header;
