import React, { useState, useEffect } from 'react'
import './css/index.css'
import axios from 'axios'
import HeaderComponent from './Header';
import CarouselCards from './CarouselCards';
import BoxesContainer from "./BoxContainer";
import FooterComponent from "./Footer";
import absolute_url from "./AbsoluteUrl"
import getCookie from "./GetCookie";

function IndexPage() {
    const [productlistapi, setproductlistapi] = useState('')
    const [categoryapi, setcategoryapi] = useState('')
    const [cartvalue, setcartvalue] = useState(0)

    useEffect(() => {
        const csrftoken = getCookie('csrftoken');
        const apiCall = async () => {
            //console.log("productview")
            try {
                const url = `${absolute_url}/products_index_page`
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
                // console.log(data,"ajshfkj")
                if (data.products) {
                    setproductlistapi(data.products)
                    setcategoryapi(data.categoryWithSubCategory)
                    setcartvalue((prevstate)=>data.cartvalue?data.cartvalue:prevstate)
                }
                //         // setcategoryapi(response.data.categories.dictionary)
                //         // setcartvalue(response.data.cart)
            } catch (error) {
                return
            }
        }
        apiCall()
        // axios.get(`${absolute_url}/products_index_page`, {
        //     headers: {
        //         'Authorization':`${getCookie('token')}`,
        //         'X-CSRFToken': csrftoken,
        //         // "Cookie":document.cookie
        //         //withCredentials: true
        //     },
        // })
        //     .then((response) => {
        //         console.log(response.data)
        //         // console.log(response.data.categories)
        //         // setproductlistapi(response.data)
        //         // setcategoryapi(JSON.parse(response.data.categories))
        //         // setcategoryapi(response.data.categories.dictionary)
        //         // setcartvalue(response.data.cart)
        //     })
        //     .catch((error) => {
        //         console.log(error)
        //     })
    }, [])

    return (
        <>
            <HeaderComponent categoryapi={categoryapi} cartvalue={cartvalue} />
            {productlistapi && <CarouselCards products={productlistapi.slice(0, 22)} />}
            {productlistapi && <BoxesContainer categoryapi={categoryapi} />}
            {productlistapi && <CarouselCards products={productlistapi.slice(22, 45)} />}
            <FooterComponent />
        </>
    )
}
// <h1>Product List</h1>
// <button onClick={() => { if (productlistapi.previous) { seturl(productlistapi.previous) } }}>PrevousPage</button>
// <button onClick={(e) => { if (productlistapi.next) { seturl(productlistapi.next) } }}>NextPage</button>
// {productlistapi && <ul>{productlistapi.results.products.map((e) => <li key={e.id}>{e.id} {e.name} <img src={`http://127.0.0.1:8000${e.image}`} /></li>)}</ul>
// }
export default React.memo(IndexPage)
