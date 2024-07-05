import React, { useState } from "react";
import axios from "axios";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

const LoginTemplate = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;

    const csrftoken = getCookie("csrftoken");

    axios
      .post(
        `http://localhost:8000/login/login/`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken,
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response.data);
        const { status, message, user } = response.data;
        if (status === "success") {
          // 사용자 정보를 로컬 스토리지에 저장
          localStorage.setItem("user", JSON.stringify(user));
          // 로그인 후의 동작을 정의, 예: 리다이렉트
          console.log("User logged in successfully:", user);

          // 쿠키 정보 콘솔에 출력
          console.log("Cookies:", document.cookie);
        } else {
          setLoginError(message);
        }
      })
      .catch((error) => {
        if (error.response) {
          const { data } = error.response;
          setEmailError(data.email ? data.email[0] : "");
          setPasswordError(data.password ? data.password[0] : "");
        } else {
          setLoginError("An error occurred during login.");
        }
      });
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {passwordError && (
            <div className="alert alert-danger">{passwordError}</div>
          )}
        </div>
        {loginError && <div className="alert alert-danger">{loginError}</div>}
        <button type="submit" className="btn btn-primary btn-block">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginTemplate;
