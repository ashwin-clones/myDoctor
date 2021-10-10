import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Header from "../header";
import SubHeader from "../subHeader";
import DoctorSection from "./doctorSection";
import Modal from "react-modal";
import Checkbox from "../../shared/checkbox";
import SelectedMed from "./selectedMed";
import { useLocation } from "react-router-dom";
import Vital from "./vital";
import { message } from "antd";
import Footer from "./footer";

export default function Consult(props) {


  const medNotesRef = useRef();
  const diaNotesRef = useRef();
  const commonNotesRef = useRef();
  const testsNotesRef = useRef();

  const location = useLocation()

  const {patient_id,booking_id,meeting_url} = location.state
  const doctor = JSON.parse(localStorage.getItem("doc"));

  

  const [selected, setSelected] = useState([]);
  const [configuration, setConfiguration] = useState([]);
  const [med, setMed] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalCheckedData, setModalCheckedData] = useState({
    medicine: false,
    vitals: false,
    tests: false,
    diagnosis: false,
  });
  const [isMedLoading, setIsMedLoading] = useState(false);
  const [medMetrics, setmedMetrics] = useState([]);
  const [restDropDowndata, setrestDropDowndata] = useState({
    diagnosis:[],
    tests:[]
  });
  const [patinetVitals, setPatinetVitals] = useState({})

  const handleGetMedicines = () => {
    axios
      .get("https://myplusdoctor.med2myhome.com/api/getmedicines?name=")
      .then((res) => {
        setMed(res.data.data.medicines);
      });
  };

  const getConfigurations = () => {
    axios
      .get("https://myplusdoctor.med2myhome.com/api/configuration")
      .then((res) => {
        setConfiguration(res.data);
      })
      .catch((err) => console.log(err));
  };

  const hanldeGetPatientVitals = () => {
    axios.get(
      `https://myplusdoctor.med2myhome.com/api/doctor/getpatientvital?patient_id=${patient_id}&booking_id=${booking_id}`
    )
    .then((res)=>{
      console.log(res.data)
      setPatinetVitals(res.data.data)
    })
  }

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${doctor.token}`;
      
    getConfigurations();
    handleGetMedicines();
    hanldeGetPatientVitals();
  }, []);

  const handleMedicineSearch = (val) => {
    setIsMedLoading(true);
    if (val.length > 3) {
      axios
        .get(`https://myplusdoctor.med2myhome.com/api/getmedicines?name=${val}`)
        .then((res) => {
          setMed(res.data.data.medicines);
          setIsMedLoading(false);
        });
    }
  };

  const handleMedChange = (data,from) => {
    console.log(data,from)
    const store = [...data];
    if (from === "Medicine"){
      setSelected(store);
      const metricObj = {
        id: "",
        dosage: { 0: 0, 1: 0, 2: 0 },
        is_before_food: "",
        time: "",
        freq: "",
      };
      const forMetrics = store.map((item) => {
        return { ...metricObj, id: item.id };
      });
      setmedMetrics(forMetrics);
    }else{
      let store = {...restDropDowndata};
      const temp = {}
      data.map((item,index)=>{
        temp[index] = item.id
      })


      setrestDropDowndata({
        ...store,
        [from.toLowerCase()]: temp,
      })
    }
      
  };

  const handleCompleteAppointment = () => {
    setShowModal(true);
  };

  const handleFinalValidaionForPresc = () => {
    

    const finalData = {
      patient_id: patient_id,
      booking_id: booking_id,
      medicine: medNotesRef.current?.value,
      medicine_id: { medicines: medMetrics },

      diagnosis: diaNotesRef.current?.value,
      diagnosis_id: restDropDowndata["diagnosis"],
      test: testsNotesRef.current?.value,
      test_id: restDropDowndata["tests"],
      has_to_send_patient_vital: "0",
      has_to_send_medicine: +modalCheckedData["medicine"],
      has_to_send_advice: 0,
      has_to_send_test: +modalCheckedData["tests"],
      has_to_send_diagnosis: +modalCheckedData["diagnosis"],
      comment: commonNotesRef.current?.value,
    };
    
    axios.post("https://myplusdoctor.med2myhome.com/api/doctor/storeprescription",finalData)
    .then((res)=>{
      // console.log(res.data)
      setShowModal(false)
      message.success(res.data.message,10)
    })
    .catch((res)=>{
      console.log(res.data)
      message.error("Something went Wrong",10)
    })



  }

  const handleModalCheckboxData = (e) => {
    const { name, checked } = e.target;
    const data = {
      ...modalCheckedData,
      [name.toLowerCase()]: checked,
    };
    setModalCheckedData(data);
  };

  const handleMedMetricsChange = (e) => {
    const { name, checked, id, value, dataset } = e.target;

    const data = [...medMetrics];

    
    const store = data.map((item) => {
      if (+item.id === +id) {
        return {
          ...item,
          [name]: value,
          dosage: {
            ...(name == "dosage"
              ? {...item.dosage, [dataset.id]: +checked  }
              : { ...item.dosage }),
          },
        };
      }
      return item
    });

    setmedMetrics([...store])


  };


  return (
    <>
      <div>
        <Header />
        <SubHeader label={"Doctor consultation"} />
        <div className="consult-content">
          <div className="video-content">
            <iframe allow="camera;microphone" src={meeting_url} />
          </div>
          <div className="doctor-work-sec">
            <div className="vital-sec w-100">
              <Vital vitalsData={patinetVitals} />
            </div>
            <div className="section-container">
              <DoctorSection
                title={"Medicine"}
                onsearch={handleMedicineSearch}
                onchange={handleMedChange}
                options={med}
                selected={selected}
                configuration={configuration}
                loading={isMedLoading}
                refs={medNotesRef}
              />
              <DoctorSection
                title={"Diagnosis"}
                onsearch={handleMedicineSearch}
                onchange={handleMedChange}
                options={med}
                selected={selected}
                configuration={configuration}
                refs={diaNotesRef}
              />
              <DoctorSection
                title={"Tests"}
                onsearch={handleMedicineSearch}
                onchange={handleMedChange}
                options={med}
                selected={selected}
                configuration={configuration}
                refs={testsNotesRef}
              />
              <DoctorSection
                title={"Advice"}
                onsearch={handleMedicineSearch}
                onchange={handleMedChange}
                options={med}
                selected={selected}
                configuration={configuration}
                refs={commonNotesRef}
              />
            </div>
            {selected.length ? (
              <div className="selectedMed">
                <div className="title">Selected Medicines</div>
                <SelectedMed
                  selected={selected}
                  configuration={configuration}
                  onchange={handleMedMetricsChange}
                />
              </div>
            ) : null}
            <div className="d-flex w-100 justify-content-between">
              <div className="section-container w-100 comment d-block">
                <DoctorSection
                  title={"Coment Notes"}
                  onsearch={handleMedicineSearch}
                  onchange={handleMedChange}
                  options={false}
                  selected={selected}
                  configuration={configuration}
                  refs={commonNotesRef}
                />
              </div>
            </div>
          </div>
        </div>
        <Footer
          completeBtn={{
            label: "Complete Consultation",
            onclick: handleCompleteAppointment,
          }}
        />
      </div>

      <Modal isOpen={showModal} className="custom-modal-content">
        <div className="header d-flex justify-content-between">
          <div className="title">Complete Prescription</div>
          <div className="close btn-close " onClick={() => setShowModal(false)}>
            
          </div>
        </div>
        <div className="body-content mt-3 ">
          <Checkbox
            label={"Send Patinet Notes"}
            onchange={handleModalCheckboxData}
          />
          <Checkbox
            label={"Send Medicine"}
            onchange={handleModalCheckboxData}
          />
          <Checkbox label={"Send Tests"} onchange={handleModalCheckboxData} />
          <Checkbox
            label={"Send Diagnosis"}
            onchange={handleModalCheckboxData}
          />
        </div>
        <div className="footer-modal d-flex justify-content-end ">
          <div
            className="btn btn btn-outline-secondary me-3"
            onClick={() => setShowModal(false)}
          >
            Close
          </div>
          <div
            className="btn btn-primary"
            onClick={handleFinalValidaionForPresc}
          >
            Send prescription
          </div>
        </div>
      </Modal>
    </>
  );
}
