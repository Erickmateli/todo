import React from "react";
import PageTitle from "./components/PageTitle";
import { Toaster } from "react-hot-toast";

//import the app.js styling
import Style from "./styles/modules/app.module.scss";

//import the app header component
import AppHeader from "./components/AppHeader";

//import the app content component
import AppContent from "./components/AppContent";

function App() {
  return (
    <>
      <PageTitle>To Do List</PageTitle>
      <div className={Style.app__wrapper} data-testid="app" >
        <AppHeader></AppHeader>
        <AppContent></AppContent>
      </div>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            fontSize: '1.4rem'
          },
        }}
      />
    </>
  );
}

export default App;
