import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { CgProfile } from "react-icons/cg";

import { useToast } from "../_hooks/useToast";
import { useSendRecovery } from "./_mutations/useSendRecovery";

type ForgotPasswordModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const ForgotPasswordModal = ({
  isOpen,
  onClose,
}: ForgotPasswordModalProps) => {
  const { mutateAsync: sendRecovery, isPending } = useSendRecovery();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FieldValues>();

  const showToast = useToast();

  const handleRecovery = async ({ email }: FieldValues) => {
    try {
      await sendRecovery(email);
      onClose();
      showToast({
        description: "A recovery email has been sent to your email !",
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
        <ModalCloseButton />

        <form onSubmit={handleSubmit((data) => handleRecovery(data))}>
          <Box p={5}>
            <Heading mb="5" color="brand.200" fontSize="30px">
              Forgot password
            </Heading>
            {errors.email && (
              <Text fontSize="xs" color="red" p={2}>
                {errors.email.message as string}
              </Text>
            )}
            <Controller
              rules={{
                pattern: {
                  message: "Enter a valid email",
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                },
                required: "This field is mandatory",
              }}
              control={control}
              render={({ field: { onChange } }) => (
                <>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <CgProfile />
                    </InputLeftElement>

                    <Input
                      onChange={onChange}
                      type="email"
                      placeholder="Email"
                      borderRadius="50px"
                      variant="styled"
                      boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                      _placeholder={{ color: "brand.200", fontWeight: "bold" }}
                    />
                  </InputGroup>
                </>
              )}
              name="email"
            />
            <Flex gap="3" justifyContent="end" mt="5">
              <Button onClick={onClose}>Cancel</Button>
              <Button
                bg="brand.200"
                color="white"
                _hover={{ bg: "#008ECC" }}
                type="submit"
                isLoading={isPending}
              >
                Send recovery email
              </Button>
            </Flex>
          </Box>
        </form>
      </ModalContent>
    </Modal>
  );
};
