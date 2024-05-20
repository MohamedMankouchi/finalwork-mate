import {
  Box,
  Divider,
  Flex,
  Heading,
  SkeletonText,
  Text,
} from "@chakra-ui/react";
import { Avatar, Badge } from "antd";
import { useContext } from "react";
import {
  Link,
  Navigate,
  Outlet,
  useNavigate,
  useOutletContext,
} from "react-router-dom";

import { Tables } from "../_models/database.types";
import { userProvider } from "../App";
import { supabase } from "../database/supabase";
import { useGetFriends } from "../profile/_queries/useGetFriends";
import { useGetMessageForUser } from "./_queries/useGetMessageForUser";
export const Messages = () => {
  const user: Tables<"users"> = useOutletContext();
  const { data: friendsList, isLoading } = useGetFriends(user?.id);
  const activeUsers = useContext(userProvider);

  const {
    data: messages,
    isLoading: messageLoading,
    refetch,
  } = useGetMessageForUser(user?.id);

  supabase
    .channel(`chats${user?.id}`)
    .on(
      "postgres_changes",
      {
        event: "*",
        filter: `receiver=eq.${user?.id}`,
        schema: "public",
        table: "chat_messages",
      },
      () => {
        refetch();
      }
    )
    .subscribe();
  const navigate = useNavigate();

  const handleMessage = async (id: string) => {
    const { data } = await supabase
      .from("chat")
      .select("*")
      .or(`user1.eq.${user.id},and(user2.eq.${user.id})`)
      .or(`user1.eq.${id},and(user2.eq.${id})`)
      .single();
    if (!data) {
      const { data, error } = await supabase
        .from("chat")
        .insert({ user1: user.id, user2: id })
        .select()
        .single();
      if (error) throw error;
      navigate(`/messages/${data.id}`);
      return;
    }
    navigate(`/messages/${data.id}`);
  };

  return (
    <Flex flexDirection="row-reverse" height="100%">
      {!user ? (
        <Navigate to="/login" />
      ) : isLoading || messageLoading ? (
        <>
          <SkeletonText mt="4" noOfLines={30} spacing="4" skeletonHeight="5" />
          <SkeletonText mt="4" noOfLines={30} spacing="4" skeletonHeight="5" />
          <SkeletonText mt="4" noOfLines={30} spacing="4" skeletonHeight="5" />
        </>
      ) : (
        <>
          <Box
            bg="white"
            p={2}
            h="100%"
            w="100%"
            flex={1}
            borderLeft="2px solid whitesmoke"
          >
            <Heading fontSize="25px" p={4}>
              Friends
            </Heading>
            {friendsList?.map((el) => (
              <Box
                key={el?.id}
                as={Link}
                onClick={() => handleMessage(el!.id as string)}
              >
                <Flex
                  alignItems="center"
                  justifyContent="space-between"
                  p={4}
                  cursor="pointer"
                >
                  <Flex alignItems="center" gap={2}>
                    {activeUsers.find((user) => user.user === el!.id) ? (
                      <Badge dot color="green">
                        <Avatar src={el!.profile_pic} />
                      </Badge>
                    ) : (
                      <Avatar src={el!.profile_pic} />
                    )}
                    <Box>
                      <Text fontWeight="bold">
                        {el!.firstname} {el!.lastname}
                      </Text>
                    </Box>
                  </Flex>
                  <Badge
                    overflowCount={10}
                    count={
                      messages?.data
                        ?.find(
                          (mes) => mes.user1 === el!.id || mes.user2 === el!.id
                        )
                        ?.chat_messages.filter(
                          (messages) =>
                            !messages.isRead && messages.sender !== user.id
                        ).length
                    }
                  />
                </Flex>
                <Divider />
              </Box>
            ))}
          </Box>
        </>
      )}
      <Box w="100%" h="100%" flex={3} overflowY="hidden">
        {user && <Outlet context={user} />}
      </Box>
    </Flex>
  );
};
