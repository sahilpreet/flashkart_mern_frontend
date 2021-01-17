import React from "react";

function PaginationComponent({ prevurl, nexturl, pageno, clickfunc }) {
    return (
        <div className="pagination">
            <span className="step-links">
                {prevurl &&
                    <>
                        <span className="prev">
                            <button className="prev-link" onClick={() => clickfunc(prevurl)}>&#x2039;</button>
                        </span>
                        <span className="prev-page">
                            {pageno - 1}
                        </span>
                    </>
                }
                <span className="current">
                    {pageno}
                </span>
                {nexturl &&
                    <>
                        <span className="next-page" >
                            {pageno + 1}
                        </span>
                        <span className="next">
                            <button className="next-link" onClick={() => clickfunc(nexturl)}>&#x203a;</button>
                        </span>
                    </>
                }
            </span>
        </div>
    )
}

export default React.memo(PaginationComponent)