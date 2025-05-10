// src/components/AnimatedLetters.tsx
import { motion } from "framer-motion";
import { TEXT } from "../../config/globalStyles";

const container = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const word: import("framer-motion").Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
};

export default function AnimatedParagraphByLines({ 
    lines,
    imageSrc,
    imageAlt = "Profile image",
}: {
    lines: string[];
    imageSrc: string;
    imageAlt?: string;
}) {
    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col lg:flex-row items-start gap-9"
        >
            <div
                className={`${TEXT.TEXT_DEFAULT} leading-relaxed text-balance text-sm lg:text-base lg:leading-loose`}
            >
                {lines.map((line, i) => (
                    <motion.span key={i} variants={word} className="block">
                        {line}
                    </motion.span>
                ))}
            </div>

            <motion.img
                src={imageSrc}
                alt={imageAlt}
                variants={word} 
                className="w-full h-auto lg:w-64 lg:h-64 rounded-3xl object-cover shadow-lg shadow-black/20 "
            />
        </motion.div>
    );

}
