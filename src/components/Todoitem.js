import React, { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import {format} from 'date-fns'

import Style from "../styles/modules/todoItem.module.scss";
import { getClasses } from "../utils/getClasses";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";
import { deleteTodo, updateTodo } from "../slices/todoSlice";
import toast from "react-hot-toast";
import TodoModal from "./TodoModal";
import Checkbox from "./Checkbox";


const child = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

const Todoitem = ({ todo }) => {
  const dispach = useDispatch();

  //set the state for the modal to open on edit
  const [updateModalOpen, setupdateModalOpen] = useState(false);

  //impliment ability to mark as complete and incomplete
  const [checked, setChecked] = useState(false);



  useEffect(() => {
    if (todo.status === "complete") {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [todo.status]);

  //handle checked items
  const handleChecked = () => {
    setChecked(!checked);
    dispach(
      updateTodo({
        ...todo,
        status: checked ? "incomplete" : "complete",
      })
    );
  };

  //handle to delete
  const handleDelete = () => {
    dispach(deleteTodo(todo.id));
    toast.success("Todo item deleted successfully");
  };
  //handle to edit
  const handleEdit = () => {
    setupdateModalOpen(true);
  };

 
  return (
    <>
    <p>
        {
            todo.status === 'complete' ? 'Completed' : ' Mark as complete'
        }
       </p> 
      <motion.div className={Style.item} variants={child} data-testid="todoitemcomponent">
     
        <div className={Style.todoDetails}>
        
          <Checkbox checked={checked} handleChecked={handleChecked} />
          <div className={Style.texts}>
            <p
              className={getClasses([
                Style.todoText,
                todo.status === "complete" && Style["todoText--completed"],
              ])}
            >
              {todo.title}
            </p>
            <p className={Style.time}>
              Due :  {todo.time}
            </p>
          </div>
        </div>
        <div className={Style.todoActions}>
          <div
            className={Style.icon}
            onClick={handleDelete}
            role="button"
            tabIndex={0}
          >
            <DeleteIcon />
          </div>
          <div
            className={Style.icon}
            onClick={handleEdit}
            role="button"
            tabIndex={0}
          >
            <EditIcon />
          </div>
        </div>
      </motion.div>
      
      <TodoModal
        type="update"
        modalOpen={updateModalOpen}
        setModalOpen={setupdateModalOpen}
        todo={todo}
      />
    </>
  );
};

export default Todoitem;
