import { Box, Text } from "@chakra-ui/react";

export const Status = ({ status }: { status: boolean }) => {
  return (
    <Box bg={!status ? "brand.300" : "#5ca14b"} p={2} borderRadius="50px">
      <Text
        fontSize="12px"
        fontWeight="bold"
        color={!status ? "brand.400" : "#1a4324"}
      >
        {!status ? "Unresolved" : "Resolved"}
      </Text>
    </Box>
  );
};
