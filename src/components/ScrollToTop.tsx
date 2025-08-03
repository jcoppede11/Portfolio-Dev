import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.scrollY > 300);
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);
    
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <button
            aria-label="Ir arriba"
            className={`fixed cursor-pointer bottom-5 right-5 p-3 rounded-full bg-[#23272f] text-[#f6f7f9] shadow-lg transition-opacity duration-300 ${
                isVisible ? "opacity-100" : "opacity-0"
            }`}
            onClick={scrollToTop}
        >
            <ArrowUp size={24} />
        </button>
    );
};

export default ScrollToTop;
