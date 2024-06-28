import { useState } from "react";

export const useModal = () => {
  const [show, setShow] = useState<boolean>(false);

  const open = () => {
    setShow(true);
  };

  const close = () => {
    setShow(false);
  };

  return {
    show,
    open,
    close,
  };
};
