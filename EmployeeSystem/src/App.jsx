import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Employee from './Components/Employee';
import Department from './Components/Department';
import Payroll from './Components/Payroll';
import Authentication from './Components/Authentication';
import AddDepartment from './Components/AddDepartment';
import EditDepartment from './Components/EditDepartment';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/adminlogin' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />}>
          <Route path='/dashboard/employee' element={<Employee />} />
          <Route path='/dashboard/department' element={<Department />} />
          <Route path='/dashboard/notification' element={<Notification />} />
          <Route path='/dashboard/payroll' element={<Payroll />} />
          <Route path='/dashboard/authentication' element={<Authentication />} />
          <Route path='/dashboard/add_department' element={<AddDepartment />} />
          {/* The routes for editing and deleting must include :id */}
          <Route path='/dashboard/edit_department/:id' element={<EditDepartment />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
