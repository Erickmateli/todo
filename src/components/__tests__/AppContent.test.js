import { render, screen, cleanup } from "@testing-library/react";
import AppContent from "../AppContent";
import { Provider } from "react-redux";
import * as redux from "react-redux";
import { v4 as uuid } from "uuid";

import configureStore from "redux-mock-store";



test("should render App Content component", () => {
 
  const initialState = {
    id: uuid(),
    title: "Wash Clothes",
    status: "complete",
    time: new Date(),
  };
  //create a mock store
  const mockstore = configureStore();
  const todomock = mockstore(initialState);
 //mock use selector
 const spy = jest.spyOn(redux, "useSelector");
 spy.mockReturnValue([[todomock]]);



  render(
    <Provider store={todomock}>
      <AppContent />
    </Provider>
  );
  screen.debug();
  const appcomponent = screen.getByTestId("appcontent");
  expect(appcomponent).toBeInTheDocument();
});
