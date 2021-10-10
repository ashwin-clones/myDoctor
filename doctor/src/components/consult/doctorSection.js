import React from "react";

import Multiselect from "multiselect-react-dropdown";

export default function DoctorSection({
  title,
  options,
  onchange,
  onsearch,
  loading,
  refs
}) {

  const customCssMulti = {
    chips: {
      background : '#d24350'
    }
  }


  return (
    <div className="doc-sec">
      <div className="complete-section">
        <div className="textarea-sec">
          <div className="section-title">
            {title}
            <span>.</span>
          </div>
          <div className="textarea">
            <textarea
              placeholder={`Enter ${
                title === "Common Notes" ? title : `${title} notes...`
              } `}
              className="h-100 w-100 border-0 "
              ref={refs}
            ></textarea>
          </div>
        </div>
        <div className="multi-dropdown">
          {options && (
            <Multiselect
              options={options}
              onSelect={(e) => onchange(e,title)}
              onRemove={(e) => onchange(e,title)}
              onSearch={onsearch}
              displayValue="name"
              loading={loading}
              placeholder={`Select ${title}`}
              style={customCssMulti}
            />
          )}
        </div>
      </div>
    </div>
  );
}
