import { Box, Field, Input as ChakraInput } from "@chakra-ui/react";
import type { InputProps as ChakraInputProps } from "@chakra-ui/react";
import type { FC } from "react";

import type { IBaseFieldProps } from "@/shared/interfaces/Field.interface";

interface InputProps extends ChakraInputProps, IBaseFieldProps {}

const Input: FC<InputProps> = ({ errorMessage, isRequired, label, isTouched, ...inputProps }) => {
  return (
    <Field.Root invalid={isTouched && !!errorMessage} required={!!isRequired}>
      {label && (
        <Field.Label>
          {label} <Field.RequiredIndicator />
        </Field.Label>
      )}
      <ChakraInput {...inputProps} />
      <Box h="16px">
        <Field.ErrorText>{errorMessage}</Field.ErrorText>
      </Box>
    </Field.Root>
  );
};

export default Input;
