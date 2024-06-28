import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import crossIcon from "../assets/icon-cross.svg";
import { useDispatch } from "react-redux";
import boardSlices from "../redux/boardsSlice.js";

const AddEditBoardModal = ({ setBoardModalOpen, type }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [isValid, setIsValid] = useState(true);

  const [newColumn, setNewColumn] = useState([
    { name: "A fazer", task: [], id: uuidv4() },
    { name: "Fazendo", task: [], id: uuidv4() },
  ]);

  const onChange = (id, newValue) => {
    setNewColumn((pervState) => {
      const newState = [...pervState];
      const column = newState.find((col) => col.id === id);
      column.name = newValue;
      return newState;
    });
  };

  const onDelete = (id) => {
    setNewColumn((perState) => perState.filter((el) => el.id !== id));
  };

  const validate = () => {
    setIsValid(false);
    if (!name.trim()) {
      return false;
    }

    for (let i = 0; i < newColumn.length; i++) {
      if (!newColumn[i].name.trim()) {
        return false;
      }
    }

    setIsValid(true);
    return true;
  };

  const onSubmit = (type) => {
    setBoardModalOpen(false);
    if (type === "add") {
      // dispatch
      dispatch(boardSlices.actions.addBoard({ name, newColumn }));
    } else {
      // dispatch
      dispatch(boardSlices.actions.editBoard({ name, newColumn }));
    }
  };

  return (
    <div
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }

        setBoardModalOpen(false);
      }}
      className="fixed right-0 top-0 px-2 py-4 overflow-scroll scrollbar-hide  z-50 left-0 bottom-0 justify-center items-center flex dropdown"
    >
      {/* Modal Section */}
      <div
        className=" scrollbar-hide overflow-y-scroll max-h-[95vh]  bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold
       shadow-md shadow-[#364e7e1a] max-w-md mx-auto my-auto w-full px-8  py-8 rounded-xl"
      >
        <h3 className="text-lg">
          {type === "edit" ? "Editar" : "Novo"} Quadro
        </h3>

        {/* Task Name */}
        <div className="mt-8 flex flex-col space-y-3">
          <label className="text-sm dark:text-white text-gray-500">
            Nome do Quadro
          </label>
          <input
            type="text"
            placeholder="Desenvolver Web App"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            id="board-name-input"
            className="bg-transparent px-4 py-2 rounded-md outline-none text-sm border border-gray-600 focus:outline-[#635fc7] outline-1 ring-0"
          />
        </div>

        {/* Board Columns */}
        <div className="mt-8 flex flex-col space-y-3">
          <label className="text-sm dark:text-white text-gray-500">
            Colunas do Quadro
          </label>
          {newColumn.map((column, index) => (
            <div key={index} className="flex items-center w-full">
              <input
                type="text"
                onChange={(e) => {
                  onChange(column.id, e.target.value);
                }}
                value={column.name}
                className="bg-transparent flex-grow px-4 py-2 rounded-md text-sm border border-gray-600 outline-none focus:outline-[#735fc7]"
              />
              <img
                src={crossIcon}
                alt="cross icon"
                onClick={() => {
                  onDelete(column.id);
                }}
                className="cursor-pointer m-4"
              />
            </div>
          ))}
        </div>

        <div className="">
          <button
            onClick={() => {
              setNewColumn((state) => [
                ...state,
                { name: "", task: [], id: uuidv4() },
              ]);
            }}
            className="w-full items-center hover:opacity-75 mt-2 dark:text-[#635fc7] dark:bg-white text-white bg-[#635fc7] py-2 rounded-full"
          >
            + Nova Coluna
          </button>

          <button
            onClick={() => {
              const isValid = validate();
              if (isValid === true) onSubmit(type);
            }}
            className="w-full items-center hover:opacity-75 dark:text-white dark:bg-[#635fc7] mt-8 relative text-white bg-[#635fc7] py-2 rounded-full"
          >
            {type === "add" ? "Criar novo Quadro" : "Salvar mudanças"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default AddEditBoardModal;
