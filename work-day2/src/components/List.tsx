import { useEffect, useState } from "react";
import { db } from "./firebase";
import {
  getDocs,
  collection,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import AddNewToDo from "./AddNewToDo";
import ToDoItemCard from "./ToDoItemCard";
import Logout from "./Logout";

type ToDoItem = {
  id: string;
  Name: string;
  Description: string;
  Checked: boolean;
};

function List() {
  const [toDoList, setToDoList] = useState<ToDoItem[]>([]);
  const toDoListCollectionRef = collection(db, "ToDoList");

  useEffect(() => {
    const getToDoList = async () => {
      try {
        const data = await getDocs(toDoListCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })) as ToDoItem[];
        setToDoList(filteredData);
      } catch (error) {
        console.error(error);
      }
    };
    getToDoList();
  }, []);

  const toggleChecked = async (id: string, current: boolean) => {
    const toDoDoc = doc(db, "ToDoList", id);
    try {
      await updateDoc(toDoDoc, {
        Checked: !current,
      });
      setToDoList((prevList) =>
        prevList.map((item) =>
          item.id === id ? { ...item, Checked: !current } : item
        )
      );
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const handleAdd = (item: ToDoItem) => {
    setToDoList((prevList) => [...prevList, item]);
  };

  const handleUpdate = (updatedItem: ToDoItem) => {
    setToDoList((prevList) =>
      prevList.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  const handleDelete = async (id: string) => {
    const deletToDo = doc(db, "ToDoList", id);
    try {
      await deleteDoc(deletToDo);
      setToDoList((prevList) => prevList.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-indigo-400 text-white p-8 rounded-xl shadow-md ">
          <header className="flex pb-4">
            <h1 className="text-3xl mx-30 ">To-Do List</h1>
            <Logout></Logout>
          </header>
          <AddNewToDo
            toDoListCollectionRef={toDoListCollectionRef}
            onAdd={handleAdd}
          />
          <div className="max-h-[500px] overflow-y-auto place-items-center flex flex-col gap-10">
            {toDoList.map((toDo) => (
              <ToDoItemCard
                key={toDo.id}
                item={toDo}
                onToggle={toggleChecked}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
    </div>
  );
}

export default List;
