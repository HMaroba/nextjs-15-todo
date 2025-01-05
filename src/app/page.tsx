// 'use client'

// import { useState, useEffect } from 'react'
// import { NextRequest, NextResponse } from "next/server"

// export default function Home() {
//   const [title, setTitle] = useState('')
//   const [description, setDescription] = useState('')
//   const [todos, setTodos] = useState([])

//   useEffect(() => {
//     fetchTodos()
//   }, [])

//   const fetchTodos = async () => {
//     try {
//       const response = await fetch('/api/v1/todo')
//       const data = await response.json()
//       if (data.status === 200) {
//         setTodos(data.todos)
//         console.log(data);
        
//       }
//     } catch (error) {
//       console.error('Error fetching todos:', error)
//     }
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     try {
//       const response = await fetch('/api/v1/todo', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ title, description }),
//       })
//       const data = await response.json()
//       if (data.status === 201) {
//         setTitle('')
//         setDescription('')
//         fetchTodos()
//       }
//     } catch (error) {
//       console.error('Error creating todo:', error)
//     }
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h2 className="text-3xl font-bold mb-6">Todo App and Prisma Pagination</h2>
      
//       <form onSubmit={handleSubmit} className="mb-8 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
//             Title
//           </label>
//           <input
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             id="title"
//             type="text"
//             placeholder="Enter todo title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-6">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
//             Description
//           </label>
//           <textarea
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
//             id="description"
//             placeholder="Enter todo description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//           />
//         </div>
//         <div className="flex items-center justify-between">
//           <button
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             type="submit"
//           >
//             Add Todo
//           </button>
//         </div>
//       </form>
      
//       <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
//         <h3 className="text-xl font-bold mb-4">Todo List</h3>
//         {todos.length === 0 ? (
//           <p className="text-gray-600">No todos found.</p>
//         ) : (
//           <ul className="divide-y divide-gray-200">
//             {todos.map((todo: any) => (
//               <li key={todo.id} className="py-4">
//                 <h4 className="text-lg font-medium text-gray-900">{todo.title}</h4>
//                 <p className="mt-2 text-gray-600">{todo.description}</p>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   )
// }


'use client'

import { useState, useEffect } from 'react'
import { NextRequest, NextResponse } from "next/server"

export default function Home() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [todos, setTodos] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchTodos()
  }, [currentPage, search])

  const fetchTodos = async () => {
    try {
      const response = await fetch(`/api/v1/todo?page=${currentPage}&search=${search}`)
      const data = await response.json()
      if (data.status === 200) {
        setTodos(data.todos)
        setTotalPages(data.totalPages)
        console.log(data)
      }
    } catch (error) {
      console.error('Error fetching todos:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/v1/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      })
      const data = await response.json()
      if (data.status === 201) {
        setTitle('')
        setDescription('')
        fetchTodos()
      }
    } catch (error) {
      console.error('Error creating todo:', error)
    }
  }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    setCurrentPage(1)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Todo App and Prisma Pagination</h2>
      
      <form onSubmit={handleSubmit} className="mb-8 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Enter todo title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            placeholder="Enter todo description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Add Todo
          </button>
        </div>
      </form>
      
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search todos"
          value={search}
          onChange={handleSearch}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h3 className="text-xl font-bold mb-4">Todo List</h3>
        {todos.length === 0 ? (
          <p className="text-gray-600">No todos found.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {todos.map((todo: any) => (
              <li key={todo.id} className="py-4">
                <h4 className="text-lg font-medium text-gray-900">{todo.title}</h4>
                <p className="mt-2 text-gray-600">{todo.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === page
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  )
}

