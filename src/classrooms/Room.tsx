import "@stream-io/video-react-sdk/dist/css/styles.css";

import {
  Box,
  Button,
  Center,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import {
  Call,
  StreamCall,
  useStreamVideoClient,
} from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { BsKey } from "react-icons/bs";
import { IoMdArrowBack } from "react-icons/io";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import {
  Link,
  Navigate,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { RotateSpinner } from "react-spinners-kit";

import { useToggle } from "../_hooks/useToggle";
import { Tables } from "../_models/database.types";
import { useCheckCall } from "./_queries/useCheckCall";
import { RoomUI } from "./RoomUI";

export const Room = () => {
  const user: Tables<"users"> = useOutletContext();
  const [isVisible, togglePassword] = useToggle(false);
  const { id } = useParams();
  const [call, setCall] = useState<Call>();
  const [password, setPassword] = useState("");
  const [isPasswordCorrect, setisPasswordCorrect] = useState(true);

  const client = useStreamVideoClient();
  const { data, isLoading } = useCheckCall(client!, id as string, !!client);
  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<FieldValues>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/forum");
      return;
    }
    if (!isLoading && data?.length === 0) {
      return navigate("/classrooms");
    }
    const call = client?.call("default", id as string);

    async function joinCall() {
      const callData = await call!.get();
      if (
        callData.call.custom.password &&
        password !== callData.call.custom.password
      ) {
        sessionStorage.setItem("password", callData.call.custom.password);
        setisPasswordCorrect(false);
        return;
      }
      setisPasswordCorrect(true);
      await call?.join();
      setCall(call);
    }
    joinCall();
    return () => {
      async function leaveCall() {
        await call?.leave();
      }
      leaveCall();
    };
  }, [
    client,
    data?.length,
    id,
    isLoading,
    isPasswordCorrect,
    navigate,
    password,
    user,
  ]);

  const handlePassword = ({ passwordInput }: FieldValues) => {
    if (passwordInput === sessionStorage.getItem("password")) {
      setPassword(passwordInput);
      setisPasswordCorrect(true);
      return;
    }

    setError("password", { message: "Incorrect password" });
  };
  return (
    <Box p={5}>
      {!user ? (
        <Navigate to="/" />
      ) : !isPasswordCorrect ? (
        <Center h="90vh">
          <Box>
            <Link to="/classrooms">
              <IoMdArrowBack
                size="30"
                style={{ marginBottom: "20px" }}
                cursor="pointer"
              />
            </Link>
            <Heading fontSize="30px" color="brand.200">
              Enter password to access room
            </Heading>
            <form onSubmit={handleSubmit((data) => handlePassword(data))}>
              <Controller
                rules={{
                  onChange: () => {
                    clearErrors("password");
                  },
                  required: "This field is mandatory",
                }}
                control={control}
                render={({ field: { onChange } }) => (
                  <>
                    {errors.password && (
                      <Text fontSize="xs" color="red" p={2} mb="-20px">
                        {errors.password.message as string}
                      </Text>
                    )}
                    <Center mt={4}>
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
                    </Center>
                  </>
                )}
                name="passwordInput"
              />
              <Center mt={10}>
                <Button
                  bg="brand.200"
                  color="white"
                  _hover={{ bg: "#008ECC" }}
                  type="submit"
                >
                  Access room
                </Button>
              </Center>
            </form>
          </Box>
        </Center>
      ) : !call ? (
        <Center h="90vh">
          <RotateSpinner size={50} color="#2AACE2" />
        </Center>
      ) : (
        <StreamCall call={call}>
          <RoomUI />
        </StreamCall>
      )}
    </Box>
  );
};
