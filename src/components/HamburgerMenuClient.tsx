import { useState, useEffect } from 'react';
import { NavLinks } from './ui/text/NavLinks';

export interface HamburgerMenuClientProps {
    navLinks: {
        href: string;
        label: string
    }[];
}

const HamburgerMenuClient = ({ navLinks }: HamburgerMenuClientProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    // Bloquea de scroll en el menu al estar abierto
    useEffect(() => {
        const body = document.body;

        if (isOpen) {
            body.classList.add('overflow-hidden');
        } else {
            body.classList.remove('overflow-hidden');
        }

        return () => {
            body.classList.remove('overflow-hidden');
        };
    }, [isOpen]);

    return (
        <div className="relative">
            <button
                className="p-2 text-gray-700 focus:outline-none"
                onClick={toggleMenu}
                aria-label="Abrir menú"
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d={
                            isOpen
                                ? 'M6 18L18 6M6 6l12 12'
                                : 'M4 6h16M4 12h16M4 18h16'
                        }
                    ></path>
                </svg>
            </button>

            <div className={`fixed top-0 left-0 w-full h-screen z-50 bg-[#f6f7f9]  transition-all duration-300 ease-in-out 
                    overflow-y-auto ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 pointer-events-none'}`}>

                <div className="h-screen flex flex-col justify-between px-6 pt-12 pb-12 relative">
                    <button
                        className="absolute top-4 right-4 p-2 text-gray-700 focus:outline-none"
                        onClick={toggleMenu}
                        aria-label="Cerrar menú"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>

                    <ul className="flex flex-col gap-8 text-center">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <NavLinks href={link.href} label={link.label} onClick={toggleMenu} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default HamburgerMenuClient;