import React from 'react'
import Header from '../header'
import SubHeader from '../subHeader'

export default function Reports() {


    const ListCrad = ({title,value,TodayClass}) => {
        return (
            <div className="listCradData me-3">
                <div className="title">{title}</div>
                <div className={`value ${TodayClass}`}>{value}</div>
            </div>

        )
    }


    return (
        <div className="reportsContainer">
            <Header/>
            <SubHeader label={"Reports"} />
            <div className="reportsData" >
                <div className="kioskPerformnace my-3 ms-3">
                    <div className="reportHeader w-100 d-flex  ">
                        <div className=" report-label pb-2 border-bottom border-3 mb-0 border-dark fw-bold">Kiosk&nbsp;performance</div>
                        <div className="border-2 border-bottom" style={{width: "-webkit-fill-available"}}></div>
                    </div>
                    <div className="mt-2 fw-bold text-muted">21/09/2021</div>
                    <div className="d-flex flex-wrap mt-2">
                        <ListCrad title={"Todays visit"} TodayClass={"todayVisit"} value={"220"} />
                        <ListCrad title={"Todays visit"} value={"220"} />
                        <ListCrad title={"Todays visit"} value={"220"} />
                    </div>
                </div>
                <div className="kioskPerformnace my-3 ms-3">
                    <div className="reportHeader w-100 d-flex  ">
                        <div className=" report-label pb-2 border-bottom border-3 mb-0 border-dark fw-bold">Pending&nbsp;Payment</div>
                        <div className="border-2 border-bottom" style={{width: "-webkit-fill-available"}}></div>
                    </div>
                    <div className="mt-2 fw-bold text-muted">21/09/2021</div>
                    <div className="d-flex flex-wrap mt-2">
                        <ListCrad TodayClass={'pending'} value={"2200"} />
                    </div>
                </div>
                <div className="kioskPerformnace my-3 ms-3">
                    <div className="reportHeader w-100 d-flex  ">
                        <div className=" report-label pb-2 border-bottom border-3 mb-0 border-dark fw-bold">Historical</div>
                        <div className="border-2 border-bottom" style={{width: "-webkit-fill-available"}}></div>
                    </div>
                    <div className="mt-2 fw-bold text-muted">21/09/2021</div>
                    <div className="d-flex flex-wrap mt-2">
                        <ListCrad title={"MTD Visits"} value={"200"} />
                        <ListCrad title={"MTD Revenue"} value={"3000"} />
                        <ListCrad title={"YTD Visits"} value={"3000"} />
                        <ListCrad title={"YTD Revenue"} value={"3000"} />
                    </div>
                </div>
            </div>
        </div>
    )
}
