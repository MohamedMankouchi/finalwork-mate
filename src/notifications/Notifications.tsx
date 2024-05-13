import { Box, Divider, Flex, Heading } from "@chakra-ui/react";

import { Notification } from "../_components/Notification/Notification";

export const Notifications = () => {
  return (
    <Box p="5">
      <Heading color="brand.200">Notifications</Heading>
      <Flex
        flexDirection="column"
        gap="5"
        mt="12"
        bg="white"
        w="100%"
        h="75vh"
        borderRadius="10px"
        boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
        overflowY="auto"
        p="4"
      >
        <Notification />
        <Divider />
        <Notification />
        <Divider /> <Notification />
        <Divider /> <Notification />
        <Divider /> <Notification />
        <Divider /> <Notification />
        <Divider /> <Notification />
        <Divider />
      </Flex>
    </Box>
  );
};
