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
  useDisclosure,
} from "@chakra-ui/react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { BsKey } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import {
  Link,
  Navigate,
  useNavigate,
  useOutletContext,
} from "react-router-dom";

import { useToast } from "../_hooks/useToast";
import { useToggle } from "../_hooks/useToggle";
import { useSignIn } from "./_mutations/useSignIn";
import { ForgotPasswordModal } from "./ForgotPasswordModal";

export const Login = () => {
  const navigate = useNavigate();
  const [isVisible, togglePassword] = useToggle(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutateAsync: signIn, isPending } = useSignIn();
  const showToast = useToast();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FieldValues>();
  const handleLogin = async ({ email, password }: FieldValues) => {
    try {
      await signIn({ email, password });
      showToast({
        description: `You're successfully logged in`,
        status: "success",
        title: "Success",
      });
      navigate("/profile");
    } catch (error) {
      showToast({
        description: error.message,
        status: "error",
        title: "Ooops",
      });
    }
  };

  const user = useOutletContext();
  return (
    <Box p="5" h="100vh">
      {user ? (
        <Navigate to="/profile" />
      ) : (
        <>
          <ForgotPasswordModal isOpen={isOpen} onClose={onClose} />
          <Flex alignItems="end" gap={1}>
            <Heading color="black">Login</Heading>
            <Box
              h="10px"
              borderRadius="50px"
              w="10px"
              bg="brand.200"
              mb={2.5}
            ></Box>
          </Flex>{" "}
          <Flex
            justifyContent="center"
            gap="5"
            p="4"
            h="max-content"
            alignItems="center"
            height="90%"
          >
            <form onSubmit={handleSubmit((data) => handleLogin(data))}>
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
                      {errors.email && (
                        <Text fontSize="xs" color="red" p={2} mb="-25px">
                          {errors.email.message as string}
                        </Text>
                      )}
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
                          _placeholder={{
                            color: "brand.200",
                            fontWeight: "bold",
                          }}
                        />
                      </InputGroup>
                    </>
                  )}
                  name="email"
                />

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
                          placeholder="Password"
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
                <Flex justifyContent="end" p="2" mt="-20px">
                  <Text
                    textDecoration="underline"
                    fontSize="xs"
                    cursor="pointer"
                    onClick={() => onOpen()}
                  >
                    Forgot your password ?
                  </Text>
                </Flex>

                <Button
                  bg="brand.200"
                  color="white"
                  _hover={{ bg: "#008ECC" }}
                  type="submit"
                  isLoading={isPending}
                >
                  Login
                </Button>
                <Text textAlign="center">Or</Text>
                <Button
                  bg="brand.200"
                  color="white"
                  as={Link}
                  _hover={{ bg: "#008ECC" }}
                  to="/register"
                >
                  Create your account
                </Button>
              </Flex>
            </form>
          </Flex>
        </>
      )}
    </Box>
  );
};
