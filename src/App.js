import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { EmpAdd } from "./EmpAdd";
import { EmpDetails } from "./EmpDetails";
import { EmpEdit } from "./EmpEdit";
import EmpList from "./EmpList";

function App() {
  return (
    <div>
      <div className="container">
        <div className="text-center">
          <h1>CRUD Application</h1>
        </div>
      </div>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EmpList />}></Route>
          <Route path="/employee/add" element={<EmpAdd/>}></Route>
          <Route path="/employee/details/:empid" element={<EmpDetails/>}></Route>
          <Route path="/employee/edit/:empid" element={<EmpEdit/>}></Route>
        </Routes>
      </BrowserRouter>

    </div>


  );
}

export default App;
