import React from 'react'

export default function Footer({ completeBtn }) {
  return (
    <div>
      <div className="footer" >
        <button className="btn btn-primary me-5" onClick={completeBtn.onclick}>
          {completeBtn.label}
        </button>
      </div>
    </div>
  );
}
