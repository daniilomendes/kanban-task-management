import { useState } from "react";
import { v4 as uuidv4, validate } from "uuid";
import crossIcon from "../assets/icon-cross.svg";
import { useDispatch, useSelector } from "react-redux";
import boardsSlice from "../redux/boardsSlice";

const AddEditTaskModal = ({
  type,
  device,
  setOpenAddEditTask,
  setIsTaskModalOpen,
  taskIndex,
  prevColIndex = 0,
}) => {
  const dispatch = useDispatch();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [subtasks, setSubtasks] = useState([
    { title: "", isCompleted: false, id: uuidv4() },
    { title: "", isCompleted: false, id: uuidv4() },
  ]);

  const board = useSelector((state) => state.boards).find(
    (board) => board.isActive
  );

  const columns = board.columns;
  const col = columns.find((col, index) => index === prevColIndex);
  const task = col ? col.tasks.find((task, index) => index === taskIndex) : [];
  const [status, setStatus] = useState(columns[prevColIndex].name);
  const [newColIndex, setNewColIndex] = useState(prevColIndex);

  if (type === "edit" && isFirstLoad) {
    setSubtasks(
      task.subtasks.map((subtask) => {
        return { ...subtask, id: uuidv4() };
      })
    );

    setTitle(task.title);
    setDescription(task.description);
    setIsFirstLoad(false);
  }

  const onDelete = (id) => {
    setSubtasks((perState) => perState.filter((el) => el.id !== id));
  };

  const onChange = (id, newValue) => {
    setSubtasks((pervState) => {
      const newState = [...pervState];
      const subTask = newState.find((subTask) => subTask.id === id);
      subTask.title = newValue;
      return newState;
    });
  };

  const validate = () => {
    setIsValid(false);
    if (!title.trim()) {
      return false;
    }

    for (let i = 0; i < subtasks.length; i++) {
      if (!subtasks[i].title.trim()) {
        return false;
      }
    }

    setIsValid(true);
    return true;
  };

  const onSubmit = (type) => {
    if (type === "add") {
      dispatch(
        boardsSlice.actions.addTask({
          title,
          description,
          subtasks,
          status,
          newColIndex,
        })
      );
    } else {
      dispatch(
        boardsSlice.actions.editTask({
          title,
          description,
          subtasks,
          status,
          taskIndex,
          prevColIndex,
          newColIndex,
        })
      );
    }
  };

  const onChangeStatus = (e) => {
    setStatus(e.target.value);
    setNewColIndex(e.target.selectedIndex);
  };

  return (
    <div
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }

        setOpenAddEditTask(false);
      }}
      className={
        device === "mobile"
          ? "py-6 px-6 pb-40 absolute overflow-y-scroll left-0 flex right-0 bottom-[-100vh] top-0 bg-[#00000080]"
          : "py-6 px-6 pb-40 absolute overflow-y-scroll left-0 flex right-0 top-0 bg-[#00000080]"
      }
    >
      {/* Modal Section */}
      <div
        className="scrollbar-hide overflow-y-scroll max-h-[95vh] my-auto bg-white dark:bg-[#2b2c37] text-black
         dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto w-full px-8 py-8 rounded-xl"
      >
        <h3 className="text-lg">
          {type === "edit" ? "Editar" : "Adicionar nova"} Tarefa
        </h3>

        {/* Task Name */}
        <div className="mt-8 flex flex-col space-y-1">
          <label className="text-sm dark:text-white text-gray-500">
            Nome da Tarefa
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Buscar um café no intervalo"
            className="bg-transparent px-4 py-2 outline-none focus:border-0 rounded-md text-sm border border-gray-600 focus:outline-[#635fc7] ring-0"
          />
        </div>

        {/* Description */}
        <div className="mt-8 flex flex-col space-y-1">
          <label className="text-sm dark:text-white text-gray-500">
            Descrição da Tarefa
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            placeholder="Essa é uma boa prática para o intervalo. Ajuda a recuperar as energias antes de voltar."
            className="bg-transparent px-4 py-2 outline-none min-h-[200px] focus:border-0 rounded-md text-sm border
             border-gray-600 focus:outline-[#635fc7] ring-0"
          />
        </div>

        {/* SubTasks */}
        <div className="mt-8 flex flex-col space-y-1">
          <label className="text-sm dark:text-white text-gray-500">
            Mini Tarefas
          </label>

          {subtasks.map((subTask, index) => (
            <div key={index} className="flex items-center w-full">
              <input
                onChange={(e) => {
                  onChange(subTask.id, e.target.value);
                }}
                type="text"
                value={subTask.title}
                placeholder="Pegar um pão de queijo"
                className="bg-transparent outline-none focus:border-0 border flex-grow px-4 py-2 rounded-md text-sm border-gray-600 focus:outline-[#635fc7]"
              />
              <img
                onClick={() => {
                  onDelete(subTask.id);
                }}
                src={crossIcon}
                alt="cross icon"
                className="m-4 cursor-pointer"
              />
            </div>
          ))}

          <button
            onClick={() => {
              setSubtasks((state) => [
                ...state,
                { title: "", isCompleted: false, id: uuidv4() },
              ]);
            }}
            className="w-full items-center dark:text-[#635fc7] dark:bg-white text-white bg-[#635fc7] py-2 rounded-full"
          >
            + Nova Mini Tarefa
          </button>
        </div>

        {/* Current Status Section */}
        <div className="mt-8 flex flex-col space-y-3">
          <label className="text-sm dark:text-white text-gray-500">
            Status Atual
          </label>
          <select
            value={status}
            onChange={(e) => onChangeStatus(e)}
            className="select-status flex-grow px-4 py-2 rounded-md text-sm bg-transparent focus:border-0  border-[1px] border-gray-300 focus:outline-[#635fc7] outline-none"
          >
            {columns.map((column, index) => (
              <option
                key={index}
                className="dark:bg-[#2b2c37]"
                value={column.name}
              >
                {column.name}
              </option>
            ))}
          </select>

          <button
            onClick={() => {
              const isValid = validate();
              if (isValid) {
                onSubmit(type);
                setOpenAddEditTask(false);
              }
            }}
            className="w-full items-center text-white bg-[#635fc7] py-2 rounded-full"
          >
            {type === "edit" ? "Salvar Mudanças" : "Criar Tarefa"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEditTaskModal;
