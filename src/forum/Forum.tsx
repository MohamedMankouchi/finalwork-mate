import {
  Box,
  Center,
  Flex,
  Grid,
  Heading,
  SkeletonCircle,
  SkeletonText,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { TbMoodSadSquint } from "react-icons/tb";
import { useOutletContext, useSearchParams } from "react-router-dom";

import { Button } from "../_components/Button/Button";
import { Search } from "../_components/Input/Search";
import { Tabs } from "../_components/Tabs/Tabs";
import { Tables } from "../_models/database.types";
import { useQuestions } from "./_queries/useQuestions";
import { CreateQuestionModal } from "./CreateQuestionModal";
import { ForumCard } from "./ForumCard";

export const Forum = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user: Tables<"users"> = useOutletContext();
  const { data, isLoading } = useQuestions();
  const [searchParams, setSearchParams] = useSearchParams({
    filter: "all",
    search: "",
  });

  const searchFilter = searchParams.get("search") ?? "";

  return (
    <Box p="5">
      <CreateQuestionModal onClose={onClose} isOpen={isOpen} />
      <Flex alignItems="center" justifyContent="space-between">
        <Heading color="brand.200">Forum</Heading>
        {!user ? (
          <Tooltip
            label="Log yourself in to create a question"
            placement="auto"
            hasArrow
          >
            <Box>
              <Button value="Ask a question" onClick={onOpen} isDisabled />
            </Box>
          </Tooltip>
        ) : (
          <Box>
            <Button
              onClick={onOpen}
              value="Ask a question"
              isDisabled={!user}
            />
          </Box>
        )}
      </Flex>
      <Flex mt="12" justifyContent="space-between">
        <Tabs filter={searchParams.get("filter") as string} />
        <Box w="350px">
          <Search
            setSearchParam={setSearchParams}
            searchParam={searchParams.get("filter") as string}
            searchFilter={searchFilter}
          />
        </Box>
      </Flex>
      {isLoading ? (
        <Grid
          mt="12"
          templateColumns="repeat(auto-fill, minmax(400px, 1fr));"
          gap="4"
        >
          <Box
            borderRadius="10px"
            bg="white"
            p="4"
            boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
          >
            <SkeletonCircle size="10" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
          </Box>
          <Box
            borderRadius="10px"
            bg="white"
            p="4"
            boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
          >
            <SkeletonCircle size="10" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
          </Box>{" "}
          <Box
            borderRadius="10px"
            bg="white"
            p="4"
            boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
          >
            <SkeletonCircle size="10" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
          </Box>{" "}
          <Box
            borderRadius="10px"
            bg="white"
            p="4"
            boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
          >
            <SkeletonCircle size="10" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
          </Box>{" "}
          <Box
            borderRadius="10px"
            bg="white"
            p="4"
            boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
          >
            <SkeletonCircle size="10" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
          </Box>{" "}
          <Box
            borderRadius="10px"
            bg="white"
            p="4"
            boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
          >
            <SkeletonCircle size="10" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
          </Box>{" "}
          <Box
            borderRadius="10px"
            bg="white"
            p="4"
            boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
          >
            <SkeletonCircle size="10" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
          </Box>{" "}
          <Box
            borderRadius="10px"
            bg="white"
            p="4"
            boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
          >
            <SkeletonCircle size="10" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
          </Box>{" "}
          <Box
            borderRadius="10px"
            bg="white"
            p="4"
            boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
          >
            <SkeletonCircle size="10" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
          </Box>
        </Grid>
      ) : !isLoading && data?.length === 0 ? (
        <Center textAlign="center" h="50vh" gap="5">
          <Box textAlign="center">
            <Center>
              <TbMoodSadSquint size={50} />
            </Center>
            <Heading>Looks like nothing was found</Heading>
            <Text>Don't wait and be the first to ask your question !</Text>
          </Box>
        </Center>
      ) : (
        <Grid
          mt="12"
          templateColumns="repeat(auto-fill, minmax(400px, 1fr));"
          gap="4"
        >
          {searchParams.get("filter") === "all" &&
            data!
              .filter(
                (el) =>
                  el
                    .users!.firstname.toLowerCase()
                    .includes(searchFilter.toLowerCase()) ||
                  el
                    .users!.lastname.toLowerCase()
                    .includes(searchFilter.toLowerCase()) ||
                  el.title.toLowerCase().includes(searchFilter.toLowerCase())
              )!
              .map((card) => <ForumCard key={card.id} data={card} />)}
          {searchParams.get("filter") === "resolved" &&
            data!
              .filter(
                (el) =>
                  el.status &&
                  (el
                    .users!.firstname.toLowerCase()
                    .includes(searchFilter.toLowerCase()) ||
                    el
                      .users!.lastname.toLowerCase()
                      .includes(searchFilter.toLowerCase()) ||
                    el.title.toLowerCase().includes(searchFilter.toLowerCase()))
              )!
              .map((card) => <ForumCard key={card.id} data={card} />)}
          {searchParams.get("filter") === "unresolved" &&
            data!
              .filter(
                (el) =>
                  !el.status &&
                  (el
                    .users!.firstname.toLowerCase()
                    .includes(searchFilter.toLowerCase()) ||
                    el
                      .users!.lastname.toLowerCase()
                      .includes(searchFilter.toLowerCase()) ||
                    el.title.toLowerCase().includes(searchFilter.toLowerCase()))
              )!
              .map((card) => <ForumCard key={card.id} data={card} />)}
        </Grid>
      )}
    </Box>
  );
};
