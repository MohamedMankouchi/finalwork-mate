import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";

export const Search = ({
  setSearchParam,
  searchParam,
  searchFilter,
}: {
  searchFilter: string;
  searchParam?: string;
  setSearchParam: ({
    search,
    filter,
  }: {
    filter?: string;
    search: string;
  }) => void;
}) => {
  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none">
        <FiSearch color="gray.300" />
      </InputLeftElement>
      <Input
        type="text"
        placeholder="Search"
        borderRadius="50px"
        variant="styled"
        boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
        _placeholder={{ color: "brand.200", fontWeight: "bold" }}
        defaultValue={searchFilter}
        onChange={(e) => {
          if (searchParam) {
            setSearchParam({ filter: searchParam, search: e.target.value });
            return;
          }
          setSearchParam({ search: e.target.value });
        }}
      />
    </InputGroup>
  );
};
