import {
  Tab,
  TabIndicator,
  TabList,
  Tabs as ChakraTabs,
} from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";

export const Tabs = ({ filter }: { filter: string }) => {
  const [, setSearchParams] = useSearchParams();

  return (
    <ChakraTabs
      position="relative"
      variant="unstyled"
      defaultIndex={filter === "all" ? 0 : filter === "resolved" ? 1 : 2}
    >
      <TabList gap={5}>
        <Tab
          p={0}
          fontWeight="bold"
          onClick={() => setSearchParams({ filter: "all" })}
        >
          All
        </Tab>
        <Tab
          fontWeight="bold"
          p={0}
          onClick={() => setSearchParams({ filter: "resolved" })}
        >
          Resolved
        </Tab>
        <Tab
          fontWeight="bold"
          p={0}
          onClick={() => setSearchParams({ filter: "unresolved" })}
        >
          Unresolved
        </Tab>
      </TabList>
      <TabIndicator
        mt="-4.5px"
        height="2px"
        bg="brand.200"
        borderRadius="1px"
      />
    </ChakraTabs>
  );
};
