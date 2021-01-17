import React, { useState, useEffect } from 'react'
import './css/forms.css'
import { Link } from "react-router-dom";
import absolute_url from "./AbsoluteUrl"
import getCookie from "./GetCookie";

function ContactUsPage() {
    const [formvalues, setformvalues] = useState({
        name: "",
        email: "",
        comment: "",
    })
    const [missing, setmissing] = useState(false)
    const [success, setsuccess] = useState("")
    useEffect(() => {
        // const token=getCookie('token')
        // console.log(token)
        return () => { }
    }, [])
    const HandleInputChange = (event) => {
        // console.log(formvalues)
        const name = event.target.name, value = event.target.value
        setformvalues((prevState) => {
            return {
                ...prevState,
                [name]: value,
            }
        })
    }
    const HandleSubmit = async (event) => {
        event.preventDefault()
        if (formvalues.email !== "" && formvalues.name !== "" && formvalues.comment !== "") {
            const csrftoken = getCookie('csrftoken');
            const url = `${absolute_url}/contactus`
            const sentFormValues = {
                name: formvalues.name,
                email: formvalues.email,
                comment: formvalues.comment
            }
            // console.log(sentFormValues)
            const params = {
                method: "post",
                body: JSON.stringify(sentFormValues),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            }
            try {
                const response = await fetch(url, params)
                const data = await response.json()
                // console.log(data)
                if (data.created) {
                    setsuccess("Comment has been succesfully sent")
                    setformvalues((prevState) => {
                        return {
                            name: "",
                            email: "",
                            comment: "",
                        }
                    })
                } else {
                    setsuccess("Comment has been not sent.Please retry!")
                }
            }
            catch (error) {
                console.log(error)
            }
            // const url = `${absolute_url}/api/contactus`
            // const bodyData = formvalues
            // const params = {
            //     method: "post",
            //     //credentials: 'same-origin',
            //     //credentials: 'include',
            //     body: JSON.stringify(bodyData),
            //     headers: {
            //         'X-CSRFToken': csrftoken,
            //         //'Accept': 'application/json',
            //         'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            //         //'Content-Type': 'application/json',
            //         'Accept': 'application/json',
            //         'X-Requested-With': 'XMLHttpRequest'
            //     },
            // }
            // fetch(url, params)
            //     .then((response) => {
            //         response.json()
            //             .then((response) => {
            //                 // console.log(response.created)
            //                 if (response.created) {
            //                     setsuccess("Comment has been succesfully sent")
            //                 } else {
            //                     setsuccess("Comment has been not sent.Please retry!")
            //                 }
            //             })
            //     })
            //     .catch((error) => {
            //         console.log(error)
            //     })
        } else {
            setmissing((prevState) => !prevState)
        }
    }
    const HandleReset = (event) => {
        setformvalues((prevState) => {
            return {
                name: "",
                email: "",
                comment: "",
            }
        })
    }
    return (
        <section className="main-form">
            <div className="form-area">
                Contact Flashkart
            <form onSubmit={HandleSubmit} className="form-comp">
                    <div className="field">
                        Name
                        <input type="text" name="name" autoFocus="" className="form-fields" required id="id_name" onChange={HandleInputChange} value={formvalues.name} />
                    </div>
                    <div className="field">
                        Email
                        <input type="Email" name="email" autoFocus="" className="form-fields" required id="id_name" onChange={HandleInputChange} value={formvalues.email} />
                    </div>
                    <div className="field">
                        Comment&nbsp;
                        <textarea name="comment" cols="40" rows="10" maxLength="2000" className="form-fields" required id="id_comment" value={formvalues.comment} onChange={HandleInputChange}></textarea>
                    </div>
                    <div className="btn-area">
                        <input className="btn" type="submit" name="Create User" />
                        <input className="btn" type="reset" name="Create User" onClick={HandleReset} />
                    </div>
                </form>
                {missing && <p className="error">Email and name is required</p>}
                {success && <p className="error">{success}</p>}
                <div className="links">
                    <Link to="/">home</Link>
                    <Link to="/login_react">login</Link>
                </div>
            </div>
        </section >
    )
}

export default React.memo(ContactUsPage)
