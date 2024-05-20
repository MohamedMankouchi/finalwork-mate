import { useQuery } from "@tanstack/react-query";

import Markers from "./../markers.json";
export const getMarkers = async () => {
  const markers = Markers;
  return markers
};

export const useGetMarkers = () => {
  return useQuery({
    queryFn: getMarkers,
    queryKey: ["markers"],
  });
};
