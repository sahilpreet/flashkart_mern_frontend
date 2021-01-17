import React, { useEffect } from 'react'
import {Link} from 'react-router-dom'
import absolute_url from "./AbsoluteUrl"

function BoxContainer({categoryapi,start}){
    return (
        <div className="box-container">
            {Object.entries(categoryapi).map(([key, value], index) => {
                return (
                    index >= start && index < start+9 &&
                    <Link className="cat-link" key={index} to={`category_react/${key}`}>
                        <div className="boxes">
                            <div className="cat-img">
                                <img src={`${absolute_url}/product/${value[0]._id}/image`} alt={`${key}`} />
                            </div>
                            <div className="cat-prod">
                                <span>{key}</span>
                            </div>
                        </div>
                    </Link>
                )
            })
            }
        </div>
    )
}

function BoxesContainer({ categoryapi }) {
    useEffect(() => {
        return () => { }
    }, [])
    return (
        <div className="boxes-container">
            <BoxContainer categoryapi={categoryapi} start={0}/>
            <BoxContainer categoryapi={categoryapi} start={9}/>
        </div>
    )
}

export default React.memo(BoxesContainer)
