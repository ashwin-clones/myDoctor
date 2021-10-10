import React, { useEffect, useRef, useState } from "react";
import Header from "../header";
import PatientListCard from "../patientListCard";
import SubHeader from "../subHeader";
import axios from "axios";
import isEmpty from "lodash/isEmpty";

import { useHistory } from "react-router-dom";
import { message } from "antd";

export default function PatientList() {
  const history = useHistory();

  const doctor = JSON.parse(localStorage.getItem("doc"));

  const [startData, setStartData] = useState(null);
  const [activeToggle, SetActiveToggle] = useState(Boolean(+doctor.activity));
  const [toggleLoading, settoggleLoading] = useState(false)

  axios.defaults.headers.common["Authorization"] = `Bearer ${doctor.token}`;

  var interval;

  const handleGetStartConsultData = () => {
    axios
      .get(
        `https://myplusdoctor.med2myhome.com/api/doctor/startdoctorconsult?doctor_id=${doctor.id}`
      )
      .then((res) => {
        setStartData(res.data.data);
        console.log(res.data)
      });
  };

  useEffect(() => {
    handleGetStartConsultData();
    interval = setInterval(handleGetStartConsultData, 1000);
  }, []);

  const handleStartConsult = (_) => {
    const { patient_id, booking_id, meeting_url } = startData;
    history.push("/consult", { patient_id, booking_id, meeting_url });
  };

  const handleActivityChange = (e) => {
      settoggleLoading(true)
    axios
      .post(" https://myplusdoctor.med2myhome.com/api/doctor/consultactivity", {
        activity: +e,
      })
      .then((res) => {
        SetActiveToggle(e)
        settoggleLoading(false)
        message.success("Active status changed",10)
      })
      .catch(()=>{
        message.error('Something went Wrong',10)
      })
  };

  useEffect(()=>{
    clearInterval(interval)
  },[startData])

  return (
    <>
      <div>
        <Header userName={`${doctor.first_name} ${doctor.last_name}`} />
        <SubHeader
          label={"Manage Patients"}
          activeToggle={activeToggle}
          showToggle={true}
          onchange={handleActivityChange}
          toggleLoading={toggleLoading}
        />

        <div className="d-flex  flex-column align-items-center">
          <div className="fw-bold my-3 " style={{ fontSize: "20px" }}>
            Welcome Dr.
            <span className="text-capitalize">
              {`${doctor.first_name} ${doctor.last_name}!`}
            </span>
          </div>

          {!isEmpty(startData) ? (
            <div className="card d-flex flex-row w-75 justify-content-between align-items-center p-2">
              <div>Patient 1</div>
              <button className="btn btn-primary" onClick={handleStartConsult}>
                Start Consult
              </button>
            </div>
          ) : (
            <div className=" my-3 text-muted">No Patinets are available! </div>
          )}
        </div>
      </div>
    </>
  );
}
