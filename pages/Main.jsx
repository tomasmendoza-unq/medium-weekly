import Notifications from '../components/Main/Notifications/Notifications'
import Bloglist from '../components/Main/Bloglist/Bloglist'

const Main = () => {
    return (
        <main>
            <section className='mainContent'>
                <Bloglist/>
                <Notifications/>
            </section>
        </main>
    )
}

export default Main
