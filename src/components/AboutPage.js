import React,{useEffect,useState} from 'react'
import { Link } from "react-router-dom";
import './css/cart.css'
import axios from 'axios'
import FooterComponent from "./Footer";
import HeaderComponent from './Header'
import absolute_url from "./AbsoluteUrl"
import getCookie from "./GetCookie";

function AboutPage() {
    const [categoryapi, setcategoryapi] = useState([])
    const [cartvalue, setcartvalue] = useState(0)
    useEffect(() => {
        const csrftoken = getCookie('csrftoken');
        const apiCall = async () => {
            //console.log("productview")
            try {
                const url = `${absolute_url}/cart`
                const params = {
                    method: "get",
                    // body: formdata,
                    headers: {
                        'Accept': 'application/json',
                        "Authorization": `${getCookie('token')}`,
                    },
                }
                const response = await fetch(url, params)
                const data = await response.json()
                if (data.products) {
                    setcategoryapi(data.categoryWithSubCategory)
                    // setcartproducts(data.products)
                    setcartvalue(data.products.length)
                }
            } catch (error) {
                return
            }
        }
        apiCall()
        // axios.get(`${absolute_url}/api/cart`, {
        //     headers: {
        //         'Authorization': `${getCookie('token')}`,
        //         'X-CSRFToken': csrftoken,
        //         // "Cookie":document.cookie
        //         //withCredentials: true
        //     },
        // })
        //     .then((response) => {
        //         // console.log(response.data, "ajsflkn")
        //         setcategoryapi(response.data.categories.dictionary)
        //         // console.log(response.data)
        //         // setproductlistapi(response.data)
        //         // setcategoryapi(JSON.parse(response.data.categories))
        //         // setcartproducts(response.data.cart_all)
        //         setcartvalue(response.data.cart)
        //     })
        //     .catch((error) => {
        //         console.log(error)
        //     })
    }, [])
    return (
        <>
        <HeaderComponent categoryapi={categoryapi} cartvalue={cartvalue} />
        <section className="main-about">
        <ul className="breadcrumb">
        <li><Link to="/">Home</Link></li>
        <li>about</li>
        </ul>
        <p className="para-about">
        This site is in develpoment and has been created by sahilpreet singh
        <br></br>
        <br></br>
        for business queries contact us
        <br></br>
        <br></br>
        Email : sahilpreetsingh9915545834@gmail.com
        </p>
        </section>
        <FooterComponent />
        </>
    )
}

export default React.memo(AboutPage)
