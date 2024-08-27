import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Updated import
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Updated from useHistory

  const loginSchema = Yup.object().shape({
    username: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(5, "Password must be at least 5 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values) => {
    try {
      const res = await axios.post(
        "http://localhost:5001/api/auth/login",
        values
      );

      localStorage.setItem("accessToken", res.data.accessToken);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.response?.data?.msg || "Server Error");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <div className="form-group">
              <label htmlFor="username">Email</label>
              <Field name="username" type="email" className="form-control" />
              <ErrorMessage
                name="username"
                component="div"
                className="text-danger"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field name="password" type="password" className="form-control" />
              <ErrorMessage
                name="password"
                component="div"
                className="text-danger"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
