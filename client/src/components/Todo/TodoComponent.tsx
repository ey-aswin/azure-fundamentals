import { useEffect, useState } from "react";
import TodoModel from "./TodoModel";
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "./todo.networkcalls";

const TodoComponent = () => {
  const [todoModel, setTodoModel] = useState(false);
  const [todoData, setTodoData] = useState<any[]>([]);
  const [todoEdit, setTodoEdit] = useState({
    type: null as string | null,
    data: {} as any,
  });
  const handleSubmit = (e: any) => {
    console.log("Form Data:", e);
    createTodo(e)
      .catch((err) => alert("Error in creating todo: " + String(err)))
      .then((e: any) => {
        setTodoData([e.items, ...todoData]);
        setTodoModel(false);
      });
  };
  useEffect(() => {
    fetchTodos();
  }, []);
  const fetchTodos = () => {
    getTodos()
      .then((res) => setTodoData(res))
      .catch((err) => alert("Error in fetching todos: " + String(err)));
  };
  const handleDelete = (todo_id: string) => {
    console.log(todo_id);
    const deletItem = deleteTodo(todo_id)
      .then((item) => {
        const modData = todoData.filter((item) => item.id !== todo_id);
        alert("Deleteion Successfull");
        setTodoData(modData);
      })
      .catch((E) => alert("Error"));
  };

  const hanldeEditTodo = (todoItem: any) => {
    setTodoEdit({ data: todoItem, type: "edit" });
  };

  const handleEdit = (e: any) => {
    console.log("Form Data:", e);
    updateTodo(e)
      .then((e: any) => {
        console.log(e)
        const modData = todoData.filter((item) => item.id !== todoEdit.data?.id);

        setTodoData([e.items, ...modData]);
        setTodoEdit({ type: null, data: {} });
      })
      // .catch((err) => alert("Error in creating todo: " + String(err)));
  };
  return (
    <div className="flex justify-center flex-col p-8">
      {/* Todo Edit */}
      {todoEdit.type && (
        <>
          <TodoModel
            handleClose={() => setTodoEdit({ type: null, data: {} })}
            handleSubmit={handleEdit}
            mode="edit"
            initialValues={todoEdit.data}
          />
        </>
      )}

      {/* TodoModel Modal */}
      {!todoEdit.type && (
        <>
          {todoModel ? (
            <>
              <TodoModel
                handleClose={() => setTodoModel(false)}
                handleSubmit={handleSubmit}
                mode="create"
              />
            </>
          ) : (
            <div className="w-full bg-slate-800 min-h-[90vh] p-4 rounded-lg shadow-md">
              {/* Heading */}
              <div className="flex justify-between">
                <h1 className="text-3xl font-bold ">Todo Component</h1>
                <div>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => setTodoModel(true)}
                  >
                    Add Todo
                  </button>
                </div>
              </div>
              {/* Body */}
              <div className="mt-4">
                <div>
                  <h1 className="text-xl font-semibold">Added Todos list</h1>
                </div>
                <div>
                  {todoData.length === 0 ? (
                    <p className="text-white">No todos added yet.</p>
                  ) : (
                    <table className="min-w-full divide-y divide-gray-700">
                      <thead className="bg-slate-700">
                        <tr>
                          <th
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                          >
                            #
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                          >
                            Title
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                          >
                            Description
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                          >
                            Categories
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                          >
                            Actions
                          </th>
                        </tr>
                      </thead>

                      <tbody className="bg-slate-600 divide-y divide-gray-700">
                        {todoData.map((todo: any, index: number) => (
                          <tr key={index} className="hover:bg-slate-500">
                            <td className="px-4 py-3 text-white">
                              {index + 1}
                            </td>
                            <td className="px-4 py-3 text-white font-semibold">
                              {todo.title}
                            </td>
                            <td className="px-4 py-3 text-white">
                              {todo.description}
                            </td>
                            <td className="px-4 py-3 text-white">
                              {/* Handle categories that may be a string or an array */}
                              {Array.isArray(todo.categories)
                                ? todo.categories.join(", ")
                                : todo.categories}
                            </td>
                            <td className="px-4 py-3 text-white">
                              <button
                                className="mx-1 border-2 border-white px-1 bg-blue-950 cursor-pointer"
                                onClick={() => handleDelete(todo.id)}
                              >
                                X
                              </button>
                              <button
                                className="mx-1 border-2 border-white px-1 bg-blue-950 cursor-pointer"
                                onClick={() => hanldeEditTodo(todo)}
                              >
                                i
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TodoComponent;
