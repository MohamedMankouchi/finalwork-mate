import { StreamVideoClient } from "@stream-io/video-react-sdk";
import { useQuery } from "@tanstack/react-query";

import { classroomKeys } from "../classroomKeys";

const getCall = async (client: StreamVideoClient, id: string) => {
  return (
    await client.queryCalls({
      filter_conditions: {
        id: { $eq: id },
      },
    })
  ).calls;
};

export const useCheckCall = (
  client: StreamVideoClient,
  id: string,
  enabled: boolean
) => {
  return useQuery({
    enabled,
    queryFn: () => getCall(client, id),
    queryKey: classroomKeys.classroom(id),
    refetchOnMount: !!client,
  });
};
