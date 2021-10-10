import axios from 'axios'
import React,{useEffect, useState} from 'react'
import Header from '../header'
import SubHeader from '../subHeader'

export default function PatinetHistory() {

    const [historyData, setHistoryData] = useState({})


    useEffect(()=>{
        axios.defaults.headers.common['Authorization'] = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNDlhZjMwNzI3MmVlMWZkZThkOTEzNTUwNGRhYzVjNWQxZWYzYjFhNWUzODhmNWEwMTdlYTQxMzM4ZTI1NGYyNGYzMjY4ZTIyNTMyOWIyMGMiLCJpYXQiOjE2MjkzNDgzMDksIm5iZiI6MTYyOTM0ODMwOSwiZXhwIjoxNjYwODg0MzA5LCJzdWIiOiIxIiwic2NvcGVzIjpbInVzZXIiXX0.2Z-P3JngQG8eu0ct36ML33AShOn3uLcCshGw3sD2PQXkXpg_Tp0nH2BKocBKZARIaurDCRrnAE5_oR5pul3HxAv4nUmc7ACqH8IakcalTaFlNv5Iz7ZHe8DWbSZ_99mxhtm-EG_5uwLaeZbUXXdBelmJ6TYS0lQVlpRllv1UEKSgO_ViEG-aPFltmS1AWvSpNZcuvKbRfhVAerOsIfFDQqCnbov5v-NTVFSa_qVhPtrs5Fc0j0Rmz0FtonshrYusvTS07HEAU2_HmM8P1D2DhDWSLYSRBX9YM2OG6rQylWGClXt1eI0bRaINUn2-h1I8x6FIQSEz8pjKcY1b9vYKjtoPa1nl6iKYqEZlp5B8YZruDblLwG_JTNQV-mtpCNBf9GdNrlTeZHyqz7NqkW-5SxqaoixyUIzZZPOKqaKQfItR86aBNI00ydSC0Ew-V3GYBjkgV204Zs1bqIwO_YEAZNP6Tr6vb0SYzsdsFwtnkDTFVfcD7TRNKc0mLmL8t0whgJcSGb5b9hL1x127GaJVQO4OHCWqBqHDfSDPq0h3ZbGKn9_QdVWSrqxkQCveCl6TELm7nQP82I7Ze8vEHQcXgIErWYvvnHyWtzCWVsqwIjQRO88EIbMmLBZVyZZvfn0Cfr9DlutYH5ciZPrsjmHOa7AvWrAzRcQADgoysOykNYo";
        axios.get("https://myplusdoctor.med2myhome.com/api/user/getpatienthistory?patient_id=1")
        .then(res=>{
            setHistoryData(res.data.data[0])
            console.log(res.data.data[0])
        })
    },[])


    return (
        <div>
            <Header/>
            <SubHeader label={"patient history"} />
            <div className="phContent mx-3">
                <div className="vitalsContnet">
                    <div className="heading my-3">Vitals</div>
                    {historyData?.patinet_vital?.map(vital=>(

                        <div className="vitalBody mb-3 d-flex align-items-center">
                            <div className="date me-3">12/12/2012</div>
                            <div className="ph card p-2 w-100">
                                <div className="phCardBody flex-wrap d-flex">
                                    {Object.entries(vital).map(([key,value])=>(
                                        <div className="vitalItem m-1 d-flex align-items-center">
                                            <div className="lhs text-capitalize">{key} :</div>
                                            <div className="vitalValue border rounded ms-2 p-2">{value}</div>
                                        </div>

                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="adviceContent">
                    <div className="heading my-3">Advice</div>
                    <div className="adviceBody d-flex">
                        <div className="date me-3">12/01/2011</div>
                        <div className="card">
                            <div className="px-3">SomeThing will come</div>
                        </div>
                    </div>
                </div>
                <div className="adviceContent">
                    <div className="heading my-3">Prescriptions</div>
                    <div className="adviceBody d-flex">
                        <div className="date me-3">12/01/2011</div>
                        <div className="card">
                            <div className="px-3">SomeThing will come</div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}
