import { useQuery } from "@tanstack/react-query";

import { supabase } from "../../database/supabase";
import { fileKeys } from "../fileKeys";

const downloadFile = async (filename: string) => {
  const { data, error } = await supabase.storage
    .from("files")
    .download(filename);

  if (error) {
    throw error;
  }
  return data;
};

export const useDownloadFile = (file: string, id: number) => {
  return useQuery({
    queryFn: () => downloadFile(file),
    queryKey: fileKeys.file(file, id),
  });
};
