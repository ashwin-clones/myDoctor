import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../header";
import SubHeader from "../subHeader";
import { useLocation } from "react-router-dom";
import { Spin, Space } from 'antd';

export default function PatinetHistory(props) {
  const [historyData, setHistoryData] = useState({});
  const location = useLocation();
  const [loading, setloading] = useState(true)

  useEffect(() => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    const { patient_id } = location.state;

    axios
      .get(
        `https://myplusdoctor.med2myhome.com/api/user/getpatienthistory?patient_id=${patient_id}`
      )
      .then((res) => {
        setHistoryData(res.data.data[0]);
        setloading(false)
        console.log(res.data.data[0]);
      });
  }, []);

  return (
    <div>
      <Header />
      <SubHeader label={"patient history"} />

      {loading ? (
        <div className="d-flex justify-content-center mt-5 "  >
          {/* <Space> */}
            <Spin size="large" />
          {/* </Space> */}
        </div>
      ) : (
        <div className="phContent mx-5 mb-5">
          {historyData?.patinet_vital?.vitals.length > 0 && (
            <div className="vitalsContnet">
              <div className="heading my-3">Vitals</div>
              {historyData?.patinet_vital?.vitals?.map((vital) => (
                <div className="vitalBody mb-3  d-flex align-items-center">
                  {/* <div className="date me-3">12/12/2012</div> */}
                  <div className="ph card p-2 w-100">
                    <div className="phCardBody flex-wrap d-flex">
                      {Object.entries(vital).map(([key, value]) => (
                        <div className="vitalItem m-1 d-flex align-items-center">
                          <div className="lhs text-capitalize">{key} :</div>
                          <div className="vitalValue border rounded ms-2 p-2">
                            {value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {historyData.patient_advice ? (
            <div className="adviceContent">
              <div className="heading my-3">Advice</div>
              <div className="adviceBody d-flex">
                <div className="date me-3">12/01/2011</div>
                <div className="card">
                  <div className="px-3">SomeThing will come</div>
                </div>
              </div>
            </div>
          ) : null}

          {historyData?.patient_prescription?.prescription?.length > 0 && (
            <div className="adviceContent">
              <div className="heading my-3">Prescriptions</div>
              <div className="adviceBody d-flex">
                {historyData?.patient_prescription?.prescription.map((item) => (
                  <a
                    className="card mx-2 my-2"
                    target="_blank"
                    href={item.prescription_pdf}
                  >
                    <div className="px-3 py-2 pdf-card ">
                      {item.prescription_date}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
