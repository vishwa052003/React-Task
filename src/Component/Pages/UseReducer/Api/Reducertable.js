import React, { useReducer, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "..//..//..//..//Service/Mockapi"
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import jsPDF from "jspdf";
import "jspdf-autotable";
import ExcelJS from "exceljs";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { toast, ToastContainer } from "react-toastify";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { FilterMatchMode } from "primereact/api";
import { Action } from "..//..//..//..//Hooks/Reducer/Action/redAction"
import {
  Reducer,
  initial,
} from "..//..//..//../Hooks/Reducer/Function/Reducer";

// const initial = {
//   data: [],
//   filters: {
//     name: { value: null },
//     email: { value: null },
//     password: { value: null },
//     confirmPassword: { value: null },
//     phoneNumber: { value: null },
//     gender: { value: null },
//     language: { value: null },
//     dob: { value: null },
//   },
//   loading: true,
//   globalFilter: "",
//   selectedRows: [],
//   deleteProductDialog: false,
//   deleteProductsDialog: false,
//   product: {},
//   rowDeleted: false,
// };

// function Reducer(state, action) {
//   switch (action.type) {
//     case Action.FETCH_DATA_SUCCESS:
//       return { ...state, data: action.payload, loading: false };

//     case Action.FETCH_DATA_FAILURE:
//       return { ...state, data: [], loading: false };
//     case Action.SET_FILTERS:
//       return {
//         ...state,
//         filters: { ...state.filters, [action.field]: { value: action.value } },
//         globalFilter: action.value,
//       };
//     case Action.SET_DELETE_PRODUCTS_DIALOG:
//       return { ...state, deleteProductsDialog: action.value };
//     case Action.SET_SELECTED_ROWS:
//       return { ...state, selectedRows: action.value };
//     case Action.SET_DELETE_PRODUCT_DIALOG:
//       return {
//         ...state,
//         deleteProductDialog: action.value,
//         product: action.product,
//       };
//     case Action.SET_ROW_DELETED:
//       return { ...state, rowDeleted: action.value };
//     default:
//       return state;
//   }
// }

export default function Reducertable () {
  // const [isLoading, setIsLoading] = useState(false);

  const [state, dispatch] = useReducer(Reducer, initial);
  const newuser = useNavigate();
  const tableDetails = useNavigate();
  const dt = useRef(null);

  const openNew = () => {
    newuser("/reducerform");
  };

  const fetchTableData = async () => {
    try {
      const response = await axios.get(API_URL);
      console.log("API Response Status Code:", response.status);
      console.log("API Data:", response.data);
      const responseData = Array.isArray(response.data) ? response.data : [];
      dispatch({ type: Action.FETCH_DATA_SUCCESS, payload: responseData });
      // toast.success(" fetching table data:");
    } catch (error) {
      console.error("Error fetching table data:", error);
      dispatch({ type: Action.FETCH_DATA_FAILURE });
      toast.error("Error fetching table data:", error);
    }
  };

  useEffect(() => {
    fetchTableData();
  }, []);

  const handleEdit = (id) => {
    console.log("Edit button clicked with ID:", id);
    // const editedData = state.data.find((rowData) => rowData.id === id);
    // tableDetails(`/reducerform/${id}`, { state: { editedData } });
    tableDetails(`/reducerform/${id}`);
  };

  const onGlobalFilterChange = (e) => {
    const { value } = e.target;
    dispatch({ type: Action.SET_FILTERS, field: "name", value });
  };

  const confirmDeleteSelected = () => {
    dispatch({ type: Action.SET_DELETE_PRODUCTS_DIALOG, value: true });
  };

  const hideDeleteProductsDialog = () => {
    dispatch({ type: Action.SET_DELETE_PRODUCTS_DIALOG, value: false });
  };

  const deleteSelectedProducts = async () => {
    const deletedIds = [];
    for (const selectedRow of state.selectedRows) {
      try {
        const response = await axios.delete(API_URL + "/" + selectedRow.id);
        console.log("Record deleted successfully:", response.data);
        deletedIds.push(selectedRow.id);
      } catch (error) {
        console.error("Error deleting record:", error);
      }
    }

    const updatedData = state.data.filter(
      (rowData) => !deletedIds.includes(rowData.id)
    );
    dispatch({ type: Action.FETCH_DATA_SUCCESS, payload: updatedData });
    toast.success("Deleted successfully!");
    hideDeleteProductsDialog();
    dispatch({ type: Action.SET_SELECTED_ROWS, value: [] });
  };

  const deleteProductsDialogFooter = (
    <div className="confirmation-content">
      <button
        type="button"
        className="btn btn-primary bg-transparent ms-2 fs-4 fw-bold text-primary"
        onClick={hideDeleteProductsDialog}
      >
        <CloseIcon /> NO
      </button>
      <button
        type="button"
        className="btn btn-danger ms-2 fs-4 text-light"
        onClick={deleteSelectedProducts}
      >
        <CheckIcon /> YES
      </button>
    </div>
  );

  const confirmDeleteProduct = (product) => {
    dispatch({ type: Action.SET_DELETE_PRODUCT_DIALOG, value: true, product });
  };

  const hideDeleteProductDialog = () => {
    dispatch({ type: Action.SET_DELETE_PRODUCT_DIALOG, value: false });
  };

  const deleteProduct = async (productId) => {
    try {
      const response = await axios.delete(API_URL + "/" + productId);
      console.log("Record deleted successfully:", response.data);

      const updatedData = state.data.filter((val) => val.id !== productId);
      dispatch({ type: Action.FETCH_DATA_SUCCESS, payload: updatedData });

      dispatch({
        type: Action.SET_SELECTED_ROWS,
        value: state.selectedRows.filter((row) => row.id !== productId),
      });

      hideDeleteProductDialog();
      dispatch({ type: Action.SET_ROW_DELETED, value: true });

      toast.success("Customer Deleted Successfully!");
    } catch (error) {
      console.error("Error deleting Customer:", error);
      toast.error("Error deleting Customer. Please try again later.");
    }
  };

  const deleteProductDialogFooter = (
    <div className="confirmation-content">
      <button
        type="button"
        className="btn btn-primary bg-transparent ms-2 fs-4 fw-bold text-primary"
        onClick={hideDeleteProductDialog}
      >
        <CloseIcon /> NO
      </button>
      <button
        type="button"
        className="btn btn-danger ms-2 fs-4 text-light"
        onClick={() => deleteProduct(state.product.id)}
      >
        <CheckIcon /> YES
      </button>
    </div>
  );

  const handleRowSelect = (e) => {
    dispatch({ type: Action.SET_SELECTED_ROWS, value: e.value });
    dispatch({ type: Action.SET_ROW_DELETED, value: false });
  };

  const clearSorting = () => {
    dt.current.reset();
  };

  const clearFilter = () => {
    initFilters();
    clearSorting();
    onGlobalFilterChange({ target: { value: "" } });
  };

  const initFilters = () => {
    dispatch({
      type: Action.SET_FILTERS,
      field: "name",
      value: null,
    });
    onGlobalFilterChange({ target: { value: "" } });
  };

  const header = () => {
    return (
      <div className="d-flex p-toolbar">
        <div>
          <h3 className="">Manage Customer</h3>
        </div>
        <div className="d-flex justify-content-end">
          <Button
            type="button"
            icon="pi pi-filter-slash"
            label="Clear"
            className="me-2"
            outlined
            onClick={clearFilter}
          />
          <div className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText
              value={state.globalFilter}
              onChange={onGlobalFilterChange}
              placeholder="Keyword Search"
              style={{ width: "100%" }}
            />
          </div>
        </div>
      </div>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="mr-2"
          onClick={() => handleEdit(rowData.id)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          className="ms-2"
          onClick={() => confirmDeleteProduct(rowData)}
        />
      </React.Fragment>
    );
  };

  // excel
  const exportToExcel = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Customers");
    worksheet.columns = [
      { header: "Name", key: "name", width: 15 },
      { header: "Email", key: "email", width: 20 },
      { header: "Password", key: "password", width: 15 },
      { header: "Confirm Password", key: "confirmPassword", width: 20 },
      { header: "Phone Number", key: "phoneNumber", width: 15 },
      { header: "Gender", key: "gender", width: 15 },
      { header: "Language", key: "language", width: 15 },
      { header: "Date of Birth", key: "dob", width: 15 },
    ];

    state.data.forEach((rowData) => {
      worksheet.addRow({
        name: rowData.name,
        email: rowData.email,
        password: rowData.password,
        confirmPassword: rowData.confirmPassword,
        phoneNumber: rowData.phoneNumber,
        gender: rowData.gender,
        language: rowData.language,
        dob: rowData.dob,
      });
    });

    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: "application/octet-stream" });
      const fileName = "Customers.xlsx";

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
    });
  };

  // pdf
  const downloadPDF = () => {
    const doc = new jsPDF();
    const tableData = state.data.map((rowData) => {
      return [
        rowData.name,
        rowData.email,
        rowData.password,
        rowData.confirmPassword,
        rowData.phoneNumber,
        rowData.gender,
        rowData.language,
        rowData.dob,
      ];
    });

    doc.autoTable({
      head: [
        [
          "Name",
          "Email",
          "Password",
          "Confirm Password",
          "Phone Number",
          "Gender",
          "Language",
          "Date of Birth",
        ],
      ],
      body: tableData,
    });

    doc.save("Customer's.pdf");
  };

  const exportCSV = (selectionOnly) => {
    dt.current.exportCSV({ selectionOnly });
  };

  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          label="New"
          icon="pi pi-plus"
          onClick={openNew}
          severity="success"
        />

        <Button
          label="Delete"
          icon="pi pi-trash"
          severity="danger"
          className="ms-2"
          onClick={confirmDeleteSelected}
          disabled={
            !state.selectedRows ||
            state.selectedRows.length === 0 ||
            state.rowDeleted
          }
        />
      </div>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <div>
        <Button
          type="button"
          icon="pi pi-file"
          rounded
          onClick={() => exportCSV(false)}
          data-pr-tooltip="CSV"
        />
        <Button
          type="button"
          icon="pi pi-file-excel"
          severity="success"
          className="ms-2"
          rounded
          onClick={exportToExcel}
          data-pr-tooltip="XLS"
        />
        <Button
          type="button"
          icon="pi pi-file-pdf"
          severity="warning"
          className="ms-2"
          rounded
          onClick={downloadPDF}
          data-pr-tooltip="PDF"
        />
      </div>
    );
  };

  return (
    <div>
      <div className="container">
        <Toolbar
          className="mb-4"
          left={leftToolbarTemplate}
          right={rightToolbarTemplate}
        ></Toolbar>
        <DataTable
          value={state.data}
          ref={dt}
          paginator
          rows={5}
          dataKey="id"
          filters={state.filters}
          className="custom-datatable-style shadow rounded border-info mt-3"
          filterDisplay="row"
          loading={state.loading}
          globalFilter={state.globalFilter}
          header={header}
          emptyMessage="No records found."
          selection={state.selectedRows}
          onSelectionChange={handleRowSelect}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Customers"
        >
          <Column
            selectionMode="multiple"
            header="#"
            exportable={false}
            className="fs-4"
            style={{ minWidth: "5rem" }}
          />
          <Column
            field="name"
            header="Name"
            className="text-center"
            sortable
            filter
            filterPlaceholder="Enter Name"
            style={{ minWidth: "15rem" }}
          />
          <Column
            field="email"
            header="Email"
            className="text-center"
            sortable
            filter
            filterPlaceholder="Enter Email"
            style={{ minWidth: "15rem" }}
          />
          <Column
            field="password"
            header="Password"
            className="text-center"
            sortable
            filter
            filterPlaceholder="Enter Password"
            style={{ minWidth: "15rem" }}
          />
          <Column
            field="confirmPassword"
            header="Confirm Password"
            className="text-center"
            sortable
            style={{ minWidth: "15rem" }}
          />
          <Column
            field="phoneNumber"
            header="Phone Number"
            className="text-center"
            sortable
            filter
            filterPlaceholder="Enter PhoneNumber"
            style={{ minWidth: "15rem" }}
          />
          <Column
            field="gender"
            header="Gender"
            className="text-center"
            sortable
            filter
            filterPlaceholder="Enter Gender"
            style={{ minWidth: "15rem" }}
          />
          <Column
            field="language"
            header="Language"
            className="text-center"
            sortable
            filter
            filterPlaceholder="Enter Language"
            style={{ minWidth: "15rem" }}
          />
          <Column
            field="dob"
            header="Date of Birth"
            className="text-center"
            sortable
            filter
            filterPlaceholder="Enter DOB "
            style={{ minWidth: "15rem" }}
          />
          <Column
            header="Actions"
            className=""
            body={actionBodyTemplate}
            style={{ minWidth: "12rem" }}
          />
        </DataTable>
      </div>
      <Dialog
        visible={state.deleteProductDialog}
        style={{ width: "32rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        modal
        footer={deleteProductDialogFooter}
        onHide={hideDeleteProductDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {state.product && (
            <span>
              Are you sure you want to delete <b>{state.product.name}</b>?
            </span>
          )}
        </div>
      </Dialog>
      <Dialog
        visible={state.deleteProductsDialog}
        header="Confirm"
        modal
        footer={deleteProductsDialogFooter}
        onHide={hideDeleteProductsDialog}
      >
        <div className="confirmation-content">
          <WarningAmberOutlinedIcon className="fs-1" />
          {state.selectedRows.length > 0 && (
            <span className="fs-5 ms-2 mt-4 ">
              Are you sure you want to delete {state.selectedRows.length}{" "}
              {state.selectedRows.length > 1
                ? "Customers"
                : '"Customer\'s Data"'}
              ?
            </span>
          )}
        </div>
      </Dialog>
      <ToastContainer autoClose={3000} />
    </div>
  );
}