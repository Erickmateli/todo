import {render,screen,cleanup} from '@testing-library/react';
import PageTitle from '../PageTitle'

test('should render page title component',() =>{
   render(<PageTitle/>);
   const Pagetitle = screen.getByTestId('pagetitle');
   expect(Pagetitle).toBeInTheDocument();
})