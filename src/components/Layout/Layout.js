import React, {Suspense, lazy} from 'react'
import Routes from '../../routes/Routers'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import '../../styles/wrapper__layout.css'
import { useSelector } from 'react-redux'
import { AppProvider } from '../../Context/AppProvider'

const Carts = lazy(() => import('../UI/cart/Carts'));

const Layout = () => {

  const showCart = useSelector((state) => state.cartUi.cartIsVisible);
  return (
    
    <div className='wrapper__layout '>
      <AppProvider>
          <Header/>
          <Suspense fallback={<p>Loading......</p>}>
            {
              showCart && <Carts />
            }
          </Suspense>
          <div>
            <Routes />
          </div>
          <Footer />
      </AppProvider>
    </div>
  )
}

export default Layout