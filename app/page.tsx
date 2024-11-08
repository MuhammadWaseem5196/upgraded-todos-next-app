"use client";

import { useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState([
    { movie: "Karan Arjun", id: 1 },
    { movie: "Tera Baap Aya", id: 2 },
    { movie: "Kabhi Khushi Kabhi Gham", id: 3 },
    { movie: "Dilwale Dulhania Le Jayenge", id: 4 },
  ]);

  const [movieName, setMovieName] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  // Function to add or update items in the todo list
  const addOrUpdateItem = () => {
    if (!movieName.trim()) return; // Prevent adding empty items

    if (editId !== null) {
      // Update existing item
      setTodos((prevTodo) =>
        prevTodo.map((item) =>
          item.id === editId ? { ...item, movie: movieName } : item
        )
      );
    } else {
      // Add new item with a randomly generated id
      const newId = Math.floor(Math.random() * 10000) + 1;
      setTodos([...todos, { movie: movieName, id: newId }]);
    }

    setMovieName("");
    setEditId(null);
  };

  // Function to edit items
  const editItem = (id: number) => {
    const item = todos.find((todo) => todo.id === id);
    if (item) {
      setMovieName(item.movie);
      setEditId(item.id);
    }
  };

  // Function to delete items
  const deleteItem = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((item) => item.id !== id));
  };

  return (
    <div className="bg-gray-100 mx-auto max-w-4xl border-4 border-double border-gray-800 min-h-screen pb-10">
      {/* Heading */}
      <h1 className="text-center text-gray-800 text-4xl font-serif h-14 p-3 mt-4">
        TODO APP
      </h1>

      {/* Input Container */}
      <div className="mt-8 flex justify-center">
        <input
          type="text"
         value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
          placeholder="Enter Movie Name"
          className="w-96 h-12 p-3 border-4 rounded-md border-double border-gray-500 focus:outline-none hover:bg-gray-200 transition-colors duration-200"
        />
        <button
          onClick={addOrUpdateItem}
          className="ml-4 border-4 border-double border-gray-500 w-32 h-12 rounded-md text-xl text-white font-serif bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
        >
          {editId !== null ? "Update" : "Add"}
        </button>
      </div>

      {/* Todo List Display */}
      <h1 className="text-center mt-10 text-4xl font-serif text-gray-800">
        Tasks List
      </h1>

      {/* Grid Display */}
      <div className="grid grid-cols-2 gap-6 px-20 pt-4">
        {todos.map((item, i) => (
          <div
            key={item.id}
            className="h-28 w-80 bg-white shadow-lg border border-gray-300 rounded-md p-4 relative"
          >
            <div className="flex justify-between">
              <span className="text-xl font-semibold text-gray-800">
                {i + 1}
              </span>
              <span
                onClick={() => deleteItem(item.id)}
                className="text-xl cursor-pointer text-red-600"
              >
                ✕
              </span>
            </div>

            <div className="text-xl text-center pt-3 text-gray-800 font-medium">
              {item.movie}
            </div>

            {/* Edit Button */}
            <span
              onClick={() => editItem(item.id)}
              className="text-sm cursor-pointer text-blue-600 hover:underline absolute bottom-3 right-4"
            >
              Edit
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
