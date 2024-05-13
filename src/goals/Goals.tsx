import {
  Box,
  Flex,
  Grid,
  Heading,
  SkeletonText,
  useDisclosure,
} from "@chakra-ui/react";
import { Navigate, useOutletContext, useSearchParams } from "react-router-dom";

import { Button } from "../_components/Button/Button";
import { GoalsTab } from "../_components/Tabs/GoalsTab";
import { Tables } from "../_models/database.types";
import { useGroupGoals } from "./_queries/useGroupGoals";
import { usePrivateGoals } from "./_queries/usePrivateGoals";
import { CreateGoalModal } from "./CreateGoalModal";
import { GoalsCard } from "./GoalsCard";

export const Goals = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user: Tables<"users"> = useOutletContext();

  const [searchParam, setSearchParam] = useSearchParams({
    filter: "private",
  });
  const { data, isLoading } = usePrivateGoals(
    user?.id,
    searchParam.get("filter") === "private"
  );

  const { data: group, isLoading: groupLoading } = useGroupGoals(
    searchParam.get("filter") === "group",
    user?.id
  );

  return (
    <Box p="5">
      {!user ? (
        <Navigate to="/" />
      ) : (
        <>
          <CreateGoalModal
            isOpen={isOpen}
            onClose={onClose}
            user_id={user.id}
          />
          <Flex alignItems="center" justifyContent="space-between">
            <Heading color="brand.200">Goals</Heading>
            <Box>
              <Button value="Create a goal" onClick={onOpen} />
            </Box>
          </Flex>
          <Box mt="12" justifyContent="space-between">
            <GoalsTab
              setFilter={setSearchParam}
              value={searchParam.get("filter") ?? "private"}
            />
          </Box>
          <Grid
            mt="12"
            templateColumns="repeat(auto-fill, minmax(400px, 1fr));"
            gap="4"
          >
            {isLoading || groupLoading ? (
              <>
                <Box
                  p="4"
                  bg="white"
                  borderRadius="10px"
                  boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
                >
                  <SkeletonText mt="4" noOfLines={1} skeletonHeight="2" />
                  <SkeletonText mt="4" noOfLines={1} skeletonHeight="2" />
                  <SkeletonText mt="4" noOfLines={1} skeletonHeight="2" />
                </Box>
                <Box
                  p="4"
                  bg="white"
                  borderRadius="10px"
                  boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
                >
                  <SkeletonText mt="4" noOfLines={1} skeletonHeight="2" />
                  <SkeletonText mt="4" noOfLines={1} skeletonHeight="2" />
                  <SkeletonText mt="4" noOfLines={1} skeletonHeight="2" />
                </Box>{" "}
                <Box
                  p="4"
                  bg="white"
                  borderRadius="10px"
                  boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
                >
                  <SkeletonText mt="4" noOfLines={1} skeletonHeight="2" />
                  <SkeletonText mt="4" noOfLines={1} skeletonHeight="2" />
                  <SkeletonText mt="4" noOfLines={1} skeletonHeight="2" />
                </Box>{" "}
                <Box
                  p="4"
                  bg="white"
                  borderRadius="10px"
                  boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
                >
                  <SkeletonText mt="4" noOfLines={1} skeletonHeight="2" />
                  <SkeletonText mt="4" noOfLines={1} skeletonHeight="2" />
                  <SkeletonText mt="4" noOfLines={1} skeletonHeight="2" />
                </Box>{" "}
                <Box
                  p="4"
                  bg="white"
                  borderRadius="10px"
                  boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
                >
                  <SkeletonText mt="4" noOfLines={1} skeletonHeight="2" />
                  <SkeletonText mt="4" noOfLines={1} skeletonHeight="2" />
                  <SkeletonText mt="4" noOfLines={1} skeletonHeight="2" />
                </Box>{" "}
                <Box
                  p="4"
                  bg="white"
                  borderRadius="10px"
                  boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
                >
                  <SkeletonText mt="4" noOfLines={1} skeletonHeight="2" />
                  <SkeletonText mt="4" noOfLines={1} skeletonHeight="2" />
                  <SkeletonText mt="4" noOfLines={1} skeletonHeight="2" />
                </Box>{" "}
                <Box
                  p="4"
                  bg="white"
                  borderRadius="10px"
                  boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
                >
                  <SkeletonText mt="4" noOfLines={1} skeletonHeight="2" />
                  <SkeletonText mt="4" noOfLines={1} skeletonHeight="2" />
                  <SkeletonText mt="4" noOfLines={1} skeletonHeight="2" />
                </Box>{" "}
                <Box
                  p="4"
                  bg="white"
                  borderRadius="10px"
                  boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
                >
                  <SkeletonText mt="4" noOfLines={1} skeletonHeight="2" />
                  <SkeletonText mt="4" noOfLines={1} skeletonHeight="2" />
                  <SkeletonText mt="4" noOfLines={1} skeletonHeight="2" />
                </Box>{" "}
                <Box
                  p="4"
                  bg="white"
                  borderRadius="10px"
                  boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
                >
                  <SkeletonText mt="4" noOfLines={1} skeletonHeight="2" />
                  <SkeletonText mt="4" noOfLines={1} skeletonHeight="2" />
                  <SkeletonText mt="4" noOfLines={1} skeletonHeight="2" />
                </Box>
              </>
            ) : (
              <>
                {searchParam.get("filter") === "private"
                  ? data?.data?.map((goal) => (
                      <GoalsCard
                        key={goal.id}
                        data={goal}
                        profile_pic={user.profile_pic!}
                        percent={Math.floor(
                          (data.todos!.filter(
                            (el) => el.goal_id === goal.id && el.isDone
                          ).length /
                            data.todos!.filter((el) => el.goal_id === goal.id)
                              .length) *
                            100
                        )}
                      />
                    ))
                  : group?.groups?.map((goal) => (
                      <GoalsCard
                        key={goal.id}
                        data={goal}
                        profile_pic={user.profile_pic!}
                        percent={Math.floor(
                          (group.todos!.filter(
                            (el) => el.goal_id === goal.id && el.isDone
                          ).length /
                            group.todos!.filter((el) => el.goal_id === goal.id)
                              .length) *
                            100
                        )}
                      />
                    ))}
              </>
            )}
          </Grid>
        </>
      )}
    </Box>
  );
};
