import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Pagination } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import { LinkContainer } from 'react-router-bootstrap'
import { listProducts } from '../actions/productAction'


function HomeScreen({history}) {
   const dispatch = useDispatch()
   const productList = useSelector(state => state.productList)
   const {error, loading, products, page,pages} = productList

   let keyword = history.location.search
  
//    console.log(keyword)
    // console.log("pages and page are: ",pages,page)
    useEffect(()=>{
      dispatch(listProducts(keyword))

    }, [dispatch,keyword])
    
    return (
        <div>
            {!keyword && <ProductCarousel />}
            
            <h1>Latest Farm products</h1>

            {loading ? <Loader />
                : error ?  <Message variant='warning'> <center>Product you search is not there</center></Message>
                :
                <div>
                <Row>
                
                {products.map(product =>(
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                    
                    </Col>
                ))}
            </Row>
            <Paginate page={page} pages={pages} keyword={keyword} />
           
            </div>
        }

            
        </div>
    )
}

export default HomeScreen
