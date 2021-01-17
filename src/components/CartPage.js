import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import './css/cart.css'
import axios from 'axios'
import HeaderComponent from './Header';
import FooterComponent from "./Footer";
import absolute_url from "./AbsoluteUrl"
import getCookie from "./GetCookie";

function ListCartProducts({ cartproducts,setcartvalue }) {
    const [totalprice, settotalprice] = useState('0')
    const [cartproductsdisplay, setcartproductsdisplay] = useState([])
    const history = useHistory()
    useEffect(() => {
        // console.log(cartproducts)
        if (getCookie("token")) {
            // console.log("")
        } else {
            history.push("/register_react")
        }
        let price = 0;
        setcartproductsdisplay((prevState) => {
            cartproducts.forEach(element => {
                price += (parseFloat(element.discountedprice))
                // console.log(element, "sakf;lks;")
            });
            return cartproducts
        })
        settotalprice(price.toFixed(2))
        // return () => settotalprice(price.toFixed(2))
    }, [cartproducts])
    // console.log(totalprice)
    const handleRemove = async (event) => {
        // console.log("click", event.target.id)
        const csrftoken = getCookie('csrftoken');
        const url = `${absolute_url}/cart_add_remove`
        let bodyData
        if (event.target.name === "removeall") {
            bodyData = {
                action: event.target.name,
                product_id: cartproductsdisplay.map((e) => e._id),
            }
        }
        else {
            bodyData = {
                action: event.target.name,
                product_id: event.target.id,
            }
        }
        try {
            const params = {
                method: "post",
                body: JSON.stringify(bodyData),
                headers: {
                    "Content-Type": "application/json",
                    'Accept': 'application/json',
                    "Authorization": `${getCookie('token')}`,
                },
            }
            const response = await fetch(url, params)
            const data = await response.json()
            if (data.cart) {
                setcartproductsdisplay(data.cart)
                // document.querySelector(".cart-value").textContent = response.cart
                setcartvalue(data.cartvalue)
                let price = 0;
                data.cart.forEach(element => {
                    price += (parseFloat(element.discountedprice))
                    // console.log(element, "sakf;lks;")
                });
                // console.log(response.cart_all)
                settotalprice(price.toFixed(2))
            }
        } catch (error) {
            return
        }
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
        //                 // console.log(response)
        //                 setcartproductsdisplay(response.cart_all)
        //                 document.querySelector(".cart-value").textContent = response.cart
        //                 let price=0;
        //                 response.cart_all.forEach(element => {
        //                     price += (parseFloat(element.discountedprice))
        //                     // console.log(element, "sakf;lks;")
        //                 });
        //                 // console.log(response.cart_all)
        //                 settotalprice(price.toFixed(2))
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
        <ul className="cart-products">
            {cartproductsdisplay && cartproductsdisplay.map((element, index) => {
                return (
                    <li key={`${element._id}+${index}`} className="product-spec" id={element.id}>
                        <Link to={`/product_react/${element._id}`}>
                            <div className="product-name">
                                <div className="product-img">
                                    <img src={`${absolute_url}/product/${element._id}/image`} alt={element.name} />
                                </div>
                                <div className="product-desc">
                                    {element.name}
                                    <span className="price">
                                        $ <span id={`product-price-${element._id}`}>{element.discountedprice}</span>
                                    </span>
                                </div>
                            </div>
                        </Link>
                        <div className="product-price">
                            <a className="product-id">{totalprice}</a>
                            <button className="btn-cart" name="remove" id={element._id} onClick={handleRemove}>Remove</button>
                        </div>
                    </li>
                )
            })
            }
            <li className="product-spec">
                <div className="product-name">
                    <div className="product-img">
                        Total Price
                    </div>
                    <div className="product-desc">
                        <span className="price">
                            $ <span id="total-price">{totalprice}</span>
                        </span>
                    </div>
                </div>
                <div className="product-price">
                    <button className="btn-cart" name="removeall" onClick={handleRemove}>RemoveAll</button>
                </div>
            </li>
        </ul>
    )
}

function CartPage() {
    const [categoryapi, setcategoryapi] = useState([])
    const [cartvalue, setcartvalue] = useState(0)
    const [cartproducts, setcartproducts] = useState([])
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
                    setcartproducts(data.products)
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
        //         setcartproducts(response.data.cart_all)
        //         setcartvalue(response.data.cart)
        //     })
        //     .catch((error) => {
        //         console.log(error)
        //     })
    }, [])
    // {% for product in cart_all %}
    return (
        <>
            <HeaderComponent categoryapi={categoryapi} cartvalue={cartvalue} />
            <ul className="breadcrumb">
                <li><Link to="/">Home</Link></li>
                <li>Cart</li>
            </ul>
            <section className="main-cart">
                <ListCartProducts cartproducts={cartproducts} setcartvalue={setcartvalue}/>
            </section>
            <FooterComponent />
        </>
    )
}

export default React.memo(CartPage)

