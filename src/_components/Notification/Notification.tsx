import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Avatar } from "antd";
import { format } from "date-fns";
import { MdDeleteOutline } from "react-icons/md";

import { useToast } from "../../_hooks/useToast";
import { Tables } from "../../_models/database.types";
import { useAcceptRequest } from "../../notifications/_mutations/useAcceptRequest";
import { useDeclineRequest } from "../../notifications/_mutations/useDeclineRequest";
import { useDeleteNotification } from "../../notifications/_mutations/useDeleteNotification";

export const Notification = ({
  data,
  userId,
}: {
  data: Tables<"notifications"> & { users: Tables<"users"> | null };
  userId: string;
}) => {
  const { mutateAsync: deleteNotification } = useDeleteNotification();
  const { mutateAsync: acceptRequest } = useAcceptRequest();
  const { mutateAsync: declineRequest } = useDeclineRequest();
  const showToast = useToast();
  const handleDelete = async (id: number) => {
    try {
      await deleteNotification(id);
      showToast({
        description: "Notification has been successfully deleted !",
        status: "success",
        title: "Deleted !",
      });
    } catch (error) {
      showToast({
        description: error.message,
        status: "error",
        title: "Ooops",
      });
    }
  };

  const handleRequest = async (id: string) => {
    try {
      await acceptRequest({ id: data.id, user1: id, user2: userId });
      showToast({
        description: "Friend request accepted !",
        status: "success",
        title: "Accepted !",
      });
    } catch (error) {
      showToast({
        description: error.message,
        status: "error",
        title: "Ooops",
      });
    }
  };

  const handleRequestDelete = async (id: string) => {
    try {
      await declineRequest({ id: data.id, user1: id, user2: userId });
      showToast({
        description: "Friend request accepted !",
        status: "success",
        title: "Accepted !",
      });
    } catch (error) {
      showToast({
        description: error.message,
        status: "error",
        title: "Ooops",
      });
    }
  };
  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Flex alignItems="start" gap="2" p="2" borderRadius="10px">
        <Avatar size="large" src={data?.users?.profile_pic} />
        <Box>
          {data.type === "request" ? (
            <Text>
              <span style={{ fontWeight: "bold" }}>
                {data?.users?.firstname} {data?.users?.lastname}{" "}
              </span>
              has sent you a friend request
            </Text>
          ) : (
            <Text>
              <span style={{ fontWeight: "bold" }}>
                {data?.users?.firstname} {data?.users?.lastname}{" "}
              </span>
              has sent you a message
            </Text>
          )}

          <Text fontSize="12">
            At {format(data.created_at, "H:mm")} the {""}
            {format(data.created_at, "dd/MM/yyy")}
          </Text>

          {data.type === "request" && (
            <Flex gap="3" mt="3">
              <Button
                bg="brand.200"
                color="white"
                _hover={{ bg: "#008ECC" }}
                h="30px"
                onClick={() => handleRequest(data?.users!.id)}
              >
                Accept
              </Button>
              <Button
                onClick={() => handleRequestDelete(data?.users!.id)}
                h="30px"
              >
                Decline
              </Button>
            </Flex>
          )}
        </Box>
      </Flex>

      {data.type !== "request" && (
        <MdDeleteOutline
          size={20}
          cursor="pointer"
          onClick={() => handleDelete(data.id)}
        />
      )}
    </Flex>
  );
};
