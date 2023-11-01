import { Action } from "../Action/redAction";

export const initial = {
  data: [],
  filters: {
    name: { value: null },
    email: { value: null },
    password: { value: null },
    confirmPassword: { value: null },
    phoneNumber: { value: null },
    gender: { value: null },
    language: { value: null },
    dob: { value: null },
  },
  loading: true,
  globalFilter: "",
  selectedRows: [],
  deleteProductDialog: false,
  deleteProductsDialog: false,
  product: {},
  rowDeleted: false,
};

export function Reducer(state, action) {
  switch (action.type) {
    case Action.FETCH_DATA_SUCCESS:
      return { ...state, data: action.payload, loading: false };

    case Action.FETCH_DATA_FAILURE:
      return { ...state, data: [], loading: false };
    case Action.SET_FILTERS:
      return {
        ...state,
        filters: { ...state.filters, [action.field]: { value: action.value } },
        globalFilter: action.value,
      };
    case Action.SET_DELETE_PRODUCTS_DIALOG:
      return { ...state, deleteProductsDialog: action.value };
    case Action.SET_SELECTED_ROWS:
      return { ...state, selectedRows: action.value };
    case Action.SET_DELETE_PRODUCT_DIALOG:
      return {
        ...state,
        deleteProductDialog: action.value,
        product: action.product,
      };
    case Action.SET_ROW_DELETED:
      return { ...state, rowDeleted: action.value };
    default:
      return state;
  }
}

// form

export const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  phoneNumber: "",
  gender: "",
  language: "",
  dob: "",
  errors: {},
  data: [],
  isSubmitting: false,
  isLoading: false,
};

export function reducer(state, action) {
  switch (action.type) {
    case Action.CREATE_USER:
      return {
        ...state,
        users: [...state.data, action.payload],
      };

    case Action.SET_ID:
      return { ...state, id: action.value };
    case Action.SET_DATA:
      return { ...state, ...action.data };

    case Action.UPDATE_USER:
      const updatedUsers = state.data.map((user) =>
        user.id === action.payload.id ? action.payload.data : user
      );
      return {
        ...state,
        data: updatedUsers,
      };
    case Action.UPDATE_ERRORS:
      return {
        ...state,
        errors: action.payload,
      };
    // case Action.DELETE_USER:
    //   const filteredUsers = state.data.filter(
    //     (user) => user.id !== action.payload
    //   );
    //   return {
    //     ...state,
    //     data: filteredUsers,
    //   };

    case Action.UPDATE_FIELD:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case Action.SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case Action.SET_IS_SUBMITTING:
      return {
        ...state,
        isSubmitting: action.payload,
      };

    case "SET_ERROR":
      return {
        ...state,
        errors: { ...state.errors, [action.field]: action.payload },
      };
    default:
      return state;
  }
}