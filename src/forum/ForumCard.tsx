import { Box, Flex, Text } from "@chakra-ui/react";
import { Avatar } from "antd";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { getQuestionsProps } from "./_queries/useQuestions";

export const ForumCard = ({ data }: { data: getQuestionsProps }) => {
  return (
    <Box
      position="relative"
      borderRadius="10px"
      bg="white"
      boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
      as={motion.div}
      layout
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
    >
      <Link to={`/forum/${data.id}`}>
        <Box p={4}>
          <Flex alignItems="center" justifyContent="space-between">
            <Flex alignItems="center" gap="2">
              <Avatar src={data!.users!.profile_pic} size="large" />
              <Text fontSize="16px">
                {data!.users!.firstname} {data!.users!.lastname}
              </Text>
            </Flex>
            <Text fontSize="12px">
              {format(data.created_at, "dd/MM/yyy")},{" "}
              {format(data.created_at, "H:mm")}
            </Text>
          </Flex>
          <Text fontSize="14px" mt="4">
            {data.title}
          </Text>
        </Box>
      </Link>

      <Box
        bg={!data.status ? "brand.300" : "#5ca14b"}
        position="absolute"
        bottom="10px"
        right="10px"
        fontSize="xs"
        borderRadius="50px"
        p={2}
      >
        {!data.status ? <Text>Unresolved</Text> : <Text>Resolved</Text>}
      </Box>
    </Box>
  );
};
