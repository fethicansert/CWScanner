import Container from "./components/layout-components/Container";
import Header from "./components/layout-components/Header";
import Layout from "./components/layout-components/Layout";
import { Route, Routes } from "react-router-dom";
import CheckScanPage from "./components/checkscan-page/CheckScanPage";
import LoginPage from "./components/login-page/LoginPage";
import AddUserPage from "./components/add-user-page/AddUserPage";


import './css/check-scan-page.css'
import './css/header.css';
import './css/sidebar.css'
import './css/forbiden-page.css'
import './css/users-page.css'
import './css/table-component.css'

import DataManagementPage from "./components/data-management-page/DataManagementPage";
import UsersPage from "./components/users-page/UsersPage";
import NotFoundedPage from "./components/error-page/NotFoundPage";
import RequireAuth from "./middleware/RequireAuth";
import ForbidenPage from "./components/error-page/ForbidenPage";
import AddCustomerPage from "./components/addcustomer-page/AddCustomerPage";
import ROLES from "./data/roles";


function App() {

  return (
    <div className="App">

      <Container >

        <Header title={"CWSCANNER"} />

        <Routes>

          <Route index path="/" element={<LoginPage />} />

          <Route element={<RequireAuth allowedRoles={[ROLES.admin, ROLES.manager, ROLES.user]} />}>

            <Route path="/layout" element={<Layout />}>

              <Route element={<RequireAuth allowedRoles={[ROLES.admin, ROLES.manager, ROLES.user]} />}>
                <Route index element={<CheckScanPage />}></Route>
              </Route>

              <Route element={<RequireAuth allowedRoles={[ROLES.admin, ROLES.manager, ROLES.user]} />}>
                <Route index path="checkscan" element={<CheckScanPage />}></Route>
              </Route>

              <Route element={<RequireAuth allowedRoles={[ROLES.admin]} />}>
                <Route path="add-user" element={<AddUserPage />}></Route>
              </Route>

              <Route element={<RequireAuth allowedRoles={[ROLES.admin, ROLES.manager]} />}>
                <Route path="user-list" element={<UsersPage />}></Route>
              </Route>

              <Route element={<RequireAuth allowedRoles={[ROLES.admin, ROLES.manager, ROLES.user]} />}>
                <Route path="add-customer" element={<AddCustomerPage />}></Route>
              </Route>

              <Route element={<RequireAuth allowedRoles={[ROLES.admin, ROLES.manager, ROLES.user]} />}>
                <Route path="data-management" element={<DataManagementPage />}></Route>
              </Route>

            </Route>

          </Route>

          <Route path="forbiden" element={<ForbidenPage />}></Route>

          <Route path="*" element={<NotFoundedPage />}></Route>

        </Routes>

      </Container>

    </div>
  );
}

export default App;
