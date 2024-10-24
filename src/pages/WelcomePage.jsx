import "../styles/welcomePage.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
const WelcomePage = () => {
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingRegister, setLoadingRegister] = useState(false);
  const [isSignUpMode, setIsSignUpMode] = useState(false); // State to toggle between sign-in and sign-up

  // States for form inputs
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const navigate = useNavigate();
  
  useEffect(()=>sessionStorage.clear(),[])
  // Function to handle login
  const handleLogin = async (e) => {

   

    e.preventDefault();
    setLoadingLogin(true);

    try {
      const response = await axios.post("http://localhost:5000/api/users/login", {
        email: loginEmail,
        password: loginPassword,
      });

      // Handle successful login
      console.log("Login successful", response.data);
      // Store token, name, and role in sessionStorage
      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("name", response.data.user.name);
      sessionStorage.setItem("role", response.data.user.role);
        // Clear login input fields
        setLoginEmail("");
        setLoginPassword("");

      if(response.data.user.role === "admin"){
        navigate("/admin")
      }
  
    } catch (error) {
      console.error("Login failed", error);
      window.alert(`${error?.response?.data?.message}!! Please try again.`);
    } finally {
      setLoadingLogin(false);
    }
  };

  // Function to handle registration
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoadingRegister(true);

    try {
      const response = await axios.post("http://localhost:5000/api/users/register", {
        name: registerName,
        email: registerEmail,
        password: registerPassword,
      });

      // Handle successful registration
      console.log("Registration successful", response.data);
      window.alert("Registration successful!");

      // Clear register input fields
      setRegisterName("");
      setRegisterEmail("");
      setRegisterPassword("");
    } catch (error) {
      console.error("Registration failed", error);
      window.alert(`${error?.response?.data?.message}!! Please try again.`);
    } finally {
      setLoadingRegister(false);
    }
  };

  // Function to switch between Sign-in and Sign-up mode
  const switchToSignUp = () => {
    setIsSignUpMode(true);
  };

  const switchToSignIn = () => {
    setIsSignUpMode(false);
  };

  return (
    <div className={`welcomepage-container ${isSignUpMode ? "sign-up-mode" : ""}`}>
      <div className="welcomepage-forms-container">
        <div className="signin-signup">
          {/* Login Form */}
          <form className="sign-in-form" onSubmit={handleLogin}>
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="welcomepage-btn solid" disabled={loadingLogin}>
              {loadingLogin ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Register Form */}
          <form className="sign-up-form" onSubmit={handleRegister}>
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                name="name"
                placeholder="Username"
                value={registerName}
                onChange={(e) => setRegisterName(e.target.value)}
                required
              />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="welcomepage-btn" disabled={loadingRegister}>
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
            <button className="welcomepage-btn transparent" onClick={switchToSignUp}>
              Sign up
            </button>
          </div>
          <img
            src="https://i.ibb.co/6HXL6q1/Privacy-policy-rafiki.png"
            className="welcomepage-image"
            alt=""
          />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>Already have an account?</h3>
            <p>Log in to access your tickets and track upcoming journeys.</p>
            <button className="welcomepage-btn transparent" onClick={switchToSignIn}>
              Sign in
            </button>
          </div>
          <img
            src="https://i.ibb.co/nP8H853/Mobile-login-rafiki.png"
            className="welcomepage-image"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
