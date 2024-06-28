import Swal from "sweetalert2";
import { globalReset } from "../../shared/config/game";

export const dead = (msg) => {
  globalReset();
  Swal.fire({
    title: "Байка!",
    text: `Валера погиб...\n${msg}`,
    icon: "error",
    confirmButtonText: "Понятно",
  });
};
