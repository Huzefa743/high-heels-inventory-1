import React, { useState, createContext } from "react";
import './index.css'
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import PrivateRoutes from "./privateroutes/PrivateRoutes";
import { SuccessExistcontext, Successcontext, UserIdContext } from "../src/components/context/Authcontext";
//import Home from './screens/Home/Home';
import Login from './screens/login/login';
import Dashboard from "./screens/Dashbaord/dashboard";
import CreateStock from "./screens/createStock/createStock";
import CreateSale from "./screens/createSale/createSale";
import SalesList from "./screens/salesList/salesList";
import StockList from "./screens/stockList/stockList";
import Profile from "./screens/profile/profile";



export const AuthContext = createContext();

function App() {

  const [successmsgexist, setSuccessmsgExist] = useState(false);
  const [successmsg, setSuccessmsg] = useState('');
  const [userid, setUserId] = useState('');

  return (
    <div>
      <BrowserRouter basename='/high-heels'>
        <SuccessExistcontext.Provider value={[successmsgexist, setSuccessmsgExist]}>
          <Successcontext.Provider value={[successmsg, setSuccessmsg]}>
            <UserIdContext.Provider value={[userid, setUserId]}>
              <Routes>
                <Route path="/login" element={<Login />} />
                
                {/* <Route path="/register" element={<Register />} /> */}
                {/* <Route path="/resetpwd" element={<ResetPassword />} /> */}
                <Route exact element={<PrivateRoutes />}>
                <Route path="/home" element={<Dashboard />} />
                <Route path="/create-stock" element={<CreateStock />} />
                <Route path="/create-sale" element={<CreateSale />} />
                <Route path="/sale-list" element={<SalesList />} />
                <Route path="/stock-list" element={<StockList />} />
                <Route path="/user-profile" element={<Profile />} />
                  {/* <Route path="/enquiry" element={<Enquiry />} /> */}
                </Route>
              </Routes>
            </UserIdContext.Provider>
          </Successcontext.Provider>
        </SuccessExistcontext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
