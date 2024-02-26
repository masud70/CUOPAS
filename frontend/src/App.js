import React, { useState, useEffect } from "react";
import HashLoader from "react-spinners/HashLoader";
import Landing from "./Components/Landing/Landing";
import AuthApi from "./ContextApi/AuthApi";
import Home from "./Home/Home";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Particles from "react-tsparticles";
import "./App.css";

const api = axios.create({
    baseURL: "http://localhost:5000/"
});

const App = () => {
    const [auth, setAuth] = useState(false);
    const [userData, setUserData] = useState({})
    const [isLoading, setIsLoading] = useState(true);
    const Navigate = useNavigate();
    useEffect(() => {
        const isLogged = Cookies.get("isLogged");
        setAuth(isLogged);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    useEffect(()=>{
        getInfo();
    },[auth])

    const getInfo = () => {
        const token = Cookies.get('userToken');
        api.post('/api/user/data', {token: token}).then(res=>{
            console.log(res.data)
            if(res.data.status){
                setUserData(res.data.result);
            }
        })
    }

    const getLogin = (id, password) => {
        api.post("/api/user/login", { id: id, password: password }).then((res) => {
            if (res.data.status) {
                console.log(res.data)
                toast.success(res.data.message);
                Cookies.set("userToken", res.data.token);
                Cookies.set("isLogged", true);
                getInfo();
                setAuth(true);
            } else {
                toast.error(res.data.message);
            }
        });
    };

    const getLogout = () => {
        toast.success("Logout Successful!");
        Cookies.remove("userToken");
        Cookies.remove("isLogged");
        setAuth(false);
        Navigate("/");
    };

    // const checkLogin = () => {
    //     const token = Cookies.get("userToken");
    //     if (token) {
    //         api.post("/checkLogin", { token: token }).then((res) => {
    //             if (res.data.status) {
    //                 setAuth(true);
    //             }
    //         });
    //     }
    // };

    const particlesInit = (main) => {
    };
    
    const particlesLoaded = (container) => {
    };
      
    return (
        <div className="App fontTahoma">
        <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
            background: {
                color: "#0b132b0d"
            },
            fpsLimit: 2000,
            interactivity: {
            events: {
                onClick: {
                enable: true,
                mode: "push",
                },
                onHover: {
                enable: true,
                },
                resize: true,
            },
            modes: {
                bubble: {
                distance: 400,
                duration: 10,
                opacity: 0.5,
                size: 1,
                },
                push: {
                quantity: 1,
                },
                repulse: {
                distance: 200,
                duration: 0.5,
                },
            },
            },
            particles: {
                color: {
                value: ["#f67e7d", "#843b62", "#621940"]
                },
                links: {
                color: "#ffb997",
                enable: true
                },
                move: {
                enable: true,
                speed: 1
                },
                size: {
                value: 1,
                random: {
                    enable: true,
                    minimumValue: 1
                },
                animation: {
                    enable: true,
                    speed: 1,
                    minimumValue: 1
                }
                },
                opacity: {
                value: 0.8,
                random: {
                    enable: true,
                    minimumValue: 0.4
                }
                }
            },
            detectRetina: true,
        }}
        />
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
        {isLoading ? (
            <HashLoader color={"#0AEEDE"} loading={isLoading} size={100} />
        ) : !auth ? (
            <AuthApi.Provider value={{ getLogin, auth }}>
                <Landing />
            </AuthApi.Provider>
        ) : (
            <AuthApi.Provider value={{ getLogout, auth,  userData}}>
                <Home />
            </AuthApi.Provider>
        )}
        </div>
    );
};

export default App;
