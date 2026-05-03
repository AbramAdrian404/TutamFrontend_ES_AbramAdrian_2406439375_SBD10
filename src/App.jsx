import { useEffect, useState } from "react"
import axios from "axios"

function App() {
  const [todos, setTodos] = useState([])
  const [text, setText] = useState("")

  const fetchTodos = async () => {
    const res = await axios.get("http://localhost:5000/todos")
    setTodos(res.data)
  }

  const addTodo = async () => {
    if (!text) return
    await axios.post("http://localhost:5000/todos", { text })
    setText("")
    fetchTodos()
  }

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/todos/${id}`)
    fetchTodos()
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Todo App</h1>

      <div style={styles.inputContainer}>
        <input
          style={styles.input}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add new task..."
        />
        <button style={styles.addBtn} onClick={addTodo}>
          Add
        </button>
      </div>

      <div style={styles.list}>
        {todos.map((t) => (
          <div key={t._id} style={styles.card}>
            <div style={styles.cardLeft}>
              <div style={styles.circle}></div>
            </div>

            <div style={styles.cardContent}>
              <p style={styles.text}>{t.text}</p>
              <p style={styles.sub}>Today • Normal</p>
            </div>

            <button
              style={styles.deleteBtn}
              onClick={() => deleteTodo(t._id)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

const styles = {
  container: {
    background: "#1e1f26",
    minHeight: "100vh",
    padding: "40px",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  title: {
    fontSize: "40px",
    marginBottom: "20px"
  },
  inputContainer: {
    display: "flex",
    gap: "10px",
    marginBottom: "30px"
  },
  input: {
    padding: "10px",
    width: "250px",
    borderRadius: "8px",
    border: "none"
  },
  addBtn: {
    padding: "10px 15px",
    borderRadius: "8px",
    border: "none",
    background: "#4CAF50",
    color: "white",
    cursor: "pointer"
  },
  list: {
    width: "400px"
  },
  card: {
    display: "flex",
    alignItems: "center",
    background: "#2c2f3a",
    padding: "15px",
    borderRadius: "12px",
    marginBottom: "15px"
  },
  cardLeft: {
    marginRight: "10px"
  },
  circle: {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    border: "2px solid orange"
  },
  cardContent: {
    flex: 1
  },
  text: {
    margin: 0,
    fontSize: "16px"
  },
  sub: {
    margin: 0,
    fontSize: "12px",
    color: "#aaa"
  },
  deleteBtn: {
    background: "red",
    color: "white",
    border: "none",
    borderRadius: "8px",
    padding: "5px 10px",
    cursor: "pointer"
  }
}

export default App