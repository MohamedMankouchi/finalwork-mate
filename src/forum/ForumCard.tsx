import { Box, Flex, Text } from "@chakra-ui/react";
import { Avatar } from "antd";
import { format } from "date-fns";
import { Link } from "react-router-dom";

import { getQuestionsProps } from "./_queries/useQuestions";

export const ForumCard = ({ data }: { data: getQuestionsProps }) => {
  return (
    <Box
      borderRadius="10px"
      bg="white"
      boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
      as={Link}
      to={`/forum/${data.id}`}
    >
      <Box p={4}>
        <Flex alignItems="center" justifyContent="space-between">
          <Flex alignItems="center" gap="2">
            <Avatar src={data!.users!.profile_pic} size="large" />
            <Text fontSize="16px">
              {data!.users!.firstname} {data!.users!.lastname}
            </Text>
          </Flex>
          <Text fontSize="12px">{format(data.created_at, "Pp")}</Text>
        </Flex>
        <Text fontSize="14px" mt="4">
          {data.title}
        </Text>
      </Box>

      <Flex
        h="30px"
        bg={!data.status ? "brand.300" : "#5ca14b"}
        borderBottomLeftRadius="10px"
        borderBottomRightRadius="10px"
        textAlign="center"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Text color={!data.status ? "brand.400" : "#1a4324"}>
          {!data.status ? "Unresolved" : "Resolved"}
        </Text>
      </Flex>
      {/* <Flex alignItems="center" justifyContent="space-between" mt="4">
        <Flex gap={2}>
          <Flex alignItems="center" gap={1.5}>
            <BiLike color="#2AACE2" />
            <Text fontSize="12px">25</Text>
          </Flex>
          <Flex alignItems="center" gap={1.5}>
            <LuEye color="#2AACE2" />
            <Text fontSize="12px">25</Text>
          </Flex>
        </Flex>
        <Box>
          <Status status={data.status!} />
        </Box>
      </Flex> */}
    </Box>
  );
};
