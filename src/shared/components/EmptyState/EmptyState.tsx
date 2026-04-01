import { Button, VStack, EmptyState as EmptyStateChakra, ButtonGroup } from "@chakra-ui/react";
import { type ButtonProps } from "@chakra-ui/react";
import { type FC, type ReactNode } from "react";

interface ActionButton {
  text: string;
  disabled?: boolean;
  variant?: ButtonProps["variant"];
  icon?: ReactNode;
  onClick: () => void;
}

interface EmptyStateProps extends Partial<EmptyStateChakra.RootProps> {
  title: string;
  description?: string;
  icon?: ReactNode;
  actionButton?: ActionButton;
}

const EmptyState: FC<EmptyStateProps> = ({ title, description, icon, actionButton, ...rootProps }) => (
  <EmptyStateChakra.Root {...rootProps} h={"full"} display={"flex"} justifyContent={"center"}>
    <EmptyStateChakra.Content>
      {icon && <EmptyStateChakra.Indicator>{icon}</EmptyStateChakra.Indicator>}
      <VStack textAlign="center">
        <EmptyStateChakra.Title>{title}</EmptyStateChakra.Title>
        {description && <EmptyStateChakra.Description>{description}</EmptyStateChakra.Description>}
      </VStack>
      {actionButton && (
        <ButtonGroup>
          <Button variant={actionButton.variant} onClick={actionButton.onClick} disabled={actionButton.disabled}>
            {actionButton.icon} {actionButton.text}
          </Button>
        </ButtonGroup>
      )}
    </EmptyStateChakra.Content>
  </EmptyStateChakra.Root>
);

export default EmptyState;
