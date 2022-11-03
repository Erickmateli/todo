import {createSlice} from "@reduxjs/toolkit";

//get items from the local storage
const getInitialTodo = () =>{
    const localTodoList = window.localStorage.getItem('todoList');
    //check if item exists and parse it to become an object
    if(localTodoList){
        return JSON.parse(localTodoList)
    }
    window.localStorage.setItem('todoList',JSON.stringify([]));
    return []
}

//load the initial value
const initialValue = {
    todoList: getInitialTodo(),
}

//create the slice 
export const todoSlice = createSlice({
    name: 'todo',
    initialState: initialValue,
    reducers: {
        addTodo: (state,action) =>{
            state.todoList.push(action.payload);
            const todoList = window.localStorage.getItem('todoList');
            if(todoList){
                const todoListArr = JSON.parse(todoList);
                todoListArr.push({
                    ...action.payload,
                });
                window.localStorage.setItem('todoList',JSON.stringify(todoListArr));
            }else{
                window.localStorage.setItem(
                    'todoList',
                    JSON.stringify([{...action.payload}])
                )
            }
        },
        deleteTodo:(state,action) =>{
            //get all the items from the local storage
            const todoList = window.localStorage.getItem('todoList');
            //check if the list exists and parse it as an array
            if(todoList){
                const todoListArr = JSON.parse(todoList);
                //check which item you want to delete by looping through and pass the id- from the payload
                todoListArr.forEach((todo,index) => {
                    if(todo.id === action.payload){
                        todoListArr.splice(index,1)
                    }
                });
                //set the to do list to the local storage
                window.localStorage.setItem('todoList',JSON.stringify(todoListArr));
                //update the state with new one
                state.todoList = todoListArr;
            }
        },
        updateTodo: (state,action) =>{
            const todoList = window.localStorage.getItem('todoList');
            if(todoList){
                const todoListArr = JSON.parse(todoList);
                  //check which item you want to delete by looping through and pass the id- from the payload
                  todoListArr.forEach((todo,index) => {
                    if(todo.id === action.payload.id){
                       todo.title = action.payload.title;
                       todo.dueDate = action.payload.dueDate;
                       todo.status = action.payload.status;
                    }
                });
                //set the to do list to the local storage
                window.localStorage.setItem('todoList',JSON.stringify(todoListArr));
                 //update the state with new one
                 state.todoList = todoListArr;
            }
        }
    }
})
export const {addTodo,deleteTodo,updateTodo } = todoSlice.actions;
export default todoSlice.reducer;