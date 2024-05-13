import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { BsKey } from "react-icons/bs";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Navigate } from "react-router-dom";

import { useToast } from "../_hooks/useToast";
import { useToggle } from "../_hooks/useToggle";
import { useResetPassword } from "./_mutations/useResetPassword";
import { useCurrentUser } from "./_queries/useCurrentUser";

export const ResetPassword = () => {
  const [isVisible, togglePassword] = useToggle(false);
  const showToast = useToast();
  const { mutateAsync: resetPassword, isPending } = useResetPassword();
  const { data } = useCurrentUser();
  const handlePasswordReset = async ({ password }: FieldValues) => {
    try {
      await resetPassword(password);
      showToast({
        description: "Your password has been successfully changed !",
        status: "success",
        title: "Password changed",
      });
    } catch (error) {
      showToast({
        description: error.message,
        status: "error",
        title: "Ooops",
      });
    }
  };
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FieldValues>();
  return (
    <>
      {!data ? (
        <Navigate to="/login" />
      ) : (
        <Box p="5" h="100vh">
          <Heading color="brand.200">Reset password</Heading>
          <Flex
            justifyContent="center"
            gap="5"
            p="4"
            h="max-content"
            alignItems="center"
            height="90%"
          >
            <form onSubmit={handleSubmit((data) => handlePasswordReset(data))}>
              <Flex
                flexDirection="column"
                gap="5"
                width="500px"
                borderRadius="10px"
                boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
                bg="white"
                p="5"
              >
                <Controller
                  rules={{ required: "This field is mandatory" }}
                  control={control}
                  render={({ field: { onChange } }) => (
                    <>
                      {errors.password && (
                        <Text fontSize="xs" color="red" p={2} mb="-25px">
                          {errors.password.message as string}
                        </Text>
                      )}
                      <InputGroup>
                        <InputLeftElement pointerEvents="none">
                          <BsKey />
                        </InputLeftElement>
                        {!isVisible ? (
                          <InputRightElement
                            cursor="pointer"
                            onClick={togglePassword}
                          >
                            <IoEyeOutline size="20" />
                          </InputRightElement>
                        ) : (
                          <InputRightElement
                            cursor="pointer"
                            onClick={togglePassword}
                          >
                            <IoEyeOffOutline size="20" />
                          </InputRightElement>
                        )}
                        <Input
                          onChange={onChange}
                          type={isVisible ? "text" : "password"}
                          placeholder="New password"
                          borderRadius="50px"
                          variant="styled"
                          boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                          _placeholder={{
                            color: "brand.200",
                            fontWeight: "bold",
                          }}
                        />
                      </InputGroup>
                    </>
                  )}
                  name="password"
                />
                <Button
                  bg="brand.200"
                  color="white"
                  _hover={{ bg: "#008ECC" }}
                  type="submit"
                  isLoading={isPending}
                >
                  Reset Password
                </Button>
              </Flex>
            </form>
          </Flex>
        </Box>
      )}
    </>
  );
};
