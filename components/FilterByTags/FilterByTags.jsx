import { useRef } from "react";
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import './FilterByTags.css'

const ScrollBar = () => {
    const scrollRef = useRef(null);

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft -= 100; // Ajusta el desplazamiento
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft += 100;
        }
    };

    return (
        <div className="scroll-container">
            <button className="scroll-btn left" onClick={scrollLeft}>
                <FaAngleLeft />
            </button>
            <div className="scroll-content" ref={scrollRef}>
                <span>Coding</span>
                <span>Coding</span>
                <span>Coding</span>
                <span>Coding</span>
                <span>Coding</span>
                <span>Coding</span>
                <span>Coding</span>
                <span>Coding</span>
            </div>
            <button className="scroll-btn right" onClick={scrollRight}>
                <FaAngleRight />
            </button>
        </div>
    );
};

export default ScrollBar;