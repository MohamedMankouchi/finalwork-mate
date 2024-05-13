export const classroomKeys = {
  all: ["classroom"] as const,
  classroom: (id: string) => [...classroomKeys.all, "classroom", id] as const,
};
