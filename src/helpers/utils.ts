import { Bounce, toast } from "react-toastify";

export const notification = (text:string, type: 'success' | 'error' | 'warning', time?: number) => {

if (type === 'success') {
  toast.success(text, {
        position: "bottom-center",
        autoClose: time || 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
}

if (type === 'warning') {
  toast.warn(text, {
        position: "bottom-center",
        autoClose: time || 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
}

if (type === 'error') {
  toast.error(text, {
        position: "bottom-center",
        autoClose: time || 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
}
};