import { useMutation, useQueryClient } from "@tanstack/react-query";

import { fileUpload } from "../../auth/fileUpload";
import { supabase } from "../../database/supabase";
import { forumKeys } from "../forumKeys";

type createQuestionProps = {
  created_by: string;
  description: string;
  files: File &
    {
      name: string;
      originFileObj: File;
    }[];
  id: string;
  title: string;
};
const createQuestion = async ({
  created_by,
  title,
  description,
  files,
  id,
}: createQuestionProps) => {
  const { error } = await supabase
    .from("forums")
    .insert({ created_by, description, folder: id, id, title });

  if (error) {
    throw error;
  }

  if (files.length !== 0) {
    files.forEach(async (file) => {
      await fileUpload({
        file: file.originFileObj as File,
        filename: file.name,
        forumId: id,
      });
    });
  }
};

export const useCreateQuestion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createQuestion,
    onError: (error) => {
      return error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: forumKeys.all });
    },
  });
};
