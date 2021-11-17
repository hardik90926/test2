import { toast } from "react-toastify";

export const errorToast = (message) => {
  return toast.error(message, {
    position: toast.POSITION.TOP_RIGHT,
    pauseOnHover: true,
    type: "error",
  });
}

export const successToast = (message) => {
  return toast.success(message, {
    position: toast.POSITION.TOP_RIGHT,
    type:"success"
  });
}
