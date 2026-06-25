"use client";
import React, { useState, useRef, useLayoutEffect } from "react";

const defaultFaqData = [
  {
    question: "سوال اول شما؟",
    answer:
      "پاسخ سوال اول اینجا قرار می‌گیرد. این متن می‌تواند طولانی باشد و به صورت داینامیک ارتفاع آن تغییر کند.",
  },
  {
    question: "سوال دوم شما؟",
    answer: "پاسخ سوال دوم اینجا قرار می‌گیرد.",
  },
  {
    question: "سوال سوم شما؟",
    answer:
      "پاسخ سوال سوم اینجا قرار می‌گیرد. می‌توانید هر تعداد سوال و پاسخ که می‌خواهید اضافه کنید.",
  },
];

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqData?: FAQItem[];
  title?: string;
}

const FAQSection: React.FC<FAQSectionProps> = ({
  faqData = defaultFaqData,
  title = "سوالات متداول",
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [heights, setHeights] = useState<number[]>([]);

  const toggleFAQ = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  useLayoutEffect(() => {
    const newHeights = contentRefs.current.map((el) => el?.scrollHeight || 0);
    setHeights(newHeights);
  }, [faqData, activeIndex]);

  return (
    <section className="FAQSection">
      <h2 className="SectionTitle">{title}</h2>
      <div className="FAQWrapper">
        {faqData.map((item, index) => {
          const isActive = activeIndex === index;
          const height = heights[index] || 0;

          return (
            <div
              key={index}
              className={`FAQItem${isActive ? " active" : ""}`}
            >
              <button
                className="FAQButton"
                onClick={() => toggleFAQ(index)}
              >
                <span>{item.question}</span>
                <span className="Icon">+</span>
              </button>
              <div
                className="FAQAnswer"
                style={{
                  maxHeight: isActive ? `${height}px` : "0",
                  opacity: isActive ? 1 : 0,
                  marginTop: isActive ? "0" : "0",
                }}
              >
                <div
                  ref={(el) => {
                    contentRefs.current[index] = el;
                  }}
                >
                  <p>{item.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQSection;
