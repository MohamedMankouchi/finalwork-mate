import {
  Tab,
  TabIndicator,
  TabList,
  Tabs as ChakraTabs,
} from "@chakra-ui/react";
export const GoalsTab = ({
  setFilter,
  value,
}: {
  setFilter: ({ filter }: { filter: string }) => void;
  value: string;
}) => {
  return (
    <ChakraTabs
      position="relative"
      variant="unstyled"
      defaultIndex={value === "private" ? 0 : 1}
    >
      <TabList gap={5}>
        <Tab
          p={0}
          fontWeight="bold"
          onClick={() => setFilter({ filter: "private" })}
        >
          Private
        </Tab>
        <Tab
          fontWeight="bold"
          p={0}
          onClick={() => setFilter({ filter: "group" })}
        >
          Groups
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
