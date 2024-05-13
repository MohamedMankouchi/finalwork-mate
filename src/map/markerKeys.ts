export const markerKeys = {
  all: ["markers"] as const,
  marker: (markerId: string) =>
    [...markerKeys.all, "marker", markerId] as const,
};
