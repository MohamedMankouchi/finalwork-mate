export const fileKeys = {
  all: ["files"] as const,
  file: (file: string, id: number) => [...fileKeys.all, file, id] as const,
};
