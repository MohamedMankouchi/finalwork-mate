import {
  Box,
  Button,
  Flex,
  Heading,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import { useToast } from "../_hooks/useToast";
import { useMarkAnswer } from "./_mutations/useMarkAnswer";

export const SolutionModal = ({
  id,
  isOpen,
  onClose,
}: {
  id: number;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { questionId } = useParams();
  const { mutateAsync: markAnswer, isPending } = useMarkAnswer(
    questionId as string
  );

  const showToast = useToast();

  const handleSolution = async () => {
    try {
      await markAnswer({
        forum_id: questionId as string,
        id,
      });
      onClose();
      showToast({
        description: "Your solution has been marked as correct answer !",
        status: "success",
        title: "Success",
      });
    } catch (error) {
      showToast({
        description: error.message,
        status: "error",
        title: "Ooops",
      });
    }
  };
  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <Box p={5}>
          <Heading color="brand.200" fontFamily="30px" mb={2}>
            Are you sure ?
          </Heading>

          <Text mb={2}>
            By marking this answer as correct, the case state will automatically
            change to resolved{" "}
          </Text>
          <Flex gap="3" justifyContent="end" mt="5">
            <Button
              onClick={() => {
                onClose();
              }}
            >
              Cancel
            </Button>
            <Button
              bg="brand.200"
              color="white"
              _hover={{ bg: "#008ECC" }}
              type="submit"
              isLoading={isPending}
              onClick={handleSolution}
            >
              Confirm
            </Button>
          </Flex>
        </Box>
      </ModalContent>
    </Modal>
  );
};
