import { ToastContainer, toast } from "react-toastify";
const toastifyEmitter = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
};

export const tostErrorMessage = (message) => {
  return toast.error(message, toastifyEmitter);
};
export const tostInfoMessage = (message) => {
  return toast.info(message, toastifyEmitter);
};
export const tostSuccessMessage = (message) => {
  return toast.success(message, toastifyEmitter);
};
export const tostWarnMessage = (message) => {
  return toast.warn(message, toastifyEmitter);
};
