import "@stream-io/video-react-sdk/dist/css/styles.css";
import "ldrs/lineWobble";

import { Box, Center, Text } from "@chakra-ui/react";
import {
  Call,
  StreamCall,
  useStreamVideoClient,
} from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { RoomUI } from "./RoomUI";

export const Room = () => {
  const { id } = useParams();
  const [call, setCall] = useState<Call>();
  const client = useStreamVideoClient();
  useEffect(() => {
    const call = client?.call("default", id as string);
    async function joinCall() {
      await call?.join();
      setCall(call);
    }
    joinCall();
    return () => {
      async function leaveCall() {
        await call?.leave();
      }
      leaveCall();
    };
  }, [client, id]);
  return (
    <Box p={5}>
      {!call ? (
        <Center h="90vh">
          <Box textAlign="center">
            <l-line-wobble
              size="80"
              stroke="5"
              bg-opacity="0.1"
              speed="1.75"
              color="#2AACE2"
            ></l-line-wobble>
            <Text>Joining...</Text>
          </Box>
        </Center>
      ) : (
        <StreamCall call={call}>
          <RoomUI />
        </StreamCall>
      )}
    </Box>
  );
};
