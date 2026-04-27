"use client";

import { SectionWrapper } from "@/components/ui/section-wrapper";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { CornerDecoration } from "./ui/corner-decoration";

const faqData = [
  {
    category: "General",
    questions: [
      {
        question: "What is Firecrawl?",
        answer:
          "Firecrawl is a powerful web scraping and data extraction tool designed for AI systems and developers.",
      },
      {
        question: "What can I build with Firecrawl?",
        answer:
          "You can build AI agents, data pipelines, web scrapers, and automated systems that need clean web data.",
      },
      {
        question: "Why do AI systems need Firecrawl?",
        answer:
          "AI systems need clean, structured data. Firecrawl converts messy web content into AI-ready formats.",
      },
      {
        question: "What are Search, Scrape, and Interact?",
        answer:
          "These are the three core capabilities: Search finds pages, Scrape extracts data, and Interact automates browser actions.",
      },
      {
        question: "Does Firecrawl work with AI agents and MCPs?",
        answer:
          "Yes, Firecrawl is designed to integrate seamlessly with AI agents and Model Context Protocols.",
      },
      {
        question: "Who uses Firecrawl?",
        answer:
          "Developers, AI engineers, data scientists, and companies building AI-powered applications use Firecrawl.",
      },
      {
        question: "Is Firecrawl open-source?",
        answer:
          "Yes, Firecrawl has an open-source version available on GitHub for self-hosting.",
      },
      {
        question: "How is Firecrawl different from other tools in the space?",
        answer:
          "Firecrawl provides clean, structured data optimized for AI systems with built-in rate limiting and error handling.",
      },
      {
        question:
          "What is the difference between the open-source version and the hosted version?",
        answer:
          "The hosted version includes managed infrastructure, automatic scaling, and premium support.",
      },
    ],
  },
  {
    category: "API Related",
    questions: [
      {
        question: "What SDKs are available?",
        answer:
          "We provide SDKs for Python, Node.js, Go, and REST API for other languages.",
      },
      {
        question: "Where can I find my API key?",
        answer:
          "Your API key is available in your dashboard under Settings > API Keys.",
      },
    ],
  },
  {
    category: "Billing",
    questions: [
      {
        question: "Is Firecrawl free?",
        answer:
          "Firecrawl offers a free tier with limited requests. Paid plans are available for higher usage.",
      },
      {
        question: "Is there a pay-per-use plan instead of monthly?",
        answer:
          "Yes, we offer both subscription plans and pay-as-you-go pricing options.",
      },
      {
        question: "Do credits roll over to the next month?",
        answer:
          "Credits on monthly plans do not roll over, but pay-as-you-go credits never expire.",
      },
      {
        question: "How many credits does each request cost?",
        answer:
          "Credit costs vary by operation: simple scrapes cost 1 credit, complex operations may cost more.",
      },
      {
        question: "Do you charge for failed requests?",
        answer: "No, we only charge for successful requests that return data.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit cards, debit cards, and PayPal for payments.",
      },
    ],
  },
];

export default function SiteFAQ() {
  return (
    <SectionWrapper position="middle" className="bg-background">
      {/* <h2 className="text-3xl lg:text-5xl font-bold mb-12 lg:mb-16">
          Frequently Asked Questions
        </h2> */}

      {/* Single column layout with cards */}
      {faqData.map((category, idx) => (
        <div key={idx}>
          <div className="flex flex-col space-y-[-1] space-x-[-1]">
            {/* Category title on the left */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 space-x-[-2] space-y-[-1]">
              <div className="flex-1 relative">
                <>
                  <CornerDecoration position="top-left" />
                  <CornerDecoration position="top-right" />
                  <CornerDecoration position="bottom-left" />
                  <CornerDecoration position="bottom-right" />
                </>
                <h3 className="text-2xl lg:text-3xl font-medium p-6">
                  {category.category}
                </h3>
              </div>
              <Card showCorners className="hidden lg:block bg-transparent">
                <CardContent></CardContent>
              </Card>
            </div>

            {/* Questions on the right */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 space-x-[-2] space-y-[-2]">
              <Card showCorners className="hidden lg:block bg-transparent">
                <CardContent></CardContent>
              </Card>
              <div className="space-y-[-1] space-x-[-1]">
                <Accordion className={"space-y-[-1]"}>
                  {category.questions.map((item, qIdx) => (
                    <div
                      className="relative p-4 px-6 bg-transparent border-b-[0.5px]"
                      key={qIdx}
                    >
                      <>
                        <CornerDecoration position="top-left" />
                        <CornerDecoration position="top-right" />
                        <CornerDecoration position="bottom-left" />
                        <CornerDecoration position="bottom-right" />
                      </>
                      <AccordionItem value={`${idx}-${qIdx}`}>
                        <AccordionTrigger className="text-base">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent>
                          <p className="text-muted-foreground">{item.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    </div>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      ))}
    </SectionWrapper>
  );
}
