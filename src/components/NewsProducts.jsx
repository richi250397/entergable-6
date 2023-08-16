import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function NewsProducts({data}) {


  return (
    <Card>
      {
          data.images && (

            <Card.Img variant="top" src={data.images[0].url} style={{height: 140, objectFit: 'contain'}}/>
          )}
      <Card.Body>
        <Card.Title>{data?.title}</Card.Title>
        {/* <Card.Text>
          {data?.description}
        </Card.Text> */}
        <Button variant="primary" as={Link} to={`/news/${data.id}`}>Ver Detalle</Button>
      </Card.Body>
    </Card>
  );
}

export default NewsProducts;