import React, { useState, useEffect } from 'react'
import './css/forms.css'
import { Link, useHistory } from "react-router-dom";
import absolute_url from "./AbsoluteUrl"
import getCookie from "./GetCookie";

function ProductEnterPage() {
    const [formvalues, setFormvalues] = useState({
        name: "",
        category: "",
        subcategory: "",
        regularprice: "",
        discountedprice: "",
        image: null,
    })
    const [productEntered, setProductentered] = useState(false)
    const [productnamesucced, setproductnamesucced] = useState("")
    const [emailmatch, setEmailmatch] = useState(false)
    const HandleInputChange = (event) => {
        const name = event.target.name, value = event.target.value
        if (name === "image") {
            const files = event.target.files[0]
            console.log(files, files.name)
            setFormvalues((prevState) => {
                return {
                    ...prevState,
                    [name]: files,
                }
            })
        } else {
            setFormvalues((prevState) => {
                return {
                    ...prevState,
                    [name]: value,
                }
            })
        }
    }
    const HandleSubmit = async (event) => {
        event.preventDefault()
        const url = `${absolute_url}/product`
        let formdata = new FormData()
        Object.keys(formvalues).forEach(element => {
            console.log(element, formvalues[element])
            // if(element==="image"){
            //     formdata.append(element,formvalues[element],formvalues[element].name)
            // }else{
            formdata.append(element, formvalues[element])
            // }
        });
        console.log(formdata)
        const params = {
            method: "post",
            body: formdata,
            headers: {
                'Accept': 'application/json',
            },
        }
        try {
            const response = await fetch(url, params)
            const data = await response.json()
            console.log(data)
            if (data.name = formvalues.name) {
                setProductentered((prevState) => !prevState)
                setproductnamesucced((prevState)=>data.name)
                setFormvalues((prevState) => {
                    return {
                        name: "",
                        category: "",
                        subcategory: "",
                        regularprice: "",
                        discountedprice: "",
                        image: null,
                    }
                })
            }
        } catch (error) {
            console.log(error)
        }
        // fetch(url, params)
        //     .then((response) => {
        //         console.log(response)
        //         response.json()
        //             .then((response) => {
        //                 console.log(response,"rrr")
        //             })
        //     })
        //     .catch((error) => {
        //         console.log(error,"error")
        //     })
    }
    const HandleReset = () => {
        setFormvalues((prevState) => {
            return {
                name: "",
                category: "",
                subcategory: "",
                regularprice: "",
                discountedprice: "",
                image: null,
            }
        })
    }
    return (
        <section className="main-form">
            <div className="form-area">
                Flashkart Product Enter
            <form onSubmit={HandleSubmit} className="form-comp">
                    <div className="field">
                        Name
                    <input type="text" name="name" autoFocus="" className="form-fields" required id="id_name" onChange={HandleInputChange} value={formvalues.name} />
                    </div>
                    <div className="field">
                        Category
                    <input type="text" name="category" autoFocus="" className="form-fields" required id="id_category" onChange={HandleInputChange} value={formvalues.category} />
                    </div>
                    <div className="field">
                        Subcategory
                    <input type="text" name="subcategory" autoFocus="" className="form-fields" required id="id_subcategory" onChange={HandleInputChange} value={formvalues.subcategory} />
                    </div>
                    <div className="field">
                        Regularprice
                    <input type="number" name="regularprice" autoFocus="" className="form-fields" required id="id_regularprice" onChange={HandleInputChange} value={formvalues.regularprice} />
                    </div>
                    <div className="field">
                        Discountedprice&nbsp;
                    <input type="number" name="discountedprice" autoFocus="" className="form-fields" required id="id_discountedprice" onChange={HandleInputChange} value={formvalues.discountedprice} />
                    </div>
                    <div className="field">
                        image
                    <input type="file" accept="image/*" name="image" autoFocus="" className="form-fields" required id="id_image" onChange={HandleInputChange} />
                    </div>
                    <div className="btn-area">
                        <input className="btn" type="submit" name="Create User" id="product_submit" />
                        <input className="btn" type="reset" name="Create User" onClick={HandleReset} />
                    </div>
                </form>
                {productEntered && <p className="error">{productnamesucced} successfuly entered in database.</p>}
                {emailmatch && <p className="error">email already exist! Please enter other email</p>}
                <div className="links">
                    <Link to="/">home</Link>
                    <Link to="/login_react">login</Link>
                </div>
            </div>
        </section>
    )
}

export default ProductEnterPage
