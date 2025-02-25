import { useRef } from "react";
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import './FilterByTags.css'
import { Link } from "react-router-dom";

const FilterByTags = ({ idParam }) => {
    const scrollRef = useRef(null);
    const categorias = [ "DESARROLLO_WEB", "CIBERSEGURIDAD", "ECONOMIA_Y_FINANZAS", "SALUD_Y_BIENESTAR", "PSICOLOGIA_Y_DESARROLLO_PERSONAL", "CIENCIA_Y_TECNOLOGIA", "HISTORIA_Y_CULTURA", "LITERATURA_Y_ESCRITURA_CREATIVA", "CINE_Y_SERIES", "MUSICA_Y_ENTRETENIMIENTO", "VIAJES_Y_TURISMO", "FOTOGRAFIA_Y_ARTE_DIGITAL", "MEDIO_AMBIENTE_Y_SOSTENIBILIDAD", "DEPORTES_Y_FITNESS", "EMPRENDIMIENTO_Y_NEGOCIOS"]
    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft -= 200; // Ajusta el desplazamiento
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft += 200;
        }
    };

    return (
        <div className="scroll-container">
            <button className="scroll-btn left" onClick={scrollLeft}>
                <FaAngleLeft />
            </button>
            <div className="scroll-content" ref={scrollRef}>
                <Link to='/'><span>Todos Los Blogs</span></Link>
                {categorias.map((e)=>{
                    return(
                    <Link key={e} to={`/filter/${e}`}>
                        <span className={`${idParam === e ? "tagActive" : ""} tagLink`}>{e.toLowerCase().replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}</span>
                    </Link>)
                })}
            </div>
            <button className="scroll-btn right" onClick={scrollRight}>
                <FaAngleRight />
            </button>
        </div>
    );
};

export default FilterByTags;
