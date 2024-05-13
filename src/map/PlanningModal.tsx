import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { Controller, FieldValues, useForm } from "react-hook-form";

import { useToast } from "../_hooks/useToast";
import { useMakePlan } from "./_mutations/useMakePlan";

type PlanningModal = {
  isOpen: boolean;
  marker_id?: number;
  onClose: () => void;
  user_id: string;
};

export const PlanningModal = ({
  isOpen,
  onClose,
  marker_id,
  user_id,
}: PlanningModal) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    clearErrors,
    getValues,
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      from: "",
      to: "",
    },
  });

  const showToast = useToast();
  const { mutateAsync: makePlan, isPending } = useMakePlan();

  const handlePlanning = async ({ from, to }: FieldValues) => {
    try {
      await makePlan({ from, marker_id, to, user_id });
      reset();
      onClose();
      showToast({
        description: "You have successfully planned your day !",
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
        <form onSubmit={handleSubmit((data) => handlePlanning(data))}>
          <Box p={5}>
            <Heading mb="5" color="brand.200" fontSize="30px">
              Plan a day
            </Heading>
            {errors.from && (
              <Text fontSize="xs" color="red" p={2}>
                {errors.from.message as string}
              </Text>
            )}
            <Controller
              rules={{
                onChange: (value) => {
                  value.target.value <= getValues("to") && clearErrors("to");
                },
                required: "This field is mandatory",
                validate: (value) =>
                  value <= getValues("to") || "Please enter a valid date",
              }}
              control={control}
              render={({ field: { onChange } }) => (
                <>
                  <InputGroup mb="4">
                    <Input
                      onChange={onChange}
                      type="datetime-local"
                      placeholder="date"
                      borderRadius="50px"
                      variant="styled"
                      boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                      _placeholder={{ color: "brand.200", fontWeight: "bold" }}
                    />
                  </InputGroup>
                </>
              )}
              name="from"
            />

            {errors.to && (
              <Text fontSize="xs" color="red" p={2}>
                {errors.to.message as string}
              </Text>
            )}
            <Controller
              rules={{
                onChange: (value) => {
                  value.target.value >= getValues("from") &&
                    clearErrors("from");
                },
                required: "This field is mandatory",
                validate: (value) =>
                  value >= getValues("from") || "Please enter a valid date",
              }}
              control={control}
              render={({ field: { onChange } }) => (
                <>
                  <InputGroup>
                    <Input
                      onChange={onChange}
                      type="datetime-local"
                      placeholder="date"
                      borderRadius="50px"
                      variant="styled"
                      boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                      _placeholder={{ color: "brand.200", fontWeight: "bold" }}
                    />
                  </InputGroup>
                </>
              )}
              name="to"
            />
            <Flex gap="3" justifyContent="end" mt="5">
              <Button
                onClick={() => {
                  onClose();
                  reset();
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
              >
                Plan
              </Button>
            </Flex>
          </Box>
        </form>
      </ModalContent>
    </Modal>
  );
};
