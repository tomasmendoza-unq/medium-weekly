import './AboutUs.css'

const AboutUs = () => {
    return (
        <div className="containerAboutUs">
            <div className="contentAboutUs">
                <h2 className="title2">Acerca de nosotros</h2>
                <div className='textAboutUs'>
                    <p>Medium Weekly nació como un experimento. Un “¿y si hacemos una plataforma tipo Medium desde cero?” y nos mandamos. No fue con la idea de hacer el próximo unicornio ni nada por el estilo. Solo queríamos mejorar como desarrolladores, practicar lo que veníamos aprendiendo y hacer algo que se vea bien.
                    </p>
                    <p>Fue nuestra forma de salir un poco del tutorial eterno y poner las manos en código real: frontend, backend, autenticación, base de datos, cookies, CORS que no te deja dormir… todo eso. Aprendimos muchísimo en el camino y eso ya hizo que valiera la pena.
                    </p>
                    <p>No sabemos si esto va a seguir creciendo o si se va a quedar como está, pero lo importante es que lo hicimos. Está online, funciona, y lo hicimos nosotros. Eso ya es un gol.
                    </p>
                    <p>Gracias por pasar y darte una vuelta por lo que armamos.</p>
                    <p>Desarrollado por: <a href='https://lucianobarberis.com.ar/' target='_blank'>Luciano Barberis (frontend)</a> y <a href='https://www.linkedin.com/in/tomas-ismael-mendoza-30b141258/' target='_blank'>Tomás Mendoza (backend)</a></p>
                </div>
                <img src="./img/bannerMedium.png" alt="" />
            </div>
        </div>
    )
}

export default AboutUs
