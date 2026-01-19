import axiosInstance from "../../utils/axios.utils";

export const createTodo = async (formData: any) => {
  const response = await axiosInstance.post("/project/create", formData);
  return response.data;
};

export const getTodos = async () => {
  const response = await axiosInstance.get("/project/all");
  return response.data.projects;
};

export const deleteTodo = async (todo_id: string) => {
  const response = await axiosInstance.delete("/project/" + todo_id);
  return response.data.projects;
};

export const updateTodo = async (todo: any) => {
  const response = await axiosInstance.post("/project/edit", todo);
  return response.data;
};
