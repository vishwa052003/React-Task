import * as types from '../../Hooks/Reducer/Action/Type';
const reducer = (state, action) => {
  console.log(state)
  console.log(action)
  switch (action.type) {

    case types.CREATE_REQUEST:
      return {
        ...state, loading: true,
        error: null,
      };
    case types.CREATE_SUCCESS:
      return {
        ...state,
        employees: [...state.employees, action.payload], loading: false,
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
        ...state, loading: true,
        error: null,
      };
    case types.GET_SUCCESS:
      return { ...state, employees: action.payload, employeeId: null };
    case types.GET_ERROR:
      return {
        ...state,
        messege: action.payload,
        loading: false,
        error: null,
      };

    case types.GETID_REQUEST:
      return {
        ...state, loading: true,
        error: null,
        employeeId:null,
      };
    case types.GETID_SUCCESS:
      return {
        ...state,
        employeeId: action.payload,
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
      return { ...state, employees: updatedEmployees, employeeId: null };

    case types.UPDATE_ERROR:
      return {
        ...state,
        messege: action.payload,
        loading: false,
        error: null,
      };




    case types.DELETE_REQUEST:
      return {
        ...state, loading: true,
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
    case 'SET_SEARCH_TEXT':
      return { ...state, searchText: action.value };
    case 'SET_SELECTED_PRODUCTS':
      return { ...state, selectedProducts: action.value };
    case "SET_DELETE_SELECTED_DIALOG_VISIBLE":
      return { ...state, deleteSelectedDialogVisible: action.payload };
    default:
      return state;
  }
};

export default reducer;