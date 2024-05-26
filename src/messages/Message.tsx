import "./message.css";

import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Input,
  Text,
} from "@chakra-ui/react";
import { Avatar, Badge } from "antd";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { useContext, useEffect } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { IoMdArrowRoundForward } from "react-icons/io";
import { IoCheckmarkDoneSharp, IoCheckmarkSharp } from "react-icons/io5";
import { TbSend2 } from "react-icons/tb";
import { Link, Navigate, useOutletContext, useParams } from "react-router-dom";
import ScrollToBottom from "react-scroll-to-bottom";

import { Tables } from "../_models/database.types";
import { userProvider } from "../App";
import { supabase } from "../database/supabase";
import { useCheckFriends } from "../profile/_queries/useCheckFriends";
import { useCheckChat } from "./_mutations/useCheckChat";
import { useGetMessages } from "./_queries/useGetMessages";
export const Message = () => {
  const activeUsers = useContext(userProvider);
  const { handleSubmit, control, reset } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });
  const user: Tables<"users"> = useOutletContext();
  const { id } = useParams();
  const { data, isLoading, refetch } = useGetMessages(
    parseInt(id as string),
    user.id
  );
  const { data: users, isLoading: userLoading } = useCheckChat(
    parseInt(id as string),
    user.id
  );

  const { data: areFriends, isLoading: checkLoading } = useCheckFriends(
    user.id,
    users?.user?.id as string,
    !!users
  );
  const handleMessages = async ({ message }: FieldValues) => {
    reset();
    const { data, error } = await supabase.from("chat_messages").insert({
      chat_id: parseInt(id as string),
      message,
      receiver: users?.user?.id as string,
      sender: user.id,
    });

    await supabase.from("notifications").insert({
      receiver: users?.user?.id as string,
      sender: user.id,
      type: "message",
    });
    if (error) {
      throw error;
    }
    return data;
  };

  useEffect(() => {
    const readMessages = async () => {
      if (data?.data.length !== 0) {
        const filter = data?.data.filter(
          (el) => el.sender !== user.id && !el.isRead
        );
        if (filter?.length !== 0) {
          filter?.forEach(async (el) => {
            await supabase
              .from("chat_messages")
              .update({ id: el.id, isRead: true })
              .eq("id", el.id);
          });
        }
      }
    };

    readMessages();
  }, [data?.data, id, user.id]);

  supabase
    .channel("chat_messagess")
    .on(
      "postgres_changes",
      {
        event: "*",
        filter: `chat_id=eq.${parseInt(id as string)}`,
        schema: "public",
        table: "chat_messages",
      },
      () => {
        refetch();
      }
    )
    .subscribe();
  return (
    <Box w="100%" h="100%" position="relative">
      {isLoading || userLoading || checkLoading ? (
        <>
          <Center h="100vh">
            <l-line-wobble
              size="80"
              stroke="5"
              bg-opacity="0.1"
              speed="1.75"
              color="#2AACE2"
            ></l-line-wobble>
          </Center>
        </>
      ) : !data?.chat.data ||
        !areFriends ||
        areFriends.status !== "accepted" ? (
        <Navigate to="/messages" />
      ) : (
        <>
          <Box bg="white">
            <Flex alignItems="center" p={4} justifyContent="space-between">
              <Flex alignItems="center" gap={2}>
                {activeUsers.find((user) => user.user === users?.user?.id) ? (
                  <Link to={`/user/${users?.user?.id}`}>
                    <Badge dot color="green">
                      <Avatar src={users?.user?.profile_pic} size="large" />
                    </Badge>
                  </Link>
                ) : (
                  <Link to={`/user/${users?.user?.id}`}>
                    <Avatar src={users?.user?.profile_pic} size="large" />
                  </Link>
                )}
                <Box>
                  <Text fontWeight="bold">
                    {users?.user?.firstname} {users?.user?.lastname}
                  </Text>
                </Box>
              </Flex>
              <Link to="/messages">
                <IoMdArrowRoundForward size={25} cursor="pointer" />
              </Link>
            </Flex>
            <Divider />
          </Box>

          <ScrollToBottom
            className="chatContainer"
            followButtonClassName="scrollArrow"
          >
            {data?.data.map((el) => {
              if (el.sender === user.id) {
                return (
                  <Box key={el.id}>
                    <Flex
                      alignItems="start"
                      gap={2}
                      p={2}
                      flexDirection="row-reverse"
                    >
                      <Box>
                        <Avatar src={user.profile_pic} />
                      </Box>
                      <Box
                        as={motion.div}
                        initial={{ opacity: 0, x: "-50px" }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        <Text
                          bg="orange"
                          boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
                          p={4}
                          borderRadius="20px"
                        >
                          {el.message}
                        </Text>

                        <Flex alignItems="end" gap={2}>
                          <Text textAlign="left" fontSize="x-small" mt={2}>
                            {format(el.created_at, "dd/MM/yyy")},{" "}
                            {format(el.created_at, "H:mm")}{" "}
                          </Text>
                          {el.isRead ? (
                            <IoCheckmarkDoneSharp />
                          ) : (
                            <IoCheckmarkSharp />
                          )}
                        </Flex>
                      </Box>
                    </Flex>
                  </Box>
                );
              }
              return (
                <Box key={el.id}>
                  <Flex alignItems="start" gap={2} p={4}>
                    <Box>
                      <Avatar src={users?.user?.profile_pic} />
                    </Box>

                    <Box
                      as={motion.div}
                      initial={{ opacity: 0, x: "50px" }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      <Text
                        bg="white"
                        boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
                        p={4}
                        borderRadius="20px"
                      >
                        {el.message}
                      </Text>
                      <Text textAlign="right" fontSize="x-small" mt={2}>
                        {format(el.created_at, "dd/MM/yyy")},{" "}
                        {format(el.created_at, "H:mm")}{" "}
                      </Text>
                    </Box>
                  </Flex>
                </Box>
              );
            })}
          </ScrollToBottom>
          <form onSubmit={handleSubmit((data) => handleMessages(data))}>
            <Flex
              p={2}
              alignItems="center"
              justifyContent="space-between"
              gap={5}
              position="absolute"
              bottom="20px"
              w="100%"
            >
              <Controller
                rules={{
                  required: true,
                }}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <>
                    <Input
                      value={value}
                      onChange={onChange}
                      type="text"
                      placeholder="Write message"
                      borderRadius="50px"
                      variant="styled"
                      boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                      _placeholder={{
                        color: "brand.200",
                        fontWeight: "bold",
                      }}
                    />
                    <Button variant="unstyled" type="submit">
                      <TbSend2
                        type="submit"
                        size={25}
                        style={{ marginRight: "10px" }}
                        cursor="pointer"
                      />
                    </Button>
                  </>
                )}
                name="message"
              />
            </Flex>
          </form>
        </>
      )}
    </Box>
  );
};
