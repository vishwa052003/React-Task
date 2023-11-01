
import * as types from "../ReduxAction/Type";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  employees: [],
  selectedProducts: [],
  employeeId: null,
};

const reducer = (state = initialState, action) => {
  console.log(state);
  console.log(action);
  switch (action.type) {
    case types.CREATE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    // case types.CREATE_SUCCESS:
    //   return {
    //     ...state,
    //     employees: [...state.employees, action.payload],
    //     loading: false,
    //     error: null,
    //   };
    case types.CREATE_SUCCESS:
      const newEmployee = {
        ...action.payload,
        // id: uuidv4()
        id: String(state.employees.length + 1),
      };
      return {
        ...state,
        employees: [...state.employees, newEmployee],
        loading: false,
        error: null,
      };

    case types.CREATE_ERROR:
      return {
        ...state,
        messege: action.payload,
        loading: false,
        error: null,
      };

    case types.GET_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.GET_SUCCESS:
      return { ...state, employeeId: null };
    case types.GET_ERROR:
      return {
        ...state,
        messege: action.payload,
        loading: false,
        error: null,
      };

    case types.GETID_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        // employeeId: null,
      };
    // case types.GETID_SUCCESS:
    //   return {
    //     ...state,
    //     employeeId: action.payload,
    //     loading: false,
    //     error: null,
    //   };

    case types.GETID_SUCCESS:
      const selectedEmployee = state.employees.find(
        (employee) => employee.id === action.payload
      );
      return {
        ...state,
        // employeeId: action.payload,
        selectedEmployee, // Store the selected employee in the state
        loading: false,
        error: null,
      };
    case types.GETID_ERROR:
      return {
        ...state,
        messege: action.payload,
        loading: false,
        error: null,
      };

    case types.UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.UPDATE_SUCCESS:
      const updatedEmployees = state.employees.map((employee) =>
        employee.id === action.payload.id ? action.payload : employee
      );
      return { ...state, employees: updatedEmployees, selectedEmployee: null };

    case types.UPDATE_ERROR:
      return {
        ...state,
        messege: action.payload,
        loading: false,
        error: null,
      };

    case types.DELETE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.DELETE_SUCCESS:
      const filteredEmployees = state.employees.filter(
        (employee) => employee.id !== action.payload
      );
      return { ...state, employees: filteredEmployees };

    case types.DELETE_ERROR:
      return {
        ...state,
        messege: action.payload,
        loading: false,
        error: null,
      };

    case "SET_LOADING":
      return { ...state, isLoading: action.value };
    case "SET_SEARCH_TEXT":
      return { ...state, searchText: action.value };
    case "SET_SELECTED_PRODUCTS":
      return { ...state, selectedProducts: action.value };
    case "SET_DELETE_SELECTED_DIALOG_VISIBLE":
      return { ...state, deleteSelectedDialogVisible: action.payload };
    default:
      return state;
  }
};

export default reducer;
