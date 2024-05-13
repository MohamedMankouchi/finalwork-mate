import { useToast as useChakraToast } from "@chakra-ui/toast";
const TOAST_DURATION = 3000;
type ToastProps = {
  description: string;
  status: "info" | "warning" | "success" | "error" | "loading";
  title: string;
};
export const useToast = () => {
  const toast = useChakraToast();
  return ({ description, title, status }: ToastProps) =>
    toast({
      description,
      duration: TOAST_DURATION,
      isClosable: true,
      status,
      title,
    });
};
