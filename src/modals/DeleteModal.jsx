const DeleteModal = ({
  type,
  title,
  onDeleteBtnClick,
  setIsDeleteModalOpen,
}) => {
  return (
    // Modal Container
    <div
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }

        setIsDeleteModalOpen(false);
      }}
      className="fixed right-0 bottom-0 left-0 top-0 px-2 py-4 overflow-scroll scrollbar-hide z-50 justify-center items-center flex bg-[#00000080]"
    >
      {/* Delete Modal */}
      <div className="scrollbar-hide max-w-md overflow-y-scroll max-h-[95vh] my-auto bg-white dark:bg-[#2b2c37] text-black dark:text-white w-full px-8 py-8 rounded-xl">
        <h3 className="font-bold text-red-500 text-xl">
          Deseja deletar este {type}?
        </h3>

        {type === "task" ? (
          <p className="text-gray-500 font-semibold tracking-wide text-sm pt-6">
            Tem certeza de que deseja excluir a tarefa "{title}" e suas
            subtarefas? Esta ação não pode ser revertida.
          </p>
        ) : (
          <p className="text-gray-500 font-semibold tracking-wide text-sm pt-6">
            Tem certeza de que deseja excluir o quadro "{title}"? Isso removerá
            todas as colunas e tarefas, está ação não poderá ser revertida.
          </p>
        )}

        <div className="flex w-full mt-4 items-center justify-center space-x-4">
          <button
            onClick={onDeleteBtnClick}
            className="w-full items-center font-semibold text-white hover:opacity-75 bg-red-500 py-2 rounded-full"
          >
            Deletar
          </button>

          <button
            onClick={() => setIsDeleteModalOpen(false)}
            className="w-full items-center font-semibold text-[#635fc7] hover:opacity-75 bg-[#635fc71a] py-2 rounded-full"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};
export default DeleteModal;
