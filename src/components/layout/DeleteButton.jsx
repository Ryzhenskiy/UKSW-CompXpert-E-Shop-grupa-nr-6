import { useState } from 'react';

const DeleteButton = ({ label, onDelete }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  if (showConfirm) {
    return (
      <div className="fixed  bg-black/80 inset-0 flex items-center justify-center h-full">
        <div className=" bg-white p-4 rounded-md">
          <div className="text-center font-semibold">
            Czy na pewno chcesz usunąć?
          </div>
          <div className="flex gap-2 mt-1">
            <button type="button" onClick={() => setShowConfirm(false)}>
              Odrzuć
            </button>
            <button
              type="button"
              className="primary"
              onClick={() => {
                onDelete();
                setShowConfirm(false);
              }}
            >
              Tak,&nbsp;usuń!
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setShowConfirm(true)}
      className="border-gray-600 hover:bg-gray-100"
    >
      {label}
    </button>
  );
};
export default DeleteButton;