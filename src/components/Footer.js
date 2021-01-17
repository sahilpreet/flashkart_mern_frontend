import React from 'react'
import { Link } from "react-router-dom";

function FooterComponent() {
    return (
        <footer>
            <div className="foot-links">
                <Link to="/about_react">About</Link>
                <Link to="/contactus_react">ContactUS</Link>
            </div>
            <span>&copy; 2020-2020 Flashkart Inc</span>
        </footer>
    )
}

export default React.memo(FooterComponent)
