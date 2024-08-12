function ModalConfirm({ message, onConfirm, onCancel, buttonText }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[color:var(--color-violet-300)] rounded-lg p-6 w-96 space-y-4">
        <p>{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="bg-[color:var(--color-gray-400)] px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-[color:var(--color-red)] px-4 py-2 rounded-lg transition-all font-semibold"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalConfirm;
