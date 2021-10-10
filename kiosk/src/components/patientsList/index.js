import React,{useEffect, useRef, useState} from 'react'
import Header from '../header'
import PatientListCard from '../patientListCard'
import SubHeader from '../subHeader'
import axios from 'axios'
import {message} from 'antd'
import Modal from "react-modal";
import { Spin } from 'antd';

export default function PatientList() {

    const [confirgureData, setConfirgureData] = useState({})
    const [patientList, setPatientList] = useState({})
    const [isAddModal, setIsAddModal] = useState(false)
    const [fetchPatinetList, setfetchPatinetList] = useState(false)

    const firstRef = useRef();
    const lastRef = useRef();
    const dobRef = useRef();
    const sexRef = useRef();
    const mbNoRef = useRef();
    const aadhaarRef = useRef();
    const addressRef = useRef();
    const bloodGroupRef = useRef();
    const maritalRef = useRef();
    const relationRef = useRef();
    const emailRef = useRef()

    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

    const getConfigurations = _ => {
        axios.get('https://myplusdoctor.med2myhome.com/api/configuration')
        .then(res=> {
            setConfirgureData(res.data)
        })
        .catch(err=>console.log(err))
    }

    const handleSubmit = _ =>{
        const data = {
            first_name : firstRef?.current?.value,
            middle_name: "",
            last_name : lastRef.current.value,
            email : emailRef.current?.value,
            dob: "03/05/1994",
            gender: sexRef.current.value,
            marital_status: maritalRef.current.value,
            blood_group: bloodGroupRef.current.value,
            address: addressRef.current.value,
            mobile_no: mbNoRef.current.value,
            adhar_no: aadhaarRef.current.value,
            state_id : 1641,
            city_id : 17109,
            pin_code : 560087,
            language: 0,
            ...relationRef.current.value !== "" && {is_family:1, relation:relationRef.current.value}
            
        }
        console.log(data)
        axios.post('https://myplusdoctor.med2myhome.com/api/user/addpatient',data)
        .then(res=>{
            setIsAddModal(false)
            message.success(res.data.data.message,10)
        })
        .catch(()=>{
            message.error('Something went Wrong',10)
        })
    }

    useEffect(()=>{
        getConfigurations();
    },[])

    const handleSearch = e => {
        const searchQuery = e.target.value;
        setfetchPatinetList(true)
        if(searchQuery.length>9){
            axios.get(`https://myplusdoctor.med2myhome.com/api/user/searchpatient?mobile_no=${searchQuery}`)
            .then(res=> {
                setPatientList(res.data.data)
                setfetchPatinetList(false)
            })
            .catch((err)=> {
                console.log(err.message)
            })
        }
    }

    




    return (
      <>
        <div>
          <Header />
          <SubHeader
            label={"Manage Patients"}
            isSearchBar={true}
            onSearch={handleSearch}
          />
          <div className="d-flex justify-content-end me-3 mt-3">
            <button
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              onClick={() => setIsAddModal(true)}
              className="btn btn-primary"
            >
              + Add New Patient
            </button>
          </div>
          {fetchPatinetList ? (
              <div className="d-flex justify-content-center">
                  <Spin size='large' ></Spin>
              </div>
          ):
          <div>

              {patientList.length > 0 &&
                patientList.map((patient) => <PatientListCard {...patient} />)}
          </div>

          }
        </div>
        {/* {isAddModal &&  */}

        {/* <div className="modal " id="exampleModal" >
                <div className="modal-dialog max-w-800">
                    <div className="modal-content"> */}
        <Modal isOpen={isAddModal} style={{height : '600px'}}  className="custom-modal-content">
          <div className="modal-header border-0 ">
            <h5 className="modal-title muted" id="exampleModalLabel">
              Add New patient details
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={()=>setIsAddModal(false)}
            ></button>
          </div>
          <div className="modal-body">
            <div className="input-container d-flex justify-content-center align-items-center flex-column">
              <div className="col-8">
                <div class="mb-3 row">
                  <label
                    for="inputPassword"
                    class="col-sm-4 col-form-label pe-0"
                  >
                    First Name :
                  </label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" ref={firstRef} />
                  </div>
                </div>
              </div>
              <div className="col-8">
                <div class="mb-3 row">
                  <label
                    for="inputPassword"
                    class="col-sm-4 col-form-label pe-0"
                  >
                    Last Name :
                  </label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" ref={lastRef} />
                  </div>
                </div>
              </div>
              <div className="col-8">
                <div class="mb-3  row">
                  <label for="inputPassword" class="col-sm-4 col-form-label">
                    DOB :
                  </label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" ref={dobRef} />
                  </div>
                </div>
              </div>
              <div className="col-8 d-flex mb-3">
                <div className="col-form-label col-sm-4">Blood Group :</div>
                <select
                  class="form-select h-75 ms-2"
                  ref={bloodGroupRef}
                  aria-label="Default select example"
                >
                  <option selected>Select</option>
                  {confirgureData?.blood_group?.map((itr) => (
                    <option value={itr.id}>{itr.name}</option>
                  ))}
                </select>
              </div>
              <div className="col-8 d-flex mb-3">
                <div className="col-form-label col-sm-4">Sex :</div>
                <select
                  class="form-select h-75 ms-2"
                  ref={sexRef}
                  aria-label="Default select example"
                >
                  <option selected>Select</option>
                  {confirgureData?.gender?.map((itr) => (
                    <option value={itr.id}>{itr.name}</option>
                  ))}
                </select>
              </div>
              <div className="col-8 d-flex mb-3">
                <div className="col-form-label col-sm-4">Marital Status :</div>
                <select
                  class="form-select h-75 ms-2"
                  ref={maritalRef}
                  aria-label="Default select example"
                >
                  <option selected>Select</option>
                  {confirgureData?.marital_status?.map((itr) => (
                    <option value={itr.id}>{itr.name}</option>
                  ))}
                </select>
              </div>

              <div className="col-8">
                <div class="mb-3  row">
                  <label
                    for="inputPassword"
                    class="col-sm-4 col-form-label pe-0"
                  >
                    Mobile No :
                  </label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" ref={mbNoRef} />
                  </div>
                </div>
              </div>

              <div className="col-8">
                <div class="mb-3  row">
                  <label class="col-sm-4 col-form-label pe-0">Email :</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" ref={emailRef} />
                  </div>
                </div>
              </div>
              {/* <div className="col-8">
                                    <label>If the patient is as family memver</label>
                                    <input type="radio" />
                                </div> */}
              <div className="col-8 d-flex mb-3">
                <div className="col-form-label col-sm-4">Relation :</div>
                <select
                  class="form-select h-75 ms-2"
                  ref={relationRef}
                  aria-label="Default select example"
                >
                  <option selected>Select</option>
                  {confirgureData?.relation?.map((itr) => (
                    <option value={itr.id}>{itr.name}</option>
                  ))}
                </select>
              </div>
              <div className="col-8">
                <div class="mb-3  row">
                  <label for="inputPassword" class="col-sm-4 col-form-label">
                    Aadhaar No :
                  </label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" ref={aadhaarRef} />
                  </div>
                </div>
              </div>
              <div className="col-8">
                <div class="mb-3  row">
                  <label for="inputPassword" class="col-sm-4 col-form-label">
                    Address :
                  </label>
                  <div class="col-sm-8">
                    <textarea
                      type="text"
                      class="form-control"
                      ref={addressRef}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer border-0">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setIsAddModal(false)}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Save changes
            </button>
          </div>
        </Modal>
        {/* </div>
                </div>
            </div> */}
        {/* } */}
      </>
    );

}
