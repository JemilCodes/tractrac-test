import "./App.css";
import Form from "./components/form/Form";
import Dashboard from "./components/dashboard/Dashboard";

// Third Party Import
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Form formType="register" />} />
        <Route path="login" element={<Form formType="login" />} />
        <Route path="dash" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
