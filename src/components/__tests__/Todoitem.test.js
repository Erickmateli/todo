import { render, screen, cleanup } from "@testing-library/react";
import React,{useEffect} from "react";
import Todoitem from "../Todoitem";
import { Provider } from "react-redux";
import * as redux from "react-redux";
import { v4 as uuid } from "uuid";
import configureStore from "redux-mock-store";

test("should render the todoitem component",()=>{
   
    const initialState = {
        id: uuid(),
        title: "Wash Clothes",
        status: "complete",
        time: new Date(),
      };
      //create a mock store
      const mockstore = configureStore();
      const todomock = mockstore(initialState);
      //spy on use selector
      const spy = jest.spyOn(redux, "useSelector");
      spy.mockReturnValue([[todomock]]);
      
   
     
    render(
        <Provider store={todomock}>
            <Todoitem/>
        </Provider>
    );
    const Todoitemcomponent = screen.findByTestId("todoitemcomponent");
    expect(Todoitemcomponent).toBeInTheDocument();
    screen.debug();
})