import React, { useEffect, useState } from 'react'
import axios from 'axios'

const API_BASE = "https://task-management-react-django-4.onrender.com"

export default function Gettodo() {
    const [todos, settodos] = useState([])
    const [reload, setreload] = useState(false)
    const [show, setshow] = useState(false)
    const [title, settitle] = useState("")
    const [description, setdescription] = useState("")
    const [updateId, setUpdateId] = useState(null)

    useEffect(() => {
        axios.get(`${API_BASE}/todos/`)
            .then((response) => settodos(response.data))
            .catch(() => alert("Error fetching todos"))
    }, [reload])

    const delete_todo = (id) => {
        axios.delete(`${API_BASE}/todos/${id}/`)
            .then(() => {
                alert("Todo deleted")
                setreload(!reload)
            })
            .catch(() => alert("Error deleting todo"))
    }

    const update_todo = (todo) => {
        setshow(true)
        settitle(todo.title)
        setdescription(todo.description)
        setUpdateId(todo.id)
    }

    const update = (e) => {
        e.preventDefault()
        axios.put(`${API_BASE}/todos/${updateId}/`, { title, description })
            .then((res) => {
                if (res.status === 200) {
                    alert("Todo updated successfully")
                    setshow(false)
                    setreload(!reload)
                }
            })
            .catch(() => alert("Error in update method"))
    }

    return (
        <div id='con' className="container mt-5">
            <table className="table table-striped table-bordered"  style={{ backgroundColor: "beige"}}>
                <thead className='table-light'>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Created At</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.length === 0 ? (
                        <tr>
                            <td colSpan="5">
                                <div className="alert alert-dark text-center">
                                    No Todos found. Add your first Todo!
                                </div>
                            </td>
                        </tr>
                    ) : (
                        todos.map((todo, index) => (
                            <tr key={todo.id}>
                                <td>{index + 1}</td>
                                <td>{todo.title}</td>
                                <td>{todo.description}</td>
                                <td>{todo.created_at ? new Date(todo.created_at).toLocaleString() : "N/A"}</td>
                                <td>
                                    <button className="btn btn-outline-warning btn-sm me-2" onClick={() => update_todo(todo)}>UPDATE</button>
                                    <button className="btn btn-outline-danger btn-sm" onClick={() => delete_todo(todo.id)}>DELETE</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {show &&
                <div className="modal show d-block">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Update Todo</h5>
                                <button type="button" className="btn-close" onClick={() => setshow(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={update}>
                                    <div className="mb-3">
                                        <label htmlFor="title" className="fs-4  form-label">Todo title</label>
                                        <input type="text" className="form-control" id="title" value={title} onChange={(e) => settitle(e.target.value)} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="desc" className="form-label">Todo Description</label>
                                        <input type="text" className="form-control" id="desc" value={description} onChange={(e) => setdescription(e.target.value)} required />
                                    </div>
                                    <button type="submit" className="btn btn-outline-dark">Update Todo</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
