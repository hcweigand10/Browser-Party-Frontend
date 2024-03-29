import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import API from "./utils/api";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Play from "./pages/Play";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import About from "./pages/About";
import { useNavigate } from "react-router-dom";

function App() {
    const [username, setUsername] = useState("");
    const [token, setToken] = useState("");
    const [loading, setLoading] = useState(false)

    var loggedIn = false;

    const [loginInfo, setLoginInfo] = useState({
        username: "",
        password: "",
    });

    const [registerInfo, setRegisterInfo] = useState({
        username: "",
        password: "",
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setLoading(true)
            API.getTokenData(token)
            .then((data) => {
                  setLoading(false)
                  if (data.err) {
                    console.log(data.err);
                    localStorage.removeItem("token");
                  } else {
                    setUsername(data.username);
                    setToken(token);
                  }
                })
                .catch((err) => {
                    setLoading(false)
                    console.log("bad token");
                    console.log(err);
                });
        }
    }, []);

    const registerSubmit = async (e) => {
        e.preventDefault();
        console.log("Register Submit Activated");
        try {
            setLoading(true)
            const response = await API.createUser(
              registerInfo.username,
              registerInfo.password
              );
            setLoading(false)
            if (response.code === 11000) {
                alert("That username is already taken");
                setRegisterInfo({
                    username: "",
                    password: "",
                });
                setLoginInfo({
                    username: "",
                    password: "",
                });
            } else {
                console.log(registerInfo);
                console.log(loginInfo);
                logMeIn(e);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const logMeIn = async (e) => {
        console.log("LOGGING IN!", loginInfo);
        e.preventDefault();
        try {
            setLoading(true)
            const data = await API.login(
                loginInfo.username,
                loginInfo.password
            );
            setLoading(false)
            console.log(data);
            if (data.token) {
                loggedIn = true;
                setUsername(data.user.username);
                setToken(data.token);
                localStorage.setItem("token", data.token);
            } else {
                alert("Invalid Login Credentials");
                setLoginInfo({
                    username: "",
                    password: "",
                });
            }
        } catch (err) {
            console.log(err);
        }
    };
    const logMeOut = () => {
        console.log("Logging out");
        loggedIn = false;
        localStorage.removeItem("token");
        setUsername("");
        setToken("");
        window.location.replace("/");
    };
    const handleInputChange = (e) => {
        setLoginInfo({
            ...loginInfo,
            [e.target.name]: e.target.value,
        });
    };

    const handleInputChangeRegister = (e) => {
        setRegisterInfo({
            ...registerInfo,
            [e.target.name]: e.target.value,
        });
        setLoginInfo({
            ...loginInfo,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div>
            <Router>
                <Navbar username={username} logMeOut={logMeOut} />
                <Routes>
                    <Route path="/" element={<Home username={username} />} />
                    <Route
                        path="/login"
                        element={
                            <Login
                                loggedIn={loggedIn}
                                logMeOut={logMeOut}
                                logMeIn={logMeIn}
                                username={username}
                                loginInfo={loginInfo}
                                handleInputChange={handleInputChange}
                                loading={loading}
                            />
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <Profile
                                loginInfo={loginInfo}
                                username={username}
                            />
                        }
                    />
                    <Route
                        path="/play"
                        element={<Play username={username} />}
                    />
                    <Route
                        path="/register"
                        element={
                            <Register
                                username={username}
                                registerInfo={registerInfo}
                                handleInputChangeRegister={
                                    handleInputChangeRegister
                                }
                                registerSubmit={registerSubmit}
                            />
                        }
                    />
                    <Route path="/about" element={<About />} />
                </Routes>
            </Router>
        </div>
    );
}
export default App;
