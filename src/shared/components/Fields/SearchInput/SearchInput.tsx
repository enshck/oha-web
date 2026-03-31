import { CloseButton, Field, Input as ChakraInput, InputGroup } from "@chakra-ui/react";
import type { InputProps as ChakraInputProps } from "@chakra-ui/react";
import { useEffect, useState, type FC, type ChangeEvent } from "react";
import { CiSearch } from "react-icons/ci";

import { useDebounce } from "@/shared/hooks";

const SEARCH_INPUT_DEBOUNCE_TIMEOUT = 500;

interface SearchInputProps extends Omit<ChakraInputProps, "onChange"> {
  onChange: (value: string) => void;
  label?: string;
  withClearButton?: boolean;
}

const SearchInput: FC<SearchInputProps> = ({ label, value = "", onChange, withClearButton = true, ...inputProps }) => {
  const [inputValue, setInputValue] = useState<string>(String(value));

  const debouncedValue = useDebounce<string>(inputValue, SEARCH_INPUT_DEBOUNCE_TIMEOUT);

  // Sync internal state with external value prop
  useEffect(() => {
    setInputValue(String(value));
  }, [value]);

  // Trigger onChange when debounced value changes
  useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue, onChange, value]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleClear = () => {
    setInputValue("");
    onChange("");
  };

  return (
    <Field.Root w={"fit-content"}>
      {label && (
        <Field.Label>
          {label} <Field.RequiredIndicator />
        </Field.Label>
      )}
      <InputGroup
        startElement={<CiSearch />}
        endElement={
          withClearButton ? (
            <CloseButton
              size="xs"
              variant="ghost"
              color={"blackAlpha.700"}
              aria-label="Clear search"
              onMouseDown={(event) => event.preventDefault()}
              onClick={handleClear}
            />
          ) : undefined
        }
      >
        <ChakraInput {...inputProps} value={inputValue} onChange={handleInputChange} />
      </InputGroup>
    </Field.Root>
  );
};

export default SearchInput;
