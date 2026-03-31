import { Field, Select as ChakraSelect, createListCollection, For } from "@chakra-ui/react";
import type { SelectRootProps } from "@chakra-ui/react";

import type { IBaseFieldProps, IOption } from "@/shared/interfaces";

interface SelectProps<T> extends Omit<SelectRootProps, "children" | "collection">, IBaseFieldProps {
  placeholder?: string;
  options: IOption<T>[];
}

const Select = <T,>({
  errorMessage,
  label,
  isRequired,
  isTouched,
  options,
  placeholder,
  ...selectProps
}: SelectProps<T>) => {
  const collection = createListCollection({ items: options });

  return (
    <Field.Root invalid={isTouched && !!errorMessage} required={!!isRequired}>
      {label && (
        <Field.Label>
          {label} <Field.RequiredIndicator />
        </Field.Label>
      )}
      <ChakraSelect.Root collection={collection} {...selectProps} invalid>
        <ChakraSelect.Control>
          <ChakraSelect.Trigger>
            <ChakraSelect.ValueText placeholder={placeholder} />
          </ChakraSelect.Trigger>
          <ChakraSelect.IndicatorGroup>
            <ChakraSelect.Indicator />
            <ChakraSelect.ClearTrigger />
          </ChakraSelect.IndicatorGroup>
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
