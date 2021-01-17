import React, { useState, useEffect } from 'react'
import './css/forms.css'
import { Link, useHistory } from "react-router-dom";
import absolute_url from "./AbsoluteUrl"
import getCookie from "./GetCookie";

function RegisterPage() {
    const [formvalues, setformvalues] = useState({
        username: "",
        password1: "",
        password2: "",
    })
    const history = useHistory()
    const [passwordmatch, setpasswordmatch] = useState(false)
    const [emailmatch, setemailmatch] = useState(false)
    useEffect(() => {
        // const token=getCookie('token')
        // console.log(token)
        return () => { }
    }, [])
    const HandleInputChange = (event) => {
        //console.log(formvalues)
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
        if (formvalues.password1 !== "" && formvalues.password1 === formvalues.password2) {
            const csrftoken = getCookie('csrftoken');
            const url = `${absolute_url}/register`
            const sentFormValues={
                username:formvalues.username,
                password:formvalues.password1
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
                console.log(data)
                if (data.username) {
                    history.push("/login_react")
                    //document.cookie = `token=${response.token}`
                } else {
                    setemailmatch(true)
                    setpasswordmatch(false)
                }
            }
            catch (error) {
                console.log(error)
            }
            // const url = `${absolute_url}/api/register`
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
            //                 //console.log(response)
            //                 if (response.token) {
            //                     history.push("/login_react")
            //                     //document.cookie = `token=${response.token}`
            //                 } else {
            //                     setemailmatch(true)
            //                     setpasswordmatch(false)
            //                 }
            //             })
            //     })
            //     .catch((error) => {
            //         console.log(error)
            //     })
        } else {
            setpasswordmatch(true)
            setformvalues((prevState) => {
                return {
                    ...prevState,
                    password1: "",
                    password2: "",
                }
            })
        }
    }
    const HandleReset = (event) => {
        setformvalues((prevState) => {
            return {
                username: "",
                password1: "",
                password2: "",
            }
        })
    }
    return (
        <section className="main-form">
            <div className="form-area">
                Flashkart Register
            <form onSubmit={HandleSubmit} className="form-comp">
                    <div className="field">
                        Email
                    <input type="email" name="username" autoFocus="" className="form-fields" required id="id_username" onChange={HandleInputChange} value={formvalues.username} />
                    </div>
                    <div className="field">
                        Password
                    <input type="password" name="password1" autoComplete="new-password" className="form-fields" required id="id_password1" onChange={HandleInputChange} value={formvalues.password1} />
                    </div>
                    <div className="field">
                        Password confirmation&nbsp;
                    <input type="password" name="password2" autoComplete="new-password" className="form-fields" required id="id_password2" onChange={HandleInputChange} value={formvalues.password2} />
                    </div>
                    <div className="btn-area">
                        <input className="btn" type="submit" name="Create User" />
                        <input className="btn" type="reset" name="Create User" onClick={HandleReset} />
                    </div>
                </form>
                {passwordmatch && <p className="error">Password donot match</p>}
                {emailmatch && <p className="error">email already exist! Please enter other email</p>}
                <div className="links">
                    <Link to="/">home</Link>
                    <Link to="/login_react">login</Link>
                </div>
            </div>
        </section>
    )
}

export default React.memo(RegisterPage)
