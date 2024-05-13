import {
  Box,
  Flex,
  Heading,
  SkeletonText,
  useDisclosure,
} from "@chakra-ui/react";
import { Progress } from "antd";
import { Navigate, useOutletContext, useParams } from "react-router-dom";

import { Button } from "../_components/Button/Button";
import { Tables } from "../_models/database.types";
import { usePrivateGoal } from "./_queries/usePrivateGoal";
import { CreateTaskModal } from "./CreateTaskModal";
import { Task } from "./Task";

export const Goal = () => {
  const { goalId } = useParams();
  const user: Tables<"users"> = useOutletContext();
  const { data, isLoading } = usePrivateGoal(
    user?.id,
    parseInt(goalId as string)
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <CreateTaskModal
        isOpen={isOpen}
        onClose={onClose}
        goal_id={parseInt(goalId as string)}
      />
      {!user && <Navigate to="/login" />}

      {isLoading && (
        <Box bg="white" p="4">
          <SkeletonText mt="4" noOfLines={30} spacing="4" skeletonHeight="5" />
        </Box>
      )}
      {!isLoading && data && data.data.created_by !== user.id && (
        <Navigate to="/" />
      )}

      {!isLoading && data && (
        <Box p="5">
          <Flex alignItems="center" justifyContent="space-between">
            <Heading color="brand.200">{data.data.title}</Heading>
            <Box>
              <Button value="Add a task" onClick={onOpen} />
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
              <Box w="100%">
                <Progress
                  percent={Math.floor(
                    (data.todos!.filter((el) => el.isDone).length /
                      data.todos!.length) *
                      100
                  )}
                  status="active"
                  strokeColor="white"
                  style={{
                    fontFamily: "Gabarito, sans serif",
                    fontSize: "16px",
                  }}
                />
              </Box>
            </Flex>
            <Box p="8" overflowY="auto" h="100%">
              {data?.todos?.length === 0
                ? "No tasks yet"
                : data!.todos!.map((el) => <Task key={el.id} {...el} />)}
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};
