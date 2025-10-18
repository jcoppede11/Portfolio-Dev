import { motion } from "framer-motion";
import { TEXT } from "../../config/globalStyles";

const container = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};

type ContactItem = {
    label: string;
    ariaLabel: string;
    href: string;
    handle: string;
};

export default function ContactItems({ items }: { items: ContactItem[] }) {
    return (
        <motion.ul
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.3 }}
            className={`${TEXT.TEXT_DEFAULT } leading-relaxed text-balance text-sm lg:text-base list-disc space-y-3 pl-14`}
        >
            {items.map((item, i) => (
                <motion.li
                    key={i}
                    custom={i}
                    variants={{
                        hidden: { opacity: 0, y: 10 },
                        show: (i: number) => ({
                            opacity: 1,
                            y: 0,
                            transition: {
                                duration: 0.6,
                                delay: i * 0.2,
                                ease: "easeOut",
                            },
                        }),
                    }}
                >
                    {item.label}:{" "}
                    <a
                        href={item.href}
                        aria-label={item.ariaLabel}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                    >
                        {item.handle}
                    </a>
                </motion.li>
            ))}
        </motion.ul>
    );
}
