// import Layout from './Component/Pages/Layout';
// import Home from "./Component/Pages/Home";
//  import Contacts from "./Component/Pages/Contacts";
// import Blogs from "./Component/Pages/Blogs";
// import Nopage from "./Component/Pages/Nopage";

import React from 'react';
import Home from "./Component/Pages/Home"
import Layout from "./Layout/Header/Layout/Layout";
import  ContextForm from './Hooks/Context/Api/ContextForm';
import { FormState } from './Component/Pages/Usestate/Create';
import ContextTable from "./Hooks/Context/Api/ContextTable"
import { Datalist } from './Component/Pages/Usestate/Read';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Reducerform from './Component/Pages/UseReducer/Api/Reducerform';
import Reducertable from './Component/Pages/UseReducer/Api/Reducertable';
import Reduxtable from './Component/Redux/Reduxcoponent/ReduxTable';
import Reduxform from './Component/Redux/Reduxcoponent/ReduxFrom';
import SagaForm from './Component/Saga/SagaForm';
import SagaTable from './Component/Saga/SagaTable';

import './App.css';

import { ToastContainer } from 'react-bootstrap';
// import { ThemeContext } from '@emotion/react';
// import ContextForm from "./Hooks/Context/Api/ContextForm"
import { GlobalProvider } from './Hooks/Context/ContextState';

function App() {
  return (

    
    
   <div>   <BrowserRouter>
   <Layout />
   <GlobalProvider>
   <Routes>
    
   <Route path="/" element={<Home />} />
   {/* <Route path="blogs" element={<Blogs />} /> */}
   {/* <Route path="contacts" element={<Contacts />} /> */}
   {/* <Route path="*" element={<Nopage />} />  */}
     <Route exact path="/Create" element={<FormState/>}/>
     <Route exact path="/Create/:id" element={<FormState/>}/> 
     <Route exact path="/Read" element={<Datalist/>}/>

     {/* <Route exact path="/Update" element={<Update/>}/> */}
     <Route exact path='ContextTable ' element={< ContextTable/>}/>
     <Route  exact path="/Reducerform" element={< Reducerform/>}/>   
     <Route  exact path="/Reducerform/:id" element={< Reducerform/>}/>   
     <Route exact  path="/Reducertable" element={<Reducertable/>}/> 
     <Route exact path="/ContextForm"  element={<ContextForm/>} />
     <Route exact path="/ContextTable"  element={<ContextTable/>} />
     <Route exact path="/ContextForm/:id"  element={<ContextForm/>} />
     <Route exact path ="/ReduxForm" element={<Reduxform/>} />
     <Route exact path ="/ReduxForm/:id" element={<Reduxform/>} />
     <Route exact path ="/ReduxTable" element={<Reduxtable/>} />
     <Route exact path ="/SagaForm" element={<SagaForm/>} />
     <Route exact path ="/SagaForm/:id" element={<SagaForm/>} />
     <Route exact path ="/SagaTable" element ={<SagaTable/>}/>
     <Route exact path ="/SagaTable/:id" element ={<SagaTable/>}/>
   
   </Routes>
   <ToastContainer />
   </GlobalProvider>
   </BrowserRouter></div>
      
   
      
      
    
  );
}

export default App;
