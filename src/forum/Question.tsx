import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  SkeletonText,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { Avatar } from "antd";
import { format } from "date-fns";
import { FaFileAlt } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useOutletContext, useParams } from "react-router-dom";

import { Status } from "../_components/Button/Status";
import { Tables } from "../_models/database.types";
import { useQuestion } from "./_queries/useQuestion";
import { QuestionItem } from "./QuestionItem";
import { ReplyQuestionModal } from "./ReplyQuestionModal";

export const Question = () => {
  const { questionId } = useParams();
  const { data, isLoading } = useQuestion(questionId as string);
  const user: Tables<"users"> = useOutletContext();

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box p="7" bg="white" h="100vh" overflowY="auto">
      <ReplyQuestionModal
        isOpen={isOpen}
        onClose={onClose}
        forumId={questionId as string}
      />
      {isLoading ? (
        <>
          <Box bg="white" p="4">
            <SkeletonText
              mt="4"
              noOfLines={30}
              spacing="4"
              skeletonHeight="5"
            />
          </Box>
        </>
      ) : (
        <>
          <Link to="/">
            <IoMdArrowRoundBack
              size="30"
              style={{ marginBottom: "20px" }}
              cursor="pointer"
            />
          </Link>

          <Heading fontSize="24px" color="brand.200" textAlign="left">
            {data!.data.title}
          </Heading>

          <Flex justifyContent="space-between" alignItems="center" mt="3">
            <Flex alignItems="center" gap="2">
              <Avatar src={data!.data.users?.profile_pic} size="large" />
              <Box>
                <Text>
                  {data!.data.users?.firstname} {data!.data.users?.lastname}
                </Text>
                <Text fontSize="12px">
                  {format(data!.data.created_at, "Pp")}
                </Text>
              </Box>
            </Flex>
            <Status status={data!.data.status as boolean} />
          </Flex>

          <Text mt="3" mb="3" fontFamily="14px">
            {data!.data.description}
          </Text>

          {data?.files.length !== 0 && (
            <Flex alignItems="center" gap="3" mb={6} flexWrap="wrap">
              {data?.files.map((file) => (
                <Flex
                  bg="whitesmoke"
                  p="2"
                  alignItems="center"
                  gap="2"
                  borderRadius="10px"
                  boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
                  as={Link}
                  to={`https://mozbjvkzioecoqndvhjl.supabase.co/storage/v1/object/public/forum/${questionId}/${file.name}`}
                  target="_blank"
                >
                  <FaFileAlt />
                  <Text>{file.name}</Text>
                </Flex>
              ))}
            </Flex>
          )}

          {!user ? (
            <Tooltip label="Log yourself in to reply" placement="auto" hasArrow>
              <Box w="max-content">
                <Button
                  bg="brand.200"
                  color="white"
                  onClick={onOpen}
                  isDisabled={!user}
                  _hover={{ bg: "#008ECC" }}
                >
                  Reply
                </Button>
              </Box>
            </Tooltip>
          ) : (
            <Button
              bg="brand.200"
              color="white"
              onClick={onOpen}
              isDisabled={!user}
              _hover={{ bg: "#008ECC" }}
            >
              Reply
            </Button>
          )}

          <Divider mt="3" size="25px" />
          <Text mt="2">{data?.data.forum_messages.length} answers</Text>

          {data?.data.forum_messages
            .sort((a, b) => Number(b.isAnswer) - Number(a.isAnswer))
            .map((message) => (
              <QuestionItem
                key={message.id}
                data={message}
                isResolved={data.data.status as boolean}
              />
            ))}
        </>
      )}
    </Box>
  );
};
