import {
  TodosQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useTodosQuery,
  useUpdateTodoMutation,
} from '@/generated/request'
import { FC, FormEvent, useEffect, useState } from 'react'

export const TodoList: FC = () => {
  const [todoTitle, setTodoTitle] = useState('')
  const [todos, setTodos] = useState<TodosQuery['todos']>([])
  const { loading, error, data } = useTodosQuery()
  const [addTodoMutation] = useAddTodoMutation()
  const [updateTodoMutation] = useUpdateTodoMutation()
  const [deleteTodoMutation] = useDeleteTodoMutation()

  useEffect(() => {
    setTodos(data?.todos ?? [])
  }, [data?.todos])

  if (loading) {
    return <div>loading...</div>
  }

  if (error) {
    return <div>error!</div>
  }

  if (!data?.todos) {
    return null
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    console.log('addedTodo')
    // e.preventDefault()

    const { data } = await addTodoMutation({ variables: { title: todoTitle } })
    const addedTodo = data?.addTodo

    console.log('addedTodo', addedTodo)

    if (!addedTodo) {
      return
    }

    setTodos([addedTodo, ...todos])
    setTodoTitle('')
  }

  return (
    <div className="p-5 border rounded">
      Todo List
      <form className="flex gap-2" onSubmit={handleSubmit}>
        <input
          className="p-2 border"
          type="text"
          value={todoTitle}
          onChange={(e) => setTodoTitle(e.target.value)}
        />
        <button className="bg-gray-200 p-2">追加</button>
      </form>
    </div>
  )
}
