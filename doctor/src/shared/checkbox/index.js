import React from 'react'

export default function Checkbox({ label ,onchange}) {
    return (
      <div>
        <div class="checkbox-container">
          <input type="checkbox" name={label.split(' ').slice(-1)} onChange={onchange} id={label} />
          <label class="checkbox" for={label}></label>
          <label for={label}>{label}</label>
        </div>
      </div>
    );
}
