import "./App.css";
import { useEffect } from "react";
import Form from "./components/form/Form";
import Dashboard from "./components/dashboard/Dashboard";

import { reactLocalStorage } from "reactjs-localstorage";

// Third Party Import
import { Routes, Route } from "react-router-dom";

function App() {
  useEffect(() => {
    const contrast = reactLocalStorage.get("contrast", "light", true);
    document.documentElement.className = contrast;
  }, []);
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
