export const userKeys = {
  all: ["users"] as const,
  checkFriends: (friendOne: string, friendTwo: string) =>
    [...userKeys.all, "user", "friends", friendOne, friendTwo] as const,
  friends: (userId: string) =>
    [...userKeys.all, "user", userId, "friends"] as const,
  user: (userId: string | "current") =>
    [...userKeys.all, "user", userId] as const,
  userExists: (email: string) =>
    [...userKeys.all, "user", "exists", email] as const,
};
