import { createSlice } from '@reduxjs/toolkit'

export const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        todos: []
    },
    reducers: {
        addTodos: (state, action) => {
            state.todos = action.payload
        },

        addSingleTodo: (state, action) => {
            state.todos.push(action.payload)
        },

        deleteTodo: (state, action) => {
            const todoId = action.payload
            state.todos = state.todos.filter(todo =>todo._id !== todoId)
        }
    }
})

export const {addTodos, addSingleTodo, deleteTodo} = todoSlice.actions
export default todoSlice.reducer 