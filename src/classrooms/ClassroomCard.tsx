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
import { Call, GetCallResponse } from "@stream-io/video-react-sdk";
import { Avatar } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ClassroomCard = ({ data }: { data: Call }) => {
  const [call, setCall] = useState<GetCallResponse>();
  const navigate = useNavigate();
  useEffect(() => {
    async function getData() {
      const callDetails = await data.get();
      setCall(callDetails);
    }
    getData();
  }, [data]);

  return (
    <Card borderRadius="10px" boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px">
      <CardBody>
        <Box h="100px" borderRadius="15px" position="relative">
          <Image
            src={call?.call.custom.bannerImg}
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
            {call?.call.custom.title}
          </Heading>
        </Box>
        <Box mt="4" h={["min-content", "50px"]} overflowY="auto">
          <Text fontSize="14px">{call?.call.custom.description}</Text>
        </Box>

        <Flex alignItems="end" justifyContent="space-between">
          <Box>
            <Text mb="2" mt="2" fontSize="12px" color="brand.200">
              Created by:
            </Text>
            <Flex alignItems="center" gap="2">
              <Avatar src={call?.call.custom.user.profile_pic} size="default" />
              <Text fontSize="14px" fontWeight={600}>
                {call?.call.custom.user.firstname}{" "}
                {call?.call.custom.user.lastname}{" "}
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
              onClick={() => navigate(`/classrooms/${call?.call.id}`)}
            >
              Join
            </Button>
          </Box>
        </Flex>
      </CardBody>
    </Card>
  );
};
