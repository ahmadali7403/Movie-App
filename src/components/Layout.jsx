import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import PageContainer from './PageContainer'

const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-netflix-black text-white">
      <Navbar />
      <PageContainer>
        <Outlet />
      </PageContainer>
    </div>
  )
}

export default Layout
