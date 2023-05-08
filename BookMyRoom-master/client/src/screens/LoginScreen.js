import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import Error from "../components/Error";
import axios from "axios";


function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    async function login() {
        const user = {
            email,
            password
        }
        console.log(user);
        try {
            setLoading(true);
            const result = (await axios.post('/api/users/login', user)).data;
            setLoading(false);

            localStorage.setItem("currentuser", JSON.stringify(result));
            window.location.href = '/home';
        } catch (error) {
            console.log(error);
            setLoading(false);
            setError(true);
        }
        // alert("login succsfully");
    }

    return (
        <div>
            {loading && (<Loader />)}
            <div className="row justify-content-center mt-5">
                <div className="col-md-4">
                    {error && (<Error message="Invalid creaditionals"/>)}
                    <div className="bs">
                        <h2>Login Here</h2>
                        <input type="text" className="form-control" placeholder="email" required="true"
                            value={email} onChange={(e) => { setEmail(e.target.value); }}
                        />
                        <input type="text" className="form-control" placeholder="password" required="true"
                            value={password} onChange={(e) => { setPassword(e.target.value); }}
                        />
                        <button className="btn btn-primary mt-3" onClick={login}> Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default LoginScreen;