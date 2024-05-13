import { AddIcon } from "@chakra-ui/icons";
import { Button as ChakraButton } from "@chakra-ui/react";

export const Button = ({
  value,
  isDisabled = false,
  onClick,
}: {
  isDisabled?: boolean;
  onClick: () => void;
  value: string;
}) => {
  return (
    <ChakraButton
      leftIcon={<AddIcon />}
      bg="brand.200"
      color="white"
      variant="solid"
      padding="16px"
      borderRadius={5}
      boxShadow="rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px "
      _hover={{ bg: "#008ECC" }}
      onClick={onClick}
      isDisabled={isDisabled}
      w="full"
    >
      {value}
    </ChakraButton>
  );
};
