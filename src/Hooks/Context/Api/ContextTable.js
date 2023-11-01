import React, { useRef, useState } from "react";
import { useGlobalContext } from "../../../Hooks/Context/ContextState"
import { Link } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip"; 
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import { FaTrashAlt, FaPencilAlt } from "react-icons/fa"; 
import { useEffect } from "react";
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';

const EmployeeList = () => {
  const navigate = useNavigate();
  const dt = useRef(null);
  const { stateEmp, removeEmployee, dispatch, getEmployee } =
    useGlobalContext();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [rowClick] = useState(true);
  const [state, setState] = useState({
    deleteDialogVisible: false,
    deleteSelectedDialogVisible: false,
    deleteTarget: null,
  });
  const [globalSearchText, setGlobalSearchText] = useState("");

  const getdata = async () => {
    await getEmployee();
};
  useEffect(() => {
    getdata();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEditClick = (id) => {
    navigate(`/ContextForm/${id}`);
  };

  const handleSearch = (e) => {
    dispatch({ type: "SET_SEARCH_TEXT", stateEmp: e.target.value });
    setGlobalSearchText(e.target.value);
  };

  // const filteredData = stateEmp.employees.filter((row) => {
  //   const searchText = globalSearchText.toLowerCase();
  //   return (
  //     row.name.toLowerCase().includes(searchText) ||
  //     row.email.toLowerCase().includes(searchText) ||
  //     row.phone.toLowerCase().includes(searchText)
  //   );
  // });
  const filteredData = stateEmp.employees.filter((row) => {
    const searchText = globalSearchText.toLowerCase();
    return (
      (row.name && row.name.toLowerCase().includes(searchText)) ||
      (row.email && row.email.toLowerCase().includes(searchText)) ||
      (row.phone && row.phone.toLowerCase().includes(searchText))
    );
  }); 

  const clearFilters = () => {
    dt.current.reset();
    setGlobalSearchText("");
  dt.current.filter("", "name", "equals");
  dt.current.filter("", "email", "equals");
  dt.current.filter("", "phone", "equals");
  };

  const confirmDelete = () => {
    if (state.deleteTarget) {
      const employeeId = state.deleteTarget.id
      removeEmployee(employeeId);
      setState({ ...state, deleteDialogVisible: false });
      setSelectedProducts((prevSelectedProducts) =>
        prevSelectedProducts.filter((product) => product.id !== employeeId)
      );
      
    }
    toast.success(" User Deleted Successfully !!!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const confirmDeleteSelected = () => {
   
    setState({ ...state, deleteSelectedDialogVisible: true });
  };


  const deleteSelectedUsers = () => {
    const selectedEmployeeIds = selectedProducts.map((employee) => employee.id);
    Promise.all(
      selectedEmployeeIds.map(async (employeeId) => {
        await removeEmployee(employeeId);
      })
    )
      .then(() => {
        
        setSelectedProducts([]);

        toast.success("Selected Users Deleted Successfully !!!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((error) => {
        toast.error(error.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .finally(() => {
        setState({ ...state, deleteSelectedDialogVisible: false });
      });
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
          body: stateEmp.employees.map((row) => [
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
    const worksheet = XLSX.utils.json_to_sheet(stateEmp.employees);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "User Data");
    XLSX.writeFile(workbook, "UserDetails.xlsx");
  };

  const header = (
    <div className="d-md-flex justify-content-between gap-2">
      <div>
        <h3>User Details</h3>
      </div>
      <div className="d-md-flex">
        <div className="my-auto">
          <Button
            onClick={clearFilters}
            className="pi pi-filter-slash p-button-outlined me-3 p-2"
          >
            <span className="ms-2"><FilterAltOffIcon/>Clear</span>
          </Button>
        </div>
        <div className="me-2">
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText
              value={globalSearchText}
              onChange={handleSearch}
              placeholder="Keyword Search"
            />
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className=" col-10 mx-auto  mt-5 photo">
      <div className="d-md-flex border shadow justify-content-between p-3 my-3  ">
        <div className="d-flex justify-content-center ">
          <div >
            <Link to="/ContextForm">
              <Button className="p-button p-button-success  me-2">
                <span>Add User</span>
              </Button>
            </Link>
          </div>
          <div>
            <Button
              onClick={confirmDeleteSelected}
              className="p-button p-button-danger"

              disabled={!selectedProducts || selectedProducts.length === 0}
              
            >
              <FaTrashAlt className="me-2" />
              <span>Delete </span>
            </Button>
          </div>
        </div>

        <div className="d-flex justify-content-center mt-2 mt-md-0">
          <Button
            label=""
            type="button"
            className="mx-1 export-buttons"
            icon="pi pi-file-pdf "
            rounded
            severity="warning"
            onClick={() => exportPdf(false)}
            data-pr-tooltip="Export to PDF"
          />
          <Button
            label=""
            type="button"
            className="mx-1 export-buttons"
            icon="pi pi-file-excel"
            rounded
            onClick={exportExcel}
            data-pr-tooltip="Export to Excel"
          />
        </div>
      </div>
      <Tooltip target=".export-buttons>button" position="bottom" />

      <div className="datatable">
        <DataTable
          ref={dt}
          value={filteredData}
          paginator
          header={header}
          rows={5}
          className="card shadow mb-5"
          rowsPerPageOptions={[5, 10, 25, 50]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
          columnResizeMode="expand"
          resizableColumns
          showGridlines
          selectionMode={rowClick ? null : "checkbox"}
          selection={selectedProducts}
          onSelectionChange={(e) => setSelectedProducts(e.value)}
          dataKey="id"
          tableStyle={{ minWidth: "50rem" }}
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
            field="email"
            header="Email"
            sortable
            filter
            filterPlaceholder="Search by email"
            style={{ width: "25%" }}
          />
          <Column
            field="phone"
            header="Phone"
            sortable
            filter
            filterPlaceholder="Search by phone"
            style={{ width: "25%" }}
          />
          <Column
            field="password"
            header="Password"
            sortable
            filter
            filterPlaceholder="Search by password"
            style={{ width: "25%" }}
          />
          <Column
            field="cpass"
            header="Confirm Password"
            sortable
            filter
            filterPlaceholder="Search by cpass"
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
            field="language"
            header="Language"
            sortable
            filter
            filterPlaceholder="Search by language"
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
            body={(rowData) => (
              <>
                <div key={rowData.id}></div>
                <Link to={`/ContextForm/${rowData.id}`} >
                  <Button
                    onClick={() => handleEditClick(rowData.id)}
                    icon={<FaPencilAlt />}
                    className="p-button p-button-primary mx-2"
                  />
                </Link>
                <Button
                  onClick={() =>
                    setState({
                      ...state,
                      deleteDialogVisible: true,
                      deleteTarget: rowData,
                    })
                  }
                  icon={<FaTrashAlt />}
                  className="p-button p-button-danger"
                />
              </>
            )}
            header="Actions"
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

export default EmployeeList;

