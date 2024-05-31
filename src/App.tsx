import { Box, Center, Flex } from "@chakra-ui/react";
import {
  StreamVideo,
  StreamVideoClient,
  User,
} from "@stream-io/video-react-sdk";
import { notification } from "antd";
import { createContext, useEffect, useState } from "react";
import {
  Outlet,
  useLoaderData,
  useLocation,
  useParams,
} from "react-router-dom";
import { RotateSpinner } from "react-spinners-kit";

import { Sidebar } from "./_components/Sidebar/Sidebar";
import { useCurrentUser } from "./auth/_queries/useCurrentUser";
import { supabase } from "./database/supabase";
import { ActiveUsers } from "./goals/GroupGoal";
import { useNotifications } from "./notifications/_queries/useNotifications";

// eslint-disable-next-line react-refresh/only-export-components
export const userProvider = createContext<
  { image: string; presence_ref: string; user: string }[]
>([]);
function App() {
  const [client, setClient] = useState<StreamVideoClient>();
  const { data, isLoading } = useCurrentUser();
  const [activeUsers, setActiveUsers] = useState<
    { image: string; presence_ref: string; user: string }[]
  >([]);
  const location = useLocation();
  const { id } = useParams();
  const [api, contextHolder] = notification.useNotification();
  const {
    data: notifications,
    isLoading: notifLoading,
    refetch,
  } = useNotifications(data?.id as string);
  useEffect(() => {
    async function getLoader() {
      const { wobble } = await import("ldrs");
      wobble.register();
    }
    getLoader();
  }, []);
  const apiKey = "y5r6e5ssqhw5";
  const token = useLoaderData();
  supabase
    .channel(`notifications${data?.id}`)
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        filter: `receiver=eq.${data?.id}`,
        schema: "public",
        table: "notifications",
      },
      (payload) => {
        refetch();
        if (payload.new.type === "request") {
          api.info({
            description: "You received a new friend request !",
            duration: 3,
            message: "New friend request",
          });
        }

        if (payload.new.type === "message") {
          if (
            location.pathname === "/messages" ||
            location.pathname === `/messages/${id}`
          )
            return;
          api.info({
            description: "You received a new message !",
            duration: 3,
            message: "New message",
          });
        }
      }
    )
    .subscribe();
  useEffect(() => {
    if (!data) {
      return setClient(undefined);
    }

    const room = supabase.channel("users");
    const userStatus = {
      image: data.profile_pic,
      user: data.id,
    };
    room
      .on("presence", { event: "sync" }, () => {
        setActiveUsers([]);
        const newState = room.presenceState<ActiveUsers>();
        for (const state in newState) {
          const users = newState[state][0];
          setActiveUsers((prev) => [...prev, users]);
        }
      })
      .subscribe(async (status) => {
        if (status !== "SUBSCRIBED") {
          return;
        }
        await room.track(userStatus);
      });

    const streamUser: User = {
      id: data.id,
      image: `${data.profile_pic}`,
      name: `${data.firstname} ${data.lastname}`,
    };
    const myClient = new StreamVideoClient({
      apiKey,
      token: token as string,
      user: streamUser,
    });

    setClient(myClient);
    return () => {
      room.unsubscribe();
      myClient.disconnectUser();
      setClient(undefined);
    };
  }, [
    data,
    data?.firstname,
    data?.id,
    data?.lastname,
    data?.profile_pic,
    isLoading,
    token,
  ]);
  return (
    <>
      {contextHolder}
      {isLoading || notifLoading ? (
        <Center h="100vh">
          <RotateSpinner size={50} color="#2AACE2" />
        </Center>
      ) : (
        <Flex h="100vh">
          <Sidebar user={data!} notifCount={notifications?.length} />
          <userProvider.Provider value={activeUsers}>
            <Box bg="brand.100" w="100vw" overflowY="auto">
              {client ? (
                <StreamVideo client={client}>
                  <Outlet context={data} />
                </StreamVideo>
              ) : (
                <Outlet context={data} />
              )}
            </Box>
          </userProvider.Provider>
        </Flex>
      )}
    </>
  );
}

export default App;
