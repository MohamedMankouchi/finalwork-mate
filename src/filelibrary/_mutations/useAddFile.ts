import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

import { supabase } from "../../database/supabase";
import { fileKeys } from "../fileKeys";
type addFileProps = {
  description: string;
  file: File;
  title: string;
  user_id: string;
};
const addFile = async ({ description, title, user_id, file }: addFileProps) => {
  const fileUrl = `https://mozbjvkzioecoqndvhjl.supabase.co/storage/v1/object/public/files/${file.name}`;
  const { error } = await supabase
    .from("files")
    .insert({ description, file: fileUrl, title, user_id });

  if (error) {
    throw error;
  }

  const { error: errorFile } = await supabase.storage
    .from("files")
    .upload(file.name, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (errorFile?.message) {
    throw error;
  }
};

export const useAddFile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addFile,
    onError: (error) => {
      return error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: fileKeys.all });
    },
  });
};
