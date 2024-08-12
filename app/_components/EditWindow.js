function EditWindow({
  newHeading,
  setNewHeading,
  newText,
  setNewText,
  handleUpdate,
  setIsOpen,
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[color:var(--color-violet-300)] rounded-lg p-6 w-96 space-y-4">
        <h2 className="text-xl font-semibold">Edit Message</h2>
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">Heading</label>
          <input
            type="text"
            value={newHeading}
            onChange={(e) => setNewHeading(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">Text</label>
          <textarea
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
        </div>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setIsOpen(false)}
            className="bg-[color:var(--color-red)] px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="bg-[color:var(--color-green-300)] hover:bg-[color:var(--color-green-400)] px-4 py-2 rounded-lg transition-all"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditWindow;
