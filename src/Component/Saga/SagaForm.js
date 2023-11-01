import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  addUserRequest,
  getidUserRequest,
  updateUserRequest,
} from "../SagaGallary/SagaAction";

const SagaForm = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.Sagareducer);
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

  const getid = async () => {
    console.log(getid);
    // const response = await getidData(id);
    dispatch(getidUserRequest(id));
  };

  useEffect(() => {
    if (id) {
      getid();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (users?.employee) {
      navigate("/SagaTable");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users?.employee]);

  useEffect(() => {
    if (users?.selectedEmployee) {
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
  }, [users?.selectedEmployee]);
  const nameRegex = /^[a-zA-Z ]{3,30}$/;
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const phoneRegex = /^\d{10}$/;
//   const passwordRegex =
//     /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@#$%^&+=!])[A-Za-z\d@#$%^&+=!]{8,}$/;
const passwordRegex =

/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])[A-Za-z\d@#$%^&+=!]{8,}$/;

  const dobRegex = /^\d{4}-\d{2}-\d{2}/;

  const validateForm = () => {
    const errors = {};

    if (!formData.name) {
      errors.name = "Name is required*";
    } else if (!nameRegex.test(formData.name)) {
      errors.name = "Invalid name format*";
    }

    if (!formData.email) {
      errors.email = "Email is required*";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid email format*";
    }

    if (!formData.phone) {
      errors.phone = "Phone number is required*";
    } else if (!phoneRegex.test(formData.phone)) {
      errors.phone = "Invalid phone number format*";
    }

    if (!formData.password) {
      errors.password = "Password is required*";
    } else if (!passwordRegex.test(formData.password)) {
      errors.password = "Invalid password format*";
    }

    if (!formData.cpass) {
      errors.cpass = "Confirm Password is required*";
    } else if (formData.cpass !== formData.password) {
      errors.cpass = "Passwords do not match*";
    }

    if (!formData.language) {
      errors.language = "Language is required*";
    }

    if (!formData.gender) {
      errors.gender = "Gender is required*";
    }

    if (!formData.dob) {
      errors.dob = "Date of Birth is required*";
    } else if (!dobRegex.test(formData.dob)) {
      errors.dob = "Invalid Date of Birth format*";
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
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
          // const response = await updateData(formData);
          dispatch(updateUserRequest(formData));
          toast.success("User Data Updated successfully", {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          // const response = await postData(formData);
          dispatch(addUserRequest(formData));
          toast.success("User Data created successfully", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
        navigate("/SagaTable");
      } catch (error) {
        // toast.error(Error in the ${id ? "UPDATE" : "POST"} API, {
        //   position: toast.POSITION.TOP_RIGHT,
        // });
      }
    }
  };

  return (
    <div>
      <div className="main-container w-75 mx-auto">
        <div className="form-container row shadow-lg mt-5">
          <div className="d-flex justify-content-start">
            <Link to="/SagaTable">
              <Button className="rounded-pill mt-4" variant="primary">
                <FaAngleDoubleLeft className="me-2 mb-1" />
                Back
              </Button>
            </Link>
          </div>
          <div className="text-center fw-bold fs-2 mb-3">Saga Form</div>
          <div className="col-md-6">
            <label className="fw-bold">
              Name <span className="text-danger">*</span>
            </label>
            <input
              className={`form-control ${formErrors.name ? "is-invalid" : ""}`}
              name="Name"
              value={formData.name}
              onChange={(event) => {
                handleFieldChange(event, nameRegex, "name");
              }}
              placeholder="Enter your Name"
              required
            />
            <p className="error-message">{formErrors.name}</p>
          </div>

          <div className="col-md-6">
            <label className="fw-bold">
              E-Mail <span className="text-danger">*</span>
            </label>
            <input
              className={`form-control ${formErrors.email ? "is-invalid" : ""}`}
              name="Email"
              value={formData.email}
              onChange={(event) => {
                handleFieldChange(event, emailRegex, "email");
              }}
              placeholder="Enter your E-mail"
              required
            />
            <p className="error-message">{formErrors.email}</p>
          </div>

          <div className="col-md-6">
            <label className="fw-bold">
              Phone Number <span className="text-danger">*</span>
            </label>
            <input
              className={`form-control ${formErrors.phone ? "is-invalid" : ""}`}
              name="Phone Number"
              value={formData.phone}
              onChange={(event) => {
                handleFieldChange(event, phoneRegex, "phone");
              }}
              placeholder="Enter your Phone Number"
              required
            />
            <p className="error-message">{formErrors.phone}</p>
          </div>

          <div className="col-md-6">
            <label className="fw-bold">
              Date of Birth <span className="text-danger">*</span>
            </label>
            <input
              className={`form-control ${formErrors.dob ? "is-invalid" : ""}`}
              name="Date of Birth"
              type="date"
              value={formData.dob}
              onChange={(event) => {
                handleFieldChange(event, dobRegex, "dob");
              }}
              placeholder="Enter your Date of Birth"
              required
            />
            <p className="error-message">{formErrors.dob}</p>
          </div>

          <div className="col-md-6">
            <label className="fw-bold">Password</label>
            <div className="">
              <div className="input-field-wrapper">
                <input
                  className={`form-control ${
                    formErrors.password ? "is-invalid" : ""
                  }`}
                  name="Password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(event) => {
                    handleFieldChange(event, passwordRegex, "password");
                  }}
                  placeholder="Enter your Password"
                  required
                />
                <button
                  className="show-password-button fs-4 text-primary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>
            <p className="error-message">{formErrors.passwordError}</p>
          </div>
          <div className="col-md-6">
            <label className="fw-bold">Confirm password</label>
            <div className="">
              <div className="input-field-wrapper">
                <input
                  className={`form-control ${
                    formErrors.cpass ? "is-invalid" : ""
                  }`}
                  name="Confirm password"
                  type={cshowPassword ? "text" : "password"}
                  value={formData.cpass}
                  onChange={(event) => {
                    handleFieldChange(event, passwordRegex, "cpass");
                  }}
                  placeholder="Enter your Confirm password"
                  required
                />
                <button
                  className="show-password-button fs-4 text-primary"
                  onClick={() => setCShowPassword(!cshowPassword)}
                >
                  {cshowPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>

            <p className="error-message">{formErrors.cpassError}</p>
          </div>

          <div className="col-md-6 mb-3 mx-auto">
            <label htmlFor="language" className="fw-bold text-dark">
              Language:
            </label>
            <select
              className={`form-select ${
                formErrors.language ? "is-invalid" : ""
              }`}
              id="language"
              name="language"
              value={formData.language}
              onChange={(event) => {
                handleFieldChange(event, null, "language");
              }}
            >
              <option value="">Select your Language</option>
              <option value="english">English</option>
              <option value="spanish">Spanish</option>
              <option value="french">French</option>
            </select>
            {formErrors.language && (
              <div className="text-danger">{formErrors.language}</div>
            )}
          </div>

          <div className="col-md-6">
            <label className="fw-bold">
              Gender <span className="text-danger">*</span>
            </label>
            <div className="radio-group d-flex">
              {["Male", "Female", "Others"].map((option) => (
                <div key={option}>
                  <input
                    type="radio"
                    name="Gender"
                    value={option}
                    checked={formData.gender === option}
                    onChange={(event) => {
                      handleFieldChange(event, null, "gender");
                    }}
                    required
                  />
                  <label className="me-2">{option}</label>
                </div>
              ))}
            </div>
            <p className="error-message">{formErrors.gender}</p>
          </div>

          <div className="d-flex justify-content-center">
            <div className="">
              <Button className="rounded-pill mb-4 mt-4" onClick={handleSubmit}>
                {id ? "Update" : "Submit"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SagaForm;