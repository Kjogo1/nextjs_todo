'use client'
import { redirect } from 'next/navigation'
import { useState, useEffect } from "react";
require('./todo.css')

export default function Index() {

    const [todos, setTodos] = useState([])
    const [todo, setTodo] = useState("")
    const [editTodoValue, setEditTodoValue] = useState("")
    const [error, setError] = useState("")
    const [editError, setEditError] = useState("")
    const [search, setSearch] = useState("")
    const [searchTodo, setSearchTodo] = useState([])
    const [checkSearch, setCheckSearch] = useState(false)

    const onchange = (e) => {
        setTodo(e.target.value)
    }

    const data = async () => {
        const get = await fetch(`/api/todo`)
        setTodos(await get.json())
    }

    useEffect(() => {
        data()
        return () => {
            data()
        }
    }, [todos])



    const submit = async (e) => {
        e.preventDefault()

        setError("")
        if (todo !== null || todo !== undefined) {
            const data = await fetch(`/api/todo`, {
                method: 'POST',
                body: JSON.stringify(todo),
                headers: {
                    'Content-type': 'application/json',
                },
            })
            const message = await data.json()
            setError(message.message)
            // console.log(await data.json())
        } else {
            setError("Todo are required")
        }
        setTodo("")
    }

    const editTodoSubmit = async (id, e) => {
        e.preventDefault()
        setEditError("")

        // console.log(editTodoValue)
        if (editTodoValue !== null || editTodoValue !== undefined) {
            const data = await fetch(`/api/todo/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(editTodoValue),

            })
            // console.log(editTodoValue)
            const message = await data.json()
            setEditError(message.message)

        } else {
            setEditError("Todo are required")
        }
        setEditTodoValue("")
    }

    const updateIsCompleted = async (id, isCompleted, e) => {
        e.preventDefault()

        if (isCompleted == true) {
            isCompleted = false
        } else {
            isCompleted = true
        }
        console.log(JSON.stringify(isCompleted))

        const data = await fetch(`/api/todo/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(isCompleted),
        })
        console.log(await data.json())
    }

    const deleteTodo = async (id, e) => {
        e.preventDefault()

        const data = await fetch(`/api/todo/${id}`, {
            method: 'DELETE',
        })
        console.log(await data.json())
    }

    const onSearch = async (e) => {
        e.preventDefault()
        setCheckSearch(true)
        setSearchTodo(todos.filter((todo) => todo.todo === search))
        // redirect("/search", search)
    }

    return (
        <main className="m-5">

            <div className="flex m-2 flex-row justify-between items-center">
                <h2 className="text-bold text-3xl">
                    Todo
                </h2>

                <form onSubmit={onSearch}>
                    <div className="mb-6">
                        <label htmlFor="Todo" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Search Todo lists</label>
                        <input type="Todo" id="Todo" name="todo" onChange={(e) => setSearch(e.target.value)} value={search} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="input Todo" required />
                    </div>
                    <input type="submit" hidden />
                </form>
            </div>

            <form onSubmit={submit} method="POST" >
                <div className="mb-6 w-3/6">
                    <label htmlFor="Todo" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Create Todo Task</label>
                    <input type="Todo" id="Todo" name="todo" onChange={onchange} value={todo} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="input Todo" required />
                    <span>{error ? error : ""}</span>
                </div>
                <input type="submit" hidden />
            </form>

            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Todo
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Is Completed
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Created At
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            checkSearch ?
                            searchTodo.length ? searchTodo.map((todo) =>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hoverShow" key={todo.id}>
                                <th scope="row" className="px-6 py-4" >
                                    {todo.id}
                                </th>
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white hoverTd">
                                    <span className={todo.isCompleted ? "hoverSpan line-through text-red-500" : "hoverSpan"}>{todo.todo}</span>
                                    <form onSubmit={(e) => editTodoSubmit(todo.id, e)} method="POST" className="hoverHidden">
                                        <div className="mb-6">
                                            <input type="Todo" id="Todo" name="todo" onChange={(e) => setEditTodoValue(e.target.value)} value={editTodoValue} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="input Todo" required />
                                        </div>
                                        <input type="submit" hidden />
                                    </form>
                                </td>
                                <td className="px-6 py-4 flex flex-row items-center hoverTd">
                                    <span className="hoverSpan">{todo.isCompleted ? "Completed" : "Not Completed"}</span>
                                    <form onSubmit={(e) => updateIsCompleted(todo.id, todo.isCompleted, e)} method="POST">
                                        <button type="submit" className="p-2 rounded bg-blue-500 hover:text-white mx-2 text-black hoverHidden">
                                            {todo.isCompleted ? "Completed" : "Not Completed"}
                                        </button>
                                    </form>

                                </td>
                                <td className="px-6 py-4">
                                    {todo.createdAt}
                                </td>
                                <td className="px-6 py-4 flex flex-row">
                                    <form onSubmit={(e) => deleteTodo(todo.id, e)}>
                                        <button type="submit" className="p-2 rounded bg-red-500 hover:text-white mx-2 text-black showButton">
                                            Remove
                                        </button>
                                    </form>


                                </td>
                            </tr>) : <tr><td rowSpan="5" className='text-xl'>No Todo Found! Create a new one</td></tr>:
                            todos.map((todo) =>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hoverShow" key={todo.id}>
                                <th scope="row" className="px-6 py-4" >
                                    {todo.id}
                                </th>
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white hoverTd">
                                    <span className={todo.isCompleted ? "hoverSpan line-through text-red-500" : "hoverSpan"}>{todo.todo}</span>
                                    <form onSubmit={(e) => editTodoSubmit(todo.id, e)} method="POST" className="hoverHidden">
                                        <div className="mb-6">
                                            <input type="Todo" id="Todo" name="todo" onChange={(e) => setEditTodoValue(e.target.value)} value={editTodoValue} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="input Todo" required />
                                        </div>
                                        <input type="submit" hidden />
                                    </form>
                                </td>
                                <td className="px-6 py-4 flex flex-row items-center hoverTd">
                                    <span className="hoverSpan">{todo.isCompleted ? "Completed" : "Not Completed"}</span>
                                    <form onSubmit={(e) => updateIsCompleted(todo.id, todo.isCompleted, e)} method="POST">
                                        <button type="submit" className="p-2 rounded bg-blue-500 hover:text-white mx-2 text-black hoverHidden">
                                            {todo.isCompleted ? "Completed" : "Not Completed"}
                                        </button>
                                    </form>

                                </td>
                                <td className="px-6 py-4">
                                    {todo.createdAt}
                                </td>
                                <td className="px-6 py-4 flex flex-row">
                                    <form onSubmit={(e) => deleteTodo(todo.id, e)}>
                                        <button type="submit" className="p-2 rounded bg-red-500 hover:text-white mx-2 text-black showButton">
                                            Remove
                                        </button>
                                    </form>


                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </main>
    )
}