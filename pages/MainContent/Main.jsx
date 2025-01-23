import Bloglist from '../../components/Main/Bloglist/Bloglist'
import { Link } from 'react-router-dom'
import './Main.css'

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
                            <h2 className="class2 title2">Bienvenido/a <span className='ital'>{userName}</span></h2>}
                <Bloglist/>
            </section>
        </main>
    )
}

export default Main
