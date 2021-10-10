import React from 'react'
import { NavLink } from "react-router-dom";
import { Switch } from "antd";

export default function SubHeader({
  label,
  isSearchBar,
  onSearch,
  completeBtn,
  showToggle,
  activeToggle,
  onchange,
  toggleLoading
}) {
  return (
    <div className="subheader-container">
      <div className="subheader-content d-flex align-items-center px-3">
        <div className="d-flex justify-content-between w-100 align-items-center ">
          <div className="text-white fw-bold">{label}</div>
          {isSearchBar && (
            <div className="searchBar">
              <input
                type="text"
                onChange={onSearch}
                placeholder="search patient"
              />
            </div>
          )}
          <div className="d-flex align-items-center">
            {/* <div className="me-4">
              <NavLink
                to="/faq"
                activeClassName="selected"
                activeStyle={{
                  color: "#d2340",
                  fontWeight: 800,
                  backgroundColor: "#fff",
                }}
              >
                FAQs
              </NavLink>
            </div> */}
            {/* <div className="me-4">
              <NavLink to="/faq" activeClassName="selected">
                FAQs
              </NavLink>
            </div> */}
            {completeBtn && (
              <div>
                <button
                  className="btn btn-primary"
                  onClick={completeBtn.onclick}
                >
                  {completeBtn.label}
                </button>
              </div>
            )}
            {showToggle && (
              <div className="d-flex active-doc-toggle">
                <div>Active</div>
                <Switch
                  className={"doc-toggle"}
                  loading={toggleLoading}
                  checked={activeToggle}
                  onChange={onchange}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
