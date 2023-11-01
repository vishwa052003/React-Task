
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ProgressSpinner } from "primereact/progressspinner";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaSpinner } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  addUser,
  getidUser,
  updateUser,
} from "../ReduxAction/Action";

const Reduxform = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.reducer);
  console.log(users);
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    password: "",
    cpass: "",
    language: "",
    gender: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [cshowPassword, setCShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const getid = async () => {
    console.log(getid);
    dispatch(getidUser(id));
  };

  useEffect(() => {
    if (id) {

      
      getid();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (users.selectedEmployee) {
      setFormData({
        name: users.selectedEmployee.name,
        email: users.selectedEmployee.email,
        phone: users.selectedEmployee.phone,
        dob: users.selectedEmployee.dob,
        password: users.selectedEmployee.password,
        cpass: users.selectedEmployee.cpass,
        language: users.selectedEmployee.language,
        gender: users.selectedEmployee.gender,
        id: users.selectedEmployee.id,
      });
    }
    console.log(users);
  }, [users]);
  const nameRegex = /^[a-zA-Z ]{3,30}$/;
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const phoneRegex = /^\d{10}$/;
  // const passwordRegex =
  //   /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@#$%^&+=!])[A-Za-z\d@#$%^&+=!]{8,}$/;

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])[A-Za-z\d@#$%^&+=!]{8,}$/;

  const dobRegex = /^\d{4}-\d{2}-\d{2}/;

  const Spinner = () => {
    return (
      <div className="spinner">
        <FaSpinner className="spinner-icon" />
        <p>Loading...</p>
      </div>
    );
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name) {
      errors.name = "Name is required*";
    } else if (!nameRegex.test(formData.name)) {
      errors.name = "Invalid name format*";
    } else {
      errors.name = ""; // Clear the error if the name is valid
    }

    if (!formData.email) {
      errors.email = "Email is required*";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid email format*";
    } else {
      errors.email = ""; // Clear the error if the email is valid
    }

    if (!formData.phone) {
      errors.phone = "Phone number is required*";
    } else if (!phoneRegex.test(formData.phone)) {
      errors.phone = "Invalid phone number format*";
    } else {
      errors.phone = ""; // Clear the error if the phone number is valid
    }

    if (!formData.password) {
      errors.password = "Password is required*";
    } else if (!passwordRegex.test(formData.password)) {
      errors.password = "Invalid password format*";
    } else {
      errors.password = ""; // Clear the error if the password is valid
    }

    if (!formData.cpass) {
      errors.cpass = "Confirm Password is required*";
    } else if (formData.cpass !== formData.password) {
      errors.cpass = "Passwords do not match*";
    } else {
      errors.cpass = ""; // Clear the error if the passwords match
    }

    if (!formData.language) {
      errors.language = "Language is required*";
    } else {
      errors.language = ""; // Clear the error if the language is selected
    }

    if (!formData.gender) {
      errors.gender = "Gender is required*";
    } else {
      errors.gender = ""; // Clear the error if the gender is selected
    }

    if (!formData.dob) {
      errors.dob = "Date of Birth is required*";
    } else if (!dobRegex.test(formData.dob)) {
      errors.dob = "Invalid Date of Birth format*";
    } else {
      errors.dob = ""; // Clear the error if the date of birth is valid
    }

    setFormErrors(errors);

    return Object.keys(errors).every((key) => errors[key] === "");
  };

  const handleFieldChange = (event, regex, fieldName) => {
    const value = event.target.value;

    if (regex && !regex.test(value)) {
      setFormErrors({
        ...formErrors,
        [fieldName]: `Invalid ${fieldName} format*`,
      });
    } else {
      setFormErrors({
        ...formErrors,
        [fieldName]: "",
      });
    }

    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (isValid) {
      try {
        if (id) {
          dispatch(updateUser(formData));
          toast.success("User Data Updated successfully", {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          dispatch(addUser(formData));
          toast.success("User Data created successfully", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
        navigate("/Reduxtable");
      } catch (error) {
        toast.error('Error in the ${id ? "UPDATE" : "POST"} API', {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  return (
    <div className=" d-flex justify-content-center flex-column bgs mx-auto">
      <div className=" d-flex justify-content-end me-3 mt-3">
        <Link to="/reduxtable">
          <button className="btn btn-grad text-secondary"> Back</button>
        </Link>
      </div>
      <div className="container col-md-8 card p-5 shadow-secondary ">
        <Form className="form">
          <div className="row">
            <h1 className="text-center text-danger">Redux Form</h1>

            <div className="col-md-6 mx-auto">
              <label className="fw-bold">
                Name<span className="text-danger">*</span> :
              </label>
              <input
                className={`form-control ${
                  formErrors.name ? "is-invalid" : ""
                }`}
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={(event) => {
                  handleFieldChange(event, nameRegex, "name");
                }}
                placeholder="Enter your Name"
                required
              />
              <p className="error-message text-danger fw-bold">
                {formErrors.name}
              </p>
            </div>

            <div className="col-md-6 mx-auto">
              <label className="fw-bold">
                Date of Birth<span className="text-danger">*</span> :
              </label>
              <input
                className={`form-control ${formErrors.dob ? "is-invalid" : ""}`}
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={(event) => {
                  handleFieldChange(event, dobRegex, "dob");
                }}
                placeholder="Enter your Date of Birth "
              />
              <p className="error-message text-danger fw-bold">
                {formErrors.dob}
              </p>
            </div>
            <div className="col-md-6 mx-auto">
              <label className="fw-bold mb-3">
                Gender<span className="text-danger">*</span> :
              </label>
              <div className="radio-group d-flex">
                {["Male", "Female", "Other"].map((option) => (
                  <div key={option}>
                    <input
                      type="radio"
                      id={option}
                      name="gender"
                      value={option}
                      checked={formData.gender === option}
                      onChange={(event) => {
                        handleFieldChange(event, null, "gender");
                      }}
                    />
                    <label className="me-2"> {option}</label>
                  </div>
                ))}
              </div>
              <p className="error-message text-danger fw-bold">
                {formErrors.gender}
              </p>
            </div>

            <div className="col-md-6  mx-auto">
              <label className="fw-bold">
                E-mail<span className="text-danger">*</span> :
              </label>
              <input
                className={`form-control ${
                  formErrors.email ? "is-invalid" : ""
                }`}
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={(event) => {
                  handleFieldChange(event, emailRegex, "email");
                }}
                placeholder="Enter your Email"
              />
              <p className="error-message text-danger fw-bold">
                {formErrors.email}
              </p>
            </div>

            <div className="col-md-6 mx-auto">
              <label className="fw-bold">
                Password<span className="text-danger">*</span> :
              </label>
              <div className="input-field-show">
                <input
                  className={`form-control ${
                    formErrors.password ? "is-invalid" : ""
                  }`}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={(event) => {
                    handleFieldChange(event, passwordRegex, "password");
                  }}
                  placeholder="Enter your Password"
                />
                <button
                  className="show-password-button fs-4 text-primary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </button>
              </div>
              
              <p className="error-message text-danger fw-bold">
                {formErrors.password}{" "}
              </p>
            </div>
            <div className="col-md-6 mx-auto">
              <label className="fw-bold">
                Confirm Password<span className="text-danger">*</span> :
              </label>
              <div className="input-field-show"></div>
              <input
                className={`form-control ${
                  formErrors.cpass ? "is-invalid" : ""
                }`}
                type={cshowPassword ? "text" : "password"}
                id="cpass"
                name="cpass"
                value={formData.cpass}
                onChange={(event) => {
                  handleFieldChange(event, passwordRegex, "cpass");
                }}
                placeholder="Confirm your Password"
              />
              <button
                className="show-passwordbuttons fs-4 text-primary"
                onClick={() => setCShowPassword(!cshowPassword)}
              >
                {cshowPassword ? <FaEye /> : <FaEyeSlash />}
              </button>

              <p className="error-message text-danger fw-bold">
                {formErrors.cpass}
              </p>
            </div>

            <div className="col-md-6 mx-auto">
              <label className="fw-bold mb-3">
                Language<span className="text-danger">*</span> :
              </label>
              <select
                className={
                  'form-control ${formErrors.language ? "is-invalid" : ""}'
                }
                id="language"
                name="language"
                value={formData.language}
                onChange={(event) => {
                  handleFieldChange(event, null, "language");
                }}
              >
                <option value="">-- Select your Language --</option>
                <option value="tamil">Tamil</option>
                <option value="english">English</option>
                <option value="hindi">Hindi</option>
                <option value="telugu">Telugu</option>
                <option value="malayalam">Malayalam</option>
                <option value="spanish">Spanish</option>
                <option value="french">French</option>
                <option value="urdu">Urdu</option>
                <option value="Other">Other</option>
              </select>

              <p className="text-danger text-danger fw-bold">
                {formErrors.language}
              </p>
            </div>

            <div className="col-md-6 mx-auto">
              <label className="fw-bold">
                Phone Number<span className="text-danger">*</span> :
              </label>
              <input
                className={`form-control ${
                  formErrors.phone ? "is-invalid" : ""
                }`}
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={(event) => {
                  handleFieldChange(event, phoneRegex, "phone");
                }}
                placeholder="Enter your Phone Number"
              />
              <p className="error-message text-danger fw-bold">
                {formErrors.phone}
              </p>
            </div>

            <div className="d-flex justify-content-center">
              <div className="">
                <Button
                  className="btn btn-primary rounded-pill mb-4 mt-4"
                  onClick={handleSubmit}
                >
                  {id ? "Update" : "Submit"}
                </Button>
              </div>
            </div>
          </div>                                           
        </Form>
        {isLoading && (
          <div className="loading-spinner-container">
            <ProgressSpinner
              style={{ width: "100px", height: "100px" }}
              strokeWidth="7"
              fill="var(--surface-ground)"
              animationDuration=".7s"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Reduxform;
