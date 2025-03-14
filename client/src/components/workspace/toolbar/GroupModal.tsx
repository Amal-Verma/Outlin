import React from 'react';

interface GroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGroup: () => void;
  groupName: string;
  setGroupName: (value: string) => void;
}

export const GroupModal: React.FC<GroupModalProps> = ({
  isOpen,
  onClose,
  onGroup,
  groupName,
  setGroupName,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-4 rounded-md">
        <h2 className="text-lg font-bold mb-2">Group Selected Objects</h2>
        <input
          className="w-full p-2 mb-2 border rounded-md"
          placeholder="Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button
            className="bg-red-500 p-2 rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-green-500 p-2 rounded-md"
            onClick={onGroup}
          >
            Group
          </button>
        </div>
      </div>
    </div>
  );
};
