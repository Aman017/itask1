import { useState, useEffect } from 'react'
import Navbar from './componets/Navbar'
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';



function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinsh, setshowFinsh] = useState(true)

  useEffect(() => {
    let todostring = localStorage.getItem("todos")

    if (todostring) {

      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }

  }, [])


  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))

  }
  const toggleFinsh = (e) => {
    setshowFinsh(!showFinsh)

  }



  const HandelEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLS()
  }
  const HandelDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLS()
  }
  const HandleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleated: false }])
    setTodo("")

    saveToLS()
  }
  const HandleChange = (e) => {
    setTodo(e.target.value)

  }
  const HandelCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })

    let newTodos = [...todos];
    newTodos[index].isCompleated = !newTodos[index].isCompleated;
    setTodos(newTodos)
    saveToLS()

  }


  return (
    <>
      <Navbar />
      <div className="md:conatiner mx-3 md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-1/2">
      <h1 className='font-bold text-center text-xl'>iTask - for your task memo</h1>
        <div className="addTodo my-5 flex flex-col gap-5">
          <h2 className='text-lg font-bold'>Add a Todo</h2>
          <div className="flex mx-3">
            
          <input onChange={HandleChange} value={todo} type="text" className='w-full rounded-full px-5 py-2' />
          <button onClick={HandleAdd} disabled={todo.length<=3} className='bg-violet-800 disabled:bg-violet-700 hover:bg-violet-950 p-4 py-2 text-sm font-bold text-white rounded-full mx-5 '>Save</button>
        </div>
        
        </div>
        <input className='my-4'id='show' onChange={toggleFinsh} type="checkbox" checked={showFinsh} />
        <label htmlFor="show"> Show Finshed</label>
        <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>
        <h2 className="text-lg font-bold">
          Your Todo
        </h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-5'>no todos</div>}
          {todos.map(item => {
            return (showFinsh || !item.isCompleated) && <div key={item.id} className="todo flex md:w-1/2 justify-between my-3">
              <div className='flex gap-6'>

                <input name={item.id} onChange={HandelCheckbox} type="checkbox" checked={item.isCompleated} id="" />
                <div className={item.isCompleated ? "line-through" : ""}>{item.todo}</div>

              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => HandelEdit(e, item.id)} className='bg-violet-800 hover:bg-violet-950 p-3 py-1 text-sm font-bold text-white rounded-md mx-1'><FaRegEdit /></button>
                <button onClick={(e) => { HandelDelete(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 p-3 py-1 text-sm font-bold text-white rounded-md mx-1'><MdDeleteForever /></button>
              </div>
            </div>
          })}
        </div>


      </div>
    </>
  )
}

export default App
