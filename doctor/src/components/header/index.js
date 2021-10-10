import React from 'react'
import { useHistory } from 'react-router-dom'

export default function Header({userName}) {
    const history = useHistory()

    const handleLogoClick = _ => {
        history.push("/patient")
    }

    return (
        <div className="header-content">
            <div className="logo" onClick={handleLogoClick} >
                <span>+&nbsp;</span>MyDoctor
            </div>
            <div className="profile">
                <div className="name">
                    {userName}
                </div>
            </div>
        </div>
    )
}
