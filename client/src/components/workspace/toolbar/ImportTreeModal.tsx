import React from 'react';

interface ImportTreeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: () => void;
  jsonString: string;
  setJsonString: (value: string) => void;
  prefix: string;
  setPrefix: (value: string) => void;
  groupName: string;
  setGroupName: (value: string) => void;
}

export const ImportTreeModal: React.FC<ImportTreeModalProps> = ({
  isOpen,
  onClose,
  onImport,
  jsonString,
  setJsonString,
  prefix,
  setPrefix,
  groupName,
  setGroupName,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-4 rounded-md">
        <h2 className="text-lg font-bold mb-2">Import Tree</h2>
        <textarea
          className="w-full p-2 mb-2 border rounded-md"
          placeholder="JSON String"
          value={jsonString}
          onChange={(e) => setJsonString(e.target.value)}
        />
        <input
          className="w-full p-2 mb-2 border rounded-md"
          placeholder="Prefix"
          value={prefix}
          onChange={(e) => setPrefix(e.target.value)}
        />
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
            onClick={onImport}
          >
            Import
          </button>
        </div>
      </div>
    </div>
  );
};
