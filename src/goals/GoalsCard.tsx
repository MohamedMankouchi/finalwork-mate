import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { Avatar, Progress } from "antd";
import { format } from "date-fns";
import { LuCalendar, LuTarget } from "react-icons/lu";
import { Link } from "react-router-dom";

import { Tables } from "../_models/database.types";

export const GoalsCard = ({
  data,
  profile_pic,
  percent,
}: {
  data: {
    created_at: string;
    created_by: string;
    end: string;
    goalsGroup?: {
      users: Tables<"users"> | null;
    }[];
    id: number;
    isGroup: boolean | null;
    last_updated_at: string | null;
    start: string;
    title: string;
  };
  percent: number;
  profile_pic?: string;
}) => {
  return (
    <Box
      p="4"
      bg="white"
      borderRadius="10px"
      boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
      as={Link}
      to={
        data.isGroup ? `/goals/group/${data.id}` : `/goals/private/${data.id}`
      }
    >
      <Heading fontSize="16px" mb={3}>
        {data.title}
      </Heading>

      <Flex alignItems="center" gap="3">
        <Flex alignItems="center" gap="2">
          <LuCalendar color="#2aace2" />
          <Text fontSize="12px">
            <span style={{ color: "#2aace2" }}>Start date: {data.start} </span>
          </Text>
        </Flex>

        <Flex alignItems="center" gap="2">
          <LuTarget color="#2aace2" />
          <Text fontSize="12px">
            <span style={{ color: "#2aace2" }}>End date: {data.end} </span>
          </Text>
        </Flex>
      </Flex>
      <Progress
        percent={percent}
        status="active"
        style={{ fontFamily: "Gabarito, sans serif" }}
      />
      <Flex alignItems="center" justifyContent="space-between" mt="3">
        <Text fontSize="12px">
          Last update on : {format(data.last_updated_at!, "PPPpp")}
        </Text>

        {data.isGroup ? (
          <Avatar.Group
            maxPopoverTrigger="hover"
            maxCount={4}
            maxStyle={{
              backgroundColor: "#fde3cf",
              color: "#f56a00",
              fontFamily: "Gabarito, sans serif",
            }}
          >
            {data!.goalsGroup!.map((el) => (
              <Avatar key={el!.users!.id} src={el!.users!.profile_pic} />
            ))}
          </Avatar.Group>
        ) : (
          <Avatar src={profile_pic} />
        )}
      </Flex>
    </Box>
  );
};
