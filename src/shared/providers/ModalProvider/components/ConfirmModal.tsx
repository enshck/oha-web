import { Button, Dialog } from "@chakra-ui/react";
import React from "react";
import type { FC } from "react";

interface ConfirmModalProps {
  onClose: () => void;
  onSuccess: () => void;
  onAdditionalAction?: () => void;
  heading: string;
  content: string | React.ReactNode;
  cancelBtnText?: string;
  successBtnText?: string;
  additionalActionBtnText?: string;
  showCloseBtn?: boolean;
  width?: string;
}

const ConfirmModal: FC<ConfirmModalProps> = ({
  heading,
  content,
  onClose,
  onSuccess,
  onAdditionalAction,
  cancelBtnText,
  successBtnText,
  additionalActionBtnText,
  showCloseBtn,
  width = "368px",
}) => {
  return (
    <Dialog.Content w={width} p="24px" borderRadius="large" maxW="700px">
      {showCloseBtn ? <Dialog.CloseTrigger /> : null}
      <Dialog.Header fontSize="22px" lineHeight="32px" color="primaryFont" fontWeight="semibold" p="0" mb="8px">
        {heading}
      </Dialog.Header>
      <Dialog.Body textStyle="text" color="secondaryFont" p="0">
        {content}
      </Dialog.Body>
      <Dialog.Footer p="0" mt="24px">
        <Button variant="ghost" onClick={onClose} mr={2}>
          {cancelBtnText}
        </Button>
        {additionalActionBtnText ? (
          <Button variant="ghost" onClick={onAdditionalAction} mr={2} color="darkTeal" bg="white">
            {additionalActionBtnText}
          </Button>
        ) : null}
        <Button onClick={onSuccess}>{successBtnText}</Button>
      </Dialog.Footer>
    </Dialog.Content>
  );
};

export default ConfirmModal;
