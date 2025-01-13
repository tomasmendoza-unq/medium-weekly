import Bloglist from '../components/Main/Bloglist/Bloglist'
import Footer from '../components/Footer/Footer'
import Navbar from '../components/Header/Navbar'
import Notifications from '../components/Main/Notifications/Notifications'
import './App.css'

function App() {
  return (
    <div className='app'>
      <header>
        <Navbar/>
      </header>
      <main>
        <Bloglist/>
        <Notifications/>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default App
