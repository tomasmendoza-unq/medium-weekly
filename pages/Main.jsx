import SideBar from '../components/Main/SideBar/SideBar'
import Bloglist from '../components/Main/Bloglist/Bloglist'
import { Link } from 'react-router-dom'

const Main = () => {
    const userName = sessionStorage.getItem("user")

    return (
        <main>
            <section className='mainContent'>
                {sessionStorage.getItem("logged") === null ? 
                            <div className='msgMain'>
                                <p className='textMain'>Bienvenido a Medium Weekly, entra para empezar a leer!</p>
                                <Link to="/login" className='btnLink'>Entrar</Link>
                            </div>
                            : 
                            <h2 className="class2">Bienvenido {userName}</h2>}
                <Bloglist/>
            </section>
        </main>
    )
}

export default Main
