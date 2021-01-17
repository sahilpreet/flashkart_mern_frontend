import React, { useEffect, useState } from 'react'
import { Link,useHistory } from 'react-router-dom'
import getCookie from "./GetCookie";
import absolute_url from "./AbsoluteUrl"


function ListSubcategory(props) {
    //console.log(props.subcatlist)
    return (
        <ul className="sub-category" >
            {props.subcatlist.map((e, index) => index !== 0 ? <li key={index}><Link to={`/sub_category_react/${e}`}>{e}</Link></li> : '')
            }
            <li><Link to={`/category_react/${props.category}`}>View All</Link></li>
        </ul>
    )
}

const ListCategory = React.forwardRef((props, ref) => {
    const [clickcategory, setclickcategory] = useState('')
    const [token, settoken] = useState(false)
    const handlecategoryClck = (key) => {
        // console.log(key)
        setclickcategory((prevState) => prevState === key ? '' : key)
    }
    const HandleLogout = async () => {
        try {
            const url=`${absolute_url}/logout`
            const params = {
                method: "post",
                // body: formdata,
                headers: {
                    'Accept': 'application/json',
                    "Authorization": `${getCookie('token')}`,
                },
            }
            const response = await fetch(url, params)
            const data = await response.json()
            // console.log(data,"ajshfkj")
            if(data.tokenloggedout){
                // console.log(data.tokenloggedout==getCookie('token'))
                document.cookie = `token=`
                settoken((prevState) => !prevState)
            }
        }
        catch(error){
            console.log(error)
        }
        // forceUpdate()
    }
    // console.log(getCookie("token"))
    return (
        <ul>
            <li key="0"><Link className="menu-links" to="/">Home</Link></li>
            {getCookie('token') ? <li key="1"><Link className="menu-links" to="/" onClick={HandleLogout}>logout</Link></li> : <li key="1"><Link className="menu-links" to="/register_react">Sign Up</Link></li>}
            <li key="2">All Categories</li>
            {
                Object.entries(props.categoryapi).map(([key, value], index) =>
                    <li key={index + 3} className="category" onClick={(e) => handlecategoryClck(key)} >
                        {key.slice(0,40)}
                        {clickcategory === key &&
                            <ListSubcategory subcatlist={value} category={key} />
                        }
                    </li>,
                )
            }
        </ul>
    )
})

function HeaderComponent({ categoryapi, cartvalue }) {
    const x = window.matchMedia("(max-width: 650px)")
    const [searchvalue, setsearchvalue] = useState({ "searchvalue": "" })
    const [smallscreenmatch, setsmallscreenmatch] = useState(x.matches)
    const [namedisplay, setnamedisplay] = useState(true)
    const history=useHistory()
    useEffect(() => {
    }, [categoryapi, cartvalue, namedisplay, smallscreenmatch])
    //donot pass true false in sub category pass the key(dict key ) of corresponding and compare for short
    const HandleSearchChange = (event) => {
        const name = event.target.name, value = event.target.value
        setsearchvalue((prevState) => {
            return {
                [name]: value,
            }
        })
    }
    const HandleSearchSubmit = (event) => {
        event.preventDefault()
        // console.log(namedisplay,smallscreenmatch)
        if (namedisplay && smallscreenmatch) {
            // console.log(smallscreenmatch)
            setnamedisplay(false)
            setsmallscreenmatch((prevState) => !prevState)
        } else {
            // console.log(searchvalue.searchvalue)
            history.push({
                pathname: '/search_react',
                search: searchvalue.searchvalue,
                //can also pass additional values
                searchvalue: searchvalue.searchvalue,
            })
        }
    }
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
            {namedisplay && <h1 className="comp-name">Flashkart</h1>}
            <form onSubmit={HandleSearchSubmit} className="product-search">
                {!smallscreenmatch && <input className="search-text" type="text" name="searchvalue" id="" placeholder="Search" value={searchvalue.searchvalue} onChange={HandleSearchChange} />}
                <div className="search-btn">
                    <Link to="/" className="search-symbol">&#9906;</Link>
                    <input className="search-symbol-hide" type="submit" value="&#9906;" />
                </div>
            </form>
            <Link className="cart" to="/cart_react">
                <span>Cart(<span className="cart-value">{cartvalue}</span>)</span>
            </Link>
        </header>
    )
}

export default React.memo(HeaderComponent)
