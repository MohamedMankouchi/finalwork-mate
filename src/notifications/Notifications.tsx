import { Box, Center, Divider, Flex, Heading } from "@chakra-ui/react";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { Navigate, useOutletContext } from "react-router-dom";

import { Notification } from "../_components/Notification/Notification";
import { Tables } from "../_models/database.types";
import { useNotifications } from "./_queries/useNotifications";

export const Notifications = () => {
  const user: Tables<"users"> = useOutletContext();

  const { data, isLoading } = useNotifications(user?.id);

  return (
    <Box p="5">
      <Flex alignItems="end" gap={1}>
        <Heading color="black">Notifications</Heading>
        <Box
          h="10px"
          borderRadius="50px"
          w="10px"
          bg="brand.200"
          mb={2.5}
        ></Box>
      </Flex>
      {!user ? (
        <Navigate to="/login" />
      ) : isLoading ? (
        "loading"
      ) : !isLoading && data?.length === 0 ? (
        <Center
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
          <MdOutlineNotificationsActive size={40} />
          <Heading fontSize="30px">Nothing to see here </Heading>
        </Center>
      ) : (
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
          {data?.map((el) => (
            <Box key={el.id}>
              <Notification data={el} userId={user.id} />
              <Divider />
            </Box>
          ))}
        </Flex>
      )}
    </Box>
  );
};
