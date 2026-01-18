
import React from "react";

type TodoFormValues = {
  id?: string; // present in edit mode
  title: string;
  description: string;
  categories: string;
};

type TodoModalProps = {
  mode?: "create" | "edit";
  initialValues?: Partial<TodoFormValues>; // prefill in edit mode
  handleClose: () => void;
  handleSubmit: (formdata: TodoFormValues) => void; // parent decides create/update
};

const TodoModal: React.FC<TodoModalProps> = ({
  mode = "create",
  initialValues,
  handleClose,
  handleSubmit,
}) => {
  // Controlled state so we can prefill and edit easily
  const [values, setValues] = React.useState<TodoFormValues>({
    id: initialValues?.id,
    title: initialValues?.title ?? "",
    description: initialValues?.description ?? "",
    categories: initialValues?.categories ?? "",
  });

  // If initialValues change (e.g., user selects another todo to edit), sync them
  React.useEffect(() => {
    setValues((prev) => ({
      ...prev,
      id: initialValues?.id,
      title: initialValues?.title ?? "",
      description: initialValues?.description ?? "",
      categories: initialValues?.categories ?? "",
    }));
  }, [initialValues?.id, initialValues?.title, initialValues?.description, initialValues?.categories]);

  const onChange =
    (field: keyof TodoFormValues) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // you can validate here if needed
    handleSubmit(values);
  };

  const heading = mode === "edit" ? "Edit Todo" : "Add New Todo";
  const primaryCta = mode === "edit" ? "Save Changes" : "Add Todo";

  return (
    <div className="h-[90vh] w-[90vw] bg-slate-600 p-4 rounded-lg shadow-md">
      <div>
        <h1 className="text-3xl font-bold text-white">{heading}</h1>
      </div>

      <div className="mt-4">
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="title">
              Title
            </label>
            <input
              className="text-white shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              placeholder="Enter todo title"
              name="title"
              value={values.title}
              onChange={onChange("title")}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              className="text-white shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              name="description"
              rows={10}
              placeholder="Enter todo description"
              value={values.description}
              onChange={onChange("description")}
            />
          </div>

          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="categories">
              categories
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-white"
              id="categories"
              type="text"
              name="categories"           
              placeholder="Enter todo categories"
              value={values.categories}
              onChange={onChange("categories")}
            />
          </div>

          <div className="flex items-center gap-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {primaryCta}
            </button>
            <button
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoModal;
