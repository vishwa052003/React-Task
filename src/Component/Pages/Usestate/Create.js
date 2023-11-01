import React, { useState, useEffect } from "react";
import { Form, Button } from "semantic-ui-react";
import axios from "axios";
import { getUser, createUser, updateuser } from "../../../Service/Mockapi";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import BadgeIcon from "@mui/icons-material/Badge";
import { useNavigate, useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { ProgressSpinner } from "primereact/progressspinner";
// import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { FaFile, FaAngleDoubleLeft } from "react-icons/fa";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import TranslateIcon from "@mui/icons-material/Translate";
import NoEncryptionIcon from "@mui/icons-material/NoEncryption";
import MailLockIcon from "@mui/icons-material/MailLock";
import WcIcon from "@mui/icons-material/Wc";
import { FaSpinner } from "react-icons/fa";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
export const FormState = () => {
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [phone, setPhoneno] = useState("");
  const [phoneError, setPhonenoError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [cpassword, setConfirmPassword] = useState("");
  const [cpasswordError, setConfirmPasswordError] = useState("");

  const [gender, setGender] = useState("");
  const [genderError, setGenderError] = useState("");

  const [language, setLanguage] = useState("");

  const [languageError, setLanguageError] = useState("");
  const [dob, setDateofBirth] = useState("");
  const [dobError, setDateofBirthError] = useState("");
  const [id, setId] = useState("");
  const router = useParams();

  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false); //Declare isEditing here
  // let [isloading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({});

  const nameRegex = /^[a-zA-Z ]{3,10}$/;
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const phoneRegex = /^\d{10}$/;
  // const passwordRegex = /^\d{8}$/;
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  const dobRegex = /^\d{4}-\d{2}-\d{2}/;
  const Spinner = () => {
    return (
      <div className="spinner">
        <FaSpinner className="spinner-icon" />
        <p>Loading...</p>
      </div>
    );
  };
  const handleFieldChange = (event, regex, errorSetter) => {
    const value = event.target.value;
    if (!value) {
      errorSetter(`${event.target.name}  is required*`);
    } else if (typeof regex === "function" && !regex(value)) {
      errorSetter(`Invalid ${event.target.name} format*`);
    } else if (regex instanceof RegExp && !regex.test(value)) {
      errorSetter(`Invalid ${event.target.name} format*`);
    } else {
      errorSetter("");
    }
  };

  const handleLanguageChange = (event, errorSetter) => {
    const value = event.target.value;
    if (!value) {
      errorSetter(`${event.target.name} is required*`);
    } else {
      errorSetter("");
    }
  };

  const validateForm = () => {
    let valid = true;

    handleFieldChange(
      { target: { name: "firstName", value: firstName } },
      nameRegex,
      setFirstNameError
    );
    handleFieldChange(
      { target: { name: "Email", value: email } },
      emailRegex,
      setEmailError
    );
    handleFieldChange(
      { target: { name: "Phone Number", value: phone } },
      phoneRegex,
      setPhonenoError
    );
    handleFieldChange(
      { target: { name: "Password", value: password } },
      passwordRegex,
      setPasswordError
    );
    // if (!firstName) {
    //   valid = false;
    // } else {
    //   setFirstName("");
    // }
    // if (!email) {
    //   valid = false;
    // } else {
    //   setEmailError("");
    // }
    // if (!phone) {
    //   valid = false;
    // } else {
    //   setPhonenoError("");
    // }

    if (!cpassword) {
      setConfirmPasswordError("Confirm password is required*");
      valid = false;
    } else if (cpassword !== password) {
      setConfirmPasswordError("Passwords do not match*");
      valid = false;
    } else {
      setConfirmPasswordError("");
    }

    if (!language) {
      setLanguageError("Please select a language*");
      valid = false;
    } else {
      setLanguageError("");
    }

    if (!gender) {
      setGenderError("Please select a gender*");
      valid = false;
    } else {
      setGenderError("");
    }

    handleFieldChange(
      { target: { name: "Date of Birth", value: dob } },
      dobRegex,
      setDateofBirthError
    );

    return valid;
  };


  const getId = async (id) => {
    console.log("fydIYGF;OUEDO");
    setIsLoading(true);
    try {
      const res = await getUser(id);
      console.log(res);
      setId(res.data.id);
      setFirstName(res.data.firstName);
      setEmail(res.data.email);
      setPhoneno(res.data.phone);
      setPassword(res.data.password);
      setConfirmPassword(res.data.cpassword);
      setLanguage(res.data.language);
      setGender(res.data.gender);
      setDateofBirth(res.data.dob);
    } catch (error) {
      setId("");
      setFirstName("");
      setEmail("");
      setPhoneno("");
      setPassword("");
      setConfirmPassword("");
      setLanguage("");
      setGender("");
      setDateofBirth("");
      toast.error("Error in the GET_ID API", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (router.id) {
      getId(router.id);
      setIsEditing(true);
    }
  }, [router.id]);

  const postData = async () => {
    setIsLoading(true);
    try {
      setIsLoading(true);
      await createUser({
        firstName,
        email,
        phone,
        password,
        cpassword,
        language,
        gender,
        dob,
      });
      toast.success("User Data created successfully", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      setIsLoading(false);
      toast.error("Error in the POST API", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } finally {
      setIsLoading(false);
    }
    navigate("/Read");
  };

  const updateUser = async () => {
    const isvalid = validateForm();
    if (!isvalid) {
      toast.error("Enter the Required Fields", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    // setIsLoading(true);
    try {
      await updateuser(id,{
        firstName,
        email,
        phone,
        password,
        cpassword,
        language,
        gender,
        dob,
      });
      toast.success("User Data Updated successfully", {
        position: toast.POSITION.TOP_RIGHT,
      });
      navigate("/Read");
    } catch (error) {
      toast.error("Error in the UPDATE API", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } finally {
      // setIsLoading(false);
    }
  };

  // const updateUser = async () => {
  //   const isvalid = validateForm();
  //   if (!isvalid) {
  //     toast.error("Enter the Required Fields", {
  //       position: toast.POSITION.TOP_RIGHT,
  //     });
  //     return;
  //   }
  //   // setIsLoading(true);
  //   try {
  //     await updateuser({
  //       firstName,
  //       email,
  //       phone,
  //       password,
  //       cpassword,
  //       language,
  //       gender,
  //       dob,
  //     });
  //     toast.success("User Data Updated successfully", {
  //       position: toast.POSITION.TOP_RIGHT,
  //     }); // Display success message
  //     navigate("/Read");
  //   } catch (error) {
  //     toast.error("Error in the UPDATE API", {
  //       position: toast.POSITION.TOP_RIGHT,
  //     });
  //   } finally {
  //     // setIsLoading(false);
  //   }
  // };
  
 

  // const handleLanguageChange = (event) => {
  //   setLanguage(event.target.value);
  // };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  const handleClick = () => {
    const isFormValid = validateForm(); // Validate the form fields

    // Validate all input fields using their respective regex patterns
    const isfirstNameValid = nameRegex.test(firstName);
    const isEmailValid = emailRegex.test(email);
    const isPhoneValid = phoneRegex.test(phone);
    const isPasswordValid = passwordRegex.test(password);
    const isCPasswordValid = cpassword === password;
    const isDobValid = dobRegex.test(dob);

    if (
      isFormValid &&
      isfirstNameValid &&
      isEmailValid &&
      isPhoneValid &&
      isPasswordValid &&
      isCPasswordValid &&
      isDobValid
    ) {
      if (isEditing) {
        updateUser(); // Submit the form if editing
      } else {
        postData(); // Submit the form if creating a new record
      }
    } else {
      toast.error("User Data fill", {
        position: toast.POSITION.TOP_RIGHT,
        
      });
    }
  };

  // const handleClick = () => {
  //   if (isEditing) {
  //     updateUser();
  //   } else {
  //     const isvalid = validateForm();
  //     if (!isvalid) {
  //       toast.error("Enter the Required Fields", {
  //         position: toast.POSITION.TOP_RIGHT,
  //       });
  //       return;
  //     }
  //     const isValid = validateForm();
  //     if (isValid) {
  //       postData();
  //     }
  //   }
  // };

  

  return (
    <>
      {" "}
      <NavLink to="/Read" className="nav-link">
        <Button className="btn-grad mt-3 p-2 ms-3 btn-grad1 bg-info" id="back">
          {" "}
          <FaAngleDoubleLeft />
          Back
        </Button>{" "}
      </NavLink>
     
      <div className="contanier mb-5 d-flex justify-content-center  ">
        <div className="col-md-6 card bg-light   shadow ">
          <Form className="row p-4 " id="img">
            <h1 className="data text-center w-100 " id="page">
              {" "}
              useState form
            </h1>
            <Form.Field className="col-md-6 p-2">
              {/* <label className="fw-bold mb-2">Firstname *</label>
              <input
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}

                placeholder="Enter name...."
                className={`form-control ${
                  errors.firstName ? "is-invalid" : firstName ? "is-valid" : ""
                }`}
              /> */}
              {/* {errors.firstName && <p className="error">{errors.firstName}</p>} */}

              <label className="fw-bold">
                Name <BadgeIcon /> <span className="text-success"></span>
              </label>
              <input
                className={`form-control ${
                  firstNameError ? "is-invalid" : firstName ? "is-valid" : ""
                }`}
                type="name"
                value={firstName}
                onChange={(event) => {
                  setFirstName(event.target.value);
                  handleFieldChange(event, nameRegex, setFirstNameError);
                }}
                placeholder="Enter your Name"
              />
              <p className="error-message text-danger mt-2">{firstNameError}</p>
            </Form.Field>
            <br />
            <Form.Field className="col-md-6 p-2">
              {/* <label className="fw-bold mb-2">Email *</label>
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter email...."
                className={`form-control ${
                  errors.email ? "is-invalid" : email ? "is-valid" : ""
                }`}
              />
              {errors.email && <p className="error">{errors.email}</p>} */}

              <label className="fw-bold">
                Email
                <AttachEmailIcon /> <span className="text-success"></span>
              </label>
              <input
                type="email"
                className={`form-control ${
                  emailError ? "is-invalid" : email ? "is-valid" : ""
                }`}
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  handleFieldChange(event, emailRegex, setEmailError);
                }}
                placeholder="Enter your Email..."
                // required
              />
              <p className="error-message text-danger mt-2">{emailError}</p>
            </Form.Field>
            <Form.Field className="col-md-6 p-2">
              {/* <label className="fw-bold mb-2">Phoneno *</label>
              <input
                value={phone}
                onChange={(event) => setPhoneno(event.target.value)}
                placeholder="Enter Phoneno...."
                className={`form-control ${
                  errors.phone ? "is-invalid" : phone ? "is-valid" : ""
                }`}
              />
              {errors.phone && <p className="error">{errors.phone}</p>} */}

              <label className="fw-bold" id="">
                Phone Number <FormatListNumberedIcon />
                <span className="text-success"></span>
              </label>
              <input
                type="number"
                className={`form-control ${
                  phoneError ? "is-invalid" : phone ? "is-valid" : ""
                }`}
                phoneno="phone"
                value={phone}
                onChange={(event) => {
                  setPhoneno(event.target.value);
                  handleFieldChange(event, phoneRegex, setPhonenoError);
                }}
                placeholder="Enter your Phone..."
                required
              />
              <p className="error-message text-danger mt-2">{phoneError}</p>
            </Form.Field>
            <br />{" "}
            <Form.Field className="col-md-6 p-2">
              <label className="fw-bold mb-2">
                Language <TranslateIcon />
              </label>
              <select
                value={language}
                // onChange={(event) => setLanguage(event.target.value)}
                onChange={(event) => {
                  handleLanguageChange(event, setLanguageError);
                  setLanguage(event.target.value);
                }}
                placeholder="Enter Language...."
                // className={`form-control ${
                //   errors.language ? "is-invalid" : language ? "is-valid" : ""
                // }`}
                className={`form-control ${
                  languageError ? "is-invalid" : language ? "is-valid" : ""
                }`}
              >
                <option value="">Select a language</option>
                <option value="Tamil">Tamil</option>
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
              </select>

              <p className="error-message text-danger mt-2">{languageError}</p>
            </Form.Field>
            <br />
            <div className="col-md-6 mt-2">
              <label className="fw-bold">
                Password <span className="text-success"></span>
              </label>
              <div className="">
                <div className="input-field-wrapper">
                  <input
                    className={`form-control ${
                      passwordError ? "is-invalid" : password ? "is-valid" : ""
                    }`}
                    name="Password"
                    // type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      handleFieldChange(event, passwordRegex, setPasswordError);
                    }}
                    placeholder="Enter your Password"
                    // required
                  />
                </div>
              </div>
              <p className="error-message text-danger mt-2">{passwordError}</p>
            </div>
            {/* <button
                    className="show-password-button fs-4 text-primary"
                    // onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </button> */}
            {/* </div>
              </div>
              <p className="error-message text-danger mt-2">{passwordError}</p>
            </div> */}
            <div className="col-md-6 mt-3">
              <label className="fw-bold">
                Confirm Password
                <MailLockIcon /> <span className="text-success"></span>
              </label>
              <div className="">
                <div className="input-field-wrapper">
                  <input
                    className={`form-control ${
                      cpasswordError
                        ? "is-invalid"
                        : cpassword
                        ? "is-valid"
                        : ""
                    }`}
                    name="Confirm password"
                    // type={cshowPassword ? "text" : "password"}
                    value={cpassword}
                    onChange={(event) => {
                      setConfirmPassword(event.target.value);
                      handleFieldChange(
                        event,
                        (value) => value === password,
                        setConfirmPasswordError
                      );
                    }}
                    placeholder="Enter your Confirm password"
                  />
                  {/* <button
                    className="show-password-button fs-4 text-primary"
                    onClick={() => setCShowPassword(!cshowPassword)}
                  >
                    {cshowPassword ? <FaEye /> : <FaEyeSlash />}
                  </button> */}
                </div>
              </div>

              <p className="error-message text-danger mt-2">{cpasswordError}</p>
            </div>
            <br />
            <Form.Field className="col-md-6 p-2">
              <label className="fw-bold mb-2">
                {" "}
                Gender
                <WcIcon /> :{" "}
              </label>
              <div>
                <label>
                  <input
                    type="radio"
                    value="Male"
                    body="bg-success"
                    className=""
                    checked={gender === "Male"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    value="Female"
                    className="ms-2"
                    checked={gender === "Female"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  Female
                </label>
                <label>
                  <input
                    type="radio"
                    value="Custom"
                    className="ms-2 "
                    checked={gender === "Custom"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  Custom
                </label>
              </div>
              <p className="error-message text-danger mt-2">{genderError}</p>
            </Form.Field>
            <br />
            <Form.Field className="col-md-6 p-2">
              <label className="fw-bold">
                Date of Birth
                <CalendarMonthIcon /> <span className="text-success"></span>
              </label>
              <input
                className={`form-control ${
                  dobError ? "is-invalid" : dob ? "is-valid" : ""
                }`}
                type="date"
                dobno="dob"
                value={dob}
                onChange={(event) => {
                  setDateofBirth(event.target.value);
                  handleFieldChange(event, dobRegex, setDateofBirthError);
                }}
                placeholder="Enter your dob..."
                required
              />
              {/* <p className="error-message text-danger fw-bold mt-2"> */}
              <p className="error-message text-danger mt-2">{dobError}</p>
            </Form.Field>
            {/* <Button
              className="btn btn-primary w-25 mt-3 ms-5"
              onClick={handleClick}
            >
              {isEditing ? "Save " : "Submit"}
            </Button> */}
            <div className="text-center">
              <Button
                className="btn btn-primary mt-3  custom-submit-button"
                onClick={handleClick}
              >
                {isEditing ? "Update" : "Submit"}
              </Button>
              <ToastContainer position="top-right" autoClose={5000} />{" "}
              {/* Customize options as needed */}
            </div>
          </Form>

        </div>
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
    </>
  );
};
