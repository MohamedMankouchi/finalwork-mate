export const forumKeys = {
  all: ["forums"] as const,
  forum: (forumId: string) => [...forumKeys.all, "forum", forumId] as const,
};
