import './App.css'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Favorites from './pages/Favorites'
import NewsDetail from './pages/NewsDetail'
import AppNav from './components/AppNav'
import NewsProducts from './components/NewsProducts'
import Container from 'react-bootstrap/Container';
import Loader from './components/Loader'
import { useSelector } from 'react-redux'
import ProtectedRoutes from './components/ProtectedRoutes'

function App() {

  //! SetUp del proyecto

  const isLoading = useSelector( state => state.isLoading)

  return (
    <HashRouter>
      <AppNav/>
      <Container>
      <Routes>
        <Route path='/' element={ <Home/> } />
        <Route path='/login' element={ <Login/> } />
        
        <Route element={<ProtectedRoutes/>}>
          <Route path='/news/:id' element={ <NewsDetail/> } />
          <Route path='/favorites' element={ <Favorites/> } />
        </Route>
      </Routes>
        </Container>

        { isLoading && <Loader/>}
    </HashRouter>
  )
}

export default App
