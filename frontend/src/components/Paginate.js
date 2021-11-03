import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function Paginate({pages, page, keyword='', isAdmin=false}) {

    if(keyword){
        keyword = keyword.split('?keyword=')[1].split('&')[0]
    }
    // console.log('keyword: ',keyword)
    // console.log('array component',[...Array(pages).keys()])
    return (pages > 0 && (
        <Pagination size='lg'>
            {/* <Pagination.Prev /> */}
            {
            [...Array(pages).keys()].map((x) => (
                <LinkContainer key={x + 1}
                to={!isAdmin ?
                    `/?keyword=${keyword}&page=${x + 1}`
                    : `/admin/productlist/?keyword=${keyword}&page=${x + 1}`
                }
                >
                <Pagination.Item active={x + 1 == page}> <strong> {x + 1} </strong> </Pagination.Item>
                </LinkContainer>
            ))}
            {/* <Pagination.Next /> */}
        </Pagination>
    
         
    )
)
}

export default Paginate
