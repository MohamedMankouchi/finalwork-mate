import { StreamVideoClient } from "@stream-io/video-react-sdk";
import { useQuery } from "@tanstack/react-query";

import { classroomKeys } from "../classroomKeys";

const getCalls = async (client: StreamVideoClient) => {
  return (
    await client.queryCalls({
      filter_conditions: {
        ended_at: { $eq: null },
      },
    })
  ).calls;
};

export const useGetCalls = (client: StreamVideoClient) => {
  return useQuery({
    queryFn: () => getCalls(client),
    queryKey: classroomKeys.all,
  });
};
