import "ldrs/lineWobble";

import { Box, Center, Flex } from "@chakra-ui/react";
import {
  StreamVideo,
  StreamVideoClient,
  User,
} from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import { Outlet, useLoaderData } from "react-router-dom";

import { Sidebar } from "./_components/Sidebar/Sidebar";
import { useCurrentUser } from "./auth/_queries/useCurrentUser";

function App() {
  const [client, setClient] = useState<StreamVideoClient>();
  const { data, isLoading } = useCurrentUser();
  useEffect(() => {
    async function getLoader() {
      const { wobble } = await import("ldrs");
      wobble.register();
    }
    getLoader();
  }, []);
  const apiKey = "y5r6e5ssqhw5";
  const token = useLoaderData();

  useEffect(() => {
    const streamUser: User = {
      id: data?.id,
      image: `${data?.profile_pic}`,
      name: `${data?.firstname} ${data?.lastname}`,
    };
    const myClient = new StreamVideoClient({
      apiKey,
      token: token as string,
      user: streamUser,
    });

    setClient(myClient);
    return () => {
      myClient.disconnectUser();
      setClient(undefined);
    };
  }, [isLoading]);
  return (
    <>
      {isLoading ? (
        <Center h="100vh">
          <l-line-wobble
            size="80"
            stroke="5"
            bg-opacity="0.1"
            speed="1.75"
            color="#2AACE2"
          ></l-line-wobble>
        </Center>
      ) : (
        <Flex h="100vh">
          <Sidebar user={data!} />
          <Box bg="brand.100" w="100vw" overflowY="auto">
            {client ? (
              <StreamVideo client={client}>
                <Outlet context={data} />
              </StreamVideo>
            ) : (
              <Outlet context={data} />
            )}
          </Box>
        </Flex>
      )}
    </>
  );
}

export default App;
