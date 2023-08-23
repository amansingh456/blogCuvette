import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Blog from "./Components/Blog";
import CreateBlog from "./Components/CreateBlog";
import Homepage from "./Components/Home";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import Signup from "./Components/Signup";
import store from "./store/store";
import Footer from "./Components/Footer";

function App() {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/blog/:id" element={<Blog />} />
            <Route path="/create" element={<CreateBlog />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
          <Footer/>
        </BrowserRouter>
      </ChakraProvider>
    </Provider>
  );
}

export default App;
