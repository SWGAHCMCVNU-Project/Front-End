import "antd/dist/reset.css";

import { useState } from 'react'
import {  BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./assets/styles/App.scss";
import "./assets/styles/responsive.scss";
import SignIn from './pages/SignIn.jsx'
import Main from './components/layout/Main.jsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
     <Routes>
     <Route
      path="/sign-in"
      exact element={<SignIn />}/>
     <Route path="*" exact element={<Main/>} />
      
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
