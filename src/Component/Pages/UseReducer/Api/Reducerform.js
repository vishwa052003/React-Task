import React, { useEffect, useReducer, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import { Divider } from "primereact/divider";
import { ProgressSpinner } from "primereact/progressspinner";
import { Password } from "primereact/password";
import { InputText } from "primereact/inputtext";
import { Action } from ".//../../../../Hooks/Reducer/Action/redAction";

import { getUser,  createUser, updateuser } from "../../../../Service/Mockapi";
import {
  initialState,
  reducer,
} from "..//..//..//../Hooks/Reducer/Function/Reducer";


export default function Reducerform() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showPassword, setShowPassword] = useState(false);

  const {id}= useParams();
  // const { id } = getUser() || {};
  console.log("ID from route:", id);
  const userDetails = useNavigate();

  useEffect(() => {
    
    if (id) {
      getId(id);
      dispatch({ type: Action.SET_ID, value: id });
    }
  }, [id]);

  const getId = async (id) => {  
    dispatch({ type: Action.SET_IS_LOADING, payload: true });
    try {
      // const res = await axios.get(API_URL + id);
      const res = await getUser(id);
      dispatch({ type: Action.SET_DATA, data: res.data });
    } catch (error) {
      dispatch({ type: Action.SET_DATA, data: initialState });
      toast.error("Error in the GET_ID API", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } finally {
      dispatch({ type: Action.SET_IS_LOADING, payload: false });
    } 
  };

  const  createUsers = async (formData) => {
    try {
      dispatch({ type: Action.SET_IS_LOADING, payload: true });
      const response = await createUser(formData);
      dispatch({ type: Action.CREATE_USER, payload: response });
    } catch (error) {
      console.error("Error creating user:", error);
    } finally {
      dispatch({ type: Action.SET_IS_LOADING, payload: false });
    }
  };

  const updateUser = async (id, formData) => {
    try {
      dispatch({ type: Action.SET_IS_LOADING, payload: true });
      const response = await updateuser(id, formData);
      // dispatch({ type: Action.UPDATE_USER, payload: { id, data: formData } });
      dispatch({ type: Action.UPDATE_USER, payload: response });
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      dispatch({ type: Action.SET_IS_LOADING, payload: false });
    }
  };

  const validatePassword = (password) => {
    const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;

    return (
      password.length >= 8 &&
      specialCharRegex.test(password) &&
      lowercaseRegex.test(password) &&
      uppercaseRegex.test(password) &&
      numberRegex.test(password)
    );
  };

  const validateForm = () => {
    const newErrors = {};

    if (
      !/^[a-zA-Z\s]*$/.test(state.name) ||
      /\d/.test(state.name) ||
      state.name.trim().length < 3
    ) {
      newErrors.name =
        "Name should contain only letters and spaces and be at least 2 characters long.";
    }

    if (!state.email.trim() || !isValidEmail(state.email)) {
      newErrors.email = "Enter a valid Email Address.";
    }

    const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;

    if (
      state.password.length < 8 ||
      !uppercaseRegex.test(state.password) ||
      !lowercaseRegex.test(state.password) ||
      !specialCharRegex.test(state.password) ||
      !numberRegex.test(state.password)
    ) {
      newErrors.password =
        "Password must contain at least one special character, one lowercase letter, one uppercase letter, one number, and be at least 8 characters long";
    }

    if (state.confirmPassword !== state.password) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (!isValidNumber(state.phoneNumber)) {
      newErrors.phoneNumber = "Enter a valid Mobile number.";
    }

    if (!state.dob.trim()) {
      newErrors.dob = "Date of Birth is required.";
    }

    if (!state.gender.trim()) {
      newErrors.gender = "Gender is required.";
    }

    if (!state.language.trim()) {
      newErrors.language = "Language is required.";
    }

    dispatch({ type: Action.UPDATE_ERRORS, payload: newErrors });
    console.log(state.errors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const newErrors = { ...state.errors };

    switch (name) {
      case "name":
        if (
          !/^[a-zA-Z\s]*$/.test(value) ||
          /\d/.test(value) ||
          value.trim().length < 2
        ) {
          newErrors.name =
            "Name should contain only letters and spaces and be at least 2 characters long.";
        } else {
          newErrors.name = "";
        }
        break;
      case "email":
        if (!isValidEmail(value)) {
          newErrors.email = "Enter a valid Email Address.";
        } else {
          newErrors.email = "";
        }
        break;
      case "password":
        const uppercaseRegex = /[A-Z]/;
        const lowercaseRegex = /[a-z]/;
        const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;
        const numberRegex = /[0-9]/;
        if (
          value.trim().length < 8 ||
          !uppercaseRegex.test(value) ||
          !lowercaseRegex.test(value) ||
          !specialCharRegex.test(value) ||
          !numberRegex.test(value)
        ) {
          newErrors.password =
            "Password must contain at least one special character, one lowercase letter, one uppercase letter, one number, and be at least 8 characters long";
        } else {
          newErrors.password = "";
        }
        break;
      case "confirmPassword":
        if (value !== state.password) {
          newErrors.confirmPassword = "Passwords do not match.";
        } else {
          newErrors.confirmPassword = "";
        }
        break;
      case "phoneNumber":
        if (!isValidNumber(value)) {
          newErrors.phoneNumber = "Enter a valid Mobile number.";
        } else {
          newErrors.phoneNumber = "";
        }
        break;
      case "dob":
        if (!value.trim()) {
          newErrors.dob = "Date of Birth is required.";
        } else {
          newErrors.dob = "";
        }
        break;
      case "gender":
        if (!value.trim()) {
          newErrors.gender = "Gender is required.";
        } else {
          newErrors.gender = "";
        }
        break;
      case "language":
        if (!value.trim()) {
          newErrors.language = "Language is required.";
        } else {
          newErrors.language = "";
        }
        break;
      default:
        break;
    }

    dispatch({ type: Action.UPDATE_FIELD, payload: { name, value } });
    dispatch({ type: Action.UPDATE_ERRORS, payload: newErrors });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (state.isSubmitting) {
      return;
    }

    const formData = {
      name: state.name,
      email: state.email,
      password: state.password,
      confirmPassword: state.confirmPassword,
      phoneNumber: state.phoneNumber,
      gender: state.gender,
      language: state.language,
      dob: state.dob,
    };

    const isValid = validateForm();
    console.log(state.errors);
    if (isValid) {
      dispatch({ type: Action.SET_IS_SUBMITTING, payload: true });
      dispatch({ type: Action.SET_IS_LOADING, payload: true });
      if (!id && isValid) {
        try {
          createUsers(formData);
          setTimeout(() => {
            userDetails("/Reducertable");
            dispatch({ type: Action.SET_IS_LOADING, payload: true });
          }, 5000);
          toast.success("Form submitted successfully!");
        } catch (error) {
          console.error("Error submitting form:", error);
          toast.error("Error submitting form");
          dispatch({ type: Action.SET_IS_LOADING, payload: false });
          dispatch({ type: Action.SET_IS_SUBMITTING, payload: false });
        }
      } else {
        try {
          updateUser(id, formData);
          setTimeout(() => {
            userDetails("/Reducertable");
            dispatch({ type: Action.SET_IS_LOADING, payload: true });
          }, 5000);
          toast.success("Form updated successfully!");
        } catch (error) {
          console.error("Error updating form:", error);
          toast.error("Error updating form");
          dispatch({ type: Action.SET_IS_LOADING, payload: false });
          dispatch({ type: Action.SET_IS_SUBMITTING, payload: false });
        }
      }
    } else {
      dispatch({ type: Action.SET_IS_SUBMITTING, payload: false });
      dispatch({ type: Action.SET_IS_LOADING, payload: false });
    }
  };

  const isValidNumber = (phoneNumber) => {
    const numberpattern = /^\d{10}$/;
    return numberpattern.test(phoneNumber);
  };

  const isValidEmail = (email) => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailPattern.test(email);
  };
  const footer = (
    <>
      <Divider />
      <p className="mt-2">Suggestions</p>
      <ul className="pl-2 ml-2 mt-0 line-height-3">
        <li>At least one lowercase</li>
        <li>At least one uppercase</li>
        <li>At least one numeric</li>
        <li>Minimum 8 characters</li>
      </ul>
    </>
  );

  return (
    <div> 
      <div className="bg-color">
        <div className="d-flex mt-3 ms-md-5 ">
          {" "}
          <NavLink to="/Reducertable">
         
            <button type="button" className="btn ms-2 btn-dark text-light">
              Back
            </button>
          </NavLink>
        </div>
        <h1 className="text-center mt-2 fw-bold">Customer's Details</h1>

        {/* {state.isLoading && (
          <div className="loading-spinner-container">
            <ProgressSpinner
              style={{ width: "50px", height: "50px" }}
              strokeWidth="8"
              fill="var(--surface-ground)"
              animationDuration=".5s"
            />
          </div>
        )} */}
        <form onSubmit={handleSubmit}>
          <div className="container ms-auto center  img">
            <div className="row mt-5 shadow gap-3">
              <div className="custom-border col">
                <div className="p-4">
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      id="name"
                      className={`form-control input_border ${
                        state.errors.name ? "is-invalid" : ""
                      } ${
                        state.name && !state.errors.name ? "green-border" : ""
                      }`}
                      name="name"
                      value={state.name}
                      onChange={handleChange}
                    />
                    <label htmlFor="floatingInput" className="fw-bold">
                      Name
                    </label>
                    {state.errors.name && (
                      <div className="invalid-feedback">
                        {state.errors.name}
                      </div>
                    )}
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      id="email"
                      className={`form-control input_border ${
                        state.errors.email ? "is-invalid" : ""
                      } ${
                        state.email && !state.errors.email ? "green-border" : ""
                      }`}
                      name="email"
                      value={state.email}
                      onChange={handleChange}
                    />
                    <label htmlFor="floatingInput" className="fw-bold">
                      Email
                    </label>
                    {state.errors.email && (
                      <div className="invalid-feedback">
                        {state.errors.email}
                      </div>
                    )}
                  </div>
                  
                  <div className="form-floating mb-3">
                    <InputText
                      id="password"
                      type={showPassword ? "text" : "password"}
                      className={`form-control input_border ${
                        state.errors.password ? "is-invalid" : ""
                      } ${
                        state.password && !state.errors.password
                          ? "green-border"
                          : ""
                      }`}
                      name="password"
                      value={state.password}
                      onChange={handleChange}
                    />
                    <label htmlFor="password" className="fw-bold">
                      Password
                    </label>
                    <span className="password-toggle">
                      <input
                        type="checkbox"
                        id="showPassword"
                        onChange={() => setShowPassword(!showPassword)}
                      />
                      <label htmlFor="showPassword">Show Password</label>
                    </span>
                  </div>
                  {/* <label htmlFor="floatingInput" className="">
                    Password
                  </label>

                  <Password
                    id="password"
                    className={`form-control input_border ${
                      state.errors.password ? "is-invalid" : ""
                    } ${
                      state.password && !state.errors.password
                        ? "green-border"
                        : ""
                    }`}
                    name="password"
                    footer={footer}
                    value={state.password}
                    onChange={handleChange}
                    toggleMask
                    style={{ paddingRight: "30px" }}
                  /> */}
                  {state.errors.password && (
                    <div className="text-danger">{state.errors.password}</div>
                  )}
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      id="confirmPassword"
                      className={`form-control input_border ${
                        state.errors.confirmPassword ? "is-invalid" : ""
                      } ${
                        state.confirmPassword && !state.errors.confirmPassword
                          ? "green-border"
                          : ""
                      }`}
                      name="confirmPassword"
                      value={state.confirmPassword}
                      onChange={handleChange}
                    />
                    <label htmlFor="floatingInput" className="fw-bold">
                      Confirm Password
                    </label>

                    {state.errors.confirmPassword && (
                      <div className="invalid-feedback">
                        {state.errors.confirmPassword}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="col custom-border">
                <div className="p-4">
                  <div className="form-floating mb-3">
                    <input
                      type="number"
                      id="phoneNumber"
                      className={`form-control input_border ${
                        state.errors.phoneNumber ? "is-invalid" : ""
                      } ${
                        state.phoneNumber && !state.errors.phoneNumber
                          ? "green-border"
                          : ""
                      }`}
                      name="phoneNumber"
                      value={state.phoneNumber}
                      onChange={handleChange}
                    />
                    <label htmlFor="floatingInput" className="fw-bold">
                      Phone Number
                    </label>
                    {state.errors.phoneNumber && (
                      <div className="invalid-feedback">
                        {state.errors.phoneNumber}
                      </div>
                    )}
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="date"
                      id="dob"
                      className={`form-control input_border ${
                        state.errors.dob ? "is-invalid" : ""
                      } ${
                        state.dob && !state.errors.dob ? "green-border" : ""
                      }`}
                      name="dob"
                      value={state.dob}
                      onChange={handleChange}
                    />
                    <label htmlFor="floatingInput" className="fw-bold">
                      Date of Birth
                    </label>
                    {state.errors.dob && (
                      <div className="invalid-feedback">{state.errors.dob}</div>
                    )}
                  </div>

                  <div>
                    {/* <div className="input-group mb-lg-4 mb-md-0"> */}
                    <div
                      className={`form-control input_border ${
                        state.errors.gender ? "is-invalid" : ""
                      } ${
                        state.gender && !state.errors.gender
                          ? "green-border"
                          : ""
                      }`}
                    >
                      <div className="fw-bold">
                        <label className="">Gender</label>
                      </div>
                      <div className="ms-5 d-flex">
                        <div className="form-check">
                          <input
                            type="radio"
                            id="maleGender"
                            className="form-check-input"
                            name="gender"
                            value="Male"
                            checked={state.gender === "Male"}
                            onChange={handleChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="maleGender"
                          >
                            Male
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            type="radio"
                            id="femaleGender"
                            className="form-check-input ms-2"
                            name="gender"
                            value="Female"
                            checked={state.gender === "Female"}
                            onChange={handleChange}
                          />
                          <label
                            className="form-check-label ms-2"
                            htmlFor="femaleGender"
                          >
                            Female
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            type="radio"
                            id="othersGender"
                            className="form-check-input ms-2"
                            name="gender"
                            value="Others"
                            checked={state.gender === "Others"}
                            onChange={handleChange}
                          />
                          <label
                            className="form-check-label ms-2"
                            htmlFor="OthersGender"
                          >
                            Others
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  {state.errors.gender && (
                    <div className="text-danger">{state.errors.gender}</div>
                  )}

                  <div>
                    {/* <div className="input-group  mt-5 mb-4 "> */}
                    <div className="input-group  mt-5 mb-4 ">
                      <label
                        className="input-group-text"
                        htmlFor="floatingInputtGroupSelect01"
                      >
                        Language
                      </label>
                      <select
                        className={`form-control input_border ${
                          state.errors.language ? "is-invalid" : ""
                        } ${
                          state.language && !state.errors.language
                            ? "green-border"
                            : ""
                        }`}
                        id="language"
                        name="language"
                        value={state.language}
                        onChange={handleChange}
                      >
                        <option value="">Select</option>
                        <option>Arabic</option>
                        <option>English</option>
                        <option>French</option>
                        <option>Hindi</option>
                        <option>Tamil</option>
                      </select>
                    </div>
                    {state.errors.language && (
                      <p className="text-danger ">{state.errors.language}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-2 pt-3 pb-3">
              <button
                type="button"
                className="btn btn-success"
                onClick={handleSubmit}
                disabled={state.isSubmitting}
              >
                {state.isSubmitting ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Submitting...
                  </>
                ) : id ? (
                  "Save"
                ) : (
                  "Submit"
                )}
              </button>
              {/* 
              <NavLink to="/usereducer-api">
                <button type="button" className="btn ms-2 btn-dark text-light">
                  Back
                </button>
              </NavLink> */}
            </div>
          </div>
        </form>
      </div>
      <ToastContainer autoClose={1000} />
    </div>
  );
}
