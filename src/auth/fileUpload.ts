import { supabase } from "../database/supabase";

export const imageUpload = async ({
  filename,
  file,
}: {
  file: File;
  filename: string;
}) => {
  const { error } = await supabase.storage
    .from("pictures")
    .upload(filename, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error?.message) {
    throw error;
  }
};

export const fileUpload = async ({
  filename,
  file,
  forumId,
}: {
  file: File;
  filename: string;
  forumId: string;
}) => {
  const { error } = await supabase.storage
    .from("forum")
    .upload(`${forumId}/${filename}`, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error?.message) {
    throw error;
  }
};
