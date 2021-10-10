import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Header from '../header'
import SubHeader from '../subHeader'
import { useLocation } from "react-router-dom";

export default function Consult(props) {


    const location = useLocation()
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState({})
    
    
    useEffect(()=>{
        console.log(props.history)
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${localStorage.getItem("token")}`;

        const {patient_id} = location.state

        axios.post("https://myplusdoctor.med2myhome.com/api/user/startpatientconsult",{patient_id})
        .then(res=>{
            setLoading(false);
            setData(res.data.data.meeting_url)
        })
    },[])



    return (
        <div>
            <Header/>
            <SubHeader label={"Doctor consultation"} />
            {!loading && 
                <div className="iframe-body">
                    <iframe className="w-100 h-100" allow="camera;microphone" src={`${data}`}></iframe>
                </div>
            }
        </div>
    )
}
