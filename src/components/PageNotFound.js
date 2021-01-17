import React from 'react'
import { Link } from "react-router-dom";
import './css/forms.css'

function PageNotFound() {
    return (
        <section className="main-form">
            <div className="form-area">
                Page Not Found Go To Home
                <div className="form-comp">
                    <div className="btn-area">
                        <button className="btn">
                            <Link className="btn-link" to="/">Home</Link>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PageNotFound
