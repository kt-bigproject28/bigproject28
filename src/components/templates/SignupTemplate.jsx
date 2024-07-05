import React, { useState } from "react";
import { checkUsername, sendVerificationEmail, signupUser } from "../../apis/user"

const SignupTemplate = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    verification_code: "",
    password1: "",
    password2: "",
  });

  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [verificationCodeSent, setVerificationCodeSent] = useState(false);
  const [verificationCodeError, setVerificationCodeError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [signupError, setSignupError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUsernameCheck = () => {
    const username = formData.username;
    checkUsername(username)
      .then((response) => {
        if (response.data.is_taken) {
          setUsernameError("This username is already taken.");
        } else {
          setUsernameError("");
        }
      })
      .catch((error) => {
        setUsernameError("An error occurred while checking the username.");
      });
  };

  const handleSendVerificationCode = () => {
    const email = formData.email;
    sendVerificationEmail(email)
      .then((response) => {
        setVerificationCodeSent(true);
        setVerificationCodeError("");
      })
      .catch((error) => {
        setVerificationCodeError(
          "An error occurred while sending the verification code."
        );
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, verification_code, password1, password2 } =
      formData;

    signupUser({ username, email, verification_code, password1, password2 })
      .then((response) => {
        console.log(response.data);
        // Handle successful signup, e.g., redirect or show success message
      })
      .catch((error) => {
        if (error.response) {
          const errors = error.response.data;
          if (errors.username) {
            setUsernameError(errors.username[0]);
          } else {
            setUsernameError("");
          }
          if (errors.email) {
            setEmailError(errors.email[0]);
          } else {
            setEmailError("");
          }
          if (errors.verification_code) {
            setVerificationCodeError(errors.verification_code[0]);
          } else {
            setVerificationCodeError("");
          }
          if (errors.password1) {
            setPasswordError(errors.password1[0]);
          } else {
            setPasswordError("");
          }
          // Handle other errors as needed
        } else {
          setSignupError("An error occurred during signup.");
        }
      });
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            onBlur={handleUsernameCheck}
            required
          />
          {usernameError && (
            <div className="alert alert-danger">{usernameError}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {emailError && <div className="alert alert-danger">{emailError}</div>}
          {!verificationCodeSent && (
            <button
              type="button"
              className="btn btn-secondary mt-2"
              onClick={handleSendVerificationCode}
            >
              Send Verification Code
            </button>
          )}
          {verificationCodeError && (
            <div className="alert alert-danger mt-2">
              {verificationCodeError}
            </div>
          )}
          {verificationCodeSent && (
            <div className="form-group">
              <label htmlFor="verification_code">Verification Code:</label>
              <input
                type="text"
                className="form-control"
                id="verification_code"
                name="verification_code"
                value={formData.verification_code}
                onChange={handleChange}
                required
              />
              {verificationCodeError && (
                <div className="alert alert-danger mt-2">
                  {verificationCodeError}
                </div>
              )}
            </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password1">Password:</label>
          <input
            type="password"
            className="form-control"
            id="password1"
            name="password1"
            value={formData.password1}
            onChange={handleChange}
            required
          />
          {passwordError && (
            <div className="alert alert-danger">{passwordError}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirm Password:</label>
          <input
            type="password"
            className="form-control"
            id="password2"
            name="password2"
            value={formData.password2}
            onChange={handleChange}
            required
          />
        </div>
        {signupError && <div className="alert alert-danger">{signupError}</div>}
        <button type="submit" className="btn btn-primary btn-block">
          Register
        </button>
      </form>
    </div>
  );
};

export default SignupTemplate;
