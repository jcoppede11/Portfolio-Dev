// src/components/AnimatedLetters.tsx
import { motion } from "framer-motion";
import { COLORS } from "../../config/globalStyles";

const container = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const word: import("framer-motion").Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
};

export default function AnimatedParagraphByLines({ lines }: { lines: string[] }) {
    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className={`${COLORS.PARAGRAPH_BIOGRAPHY_GRAY_TEXT}`}
        >
            {lines.map((line, i) => (
                <motion.span key={i} variants={word}>
                    {line}
                </motion.span>
            ))}
        </motion.div>
    );
}
