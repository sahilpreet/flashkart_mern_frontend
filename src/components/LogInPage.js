import React, { useState, useEffect } from 'react'
// import './css/forms.css'
import { Link, useHistory } from "react-router-dom";
import absolute_url from "./AbsoluteUrl"
import getCookie from "./GetCookie";

function setCookie(cname, cvalue, exdays) {
    let d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function LogInPage() {
    const [formvalues, setformvalues] = useState({
        username: "",
        password: "",
    })
    const history = useHistory()
    const [emailmatch, setemailmatch] = useState(false)
    useEffect(() => {
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
        const url = `${absolute_url}/login`
        const sentFormValues = formvalues
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
            if (data.token) {
                setCookie("token", data.token, 300)
                history.push('/')
                //document.cookie = `token=${response.token}`
            } else {
                setemailmatch(true)
                // setpasswordmatch(false)
            }
        }
        catch (error) {
            console.log(error)
        }

        // const csrftoken = getCookie('csrftoken');
        // const url = `${absolute_url}/api/login`
        // const bodyData = formvalues
        // const params = {
        //     method: "post",
        //     //credentials: 'same-origin',
        //     //credentials: 'include',
        //     body: JSON.stringify(bodyData),
        //     headers: {
        //         'Authorization': `${getCookie('token')}`,
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
        //                 if (response.token) {
        //                     //console.log(response)
        //                     // document.cookie=`token=${response.token}`
        //                     setCookie("token",response.token,300)
        //                     history.push('/')
        //                 } else {
        //                     setemailmatch(true)
        //                 }
        //             })
        //     })
        //     .catch((error) => {
        //     console.log(error)
        // })
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
                Flashkart Login
            <form onSubmit={HandleSubmit} className="form-comp">
                    <div className="field">
                        Email
                    <input type="email" name="username" autoFocus="" className="form-fields" required="" id="id_username" onChange={HandleInputChange} value={formvalues.username} />
                    </div>
                    <div className="field">
                        Password &nbsp;
                    <input type="password" name="password" autoComplete="new-password" className="form-fields" required="" id="id_password1" onChange={HandleInputChange} value={formvalues.password} />
                    </div>
                    <div className="btn-area">
                        <input className="btn" type="submit" name="Create User" />
                        <input className="btn" type="reset" name="Create User" onClick={HandleReset} />
                    </div>
                </form>
                {emailmatch && <p className="error">email and password donot match</p>}
                <div className="links">
                    <Link to="/">home</Link>
                    <Link to="/register_react">Register</Link>
                </div>
            </div>
        </section>
    )
}


export default React.memo(LogInPage)

