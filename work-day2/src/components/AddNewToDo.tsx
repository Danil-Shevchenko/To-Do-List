import { useState } from "react";
import { addDoc, CollectionReference } from "firebase/firestore";

type Props = {
  toDoListCollectionRef: CollectionReference;
  onAdd: (item: {
    id: string;
    Name: string;
    Description: string;
    Checked: boolean;
  }) => void;
};

export default function AddNewToDo({ toDoListCollectionRef, onAdd }: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [checked, setChecked] = useState(false);

  const addNewToDo = async () => {
    if (!name.trim() || !description.trim()) {
      alert("Please fill in both Name and Description");
      return;
    }

    try {
      const newToDo = {
        Name: name,
        Description: description,
        Checked: checked,
      };
      const docRef = await addDoc(toDoListCollectionRef, newToDo);
      onAdd({ ...newToDo, id: docRef.id });

      setName("");
      setDescription("");
      setChecked(false);
    } catch (error) {
      console.error("Error adding new to-do: ", error);
    }
  };

  return (
    <div className="flex flex-col justify-between gap-2 pb-4 sm:flex-row">
      <input 
        className="border-2 focus:outline-violet-500 pl-2 rounded-sm"
        type="text"
        placeholder="Name"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
       className="border-2 focus:outline-violet-500 pl-2 rounded-sm"
        placeholder="Description"
        required
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={addNewToDo}>
        <i className="fi-rs-plus"></i>
      </button>
    </div>
  );
}
