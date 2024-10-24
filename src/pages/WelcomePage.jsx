import "../../styles/welcomePage.css";
import { useState } from "react";
import axios from "axios";

const WelcomePage = () => {
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingRegister, setLoadingRegister] = useState(false);
  
  const sign_in_btn = document.querySelector("#sign-in-btn");
  const sign_up_btn = document.querySelector("#sign-up-btn");
  const container = document.querySelector(".container");

  sign_up_btn?.addEventListener("click", () => {
    container?.classList.add("sign-up-mode");
  });

  sign_in_btn?.addEventListener("click", () => {
    container?.classList.remove("sign-up-mode");
  });

  // Function to handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoadingLogin(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post("/api/login", { email, password });
      // Handle successful login
      console.log("Login successful", response.data);
      window.alert("Login successful!");
    } catch (error) {
      console.error("Login failed", error);
      window.alert("Login failed! Please try again.");
    } finally {
      setLoadingLogin(false);
    }
  };

  // Function to handle registration
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoadingRegister(true);

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post("/api/register", { name, email, password });
      // Handle successful registration
      console.log("Registration successful", response.data);
      window.alert("Registration successful!");
    } catch (error) {
      console.error("Registration failed", error);
      window.alert("Registration failed! Please try again.");
    } finally {
      setLoadingRegister(false);
    }
  };

  return (
    <div className="container">
      <div className="forms-container">
        <div className="signin-signup">
          {/* Login Form */}
          <form className="sign-in-form" onSubmit={handleLogin}>
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input type="email" name="email" placeholder="Email" required />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" name="password" placeholder="Password" required />
            </div>
            <button type="submit" className="btn solid" disabled={loadingLogin}>
              {loadingLogin ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Register Form */}
          <form className="sign-up-form" onSubmit={handleRegister}>
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" name="name" placeholder="Username" required />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input type="email" name="email" placeholder="Email" required />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" name="password" placeholder="Password" required />
            </div>
            <button type="submit" className="btn" disabled={loadingRegister}>
              {loadingRegister ? "Signing up..." : "Sign up"}
            </button>
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>Don't have an account?</h3>
            <p>Sign up now to book your next journey effortlessly online.</p>
            <button className="btn transparent" id="sign-up-btn">
              Sign up
            </button>
          </div>
          <img
            src="https://i.ibb.co/6HXL6q1/Privacy-policy-rafiki.png"
            className="image"
            alt=""
          />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>Already have an account?</h3>
            <p>Log in to access your tickets and track upcoming journeys.</p>
            <button className="btn transparent" id="sign-in-btn">
              Sign in
            </button>
          </div>
          <img
            src="https://i.ibb.co/nP8H853/Mobile-login-rafiki.png"
            className="image"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
