import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

export default function Layout() {
  return (
    <div>
      <Header/>
    <main className=' overflow-auto'>
      
      <div className=' py-4 12'>
        <Outlet/>
      </div>
      
      
    </main>
    <footer>
      <Footer />
    </footer>
    </div>
  )
}
