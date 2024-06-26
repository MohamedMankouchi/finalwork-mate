import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { Avatar } from "antd";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { HiOutlineDownload } from "react-icons/hi";
import { TiEye } from "react-icons/ti";
import { Link } from "react-router-dom";

import { useDownloadFile } from "./_mutations/useDownloadFile";

type FileCardProps = {
  created_at: string;
  description: string;
  file: string;
  id: number;
  title: string;
  user_id: string | null;
  users: {
    banner_pic: string | null;
    created_at: string;
    education: string;
    email: string;
    firstname: string | null;
    id: string | null;
    lastname: string | null;
    profile_pic: string | null;
  } | null;
};
export const FileCard = ({ data }: { data: FileCardProps }) => {
  const { data: blob, isLoading } = useDownloadFile(
    data.file.slice(72),
    data.id
  );

  return (
    <Flex
      boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
      borderRadius="10px"
      bg="white"
      p="4"
      as={motion.div}
      animation="ease"
      layout
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      justifyContent="space-between"
      flexDirection="column"
    >
      <Box>
        <Text fontSize="18px" fontWeight="bold" color="brand.200">
          {data.title}
        </Text>

        <Box mt="5" overflowY="auto">
          <Heading mt={5} fontSize="16px" color="brand.200">
            Description:
          </Heading>
          <Text>{data.description}</Text>
          <Box mt={5} alignItems="center">
            <Heading fontSize="16px" color="brand.200">
              Author:
            </Heading>
            <Flex alignItems="center" gap={2} mt={2}>
              <Link to={`/user/${data.users?.id}`}>
                <Avatar src={data.users?.profile_pic} />
              </Link>
              <Text>
                {data.users?.firstname} {data.users?.lastname}
              </Text>
            </Flex>
          </Box>
          <Heading mt={5} fontSize="16px" color="brand.200">
            Shared on:
          </Heading>
          <Text>
            {format(data.created_at, "dd/MM/yyyy")} at{" "}
            {format(data.created_at, "H:mm")}{" "}
          </Text>
        </Box>
      </Box>
      <Flex gap={3} mt={5} justifyContent="start" w="100%">
        <Button
          as={Link}
          to={data.file}
          target="_blank"
          bg="brand.200"
          color="white"
          _hover={{ bg: "#008ECC" }}
        >
          <Flex gap={2} alignItems="center">
            <TiEye />
            <Text>View file</Text>
          </Flex>
        </Button>
        <Button
          bg="brand.200"
          _hover={{ bg: "#008ECC" }}
          color="white"
          as={Link}
          to={!isLoading ? URL.createObjectURL(blob!) : ""}
          download={data.file.slice(72)}
          target="_blank"
        >
          <Flex gap={2} alignItems="center">
            <HiOutlineDownload />
            <Text>Download file</Text>
          </Flex>
        </Button>
      </Flex>
    </Flex>
  );
};
