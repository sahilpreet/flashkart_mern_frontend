import React, { useEffect, useState } from 'react'
import axios from 'axios'
import absolute_url from "./AbsoluteUrl"
import getCookie from "./GetCookie";

// function fetch_aoi() {
//     const csrftoken = getCookie('csrftoken');
//     const params = {
//         method: "get",
//         //credentials: 'same-origin',
//         //credentials: 'include',
//         headers: {
//             'X-CSRFToken': csrftoken,
//             //'Accept': 'application/json',
//             'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
//             //'Content-Type': 'application/json',
//             'Accept': 'application/json',
//             //'X-Requested-With': 'XMLHttpRequest'
//         },
//     }
//     fetch("http://127.0.0.1:8000/api/product_list_func/", params
//     ).then(function (response) {
//         console.log(response.json(), "khg")
//     });
// }


function ListSubcategory(props) {
    //console.log(props.subcatlist)
    return (
        <ul className="sub-category" >
            {props.subcatlist.map((e, index) => index !== 0 ? <li key={index}>{e}</li> : '')
            }
        </ul>
    )
}

const ListCategory = React.forwardRef((props, ref) => {
    const [clickcategory, setclickcategory] = useState('')
    const handlecategoryClck = (key) => {
        //console.log(key)
        setclickcategory((prevState) => prevState === key ? '' : key)
    }
    return (
        <ul>
            {
                Object.entries(props.categoryapi).map(([key, value], index) =>
                    <li key={index} className="category" onClick={(e) => handlecategoryClck(key)} >
                        {key}
                        {clickcategory === key &&
                            <ListSubcategory subcatlist={value} />
                        }
                    </li>
                )
            }
        </ul>
    )
})

function HeaderIndependent(props) {
    const [categoryapi, setcategoryapi] = useState('')
    const [cartvalue, setcartvalue] = useState('0')
    useEffect(() => {
        const csrftoken = getCookie('csrftoken');
        axios.get(`${absolute_url}/api/all_categories`, {
            headers: { 'X-CSRFToken': csrftoken, },
        })
            .then((response) => {
                console.log(response.data,"called independent")
                // setproductlistapi(response.data)
                setcategoryapi(JSON.parse(response.data.categories))
                setcartvalue(response.data.cart)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])
    //donot pass true false in sub category pass the key(dict key ) of corresponding and compare for short circuit
    return (
        <header>
            <div className="menu-wrap">
                <input type="checkbox" className="toggler" />
                <div className="hamburger">
                    <div></div>
                </div>
                <div className="menu">
                    <ListCategory categoryapi={categoryapi} />
                </div>
            </div>
            <h1 className="comp-name">Flashkart</h1>
            <form className="product-search" action="{% url 'ecommerce:search_view' %}" method="get">
                <input className="search-text" type="text" name="product-search" id="" placeholder="Search" />
                <div className="search-btn">
                    <a href="{}" className="search-symbol">&#9906;</a>
                    <input className="search-symbol-hide" type="submit" value="&#9906;" />
                </div>
            </form>
            <a className="cart" href="{% url 'ecommerce:cart' %}">
                <span>Cart(<span className="cart-value">{cartvalue}</span>)</span>
            </a>
        </header>
    )
}

export default React.memo(HeaderIndependent)
