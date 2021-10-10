import React from "react";

export default function SelectedMed({selected, configuration, onchange}) {
  return (
    <div>
      <div className="dropdown-sec">
        <div>
          {selected.map((item) => (
            <div className="addon-sec" key={item.value}>
              <div className="d-flex flex-column text">
                <label>Name</label>
                <input className="input" value={item.name} />
              </div>
              <div className=" dosage d-flex flex-column ">
                <label for="dosage">Dosage</label>
                <div className="dosage-container">
                  {configuration.medicine_dosage.map((dosage) => (
                    <div class="form-check form-check-inline">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        name="dosage"
                        onChange={onchange}
                        data-id={dosage.id}
                        id={item.id}
                      />
                      <label class="form-check-label" for={dosage.id}>
                        {dosage.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="time d-flex flex-column ">
                <label for="frequency">Frequency</label>
                <div>
                  <select name="freq" onChange={onchange} id={item.id}>
                    <option selected>Select</option>
                    {configuration.medicine_frequency.map((freq) => (
                      <option value={freq.id}>{freq.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="time d-flex flex-column ">
                <label for="time">Time</label>
                <div>
                  <select name="time" onChange={onchange} id={item.id}>
                    <option selected>Select</option>
                    {configuration.medicine_time.map((time) => (
                      <option value={time.id}>{time.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="time d-flex flex-column ">
                <label for="is_before_food">When</label>
                <div>
                  <select
                    name="is_before_food"
                    onChange={onchange}
                    id={item.id}
                  >
                    <option selected>Select</option>
                    <option value="1">Before food</option>
                    <option value="0">After food</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
