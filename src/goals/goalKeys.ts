export const goalKeys = {
  all: ["goals"] as const,
  group: () => [...goalKeys.all, "group"] as const,
  groupSpecific: (goal_id: number) =>
    [...goalKeys.all, "group", goal_id] as const,
  private: () => [...goalKeys.all, "private"] as const,

  privateSpecific: (goal_id: number) =>
    [...goalKeys.all, "private", goal_id] as const,
};
