import { Box, Center, Heading } from "@chakra-ui/react";
import { HiChatAlt2 } from "react-icons/hi";

export const NoMessage = () => {
  return (
    <Center h="100%" flexDirection="column">
      <Box bg="orange" borderRadius="50%" p={5} mb={5}>
        <HiChatAlt2 size={100} color="white" />
      </Box>
      <Heading fontSize="30px">Message someone and chat right now</Heading>
    </Center>
  );
};
