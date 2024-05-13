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
    <Box
      height="50px"
      overflow="hidden"
      boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
      borderRadius="10px"
      bg="white"
      p="4"
      as={motion.div}
      whileHover={{ height: "350px" }}
      animation="ease"
      transitionDuration={"0.1s"}
    >
      <Box h="100%" as={motion.div} whileHover={{ overflow: "auto" }}>
        <Text fontSize="18px" fontWeight="bold" color="brand.200">
          {data.title}
        </Text>

        <Box mt="5">
          <Box mt={5} alignItems="center">
            <Heading fontSize="16px" color="brand.200">
              Author:
            </Heading>
            <Flex alignItems="center" gap={2} mt={2}>
              <Avatar src={data.users?.profile_pic} />
              <Text>
                {data.users?.firstname} {data.users?.lastname}
              </Text>
            </Flex>
          </Box>
          <Heading mt={5} fontSize="16px" color="brand.200">
            Description:
          </Heading>
          <Text>{data.description}</Text>
          <Heading mt={5} fontSize="16px" color="brand.200">
            Shared on:
          </Heading>
          <Text>{format(data.created_at, "Pp")}</Text>

          <Flex mt={5} gap={3} height="100%" alignItems="end">
            <Button
              as={Link}
              to={data.file}
              target="_blank"
              bg="brand.200"
              color="white"
            >
              <Flex gap={2} alignItems="center">
                <TiEye />
                <Text>View file</Text>
              </Flex>
            </Button>
            <Button
              bg="brand.200"
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
        </Box>
      </Box>
    </Box>
  );
};
