import React, { createContext, useReducer, useContext } from "react";
import reducer from  "../../Hooks/Reducer/Reducercon"
import {
    getUser,
    createUser,
    updateuser ,
     getUsers ,
     deleteUser,
} from "../../Service/Mockapi";
import { addEmployeeRequest, addEmployeeSuccess, addEmployeeError, getEmployeeSuccess, getEmployeeRequest, getEmployeeError, deleteEmployeeError, deleteEmployeeRequest, deleteEmployeeSuccess, updateEmployeeRequest, updateEmployeeSuccess, updateEmployessError, getidEmployeeSuccess, getidEmployeeError, getidEmployeeRequest } from "../../Hooks/Reducer/Action/Action"

const initialState = {
  employees: [],
  selectedProducts: [],
  employeeId: null
};

const GlobalContext = createContext();

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export const GlobalProvider = ({ children }) => {
  const [stateEmp, dispatch] = useReducer(reducer, initialState);




  const getEmployee = async () => {
    dispatch(getEmployeeRequest())
    const res = await getUsers();
    if (res.status === 200 || res.status === 201) {
      dispatch(getEmployeeSuccess(res.data))

    } else {
      dispatch(getEmployeeError("Employee creation failed."))

    }

  };

  const getidEmployee = async (employee) => {
    dispatch(getidEmployeeRequest())
    const res = await getUser(employee);
    if (res.status === 200 || res.status === 201) {
      dispatch(getidEmployeeSuccess(res.data))
    } else {
      dispatch(getidEmployeeError("Employee creation failed."))

      // console.error("Error fetching initial employee data:", res.status, res.statusText);
    }

  }

  const addEmployee = async (employee) => {
    dispatch(addEmployeeRequest(employee))
    const res = await createUser(employee);
    if (res.status === 200 || res.status === 201 || res.status === 204) {
      dispatch(addEmployeeSuccess(employee))
      // dispatch({ type: "ADD_EMPLOYEE_SUCCESS", payload: employee });
    } else {
      // dispatch({ type: "ADD_EMPLOYEE_ERROR", payload: "Employee creation failed." });
      dispatch(addEmployeeError("Employee creation failed."))
    }
  };



  

  const updateEmployees = async (employee) => {
    dispatch(updateEmployeeRequest(employee))
      const res = await updateuser(employee.id, employee);
      if (res.status === 200) {
        dispatch(updateEmployeeSuccess(employee))
      } else {
        dispatch(updateEmployessError("Employee update failed."))
      }
    
  };

  const removeEmployee = async (id) => {
    dispatch(deleteEmployeeRequest(id))
    const res = await deleteUser(id);
    if (res.status === 200) {
      // dispatch({ type: "DELETE_EMPLOYEE", payload: data });
      dispatch(deleteEmployeeSuccess(id))
    } else {
      // dispatch({ type: "ADD_EMPLOYEE_ERROR", payload: "Employee creation failed." });
      dispatch(deleteEmployeeError("Employee creation failed."))
    }
  };

  
  

  return (
    <GlobalContext.Provider
      value={{
        stateEmp,
        dispatch,
        addEmployee,
        updateEmployees,
        removeEmployee,
        getEmployee,
        getidEmployee,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};