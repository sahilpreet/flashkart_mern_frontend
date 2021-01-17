import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './css/category.css'
import axios from 'axios'
import HeaderComponent from "./Header";
import FooterComponent from "./Footer";
import PaginationComponent from "./PaginationComponent";
import CategoryList from "./CategoryList";
import absolute_url from "./AbsoluteUrl"
import getCookie from "./GetCookie";


function SubCategoryPage({ match }) {
    const [pageno, setpageno] = useState(1)
    const [urlparams, seturlparams] = useState(`${absolute_url}/subcategory/${match.params.category_name}`)
    const [prevurl, setprevurl] = useState('')
    const [nexturl, setnexturl] = useState('')
    const [productapi, setproductapi] = useState([])
    const [categoryapi, setcategoryapi] = useState({})
    const [cartvalue, setcartvalue] = useState(0)
    const [matchFromUrl, setmatchFromUrl] = useState(match.params.category_name)

    useEffect(() => {
        const csrftoken = getCookie('csrftoken')
        const apiCall = async () => {
            const url = urlparams
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
                if (matchFromUrl !== match.params.category_name) {
                    // console.log(matchFromUrl, match.params.category_name)
                    seturlparams(`${absolute_url}/subcategory/${match.params.category_name}?limit=10&skip=0`)
                    setmatchFromUrl(match.params.category_name)
                    const menuToggler = document.getElementsByClassName("toggler")
                    // console.log(menuToggler[0])
                    if (menuToggler.length > 0) { menuToggler[0].checked = false }
                    return
                }
                const response = await fetch(url, params)
                const data = await response.json()
                // console.log(data, "ajshfkj")
                if (data.products) {
                    setproductapi(data.products)
                    setcategoryapi(data.categoryWithSubCategory)
                    setpageno(data.pageno)
                    setnexturl((prevstate) => {
                        if (data.nextskip) {
                            return `${absolute_url}/subcategory/${match.params.category_name}?limit=10&skip=${data.nextskip}`
                        } else {
                            return null
                        }
                    })
                    setprevurl((prevstate) => {
                        if (data.prevskip || data.prevskip == 0) {
                            return `${absolute_url}/subcategory/${match.params.category_name}?limit=10&skip=${data.prevskip}`
                        } else {
                            return null
                        }
                    })
                    setcartvalue((prevstate) => data.cartvalue ? data.cartvalue : prevstate)
                }
                //         // setcategoryapi(response.data.categories.dictionary)
                //         // setcartvalue(response.data.cart)
            } catch (error) {
                return
            }
        }
        apiCall()
        // axios.get(`${urlparams}`, {
        //     headers: {
        //         'Authorization':`${getCookie('token')}`,
        //         'X-CSRFToken': csrftoken,
        //         // "Cookie":document.cookie
        //         //withCredentials: true
        //     },
        // })
        //     .then((response) => {
        //         //console.log(response.data, "in cat")
        //         //console.log(response.data.results.products[0].category)
        //         setproductapi(response.data.results.products)
        //         // setcategoryapi(JSON.parse(response.data.results.categories))
        //         setcategoryapi(response.data.results.categories.dictionary)
        //         setcartvalue(response.data.results.cart)
        //         setprevurl(response.data.previous)
        //         setnexturl(response.data.next)
        //         if (response.data.next) {
        //             const reg = /offset=[0-9]+/i
        //             const reg_pageno = /[0-9]/i
        //             let match_offset_page_value = 1
        //             try {
        //             match_offset_page_value = parseInt(reg_pageno.exec(reg.exec(response.data.next)[0])[0])
        //         } catch (error) {
        //             return
        //         }
        //         setpageno(match_offset_page_value)
        //     } else if (response.data.next === null && response.data.previous === null) {
        //         setpageno(1)
        //     }
        //     else {
        //         setpageno((prev) => prev + 1)
        //     }
        // })
        // .catch((error) => {
        //     console.log(error)
        // })
        return () => { }
    }, [match.params.category_name, urlparams])
    const HandleUrlParams = (params) => {
        //console.log(params, "clicked")
        seturlparams(params)
    }
    let category_name
    try {
        //console.log(productapi[0])
        category_name = productapi[0].category
    } catch (error) {
        return null
    }
    return (
        <>
            <HeaderComponent categoryapi={categoryapi} cartvalue={cartvalue} />
            {productapi &&
                <ul className="breadcrumb">
                    <li key="0"><Link to="/">Home</Link></li>
                    <li key="1"><Link to={`/category_react/${productapi[0].category}`}>{productapi[0].category}</Link></li>
                    <li key="2">{match.params.category_name}</li>
                </ul>
            }
            <CategoryList productapi={productapi} />
            <PaginationComponent prevurl={prevurl} nexturl={nexturl} pageno={pageno} clickfunc={HandleUrlParams} />
            <FooterComponent />
        </>
    )
}

export default React.memo(SubCategoryPage)
