import { render, screen, cleanup } from "@testing-library/react";
import Checkbox from "../Checkbox";

test("should render the Checkbox component",()=>{
    render(<Checkbox/>);
    const Checkboxcomponent = screen.getByTestId("checkbox");
    expect(Checkboxcomponent).toBeInTheDocument();
    screen.debug();
})