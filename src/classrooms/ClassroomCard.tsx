import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { GetCallResponse } from "@stream-io/video-react-sdk";
import { Avatar } from "antd";
import { motion } from "framer-motion";
import { IoMdLock } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

export const ClassroomCard = ({ data }: { data: GetCallResponse }) => {
  const navigate = useNavigate();
  return (
    <Card
      borderRadius="10px"
      boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
      as={motion.div}
      layout
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
    >
      <CardBody>
        <Box h="100px" borderRadius="15px" position="relative">
          <Image
            src={data.call.custom.bannerImg}
            alt="Green double couch with wooden legs"
            objectFit="cover"
            h="100%"
            w="100%"
            borderRadius="15px"
          />
          <Heading
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%,-50%)"
            color="white"
            fontSize="16px"
          >
            {data.call.custom.title}
          </Heading>
        </Box>
        <Box mt="4" h={["min-content", "50px"]} overflowY="auto">
          <Text fontSize="14px">{data?.call.custom.description}</Text>
        </Box>

        <Flex alignItems="end" justifyContent="space-between">
          <Box>
            <Text mb="2" mt="2" fontSize="12px" color="brand.200">
              Created by:
            </Text>
            <Flex alignItems="center" gap="2">
              <Link to={`/user/${data.call.custom.user.id}`}>
                <Avatar
                  src={data.call.custom.user.profile_pic}
                  size="default"
                />
              </Link>
              <Text fontSize="14px" fontWeight={600}>
                {data.call.custom.user.firstname}{" "}
                {data.call.custom.user.lastname}{" "}
              </Text>
            </Flex>
          </Box>
          <Box>
            <Button
              bg="brand.200"
              h="30px"
              color="white"
              fontSize="12px"
              _hover={{ bg: "#008ECC" }}
              boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
              onClick={() => navigate(`/classrooms/${data.call.id}`)}
              leftIcon={data.call.custom.password && <IoMdLock />}
            >
              Join
            </Button>
          </Box>
        </Flex>
      </CardBody>
    </Card>
  );
};
