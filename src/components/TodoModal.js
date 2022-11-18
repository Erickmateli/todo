import React, { useState,useEffect } from "react";
import Style from "../styles/modules/modal.module.scss";
import toast from 'react-hot-toast';


import CloseIcon from "@mui/icons-material/Close";
import Buttons from "./Buttons";
import { useDispatch } from "react-redux";

import { addTodo, updateTodo } from "../slices/todoSlice";
import {v4 as uuid } from 'uuid';

const TodoModal = ({type, modalOpen, setModalOpen ,todo}) => {
  // grab the form values and store them in a state
  const [title, setTitle] = useState("");
 
  const [status, setStatus] = useState("incomplete");

  //date state
  const [dueDate, setDueDate] = useState("");

  const dispach = useDispatch();

  //autofill the form on update for this use UseEffect hook
useEffect(() => {
    //check if type is update and if the items exists
    if(type === 'update' && todo){
        setTitle(todo.title);
        
        setStatus(todo.status);
    }else{
        setTitle("");
        setStatus("incomplete");
    }
},[type,todo,modalOpen])

  const handleSubmit = (e) =>{
   
    e.preventDefault();
    //console.log(dueDate);

    //check if we have the title and status filled.
    if(title  &&  status){
        if(type==='add'){
            dispach(addTodo({
                id: uuid(),
                title, 
                status,
                time: new Date(dueDate).toLocaleString()
            }))
            toast.success('Task added succefuly');
        }
        
        if(type === 'update'){
            if(todo.title  !== title || todo.status !== status){
                dispach(updateTodo(
                    {
                        ...todo,
                        title,
                        status
                    }
                ))
                toast.success('Task updated succefuly');
            }else{
                toast.error('No changes made');
                //make the modal remain when no changes are not made
                return;
            }
        }
        setModalOpen(false)
    }else{
        toast.error("task cannot be empty")
    }
  }
  return (
    <>
      {modalOpen && (
        <div className={Style.wrapper}>
          <div className={Style.container}>
            <div
              className={Style.closeButton}
              onClick={() => setModalOpen(false)}
              onKeyDown={() => setModalOpen(false)}
              tabIndex={0}
              role="button"
            >
              <CloseIcon />
            </div>
            <form className={Style.form} onSubmit={(e) =>handleSubmit(e)}>
              <h1 className={Style.formTitle}>{type === 'update' ? 'update' : 'add'}  Task</h1>
              <label htmlFor="title">
                Title
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
              <label htmlFor="duedate">
                Due Date
                <input 
                type="datetime-local"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value) }
                id="duedate"
                />
              </label>
              
              <label htmlFor="status">
                status
                <select id="status" name="status" value={status} onChange={(e) =>setStatus(e.target.value)}>
                  <option value="incomplete">Incomplete</option>
                  <option value="complete">Complete</option>
                </select>
              </label>
              <div className={Style.buttonContainer}>
                <Buttons type="submit" variant="primary">
                  { type === 'update' ? 'Update': 'Add'}  Task
                </Buttons>
                <Buttons
                  type="button"
                  variant="secondary"
                  onClick={() => setModalOpen(false)}
                  onKeyDown={() => setModalOpen(false)}
                  tabIndex={0}
                  role="button"
                >
                  Cancel
                </Buttons>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default TodoModal;
