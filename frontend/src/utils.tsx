import { toast } from "react-toastify";

type ToastType = "success" | "info" | "warning" | "error";

export const notify = (message: string, type: ToastType) => {
  toast[type](message); // Now TypeScript knows `type` is a valid key of `toast`.
};

export const API_URL = "https://task-manager-mern-hes9.onrender.com";
