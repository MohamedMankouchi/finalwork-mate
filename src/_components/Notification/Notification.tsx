import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Avatar } from "antd";

export const Notification = () => {
  return (
    <Flex alignItems="start" gap="2" p="2" borderRadius="10px">
      <Avatar
        size="large"
        src="https://api.dicebear.com/7.x/miniavs/svg?seed=22"
      />
      <Box>
        <Text>
          <span style={{ fontWeight: "bold" }}>Mohamed Mankouchi </span>has sent
          you a friend request
        </Text>
        <Text fontSize="12">2 hours ago</Text>
        <Flex gap="3" mt="3">
          <Button
            bg="brand.200"
            color="white"
            _hover={{ bg: "#008ECC" }}
            h="30px"
          >
            Accept
          </Button>
          <Button h="30px">Decline</Button>
        </Flex>
      </Box>
    </Flex>
  );
};
