import {
  Box,
  Flex,
  Heading,
  SkeletonText,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Avatar, Progress } from "antd";
import { useEffect, useState } from "react";
import { Navigate, useOutletContext, useParams } from "react-router-dom";

import { Button } from "../_components/Button/Button";
import { Tables } from "../_models/database.types";
import { supabase } from "../database/supabase";
import { useGroupGoal } from "./_queries/useGroupGoal";
import { CreateTaskGroupModal } from "./CreateTaskGroupModal";
import { Task } from "./Task";

export const GroupGoal = () => {
  const { goalId } = useParams();
  const user: Tables<"users"> = useOutletContext();
  const [activeUsers, setActiveUsers] = useState<
    { image: string; presence_ref: string; user: string }[]
  >([]);
  const {
    data: groupGoal,
    isLoading: groupLoading,
    refetch,
  } = useGroupGoal(parseInt(goalId as string));

  const {
    isOpen: groupIsOpen,
    onOpen: groupOnOpen,
    onClose: groupOnClose,
  } = useDisclosure();

  supabase
    .channel("todos")
    .on(
      "postgres_changes",
      {
        event: "*",
        filter: `goal_id=eq.${goalId}`,
        schema: "public",
        table: "todos",
      },
      () => {
        refetch();
      }
    )
    .subscribe();

  useEffect(() => {
    const roomOne = supabase.channel(goalId as string);
    const userStatus = {
      image: user.profile_pic,
      user: user.id,
    };
    roomOne
      .on("presence", { event: "sync" }, () => {
        setActiveUsers([]);
        const newState = roomOne.presenceState();
        for (const state in newState) {
          const users = newState[state][0];
          setActiveUsers((prev) => [...prev, users]);
        }
      })
      .subscribe(async (status) => {
        if (status !== "SUBSCRIBED") {
          return;
        }
        await roomOne.track(userStatus);
      });

    return () => {
      roomOne.unsubscribe();
    };
  }, []);

  return (
    <>
      <CreateTaskGroupModal
        isOpen={groupIsOpen}
        onClose={groupOnClose}
        goal_id={parseInt(goalId as string)}
        friendsList={groupGoal?.data[0]?.goalsGroup}
      />

      {!user && <Navigate to="/login" />}
      {groupLoading && (
        <Box bg="white" p="4">
          <SkeletonText mt="4" noOfLines={30} spacing="4" skeletonHeight="5" />
        </Box>
      )}
      {!groupLoading &&
        groupGoal?.data.length !== 0 &&
        !groupGoal!.data[0].goalsGroup.find(
          (el: { users: { id: string } }) => el?.users?.id === user.id
        ) && <Navigate to="/" />}

      {!groupLoading && groupGoal?.data.length !== 0 && (
        <Box p="5">
          <Flex alignItems="center" justifyContent="space-between">
            <Heading color="brand.200">{groupGoal!.data[0].title}</Heading>
            <Box>
              <Button value="Add a task" onClick={groupOnOpen} />
            </Box>
          </Flex>
          <Box
            mt="12"
            bg="white"
            w="100%"
            h="75vh"
            borderRadius="10px"
            boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
            overflowY="hidden"
          >
            <Flex
              bg="brand.200"
              p="4"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box w="70%">
                <Progress
                  size="default"
                  percent={Math.floor(
                    (groupGoal!.todos!.filter((el) => el.isDone).length /
                      groupGoal!.todos!.length) *
                      100
                  )}
                  strokeColor="white"
                  status="active"
                  style={{
                    fontFamily: "Gabarito, sans serif",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                />
              </Box>

              <Box>
                <Text color="white" mb="2" fontWeight="bold">
                  Active users
                </Text>
                <Avatar.Group
                  maxCount={4}
                  maxStyle={{
                    backgroundColor: "whitesmoke",
                    color: "black",
                    cursor: "pointer",
                    fontFamily: "Gabarito, sans serif",
                  }}
                >
                  {activeUsers.map((el) => (
                    <Avatar
                      key={el.presence_ref}
                      src={el.image}
                      style={{ backgroundColor: "white" }}
                    />
                  ))}
                </Avatar.Group>
              </Box>
            </Flex>
            <Box p="8" overflowY="auto" h="100%">
              {groupGoal?.todos?.length === 0
                ? "No tasks yet"
                : groupGoal!.todos!.map((el) => <Task key={el.id} {...el} />)}
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};
