import React from "react";
import { useSelector } from "react-redux";
import Todoitem from "./Todoitem";
import { AnimatePresence, motion } from "framer-motion";
import Style from '../styles/modules/app.module.scss'

const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};
const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const AppContent = () => {
  const todoList = useSelector((state) => state.todo.todoList);
  //make a copy of the todolist sort according to do time
  const sortedToDolist = [...todoList];
  sortedToDolist.sort((a, b) => new Date(b.time) - new Date(a.time));
  return (
    <motion.div variants={container} initial="hidden" animate="visible" data-testid="appcontent" >
      {sortedToDolist && sortedToDolist.length > 0 ? (
        sortedToDolist.map((todo, index) => (
          <Todoitem todo={todo} key={index} />
        ))
      ) : (
        <motion.p variants={child} >
          No items on your to do list
        </motion.p>
      )}
    </motion.div>
  );
};

export default AppContent;
