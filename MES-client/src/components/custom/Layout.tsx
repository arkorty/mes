import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

export default function Layout() {
  return (
    <div>
      <Header/>
    <main className=' py-12'>
      
      <div className=' py-12'>
        <Outlet/>
      </div>
      
      
    </main>
    <footer>
      <Footer />
    </footer>
    </div>
  )
}
