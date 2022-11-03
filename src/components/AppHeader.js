import React, { useState } from "react";
import Buttons, { SelectButtons } from "./Buttons";

//import to do modal
import TodoModal from "./TodoModal";

//app header styling
import Style from "../styles/modules/app.module.scss";
const AppHeader = () => {
  //create state to help in closing and opening of the modal of the modal
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className={Style.appHeader} data-testid="appheader">
      <Buttons variant="primary"  onClick={() => setModalOpen(true)}>Add Task</Buttons>
     
    
          <h4>Welcome back you are awesome and you rock!!</h4>
 

      <TodoModal type="add" modalOpen={modalOpen} setModalOpen={setModalOpen}></TodoModal>
    </div>
  );
};

export default AppHeader;
