import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import Modal from "react-modal";

export default function PatientListCard(props) {
  const history = useHistory();

  let temperature = useRef();
  let temperature_type = useRef();
  let spO = useRef();
  let bp = useRef();
  let Pulse = useRef();
  let Rbs = useRef();
  let is_insulin = useRef();
  let insulin_quantity = useRef();
  let post_prandial = useRef();
  let fasting = useRef();
  let height = useRef();
  let weight = useRef();

  const [showVitalModal, setshowVitalModal] = useState(false);

  useEffect(() => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;
  }, []);

  const handleHistoryDirect = (_) => {
    const {patient_id} = props
    history.push("/patientHistory",{patient_id});
  };

  const handleVitalSubmit = (_) => {
    const Params = {
        ...temperature.current?.value.length > 0 && {temperature: temperature.current?.value},
        ...temperature_type.current?.value.length > 0 && {temperature_type: temperature_type.current?.value},
        spO: spO.current?.value,
        bp: bp.current?.value,
        Pulse: Pulse.current?.value,
        Rbs:Rbs.current?.value,
        is_insulin: is_insulin.current?.value,
        insulin_quantity: insulin_quantity.current?.value,
        post_prandial: post_prandial.current?.value,
        fasting: fasting.current?.value,
        height: height.current?.value,
        weight: weight.current?.value,
    };


    axios
      .post(
        `https://myplusdoctor.med2myhome.com/api/user/storevital?patient_id=${props.patient_id}`,
        Params
      )
      .then((res) => {
        setshowVitalModal(false)
      });
  };

  const handleStartConsult = (_) => {
    history.push("/consult", { patient_id: props.patient_id });
  };

  return (
    <>
      <div className="patientListCard mx-4 my-4 border- ">
        <div className="card">
          <div className="card-body d-flex justify-content-between ">
            <div className="patientDetails d-flex flex-column justify-content-center ">
              <div className="patient-name">
                {props.first_name} {props.last_name}
              </div>
              <div className="patient-bio">
                {props.sex} <span>|</span> {props.blood_group}
              </div>
              <div className="patient-bio">{props.mobile_no}</div>
            </div>
            <div className="cta-parent d-flex flex-column">
              <div className="d-flex">
                <button
                  className="btn btn-primary me-2"
                  onClick={() => setshowVitalModal(true)}
                >
                  +Add Vitals
                </button>
                <button
                  className="btn btn-outline"
                  onClick={handleHistoryDirect}
                >
                  History
                </button>
              </div>
              <button
                className="btn btn-primary w-100 mt-2"
                onClick={handleStartConsult}
              >
                Start Consult
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showVitalModal}
        //   onAfterOpen={afterOpenModal}
        //   onRequestClose={closeModal}
        // style={customStyles}
        // contentLabel="Example Modal"
        className={"custom-modal-content"}
      >
        <div>
          <div>
            <div className="modal-header border-0 ">
              <h5 className="modal-title muted">Add Vitals</h5>
              <button
                type="button"
                className="btn-close"
                onClick={()=>setshowVitalModal(false)}
              ></button>
            </div>

            <div className="modal-body">
              <div className="d-flex flex-wrap">
                <div className="d-flex me-2 my-2">
                  <div className="lhs">Temperature :</div>
                  <div>
                    <input
                      className=" ms-1 vital-input"
                      type="text"
                      ref={temperature}
                    />
                  </div>
                </div>
                <div className="d-flex me-2 my-2">
                  <div className="lhs">TemperatureType :</div>
                  <div>
                    <input
                      className=" ms-1 vital-input"
                      type="text"
                      ref={temperature_type}
                    />
                  </div>
                </div>
                <div className="d-flex me-2 my-2">
                  <div className="lhs">spO :</div>
                  <div>
                    <input
                      className=" ms-1 vital-input"
                      type="text"
                      ref={spO}
                    />
                  </div>
                </div>
                <div className="d-flex me-2 my-2">
                  <div className="lhs">bp :</div>
                  <div>
                    <input className=" ms-1 vital-input" type="text" ref={bp} />
                  </div>
                </div>
                <div className="d-flex me-2 my-2">
                  <div className="lhs">Pulse :</div>
                  <div>
                    <input
                      className=" ms-1 vital-input"
                      type="text"
                      ref={Pulse}
                    />
                  </div>
                </div>
                <div className="d-flex me-2 my-2">
                  <div className="lhs">Rbs :</div>
                  <div>
                    <input
                      className=" ms-1 vital-input"
                      type="text"
                      ref={Rbs}
                    />
                  </div>
                </div>
                <div className="d-flex me-2 my-2">
                  <div className="lhs">is_insulin :</div>
                  <div>
                    <input
                      className=" ms-1 vital-input"
                      type="text"
                      ref={is_insulin}
                    />
                  </div>
                </div>
                <div className="d-flex me-2 my-2">
                  <div className="lhs">insulin_quantity :</div>
                  <div>
                    <input
                      className=" ms-1 vital-input"
                      type="text"
                      ref={insulin_quantity}
                    />
                  </div>
                </div>
                <div className="d-flex me-2 my-2">
                  <div className="lhs">post_prandial :</div>
                  <div>
                    <input
                      className=" ms-1 vital-input"
                      type="text"
                      ref={post_prandial}
                    />
                  </div>
                </div>
                <div className="d-flex me-2 my-2">
                  <div className="lhs">fasting :</div>
                  <div>
                    <input
                      className=" ms-1 vital-input"
                      type="text"
                      ref={fasting}
                    />
                  </div>
                </div>
                <div className="d-flex me-2 my-2">
                  <div className="lhs">height :</div>
                  <div>
                    <input
                      className=" ms-1 vital-input"
                      type="text"
                      ref={height}
                    />
                  </div>
                </div>
                <div className="d-flex me-2 my-2">
                  <div className="lhs">weight :</div>
                  <div>
                    <input
                      className=" ms-1 vital-input"
                      type="text"
                      ref={weight}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer border-0">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={handleVitalSubmit}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {/* <div
          className="modal fade show"
          id="vitalModal"
          tabindex="-1"
          ariaLabelledby="vitalModalLabel"
        >
        </div> */}
    </>
  );
}
