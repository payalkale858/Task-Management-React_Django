import axios from 'axios'
import React, { useState } from 'react'

export default function Todo() {

  let [title, settitle] = useState("")
  let [description, setdescription] = useState("")

  let add_todo = (event) => {
    event.preventDefault()
const API_BASE = "https://task-management-react-django-4.onrender.com";

    axios.post(`${API_BASE}/todos/`, {
      title: title,
      description: description
    })
      .then(() => {
        alert("Todo added successfully")
        settitle("")
        setdescription("")
      })
      .catch(() => {
        alert("Error in Todo adding method")
      })
  }

  return (
    <div className="container my-3">
      <h2 className='text-center'>Add a Todo</h2>

      <form onSubmit={add_todo}>
        <div className="mb-3 fs-4">
          <label htmlFor="title" className="form-label">
            Todo title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => settitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3 fs-4">
          <label htmlFor="desc" className="form-label">
            Todo Description
          </label>
          <input
            type="text"
            className="form-control"
            id="desc"
            value={description}
            onChange={(e) => setdescription(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-outline-warning">
          Submit
        </button>
      </form>
    </div>
  )
}
