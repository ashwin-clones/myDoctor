import axios from 'axios';
import React from 'react'
import { useHistory } from "react-router-dom";

export default function PatientListCard(props) {
    const history = useHistory()

    // const Temperature,TemperatureType,spO,bp,Pulse,Rbs,is_ins

    const handleHistoryDirect = _ => {
        // history.push("/patientHistory", { patient_id, booking_id });
    }
    
    const handleVitalSubmit = _ => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        
        const Params = {
            temperature:"50",
            temperature_type:0
        }
        
        axios.post("https://myplusdoctor.med2myhome.com/api/user/storevital?patient_id=1",Params)
        .then(res=>{
            console.log(res.data)
        })
    }

    const handleStartConsult = _ => {
        history.push('/consult')
    }

    return (
        <>
        <div className="patientListCard mx-4 my-4 border- "> 
            <div className="card">
                <div className="card-body d-flex justify-content-between ">
                    <div className="patientDetails d-flex flex-column justify-content-center ">
                        <div className="patient-name">{props.first_name} {props.last_name}</div>
                        <div className="patient-bio">
                            {props.sex} <span>|</span> {props.blood_group}
                        </div>
                    </div>
                    <div className="cta-parent d-flex flex-column">
                        <div className="d-flex">
                            <button className="btn btn-primary me-2" data-bs-toggle="modal" data-bs-target="#vitalModal">+Add Vitals</button>
                            <button className="btn btn-outline" onClick={handleHistoryDirect} >H</button>
                        </div>
                        <button className="btn btn-primary w-100 mt-2" onClick={handleStartConsult} >Start Consult</button>
                    </div>
                </div>
            </div>
        </div>
        <div className="modal fade" id="vitalModal" tabindex="-1" ariaLabelledby="vitalModalLabel" ariaHidden="true">
                <div className="modal-dialog max-w-800">
                    <div className="modal-content">
                    <div className="modal-header border-0 ">
                        <h5 className="modal-title muted" id="vitalModalLabel">Add New patient details</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body">

                        <div className="d-flex flex-wrap">
                            <div className="d-flex me-2 my-2">
                                <div className="lhs">Temperature :</div>
                                <div><input className=" ms-1 vital-input" type="text" /></div>
                            </div>
                            <div className="d-flex me-2 my-2">
                                <div className="lhs">TemperatureType :</div>
                                <div><input className=" ms-1 vital-input" type="text" /></div>
                            </div>
                            <div className="d-flex me-2 my-2">
                                <div className="lhs">spO :</div>
                                <div><input className=" ms-1 vital-input" type="text" /></div>
                            </div>
                            <div className="d-flex me-2 my-2">
                                <div className="lhs">bp :</div>
                                <div><input className=" ms-1 vital-input" type="text" /></div>
                            </div>
                            <div className="d-flex me-2 my-2">
                                <div className="lhs">Pulse :</div>
                                <div><input className=" ms-1 vital-input" type="text" /></div>
                            </div>
                            <div className="d-flex me-2 my-2">
                                <div className="lhs">Rbs :</div>
                                <div><input className=" ms-1 vital-input" type="text" /></div>
                            </div>
                            <div className="d-flex me-2 my-2">
                                <div className="lhs">is_insulin :</div>
                                <div><input className=" ms-1 vital-input" type="text" /></div>
                            </div>
                            <div className="d-flex me-2 my-2">
                                <div className="lhs">insulin_quantity :</div>
                                <div><input className=" ms-1 vital-input" type="text" /></div>
                            </div>
                            <div className="d-flex me-2 my-2">
                                <div className="lhs">post_prandial :</div>
                                <div><input className=" ms-1 vital-input" type="text" /></div>
                            </div>
                            <div className="d-flex me-2 my-2">
                                <div className="lhs">fasting :</div>
                                <div><input className=" ms-1 vital-input" type="text" /></div>
                            </div>
                            <div className="d-flex me-2 my-2">
                                <div className="lhs">height :</div>
                                <div><input className=" ms-1 vital-input" type="text" /></div>
                            </div>
                            <div className="d-flex me-2 my-2">
                                <div className="lhs">weight :</div>
                                <div><input className=" ms-1 vital-input" type="text" /></div>
                            </div>
                            <div className="d-flex me-2 my-2">
                                <div className="lhs">fasting :</div>
                                <div><input className=" ms-1 vital-input" type="text" /></div>
                            </div>
                            <div className="d-flex me-2 my-2">
                                <div className="lhs">height :</div>
                                <div><input className=" ms-1 vital-input" type="text" /></div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="modal-footer border-0">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary"  data-bs-dismiss="modal" onClick={handleVitalSubmit} >Save changes</button>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}


