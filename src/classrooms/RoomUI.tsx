import { Box, Button, Center, Heading, Text } from "@chakra-ui/react";
import {
  CallControls,
  PaginatedGridLayout,
  StreamTheme,
  useCall,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { Link, useNavigate, useOutletContext } from "react-router-dom";

import { Tables } from "../_models/database.types";

export const RoomUI = () => {
  const navigate = useNavigate();
  const call = useCall();
  const user: Tables<"users"> = useOutletContext();
  const { useCallCreatedBy, useCallEndedAt } = useCallStateHooks();
  const createdBy = useCallCreatedBy()?.id;
  const callHasEnded = !!useCallEndedAt();

  if (callHasEnded) {
    return (
      <Center h="90vh" overflowY="hidden">
        <Box p={4}>
          <Heading color="brand.200" fontSize="30px">
            This call has ended !
          </Heading>
          <Center my={5}>
            <Button
              bg="brand.200"
              color="white"
              textAlign="center"
              as={Link}
              to="/classrooms"
              _hover={{ bg: "#008ECC" }}
            >
              Go back
            </Button>
          </Center>
        </Box>
      </Center>
    );
  }
  return (
    <StreamTheme
      cellSpacing="50px"
      style={{
        color: "white",
        fontFamily: "Gabarito, sans serif",
        fontSize: "14px",
      }}
    >
      <PaginatedGridLayout />
      <CallControls
        onLeave={async () => {
          navigate("/classrooms");
        }}
      />

      {createdBy === user.id && (
        <Text
          cursor="pointer"
          textAlign="center"
          fontSize="14px"
          textDecoration="underline"
          color="red"
          onClick={call?.endCall}
        >
          End call for everyone
        </Text>
      )}
    </StreamTheme>
  );
};
