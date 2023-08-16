import { Link, useParams } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Carousel from 'react-bootstrap/Carousel';
import { useSelector, useDispatch } from "react-redux";
import { filterNewsByCategoryThunk } from '../store/slices/news'
import { addProductThunk } from "../store/slices/favorites";
import '../style/main.css'


const NewsDetail = () => {

    const {id} = useParams()
    const [newsDetail, setNewsDetail] = useState({})
    const allNews =  useSelector( state => state.news )

    const dispatch = useDispatch()

    useEffect(() => {
        getDetail()
    }, [id])

    const getDetail = () => {
        axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}`)
        .then(resp => {
          setNewsDetail(resp.data)
          dispatch(filterNewsByCategoryThunk(resp.data.category.id))
        })
        .catch(error => console.error(error))
    }

    const [quantity, setQuantity] = useState(1)

    const decrement = () => {
      if(quantity > 1) {
        setQuantity(quantity -1)
      }
    }

    const increment = () => {
      setQuantity(quantity +1)
    }

    const addProduct = () => {
      const data = {
        quantity: quantity,
        productId: newsDetail.id
      }
      dispatch(addProductThunk(data))
    }
    
    return(
      <main className="main-detail">
            <h1>{newsDetail.title}</h1>
            <p>{newsDetail.category?.name}</p>
            <p>By: {newsDetail.brand}</p>
            <p>{newsDetail.createdAt}</p>

            <Row>
            <Col lg={9}>
              <div className="carousel-contain">
        {
          newsDetail.images && (
              
              <Carousel>
      <Carousel.Item>
        <div className="slider-image">
          <img 
          className="d-block w-100"
          src={newsDetail.images[0].url}
          alt="First slide"
          />
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="slider-image">
        <img
          className="d-block w-100"
          src={newsDetail.images[1].url}
          alt="Second slide"
          />
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="slider-image">
        <img
          className="d-block w-100"
          src={newsDetail.images[2].url}
          alt="Third slide"
        />
        </div>
      </Carousel.Item>
    </Carousel>
          )}
              <div className="div-description">
                <p className="text-muted">{newsDetail.description}</p>
                
                <div className="buttons-container">
          <div className="div-buttons">
            <button onClick={decrement}>-</button>
            {quantity}
            <button onClick={increment}>+</button>
          </div>
            <Button onClick={addProduct} variant="dark">Agregar al carrito</Button>
          </div>
              </div>
          </div>
                </Col>

                <Col>
                <h3>Productos relacionados</h3>
                <ListGroup>
                  {
                    allNews.map( news => (

                      <ListGroup.Item as={Link} to={`/news/${news.id}`} 
                      key={news.id}
                      onClick={() => {
                        dispatch(filterNewsByCategoryThunk(news.id))
                      }}>{news.brand}</ListGroup.Item>
                      ))
                    }          
                </ListGroup> 
                </Col>
            </Row>
        </main>
    )
}

export default NewsDetail