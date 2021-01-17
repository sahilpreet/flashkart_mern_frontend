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

function SearchPage(props) {
    const [urlparams, seturlparams] = useState(`${absolute_url}/search${props.location.search}`)
    // seturlparams(`http://127.0.0.1:8000/api/search/${locationsearch}`)
    const [categoryapi, setcategoryapi] = useState('')
    const [cartvalue, setcartvalue] = useState(0)
    const [pageno, setpageno] = useState(1)
    const [prevurl, setprevurl] = useState('')
    const [nexturl, setnexturl] = useState('')
    const [productapi, setproductapi] = useState([])
    const [matchFromUrl, setmatchFromUrl] = useState(`${props.location.search}`)
    useEffect(() => {
        // console.log(urlparams,props.location.search.replace("?", ""))
        // console.log(urlparams,props.location.search)
        // console.log(matchFromUrl, props.location.search)
        if (props.location.search.replace("?", "")) {
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
                    if (matchFromUrl !== props.location.search) {
                        // console.log(matchFromUrl, props.location.search)
                        seturlparams(`${absolute_url}/search${props.location.search}&limit=10&skip=0`)
                        setmatchFromUrl(props.location.search)
                        return
                    }
                    const response = await fetch(url, params)
                    const data = await response.json()
                    // console.log(data)
                    if (data.products) {
                        setproductapi(data.products)
                        setcategoryapi(data.categoryWithSubCategory)
                        setpageno(data.pageno)
                        setnexturl((prevstate) => {
                            if (data.nextskip) {
                                return `${absolute_url}/search${props.location.search}&limit=10&skip=${data.nextskip}`
                            } else {
                                return null
                            }
                        })
                        setprevurl((prevstate) => {
                            if (data.prevskip || data.prevskip == 0) {
                                return `${absolute_url}/search${props.location.search}&limit=10&skip=${data.prevskip}`
                            } else {
                                return null
                            }
                        })
                        setcartvalue((prevstate)=>data.cartvalue?data.cartvalue:prevstate)
                    }
                } catch (error) {
                    return
                }
            }
            apiCall()
            // axios.get(`${urlparams}`, {
            //     headers: {
            //         'Authorization': `${getCookie('token')}`,
            //         'X-CSRFToken': csrftoken,
            //         // "Cookie":document.cookie
            //         //withCredentials: true
            //     },
            // }).then((response) => {
            //     //console.log(response.data, "in cat")
            //     setproductapi(response.data.results.products)
            //     // setcategoryapi(JSON.parse(response.data.results.categories))
            //     setcategoryapi(response.data.results.categories.dictionary)
            //     setcartvalue(response.data.results.cart)
            //     setprevurl(response.data.previous)
            //     setnexturl(response.data.next)
            //     if (response.data.next) {
            //         const reg = /offset=[0-9]+/i
            //         const reg_pageno = /[0-9]/i
            //         let match_offset_page_value = 1
            //         try {
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
            //     .catch((error) => {
            //         console.log(error)
            //     })
        }
        return () => { }
        //use props carefully with urlparams
    }, [props.location,urlparams])
    const HandleUrlParams = (params) => {
        // console.log(params, "clicked")
        seturlparams(params)
    }
    return (
        <>
            <HeaderComponent categoryapi={categoryapi} cartvalue={cartvalue} />
            {productapi &&
                <ul className="breadcrumb">
                    <li key="0"><Link to="/">Home</Link></li>
                    <li key="1">Search</li>
                </ul>
            }
            <CategoryList productapi={productapi} />
            <PaginationComponent prevurl={prevurl} nexturl={nexturl} pageno={pageno} clickfunc={HandleUrlParams} />
            <FooterComponent />
        </>
    )
}

export default React.memo(SearchPage)


