import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NewsProducts from '../components/NewsProducts';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getNewsThunk, filterNewsByCategoryThunk } from '../store/slices/news';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import '../style/main.css'

const Home = () => {

    const news = useSelector(state => state.news)
    const dispatch = useDispatch()
    const [categories, setCategories] = useState([])
    const [value, setValue] = useState('')
    
    useEffect(() => {
        dispatch(getNewsThunk())
        getCategories()
    }, [])

    const getCategories = () => {
        axios.get('https://e-commerce-api-v2.academlo.tech/api/v1/categories')
        .then(resp => setCategories(resp.data))
        .catch(error => console.error(error))
    }

    const submit = (e) => {
        e.preventDefault()

        axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products?title=${value}`)
        .then(resp => setValue(resp.data))
        .catch(error => console.error(error))
    }

    return(
        <main className='home-container'>
                <Row>
                    <Col md={4} lg={3}>
                    <ListGroup>
                        {
                            categories?.map(category => (
                            <ListGroup.Item 
                            key={category.id} 
                            onClick={() => dispatch(filterNewsByCategoryThunk(category.id))}>
                                {category.name}
                            </ListGroup.Item> 
                            ))
                        }
                    </ListGroup>
                    </Col>

                    <Col md={8} lg={9} >Listado de Productos
                    <Row>
                    <Col>
                        <InputGroup 
                        className="mb-3">
                        <Form.Control onSubmit={(e) => submit(e)}
                        placeholder="Buscar por Categoria"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        />
                        <Button type='submit' onClick={submit}>Buscar</Button>
                    </InputGroup>

                    </Col>
                    </Row>
                    <Row xs={1} md={2} lg={3}>
                        {
                            news?.map( item => (
                                <Col key={item.id}>
                                <NewsProducts 
                                data={item}
                                />
                                </Col>
                            ))
                        }
                    </Row>
                    </Col>
                </Row>
        </main>
    )
}

export default Home