import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

type ToDoItem = {
  id: string;
  Name: string;
  Description: string;
  Checked: boolean;
};

type Props = {
  item: ToDoItem;
  onToggle: (id: string, current: boolean) => void;
  onUpdate: (updatedItem: ToDoItem) => void;
  onDelete: (id: string) => void;
};

export default function ToDoItemCard({
  item,
  onToggle,
  onUpdate,
  onDelete,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(item.Name);
  const [editedDescription, setEditedDescription] = useState(item.Description);

  const handleSave = async () => {
    const toDoDoc = doc(db, "ToDoList", item.id);
    try {
      await updateDoc(toDoDoc, {
        Name: editedName,
        Description: editedDescription,
      });

      onUpdate({
        ...item,
        Name: editedName,
        Description: editedDescription,
      });

      setIsEditing(false);
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  return (
    <div className="w-full pr-5">
      {isEditing ? (
        <div className="flex justify-between gap-2 flex-col">
          <input
            type="text"
            value={editedName}
            className="border-2 focus:outline-violet-500 pl-2 rounded-sm"
            onChange={(e) => setEditedName(e.target.value)}
          />
          <input
            type="text"
            value={editedDescription}
            className="border-2 focus:outline-violet-500 pl-2 rounded-sm"
            onChange={(e) => setEditedDescription(e.target.value)}
          />
          <div className="flex gap-2 sm:justify-between justify-end">
            <button onClick={handleSave}>
              <i className="fi-rs-check text-green-700"></i>
            </button>
            <button onClick={() => setIsEditing(false)}>
              <i className="fi-rs-circle-cross text-red-700"></i>
            </button>
          </div>
        </div>
      ) : (
        <>
          <h1 className="text-2xl">{item.Name}</h1>
          <div className="flex w-full justify-between flex-col sm:flex-row">
            <p>{item.Description}</p>
            <div className="flex w-15 gap-2 self-end">
              <button onClick={() => setIsEditing(true)}>
                <i className="fi-rs-attribution-pencil"></i>
              </button>
              <button onClick={() => onDelete(item.id)}>
                <i className="fi-rs-trash-can-list"></i>
              </button>
              <label>
                <input
                  type="checkbox"
                  checked={item.Checked}
                  onChange={() => onToggle(item.id, item.Checked)}
                />
              </label>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
