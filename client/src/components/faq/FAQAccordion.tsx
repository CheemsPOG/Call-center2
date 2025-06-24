import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

/**
 * FAQAccordion renders a list of FAQs as an accordion.
 * Props: faqs (array of { question, answer })
 */
const FAQAccordion = ({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) => (
  <Accordion type="single" collapsible className="w-full">
    {faqs.map((faq, idx) => (
      <AccordionItem key={idx} value={String(idx)}>
        <AccordionTrigger>{faq.question}</AccordionTrigger>
        <AccordionContent>{faq.answer}</AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
);

export default FAQAccordion;
