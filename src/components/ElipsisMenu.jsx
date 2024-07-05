const ElipsisMenu = ({ type, setOpenEditModal, setOpenDeleteModal }) => {
  return (
    <div
      className={
        type === "Quadro" ? "absolute top-16 right-5" : "absolute top-6 right-4"
      }
    >
      <div className="flex justify-end items-center">
        <div
          className="w-44 text-sm z-50 font-medium shadow-md shadow-[#364e7e1a] bg-white 
                  dark:bg-[#20212c] space-y-4 py-5 px-4 rounded-lg h-auto pr-12"
        >
          <p
            onClick={() => {
              setOpenEditModal();
            }}
            className="cursor-pointer dark:text-gray-400 text-gray-700"
          >
            Editar {type}
          </p>

          <p
            onClick={() => {
              setOpenDeleteModal();
            }}
            className="cursor-pointer text-red-500"
          >
            Deletar {type}
          </p>
        </div>
      </div>
    </div>
  );
};
export default ElipsisMenu;
