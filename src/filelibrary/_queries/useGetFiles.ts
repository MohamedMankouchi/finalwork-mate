import { useQuery } from "@tanstack/react-query";

import { supabase } from "../../database/supabase";
import { fileKeys } from "../fileKeys";

const getFiles = async () => {
  const { data, error } = await supabase
    .from("files")
    .select(`*, users(*)`)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
};

export const useGetFiles = () => {
  return useQuery({
    queryFn: getFiles,
    queryKey: fileKeys.all,
  });
};
