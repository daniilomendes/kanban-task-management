import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import elipsis from "../assets/icon-vertical-ellipsis.svg";
import ElipsisMenu from "../components/ElipsisMenu";
import Subtask from "../components/Subtask";
import boardsSlice from "../redux/boardsSlice";
import DeleteModal from "./DeleteModal";
import AddEditTaskModal from "./AddEditTaskModal";

const TaskModal = ({ colIndex, taskIndex, setIsTaskModalOpen }) => {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);
  const columns = board.columns;
  const col = columns.find((column, i) => colIndex === i);
  const task = col.tasks.find((col, i) => taskIndex === i);
  const subtasks = task.subtasks;

  let completed = 0;
  subtasks.forEach((subtask) => {
    if (subtask.isCompleted) {
      completed++;
    }
  });

  const [status, setStatus] = useState(task.status);
  const [newColIndex, setNewColIndex] = useState(columns.indexOf(col));
  const [elipsisMenuOpen, setElipsisMenuOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  const setOpenEditModal = () => {
    setIsAddTaskModalOpen(true);
    setElipsisMenuOpen(false);
  };

  const setOpenDeleteModal = () => {
    setElipsisMenuOpen(false);
    setIsDeleteModalOpen(true);
  };

  const onChange = (e) => {
    setStatus(e.target.value);
    setNewColIndex(e.target.selectedIndex);
  };
  const onClose = (e) => {
    if (e.target !== e.currentTarget) {
      return;
    }

    dispatch(
      boardsSlice.actions.setTaskStatus({
        taskIndex,
        colIndex,
        newColIndex,
        status,
      })
    );

    setIsTaskModalOpen(false);
  };

  const onDeleteBtnClick = (e) => {
    dispatch(boardsSlice.actions.deleteTask({ taskIndex, colIndex }));
    setIsTaskModalOpen(false);
    setIsDeleteModalOpen(false);
  };

  return (
    <div
      onClick={onClose}
      className="fixed right-0 left-0 top-0 bottom-0 px-2 py-4 overflow-scroll scrollbar-hide z-50 justify-center items-center flex bg-[#00000080]"
    >
      {/* Modal Section */}
      <div
        className="scrollbar-hide overflow-y-scroll max-h-[95vh] my-auto bg-white dark:bg-[#2b2c37] text-black
             dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto w-full px-8 py-8 rounded-xl"
      >
        <div className="relative flex justify-between w-full items-center">
          <h1 className="text-lg">{task.title}</h1>

          <img
            src={elipsis}
            onClick={() => {
              setElipsisMenuOpen((state) => !state);
            }}
            alt="elipsis"
            className="cursor-pointer h-6"
          />

          {elipsisMenuOpen && (
            <ElipsisMenu
              type="Tarefa"
              setOpenEditModal={setOpenEditModal}
              setOpenDeleteModal={setOpenDeleteModal}
            />
          )}
        </div>

        <p className="text-gray-500 font-semibold tracking-wide text-sm pt-6">
          {task.description}
        </p>
        <p className="pt-6 text-gray-500 tracking-widest text-sm">
          Mini Tarefas ({completed} de {subtasks.length})
        </p>

        {/* Subtasks Section */}
        <div className="mt-3 space-y-2">
          {subtasks.map((subtask, index) => {
            return (
              <Subtask
                key={index}
                index={index}
                taskIndex={taskIndex}
                colIndex={colIndex}
              />
            );
          })}
        </div>

        {/* Current Status Section */}
        <div className="mt-8 flex flex-col space-y-3">
          <label className="text-sm dark:text-white text-gray-500">
            Status Atual
          </label>
          <select
            value={status}
            onChange={onChange}
            className="select-status flex-grow px-4 py-2 rounded-sm text-sm bg-transparent 
              focus:border-0 border border-gray-300 focus:outline-[#635fc7] outline-none"
          >
            {columns.map((column, index) => (
              <option key={index} className="status-options dark:bg-[#2b2c37]">
                {column.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isDeleteModalOpen && (
        <DeleteModal
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          onDeleteBtnClick={onDeleteBtnClick}
          title={task.title}
          type="task"
        />
      )}

      {isAddTaskModalOpen && (
        <AddEditTaskModal
          setOpenAddEditTask={setIsAddTaskModalOpen}
          type="edit"
          taskIndex={taskIndex}
          pervColIndex={colIndex}
          setIsTaskModalOpen={setIsTaskModalOpen}
        />
      )}
    </div>
  );
};
export default TaskModal;
