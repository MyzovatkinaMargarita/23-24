/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useEffect } from "react";
import { DoneIcon } from "../../icons/icons";

type ToastProps = {
  open: boolean;
  message: string;
  onClose: () => void;
  duration?: number;
};

const Wrap = styled.div`
  position: fixed;
  right: 16px;
  bottom: 16px;
  z-index: 1100;
`;

const Card = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 280px;
  max-width: 420px;
  font-weight: 500;
  font-size: 14px;
  background: #d7edff; /* светло-синий фон */
  color: #0e73f6; /* синий текст */
  border-radius: 10px;
  padding: 10px 15px;
`;

const Close = styled.button`
  margin-left: auto;
  border: 0;
  background: transparent;
  color: inherit;
  cursor: pointer;
  font-size: 18px;
  line-height: 1;
  padding: 0 4px;
  &:hover {
    opacity: 0.8;
  }
`;

export default function Toast({
  open,
  message,
  onClose,
  duration = 3000,
}: ToastProps) {
  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(onClose, duration);
    return () => window.clearTimeout(id);
  }, [open, duration, onClose]);

  if (!open) return null;

  return (
    <Wrap role="status" aria-live="polite">
      <Card>
        <DoneIcon />
        <span>{message}</span>
        <Close aria-label="Закрыть" onClick={onClose}>
          ×
        </Close>
      </Card>
    </Wrap>
  );
}
