import { render, screen, cleanup } from "@testing-library/react";
import Buttons from "../Buttons";

test("Should render Button component",()=>{
    render(<Buttons/>);
    const Buttoncomponent = screen.getByTestId("buttoncomponent");
    expect(Buttoncomponent).toBeInTheDocument();
    screen.debug();
})
