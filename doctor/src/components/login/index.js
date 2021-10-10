import React,{useRef, useState} from 'react'
import style from './index.scss'
import axios from 'axios'
import { useHistory } from "react-router-dom";
import { message } from "antd";

export default function Login() {

    const [loading,setLoading] = useState(false)

    const mailRef = useRef();
    const passRef = useRef()

    let history = useHistory()

    const handleKeyDown = e => {
        if (e.keyCode === 13) {
            handleSubmit();
          }
    }

    const handleSubmit = _ => {
        setLoading(true)
        const postData = {
            email: mailRef.current.value,
            password: passRef.current.value
        }

        axios
          .post(
            "https://myplusdoctor.med2myhome.com/api/doctor/login",
            postData
          )
          .then((res) => {
            localStorage.setItem("email", postData.email);
            localStorage.setItem("doc", JSON.stringify(res.data));
            history.push("/patient");
            setLoading(false);
            message.success('Succesfully LoggedIn',10)

          })
          .catch((err) => {
              setLoading(false);
              message.error("Something went wrong", 10);
          });
    }

    return (
        <div className="container">
            <div className="w-100">
                <div className='logo'>
                    <span>+&nbsp;</span>MyDoctor
                </div>
                <div className="content">
                    <div className="titles">
                        <h6 className="h4">Sign In</h6>
                        <p className="muted">Hi Doctor! Nice to see you again.</p>
                    </div>
                    <div className="labels">
                        <div class="mb-3">
                            <label for="formGroupExampleInput" class="form-label">Username</label>
                            <input type="text" ref={mailRef} class="form-control border-0 border-bottom px-0" id="formGroupExampleInput" placeholder="Enter Username"/>
                        </div>
                        <div class="mb-3">
                            <label for="formGroupExampleInput2" class="form-label">Password</label>
                            <input type="password" onKeyDown={handleKeyDown} ref={passRef} class="form-control border-0 border-bottom px-0" id="formGroupExampleInput2" placeholder="Password"/>
                        </div>
                    </div>
                    <button className="cta btn w-100" disabled={loading} onClick={handleSubmit} >{loading ? 'Loading...': 'Login'}</button>
                    <div className="muted mt-3">Forgot Password?</div>
                </div>
            </div>
        </div>
    )
}
