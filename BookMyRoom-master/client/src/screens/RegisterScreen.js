import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from '../components/Success';

function RegisterScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setcPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [success, setSuccess] = useState();


    async function register() {
        if (password === cpassword) {
            const user = {
                name,
                email,
                password,
                cpassword
            }
            // console.log(user);
            try {
                setLoading(true);
                const result = (await axios.post('/api/users/register', user)).data;
                setLoading(false);
                setSuccess(true);

                //empty the fields
                setName("");
                setEmail("");
                setPassword("");
                setcPassword("");
            } catch (error) {
                console.log(error);
                setLoading(false);
                setError(true);
            }
        }
        else {
            alert("password not match");
        }
    }

    return (
        <div>
            {loading && (<Loader />)}
            {error && (<Error />)}
            <div className="row justify-content-center mt-5">
                <div className="col-md-4">
                    {success && (<Success message="Register Successfull" />)}
                    <div className="bs">
                        <h2>Register Here</h2>
                        <input type="text" className="form-control" placeholder="name" required="true"
                            value={name} onChange={(e) => { setName(e.target.value); }}
                        />
                        <input type="text" className="form-control" placeholder="email" required="true"
                            value={email} onChange={(e) => { setEmail(e.target.value); }}
                        />
                        <input type="text" className="form-control" placeholder="password" required="true"
                            value={password} onChange={(e) => { setPassword(e.target.value); }}
                        />
                        <input type="text" className="form-control" placeholder="confirm password" required="true"
                            value={cpassword} onChange={(e) => { setcPassword(e.target.value); }}
                        />
                        <button className="btn btn-primary mt-3" onClick={register}> Register</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default RegisterScreen;