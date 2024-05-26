import { Box, Divider, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { Tooltip } from "@chakra-ui/react";
import { Avatar } from "antd";
import { format } from "date-fns";
import { useState } from "react";
import { FaFileAlt } from "react-icons/fa";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { Link, useOutletContext, useParams } from "react-router-dom";

import { Tables } from "../_models/database.types";
import { SolutionModal } from "./SolutionModal";
type QuestionItemProps = {
  created_at: string;
  file: string | null;
  id: number;
  isAnswer: boolean | null;
  message: string;
  users: {
    banner_pic: string | null;
    created_at: string;
    education: string;
    email: string;
    firstname: string;
    id: string;
    languages: string;
    lastname: string;
    profile_pic: string | null;
  } | null;
};
export const QuestionItem = ({
  data,
  isResolved,
}: {
  data: QuestionItemProps;
  isResolved: boolean;
}) => {
  const { questionId } = useParams();
  const [id, setId] = useState(0);
  const user: Tables<"users"> = useOutletContext();

  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <Box mt="2">
      <SolutionModal onClose={onClose} isOpen={isOpen} id={id} />
      <Flex justifyContent="space-between" alignItems="center">
        <Flex alignItems="center" gap="2">
          <Avatar src={data.users?.profile_pic} />
          <Box>
            <Text>
              {data.users?.firstname} {data.users?.lastname}
            </Text>
            <Text fontSize="12px">
              {format(data.created_at, "dd/MM/yyy")},{" "}
              {format(data.created_at, "H:mm")}
            </Text>
          </Box>
        </Flex>

        {data.isAnswer && (
          <Box
            bg="#5CA14B"
            p={2}
            color="white"
            fontWeight="semi-bold"
            fontSize="14px"
            borderRadius="50px"
          >
            Correct answer
          </Box>
        )}
        {user?.id === data.users?.id && !isResolved && (
          <Tooltip
            hasArrow
            placement="top-start"
            label="Mark as correct answer"
          >
            <Box
              cursor="pointer"
              onClick={() => {
                setId(data.id);
                onOpen();
              }}
            >
              <IoIosCheckmarkCircle color="green" size={32} />
            </Box>
          </Tooltip>
        )}
      </Flex>
      <Text mt="4">{data.message}</Text>
      {data.file && (
        <Flex
          bg="whitesmoke"
          p="2"
          alignItems="center"
          gap="2"
          borderRadius="10px"
          boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
          as={Link}
          to={`https://mozbjvkzioecoqndvhjl.supabase.co/storage/v1/object/public/forum/${questionId}/files/${data.file}`}
          target="_blank"
          w="max-content"
          mt={2}
        >
          <FaFileAlt />
          <Text>{data.file}</Text>
        </Flex>
      )}
      <Divider mt="4" />
    </Box>
  );
};
