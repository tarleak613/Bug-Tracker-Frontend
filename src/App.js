import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BugList from "./pages/BugList";
import NewBug from "./pages/NewBug";
import BugDetail from "./pages/BugDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/bugs" element={<BugList />} />
        <Route path="/bugs/new" element={<NewBug />} />
        <Route path="/bugs/:id" element={<BugDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
