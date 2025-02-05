// import {useState} from "react";
// import {v4 as uuidv4} from "uuid";
// import axios from "axios";

// export default function TodoList(){
//     let[todos,setTodos]=useState([]);
//     let[newTodo,setNewTodo]=useState("");
//     // let[trackIsDone,setTrackIsDone]=useState("");
    
//     const [items, setItems] = useState(0);
//     useEffect(() => {
//       const fetchItems = async () => {
//         try {
//           const response = await axios.get('/api/items');
//           setItems(response.data);
//         } catch (error) {
//           console.error('Error fetching items:', error);
//         }
//       };
//       fetchItems();
//     }, []);
// //  Function to increment the count
//     const incrementItem = () => {
//       setItems(prevItems => prevItems + 1);
//       console.log(items);
//     };

   
//     let addNewTask = async () => {
//       try {
//         const response = await axios.post('/api/items', {
//           item: newTodo,
//           count: 1,
//           isDone: false,
//         });
//         setTodos((prevTodos) => [...prevTodos, response.data]);
//         setNewTodo('');
//       } catch (error) {
//         console.error('Error adding new item:', error);
//       }
//     };

//     let updateTodo=(event)=>{
//         setNewTodo(event.target.value);
//     };

//     let incrementItemCount = async (id) => {
//       try {
//         const response = await axios.put(`/api/items/${id}`, {
//           count: item.count + 1,
//         });
//         setTodos((prevTodos) =>
//           prevTodos.map((todo) => {
//             if (todo.id === id) {
//               return response.data;
//             } else {
//               return todo;
//             }
//           })
//         );
//       } catch (error) {
//         console.error('Error incrementing item count:', error);
//       }
//     };
//     let markAsDone=(id)=>{
//         setTodos((prevTodos)=>prevTodos.map((todo)=>{
//             if(todo.id==id){
//                 return{
//                     ...todo,
//                     isDone:true,
//             }
//         }
//             else{
//                 return todo;
//             }
//         }))
//     }


// return (
//     <div>
//         <input
//             placeholder="Add Items"
//             value={newTodo}
//             onChange={updateTodo}
//         ></input>
//         <button onClick={addNewTask}>Add</button>
//         <br></br>
//         <br></br>
//         <br></br>
//         <hr></hr>
//         <h4>Grocery Items</h4>

//         <ul>
//             {todos.map((todo) => (
//                 <li key={todo.id}>
//                     <p
//                         style={
//                             todo.isDone
//                                 ? { textDecoration: "line-through" }
//                                 : {}
//                         }
//                     >
//                         {todo.task}
//                     </p>
//                     <button
//                         onClick={() => incrementItemCount(todo.id)}
//                         style={{ padding: "10px 20px", fontSize: "16px" }}
//                     >
//                         +
//                     </button>
//                     <span style={{ marginLeft: "10px" }}>{todo.count}</span>
//                     <button
//                         onClick={() => markAsDone(todo.id)}
//                         style={{ marginLeft: "10px" }}
//                     >
//                         Mark As Done
//                     </button>
//                 </li>
//             ))}
//         </ul>
        
//     </div>
// );
// }

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// export default function TodoList() {
//   const [todos, setTodos] = useState([]); // State to store todos
//   const [newTodo, setNewTodo] = useState(""); // State to store new todo input
//   const [items, setItems] = useState(0); // State to track the count of items
//   const [loading, setLoading] = useState(true); // Loading state
//   const [error, setError] = useState(null); // Error state

//   // Fetch todos from the database on page load
//   useEffect(() => {
//     setLoading(true); // Start loading
//     axios
//       .get("/items") // Fetch items (proxy handles the backend URL)
//       .then((response) => {
//         setTodos(response.data); // Set todos
//         setItems(response.data.length); // Update item count
//         setLoading(false); // Stop loading
//       })
//       .catch((err) => {
//         setError("Failed to fetch todos.");
//         setLoading(false); // Stop loading even if there's an error
//       });
//   }, []);


//   // Function to add a new todo
//   const addTodo = () => {
//     if (!newTodo.trim()) return; // Prevent empty submissions

//     const todoItem = { item: newTodo, count: 1, isDone: false };
//     axios
//       .post("/items", todoItem) // POST request to add new item
//       .then((response) => {
//         setTodos([...todos, response.data]); // Add the new item to the state
//         setItems(items + 1); // Update the items count
//         setNewTodo(""); // Clear the input field
//       })
//       .catch((error) => {
//         console.error("Error adding todo:", error);
//       });
//   };

