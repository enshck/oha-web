import { Field, Select as ChakraSelect, createListCollection, For } from "@chakra-ui/react";
import type { SelectRootProps } from "@chakra-ui/react";

import type { IBaseFieldProps, IOption } from "@/shared/interfaces";

interface SelectProps<T> extends Omit<SelectRootProps, "children" | "collection">, IBaseFieldProps {
  placeholder?: string;
  onClear?: () => void;
  options: IOption<T>[];
}

const Select = <T,>({
  errorMessage,
  label,
  isRequired,
  isTouched,
  options,
  placeholder,
  onClear,
  ...selectProps
}: SelectProps<T>) => {
  const collection = createListCollection({ items: options });

  return (
    <Field.Root invalid={isTouched && !!errorMessage} required={!!isRequired} w={"fit-content"} minW={"200px"}>
      {label && (
        <Field.Label>
          {label} {isRequired && <Field.RequiredIndicator />}
        </Field.Label>
      )}
      <ChakraSelect.Root collection={collection} {...selectProps}>
        <ChakraSelect.Control>
          <ChakraSelect.Trigger>
            <ChakraSelect.ValueText placeholder={placeholder} />
          </ChakraSelect.Trigger>
          {onClear && (
            <ChakraSelect.IndicatorGroup>
              <ChakraSelect.Indicator />
              <ChakraSelect.ClearTrigger onClick={onClear} cursor={"pointer"} />
            </ChakraSelect.IndicatorGroup>
          )}
        </ChakraSelect.Control>
        <ChakraSelect.Positioner>
          <ChakraSelect.Content>
            <For each={collection.items}>
              {(item) => (
                <ChakraSelect.Item key={String(item.value)} item={item}>
                  {item.label}
                  <ChakraSelect.ItemIndicator />
                </ChakraSelect.Item>
              )}
            </For>
          </ChakraSelect.Content>
        </ChakraSelect.Positioner>
      </ChakraSelect.Root>
      <Field.ErrorText>{errorMessage}</Field.ErrorText>
    </Field.Root>
  );
};

export default Select;
