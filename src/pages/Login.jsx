import { useForm } from 'react-hook-form';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../style/form.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const {register, handleSubmit} = useForm()
    const navigate = useNavigate()

    const submit = data => {
      // console.log(data)
      axios.post('https://e-commerce-api-v2.academlo.tech/api/v1/users/login', data)
      .then(resp => {
        localStorage.setItem("token", resp.data.token)
        navigate('/')
      })
      .catch(error => {console.error(error)
        if(error.response.status === 401) {
          alert('El correo o la contraseña son incorrectos')
        }
      })
    }

    return(
        <main className='form-container'>
      <div className='credential'>
        <h2>Credencial</h2>
        
        <p>santiagoandresh022@gmail.com</p>
        <p>12345678</p>
      </div>
            <Form className='' onSubmit={handleSubmit(submit)}>
              <h1>Login</h1>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Correo electrónico</Form.Label>
        <Form.Control type="email" placeholder="Enter email" {...register('email')} />
        <Form.Text className="text-muted">
          No compartas esta información
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Contraseña: </Form.Label>
        <Form.Control type="password" placeholder="Password" {...register('password')} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Iniciar sesion
      </Button>
    </Form>
        </main>
    )
}

export default Login