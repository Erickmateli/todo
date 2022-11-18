import {createSlice} from "@reduxjs/toolkit";

//get items from the local storage
const getInitialTodo = () =>{
    const localTodoList = window.localStorage.getItem('todoList');
    //check if item exists and parse it to become an object
    if(localTodoList){
        return JSON.parse(localTodoList)
    }
    //else pass an empty array
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
            //update the new state with todo by pushing it to an array with the payload at the action
            state.todoList.push(action.payload);

            //change the contents in the local storage get the item and check if it exists then update it
            const todoList = window.localStorage.getItem('todoList');
           
            if(todoList){
                //convert it to an array/object
                const todoListArr = JSON.parse(todoList);
                todoListArr.push({
                    //spreads our items with the new todos
                    ...action.payload,
                });
                //update the local storage
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