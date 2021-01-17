import React from 'react'
import {Link} from 'react-router-dom'
import absolute_url from "./AbsoluteUrl"

// <a className="product_view" href="{{product.get_absolute_url}}"><span>Product View</span></a>
function ListCards({ products }) {
    return (
        products.map((e,index) => {
            return (
                <div key={index} className="cards">
                    <div className="cards-image">
                        <img src={`${absolute_url}/product/${e._id}/image`} alt={`${e.name}`}/>
                    </div>
                    <div className="product-spec">
                        <span className="product-name">{(`${e.name}`).slice(0,35)}...</span>
                        <span className="product-price">$ {e.discountedprice}</span>
                    </div>
                    <Link to={`/product_react/${e._id}`} className="product_view"><span>Product View</span></Link>
                </div>
            )
        })
    )
}

function CarouselCards({ products }) {
    const scrollRef=React.createRef()
    const moveCardsLeft=(e)=>{
        scrollRef.current.scrollBy(-window.innerWidth / 1.3, 0)
        //e.target.parentNode.children[0].scrollBy(-window.innerWidth / 1.3, 0)
    }
    const moveCardsRight=(e)=>{
        scrollRef.current.scrollBy(window.innerWidth / 1.3, 0)
        //e.target.parentNode.children[0].scrollBy(-window.innerWidth / 1.3, 0)
    }
    return (
        <div className="container-cards-slides">
            <div className="container-cards" ref={scrollRef}>
                {products &&
                    <ListCards products={products} />
                }
            </div>
            <div className="prev" onClick={moveCardsLeft}>
                &#x2039;
            </div>
            <div className="next" onClick={moveCardsRight}>
                &#x203a;
            </div>
        </div>
    )
}

export default React.memo(CarouselCards)
