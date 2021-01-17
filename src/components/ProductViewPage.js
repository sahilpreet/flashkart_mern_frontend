import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import "./css/product_view.css"
import FooterComponent from "./Footer";
import HeaderComponent from './Header'
import CarouselCards from "./CarouselCards";
import absolute_url from "./AbsoluteUrl"
import getCookie from "./GetCookie";

function ProductViewPage({ match }) {
    const [productapi, setproductapi] = useState({})
    const [categoryapi, setcategoryapi] = useState('')
    const [cartvalue, setcartvalue] = useState(0)
    const [productscards, setproductscards] = useState([])
    const history = useHistory()
    //console.log(match.params)
    useEffect(() => {
        const csrftoken = getCookie('csrftoken');
        const apiCall = async () => {
            const url = `${absolute_url}/productview/${match.params.id}`
            //console.log("productview")
            try {
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
                // console.log(data)
                if (data.product) {
                    setproductapi(data.product)
                    setcategoryapi(data.categoryWithSubCategory)
                    setproductscards(data.categoryproducts)
                    setcartvalue((prevstate) => data.cartvalue ? data.cartvalue : prevstate)
                }
            } catch (error) {
                return
            }
        }
        const apireturndata = apiCall()
        return () => { }
    }, [match.params.id])
    // < form action = "{% url 'ecommerce:product_view' object.id %}" method = "post" >
    //     <input className="product-id" type="text" name="product_id" value="{{object.id}}" />
    //     <input className="btn-cart" type="submit" value="Add to Cart" />
    //     <input className="btn-cart" type="submit" value="Buy Now" />
    //                 </form >
    const handleAddToCart = async (event) => {
        if (getCookie("token")) {
            const url = `${absolute_url}/cart_add_remove`
            // console.log("click", event.target.name)
            const bodyData = {
                    action: "add",
                    product_id: event.target.name
                }
            // console.log(bodyData)
            try {
                const params = {
                    method: "post",
                    body: JSON.stringify(bodyData),
                    headers: {
                        "Content-Type":"application/json",
                        'Accept': 'application/json',
                        "Authorization": `${getCookie('token')}`,
                    },
                }
                const response = await fetch(url, params)
                const data = await response.json()
                // console.log(data)
                if (data.cartvalue) {
                    setcartvalue((prevstate) => data.cartvalue ? data.cartvalue : prevstate)
                }
            } catch (error) {
                return
            }
        } else {
            history.push("/register_react")
            return
        }
        // const csrftoken = getCookie('csrftoken');
        // const url = `${absolute_url}/api/cart_add_remove`
        // const bodyData = {
        //     action: "add",
        //     product_id: event.target.name
        // }
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
        //                 // console.log(respoknse)
        //                 setcartvalue(response.cart)
        //                 // document.cookie=`token=${response.token}`
        //                 // setCookie("token", response.token, 300)
        //                 // history.push('/react')
        //             })
        //     })
        //     .catch((error) => {
                // console.log(error)
            // })
    }
    return (
        <>
            <HeaderComponent categoryapi={categoryapi} cartvalue={cartvalue} />
            {productapi &&
                <ul className="breadcrumb">
                    <li key="0"><Link to="/">Home</Link></li>
                    <li key="1"><Link to={`/category_react/${productapi.category}`}>{productapi.category}</Link></li>
                    <li key="2"><Link to={`/sub_category_react/${productapi.subcategory}`}>{productapi.subcategory}</Link></li>
                    <li key="3">{productapi.name}</li>
                </ul>
            }
            {productapi &&
                <section className="product-container">
                    <div className="product-image">
                        <img src={`http://127.0.0.1:3001/product/${match.params.id}/image`} alt={`${productapi.name}`} />
                    </div>
                    <div className="product-details">
                        <span className="product-name">
                            {productapi.name}
                        </span>
                        <span className="product-regularprice">$ {productapi.discountedprice}</span>
                        <span className="product-discountedprice"><s>$ {productapi.regularprice}</s></span>
                        <span className="btn">
                            <button className="btn-cart" name={productapi._id} onClick={handleAddToCart}>Add To Cart</button>
                        </span>
                    </div>
                </section>}
            {productscards && <CarouselCards products={productscards} />}
            <FooterComponent />
        </>
    )
}

export default React.memo(ProductViewPage)
