
"use client";

import React, { useState } from "react";

const defaultFaqData = [
  {
    question: "سوال های شما",
    answer: "سوال های شما",
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

  const toggleFAQ = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="FAQSection">
      <div className="top">
        <span>{title}</span>
      </div>
      <div className="bottom">
        {faqData.map((item, index) => (
          <div
            key={index}
            className={`FAQ ${activeIndex === index ? "active" : ""}`}
          >
            <div className="question">
              <button className="Button" onClick={() => toggleFAQ(index)}>
                {item.question}
                <span className="Icon">
                  {activeIndex === index ? "−" : "+"}
                </span>
              </button>
            </div>
            {activeIndex === index && (
              <div className={`ansure ${activeIndex === index ? "open" : ""}`}>
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;