//   // Function to toggle isDone status of a todo
//   const toggleIsDone = (id) => {
//     const todo = todos.find((t) => t._id === id);
//     const updatedTodo = { ...todo, isDone: !todo.isDone };

//     axios
//       .put(`/items/${id}`, updatedTodo) // PUT request to update the item
//       .then(() => {
//         setTodos(
//           todos.map((t) =>
//             t._id === id ? { ...t, isDone: !t.isDone } : t
//           )
//         );
//       })
//       .catch((error) => {
//         console.error("Error updating todo:", error);
//       });
//   };

//   // Function to delete a todo
// //   const deleteTodo = (id) => {
// //     axios
// //       .delete(`/items/${id}`) // DELETE request to remove the item
// //       .then(() => {
// //         setTodos(todos.filter((t) => t._id !== id)); // Remove item from state
// //         setItems(items - 1); // Decrease the items count
// //       })
// //       .catch((error) => {
// //         console.error("Error deleting todo:", error);
// //       });
// //   };

 
//  return (
//     <div>
//       <h1>Todo List</h1>
//       {loading && <p>Loading todos...</p>} {/* Show loading message */}
//       {error && <p style={{ color: "red" }}>{error}</p>} {/* Show error message */}

//       {!loading && !error && (
//         <>
//           <p>Total Items: {items}</p>
//           <input
//             type="text"
//             value={newTodo}
//             onChange={(e) => setNewTodo(e.target.value)}
//             placeholder="Add a new todo"
//           />
//           <button onClick={addTodo}>Add</button>

//           <ul>
//             {todos.map((todo) => (
//               <li
//                 key={todo._id}
//                 style={{
//                   textDecoration: todo.isDone ? "line-through" : "none",
//                 }}
//               >
//                 <span>{todo.item}</span>
//                 <button onClick={() => toggleIsDone(todo._id)}>
//                   {todo.isDone ? "Undo" : "Done"}
//                 </button>
//                 <button onClick={() => deleteTodo(todo._id)}>Delete</button>
//               </li>
//             ))}
//           </ul>
//         </>
//       )}
//     </div>
//   );
// }

















import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
const API_BASE_URL = "https://grocerylist-backend.onrender.com/api";

export default function TodoList() {
  let [todos, setTodos] = useState([]);
  let [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/items`);
        setTodos(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchItems();
  }, []);

  let addNewTask = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/items`, {
        item: newTodo,
        count: 1,
        isDone: false,
      });
      setTodos((prevTodos) => [...prevTodos, response.data]);
      setNewTodo("");
    } catch (error) {
      console.error("Error adding new item:", error);
    }
  };

  let updateTodo = (event) => {
    setNewTodo(event.target.value);
  };

  let incrementItemCount = async (id) => {
    try {
      console.log("Incrementing item count");
      const response = await axios.put(`${API_BASE_URL}/items/${id}`); // Backend increments count
      setTodos((prevTodos) => {
        const updatedTodos = prevTodos.map((todo) =>
          todo._id === id ? { ...todo, count: response.data.count } : todo
        );
        console.log("Updated todos state:", updatedTodos);
        return [...updatedTodos]; 
      });
    } catch (error) {
      console.error("Error incrementing item count:", error);
    }
  };
  

  let markAsDone = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo._id === id) {
          return {
            ...todo,
            isDone: true,
          };
        } else {
          return todo;
        }
      })
    );
  };

  return (
    <div>
      <input
        placeholder="Add Items"
        value={newTodo}
        onChange={updateTodo}
      ></input>
      <button onClick={addNewTask}>Add</button>
      <br />
      <br />
      <br />
      <hr />
      <h4>Grocery Items</h4>

      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            <p
              style={
                todo.isDone
                  ? { textDecoration: "line-through" }
                  : {}
              }
            >
              {todo.item}
            </p>
            <button
              onClick={() => incrementItemCount(todo._id)}
              style={{ padding: "10px 20px", fontSize: "16px" }}
            >
              +
            </button>
            <span style={{ marginLeft: "10px" }}>
              {todo.count}
            </span>
            <button
              onClick={() => markAsDone(todo._id)}
              style={{ marginLeft: "10px" }}
            >
              Mark As Done
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}