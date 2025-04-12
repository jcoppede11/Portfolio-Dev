import { TEXT } from '../../../config/globalStyles';

interface NavLinksProps {
    href: string;
    label: string;
    onClick?: () => void;
}

export const NavLinks = ({ href, label, onClick }: NavLinksProps) => {
    return (
        <a href={href} 
           className={`${TEXT.TEXT_DEFAULT} text-[14px] lg:text-[16px]`}
           onClick={onClick}
           >
            {label}
        </a>
    );
};
