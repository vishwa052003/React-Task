
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUser } from "../ReduxAction/Action";

const Reduxtable = () => {
  const dt = useRef(null);
  const users = useSelector((state) => state.reducer);
  const dispatch = useDispatch();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [rowClick] = useState(true);
  const [state, setState] = useState({
    deleteDialogVisible: false,
    deleteSelectedDialogVisible: false,
    deleteTarget: null,
  });
  const [globalSearchText, setGlobalSearchText] = useState("");

  useEffect(() => {
    getdata();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getdata = async () => {
    console.log(getdata);
    dispatch(getUser());
  };

  const handleSearch = (e) => {
    dispatch({ type: "SET_SEARCH_TEXT", stateEmp: e.target.value });
    setGlobalSearchText(e.target.value);
  };

  const filteredData =
    users && users.employees
      ? users.employees.filter((row) => {
          const searchText = globalSearchText.toLowerCase();
          return (
            (row.name && row.name.toLowerCase().includes(searchText)) ||
            (row.email && row.email.toLowerCase().includes(searchText)) ||
            (row.phone && row.phone.toLowerCase().includes(searchText))
          );
        })
      : [];

  const clearFilters = () => {
    dt.current.reset();
    setGlobalSearchText("");
    dt.current.filter("", "name", "equals");
    dt.current.filter("", "email", "equals");
    dt.current.filter("", "phone", "equals");
  };

  const confirmDelete = () => {
    if (state.deleteTarget) {
      const employeeId = state.deleteTarget.id;
      dispatch(deleteUser(employeeId));
      setState({ ...state, deleteDialogVisible: false });
      setSelectedProducts([]);
    }
    toast.success(" User Deleted Successfully !!!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const confirmDeleteSelected = () => {
    setState({ ...state, deleteSelectedDialogVisible: true });
  };

  const deleteSelectedUsers = async () => {
    console.log("selected");
    const selectedEmployeeIds = selectedProducts.map((employee) => employee.id);
    console.log(selectedEmployeeIds);
    if (selectedEmployeeIds && selectedEmployeeIds.length > 0) {
      selectedEmployeeIds.forEach(async (employeeId) => {
        dispatch(deleteUser(employeeId));
        console.log(users.array);
      });
      setSelectedProducts(users.array);
    }
    setState({ ...state, deleteSelectedDialogVisible: false });
  };

  const exportCSV = (selectionOnly) => {
    dt.current.exportCSV({ selectionOnly });
  };

  const exportPdf = () => {
    import("jspdf").then((jsPDF) => {
      import("jspdf-autotable").then((autoTable) => {
        const doc = new jsPDF.default();
        doc.autoTable({
          head: [
            [
              "Name",
              "E-mail",
              "Phone",
              "Password",
              "Confirm Password",
              "Language",
              "Gender",
              "Date of Birth",
            ],
          ],
          body: users.employees.map((row) => [
            row.name,
            row.email,
            row.phone,
            row.password,
            row.cpass,
            row.language,
            row.gender,
            row.dob,
          ]),
        });

        doc.save("Student Details.pdf");
      });
    });
  };

  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(users.employees);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "User Data");
    XLSX.writeFile(workbook, "UserDetails.xlsx");
  };

  return (
    <div className="text-center col-10 mx-auto">
      <div className="container mt-5 datatable-responsive">
        <div className="d-md-flex border shadow justify-content-between p-3 my-3">
          <div className="d-flex justify-content-center">
            <Link to="/reduxform">
              <Button
                label="New"
                className="mx-1 new"
                icon="pi pi-plus"
                severity="success"
              />
            </Link>
            <Button
              label="Delete"
              onClick={confirmDeleteSelected}
              className="mx-1"
              icon="pi pi-trash"
              severity="danger"
              disabled={!selectedProducts || selectedProducts.length === 0}
            />
          </div>
          <div className="flex-end  gap-2 mt-2 mt-md-0">
            <Button
              type="button"
              className="mx-1"
              icon="pi pi-file"
              rounded
              onClick={() => exportCSV(false)}
              data-pr-tooltip="CSV"
            />

            <Button
              label=""
              type="button"
              className="mx-1"
              icon="pi pi-file-pdf "
              rounded
              severity="warning"
              onClick={() => exportPdf(false)}
              data-pr-tooltip="Export to PDF"
            />
            <Button
              label=""
              type="button"
              className="mx-1"
              icon="pi pi-file-excel"
              severity="success"
              rounded
              onClick={exportExcel}
              data-pr-tooltip="Export to Excel"
            />
          </div>
        </div>
        <Tooltip target=".export-buttons>button" position="bottom" />
        <div className="d-md-flex p-toolbar">
          <div>
            <h3 className="text-danger">User Details</h3>
          </div>
          <div className="d-md-flex justify-content-end">
            <Button
              type="button"
              label="Clear"
              onClick={clearFilters}
              className="me-3 p-2"
              icon="pi pi-filter-slash"
              outlined
            />

            <div className="p-input-icon-left">
              <i className="pi pi-search" />
              <InputText
                value={globalSearchText}
                onChange={handleSearch}
                placeholder="Keyword Search"
              />
            </div>
          </div>
        </div>
        <DataTable
          ref={dt}
          value={filteredData}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Users"
          columnResizeMode="expand"
          resizableColumns
          showGridlines
          tableStyle={{ minWidth: "50rem" }}
          selectionMode={rowClick ? null : "checkbox"}
          selection={selectedProducts}
          onSelectionChange={(e) => setSelectedProducts(e.value)}
          dataKey="id"
        >
          <Column
            selectionMode="multiple"
            headerStyle={{ width: "3rem" }}
          ></Column>
          <Column
            field="name"
            header="Name"
            sortable
            filter
            filterPlaceholder="Search by name"
            style={{ width: "25%" }}
          />
          <Column
            field="dob"
            header="Date of Birth"
            sortable
            filter
            filterPlaceholder="Search by dob"
            style={{ width: "25%" }}
          />
          <Column
            field="gender"
            header="Gender"
            sortable
            filter
            filterPlaceholder="Search by gender"
            style={{ width: "25%" }}
          />
          <Column
            field="email"
            header="E-mail"
            sortable
            filter
            filterPlaceholder="Search by email"
            style={{ width: "25%" }}
          />

          <Column
            field="password"
            header="Password"
            sortable
            filter
            filterPlaceholder="Search by Password"
            style={{ width: "25%" }}
          />
          <Column
            field="cpass"
            header="Confirm Password"
            sortable
            filter
            filterPlaceholder="Search by Confirm Password"
            style={{ width: "25%" }}
          />
          <Column
            field="language"
            header="Language"
            sortable
            filterPlaceholder="Search by Language"
            style={{ width: "25%" }}
          />
          <Column
            field="phone"
            header="Phone"
            sortable
            filter
            filterPlaceholder="Search by Phone"
            style={{ width: "25%" }}
          />

          <Column
            body={(rowData) => (
              <>
                <div key={rowData.id}></div>
                <Link to={`/Reduxform/${rowData.id}`}>
                  <Button
                    type="button"
                    className="mx-1"
                    icon="pi pi-pencil"
                    severity="success"
                    rounded
                  />
                </Link>

                <Button
                  type="button"
                  onClick={() =>
                    setState({
                      ...state,
                      deleteDialogVisible: true,
                      deleteTarget: rowData,
                    })
                  }
                  className="mx-1"
                  icon="pi pi-trash"
                  severity="danger"
                  rounded
                />
              </>
            )}
            header="Actions"
            sortable
            style={{ width: "25%" }}
          />
        </DataTable>
      </div>
      <Dialog
        visible={state.deleteDialogVisible}
        onHide={() =>
          setState({ ...state, deleteDialogVisible: false, deleteTarget: null })
        }
        header="Confirm Deletion"
        footer={
          <div>
            <Button
              label="No"
              icon="pi pi-times"
              className="p-button-text"
              onClick={() =>
                setState({
                  ...state,
                  deleteDialogVisible: false,
                  deleteTarget: null,
                })
              }
            />
            <Button
              label="Yes"
              icon="pi pi-check"
              className="p-button-danger"
              onClick={confirmDelete}
            />
          </div>
        }
      >
        {state.deleteTarget && (
          <p>
            Are you sure you want to delete the user{" "}
            <strong>{state.deleteTarget.name}</strong>?
          </p>
        )}
      </Dialog>

      <Dialog
        visible={state.deleteSelectedDialogVisible}
        onHide={() =>
          setState({ ...state, deleteSelectedDialogVisible: false })
        }
        header="Confirm Deletion"
        footer={
          <div>
            <Button
              label="No"
              icon="pi pi-times"
              className="p-button-text"
              onClick={() =>
                setState({ ...state, deleteSelectedDialogVisible: false })
              }
            />
            <Button
              label="Yes"
              icon="pi pi-check"
              className="p-button-danger"
              onClick={deleteSelectedUsers}
            />
          </div>
        }
      >
        <p>Are you sure you want to delete the selected users?</p>
      </Dialog>
    </div>
  );
};

export default Reduxtable;
