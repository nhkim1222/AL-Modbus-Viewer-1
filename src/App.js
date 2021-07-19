import React from "react";
import GlobalStyle from "./Components/GlobalStyles";
import Router from "./Components/Router";
import { ModalProvider } from 'styled-react-modal'

function App() {
  return (
    <ModalProvider>
      <Router></Router>
      <GlobalStyle></GlobalStyle>
    </ModalProvider>
  );
}

export default App;
