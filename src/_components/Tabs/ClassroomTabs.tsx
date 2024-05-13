import {
  Tab,
  TabIndicator,
  TabList,
  Tabs as ChakraTabs,
} from "@chakra-ui/react";

export const ClassroomTabs = () => {
  return (
    <ChakraTabs position="relative" variant="unstyled">
      <TabList gap={5}>
        <Tab p={0} fontWeight="bold" value="All">
          All
        </Tab>
        <Tab fontWeight="bold" p={0}>
          Upcoming live rooms
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
