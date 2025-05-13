"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "What is Udinmo Interactive Hosting?",
    answer:
      "Udinmo Interactive provides fast, scalable, and secure web hosting for developers, gamers, and entrepreneurs.",
  },
  {
    question: "How do I upload my website?",
    answer:
      "You can use our web uploader, FTP, or GitHub integration to upload your HTML/CSS/JS files seamlessly.",
  },
  {
    question: "Can I use my own domain?",
    answer:
      "Yes! You can connect your own domain or use a free udinmo.com subdomain.",
  },
  {
    question: "Do you support WordPress?",
    answer:
      "Absolutely. We provide 1-click WordPress installs and optimized performance for WP sites.",
  },
  {
    question: "Is there a free plan available?",
    answer:
      "Yes, we offer a free tier to get started with limited bandwidth and storage.",
  },
];

function FAQItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: { question: string; answer: string };
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen]);

  return (
    <div className="border-b border-neutral-800">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center py-6 text-left text-lg font-medium hover:text-slate-200"
      >
        <span>{faq.question}</span>
        <span className="text-xl">{isOpen ? "−" : "+"}</span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div
              ref={contentRef}
              className="pb-6 pt-2 text-slate-400 text-sm"
            >
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-[#08090a] text-white py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4 border-t border-neutral-800">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              isOpen={index === openIndex}
              onToggle={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
