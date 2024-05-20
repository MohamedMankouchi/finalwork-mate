import { useQuery } from "@tanstack/react-query";

import { supabase } from "../../database/supabase";
import Markers from "./../../map/markers.json";
const getPlanned = async (userId: string) => {
  const { data } = await supabase
    .from("plannings")
    .select("*")
    .eq("user_id", userId)
    .order("from", { ascending: false });

  const markers = Markers;
  const arr = data?.map((el) =>
    markers.find((marker) => marker.id === el.marker_id)
  );

  return { arr, data };
};

export const useGetPlanned = (userId: string) => {
  return useQuery({
    queryFn: () => getPlanned(userId),
    queryKey: ["users", "user", userId, "planned"],
  });
};
