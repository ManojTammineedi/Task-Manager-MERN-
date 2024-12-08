import { API_URL } from "./utils";
export const CreateTask = async (taskObj: any) => {
  const url = `${API_URL}/task`;
  console.log("url ", url, taskObj);
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskObj),
  };
  try {
    const result = await fetch(url, options);
    const data = await result.json();
    return data;
  } catch (err) {
    return err;
  }
};

export const GetAllTask = async () => {
  const url = `${API_URL}/task`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const result = await fetch(url, options);
    const data = await result.json();
    return data;
  } catch (err) {
    return err;
  }
};

export const DeleteTaskById = async (id: string) => {
  const url = `${API_URL}/task/${id}`;
  console.log("url", url);
  const options = {
    method: "DELETE",
    header: {
      "Content-Type": "application/json",
    },
  };
  try {
    const result = await fetch(url, options);
    const data = await result.json();
    return data;
  } catch (err) {
    return err;
  }
};

export const UpdateTaskById = async (id: string, reqBody) => {
  const url = `${API_URL}/task/${id}`;
  console.log("url ", url);
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqBody),
  };
  try {
    const result = await fetch(url, options);
    const data = await result.json();
    return data;
  } catch (err) {
    return err;
  }
};
