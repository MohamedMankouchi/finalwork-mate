import {
  Box,
  Center,
  Flex,
  Grid,
  Heading,
  SkeletonText,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import SkeletonImage from "antd/es/skeleton/Image";
import { motion } from "framer-motion";
import { TbError404 } from "react-icons/tb";
import { Navigate, useOutletContext, useSearchParams } from "react-router-dom";

import { Button } from "../_components/Button/Button";
import { Search } from "../_components/Input/Search";
import { Tables } from "../_models/database.types";
import { supabase } from "../database/supabase";
import { useGetCalls } from "./_queries/useGetCalls";
import { ClassroomCard } from "./ClassroomCard";
import { CreateClassroomModal } from "./CreateClassroomModal";
export async function getToken() {
  const { data } = await supabase.auth.getUser();
  const userId = data.user?.id;

  if (!userId) {
    return true;
  }
  const res = await fetch("https://finalwork-mate-token.onrender.com/token", {
    body: JSON.stringify({
      id: userId,
      token: sessionStorage.getItem("token"),
    }),
    headers: {
      "Content-type": "application/json",
    },
    method: "POST",
  });
  const token = await res.json();
  sessionStorage.setItem("token", token.token);
  return token.token;
}
export const Classrooms = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    search: "",
  });
  const client = useStreamVideoClient();
  const { data, isLoading } = useGetCalls(client!);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user: Tables<"users"> = useOutletContext();
  return (
    <Box p="5">
      {!user ? (
        <Navigate to="/" />
      ) : (
        <>
          <CreateClassroomModal
            onClose={onClose}
            isOpen={isOpen}
            streamClient={client!}
          />
          <Flex alignItems="center" justifyContent="space-between">
            <Flex alignItems="end" gap={1}>
              <Heading color="black">Classrooms</Heading>
              <Box
                h="10px"
                borderRadius="50px"
                w="10px"
                bg="brand.200"
                mb={2.5}
              ></Box>
            </Flex>{" "}
            <Box>
              <Button value="Create room" onClick={onOpen} />
            </Box>
          </Flex>
          <Flex mt="12" justifyContent="center">
            <Box w="650px">
              <Search
                setSearchParam={setSearchParams}
                searchFilter={searchParams.get("search") ?? ""}
              />
            </Box>
          </Flex>
          <Box>
            {isLoading ? (
              <Grid
                mt="12"
                templateColumns="repeat(auto-fill, minmax(400px, 1fr));"
                gap="4"
                as={motion.div}
                layout
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
              >
                <Box
                  borderRadius="10px"
                  bg="white"
                  p="4"
                  boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
                >
                  <SkeletonImage
                    active
                    style={{ borderRadius: "15px", width: "100% !important" }}
                  />
                  <SkeletonText
                    mt="4"
                    noOfLines={4}
                    spacing="4"
                    skeletonHeight="2"
                  />
                </Box>
                <Box
                  borderRadius="10px"
                  bg="white"
                  p="4"
                  boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
                >
                  <SkeletonImage
                    active
                    style={{ borderRadius: "15px", width: "100% !important" }}
                  />
                  <SkeletonText
                    mt="4"
                    noOfLines={4}
                    spacing="4"
                    skeletonHeight="2"
                  />
                </Box>{" "}
                <Box
                  borderRadius="10px"
                  bg="white"
                  p="4"
                  boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
                >
                  <SkeletonImage
                    active
                    style={{ borderRadius: "15px", width: "100% !important" }}
                  />
                  <SkeletonText
                    mt="4"
                    noOfLines={4}
                    spacing="4"
                    skeletonHeight="2"
                  />
                </Box>{" "}
                <Box
                  borderRadius="10px"
                  bg="white"
                  p="4"
                  boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
                >
                  <SkeletonImage
                    active
                    style={{ borderRadius: "15px", width: "100% !important" }}
                  />
                  <SkeletonText
                    mt="4"
                    noOfLines={4}
                    spacing="4"
                    skeletonHeight="2"
                  />
                </Box>{" "}
                <Box
                  borderRadius="10px"
                  bg="white"
                  p="4"
                  boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
                >
                  <SkeletonImage
                    active
                    style={{ borderRadius: "15px", width: "100% !important" }}
                  />
                  <SkeletonText
                    mt="4"
                    noOfLines={4}
                    spacing="4"
                    skeletonHeight="2"
                  />
                </Box>{" "}
                <Box
                  borderRadius="10px"
                  bg="white"
                  p="4"
                  boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
                >
                  <SkeletonImage
                    active
                    style={{ borderRadius: "15px", width: "100% !important" }}
                  />
                  <SkeletonText
                    mt="4"
                    noOfLines={4}
                    spacing="4"
                    skeletonHeight="2"
                  />
                </Box>{" "}
                <Box
                  borderRadius="10px"
                  bg="white"
                  p="4"
                  boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
                >
                  <SkeletonImage
                    active
                    style={{ borderRadius: "15px", width: "100% !important" }}
                  />
                  <SkeletonText
                    mt="4"
                    noOfLines={4}
                    spacing="4"
                    skeletonHeight="2"
                  />
                </Box>{" "}
                <Box
                  borderRadius="10px"
                  bg="white"
                  p="4"
                  boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
                >
                  <SkeletonImage
                    active
                    style={{ borderRadius: "15px", width: "100% !important" }}
                  />
                  <SkeletonText
                    mt="4"
                    noOfLines={4}
                    spacing="4"
                    skeletonHeight="2"
                  />
                </Box>{" "}
                <Box
                  borderRadius="10px"
                  bg="white"
                  p="4"
                  boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
                >
                  <SkeletonImage
                    active
                    style={{ borderRadius: "15px", width: "100% !important" }}
                  />
                  <SkeletonText
                    mt="4"
                    noOfLines={4}
                    spacing="4"
                    skeletonHeight="2"
                  />
                </Box>
              </Grid>
            ) : (!isLoading && data?.length === 0) ||
              data?.filter((el) =>
                el.call.custom.title
                  .toLowerCase()
                  .includes(searchParams.get("search")?.toLowerCase())
              ).length === 0 ? (
              <Center
                flexDirection="column"
                h="70vh"
                as={motion.div}
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
              >
                <TbError404 size={80} />
                <Text>We didn't find a match ! Try something else</Text>
              </Center>
            ) : (
              <Grid
                mt="12"
                templateColumns="repeat(auto-fill, minmax(400px, 1fr));"
                gap="4"
                as={motion.div}
                layout
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
              >
                {data
                  ?.filter((el) =>
                    el.call.custom.title
                      .toLowerCase()
                      .includes(searchParams.get("search")?.toLowerCase())
                  )
                  ?.map((el) => (
                    <ClassroomCard key={el.call.cid} data={el} />
                  ))}
              </Grid>
            )}
          </Box>
        </>
      )}
    </Box>
  );
};
