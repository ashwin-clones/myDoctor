import React from 'react'
import isEmpty from 'lodash/isEmpty'

export default function Vital({vitalsData}) {
  const toCamel = (s) => {
    return s.replace(/([-_][a-z])/gi, ($1) => {
      return $1.toUpperCase().replace("-", "").replace("_", "");
    });
  };
    return (
      <div className="vitalContent">
        <div className="vitalHeader p-2 border-bottom">Patient Vitals</div>
        <div className="d-flex flex-wrap p-3 ">
          {!isEmpty(vitalsData) &&
            Object.keys(vitalsData).map((key) => (
              <div className="d-flex vital-item">
                <div className="vital-lhs">{toCamel(key)}</div>
                <div className="me-3">:</div>
                <div className="vital-rhs">
                  {vitalsData[key] ? vitalsData[key] : "-"}
                </div>
              </div>
            ))}
        </div>
      </div>
    );
}
