import { useState } from "react";

interface AccordionProps {
  title: string;
  answer: string; // Use React.ReactNode para permitir qualquer tipo de conteúdo renderizável
}
const Accordion: React.FC<AccordionProps> = ({ title, answer }) =>  {
  const [accordionOpen, setAccordionOpen] = useState(false);

  return (
    <div className=" text-whiteCustom p-2 border-t-2 border-whiteCustom rounded">
      <button
        onClick={() => setAccordionOpen(!accordionOpen)}
        className="flex justify-between w-full text-xl mb-3 font-semibold text-start"
      >
        <span>{title}</span>
        {}
        <svg
          className="fill-whiteCustom shrink-0 ml-8 "
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center transition duration-200 ease-out ${
              accordionOpen && "!rotate-180"
            }`}
          />
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center rotate-90 transition duration-200 ease-out ${
              accordionOpen && "!rotate-180"
            }`}
          />
        </svg>
      </button>
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out text-whiteCustom text-sm ${
          accordionOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">{answer}</div>
      </div>
    </div>
  );
};

export default Accordion;