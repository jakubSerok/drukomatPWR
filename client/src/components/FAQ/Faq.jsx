import React, { useState } from "react";
import AccordionItem from "./AcordionItem";

const Faq = () => {
  return (
    <section
      className="relative  overflow-hidden bg-white pb-12 pt-20 dark:bg-dark lg:pb-[90px] lg:pt-[120px] px-4"
      id="kontakt"
    >
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-[60px] max-w-[520px] text-center lg:mb-20">
              <span className="mb-2 block text-lg font-semibold text-primary">
                FAQ
              </span>
              <h2 className="mb-4 text-3xl font-bold text-dark dark:text-white sm:text-[40px]/[48px]">
                Masz pytania? Sprawdź tutaj!
              </h2>
              <p className="text-base text-body-color dark:text-dark-6">
                Chcesz dowiedzieć się więcej o naszych usługach? Przygotowaliśmy
                odpowiedzi na najczęściej zadawane pytania, aby ułatwić Ci
                korzystanie z Drukomatu. Jeśli nie znajdziesz tutaj odpowiedzi,
                skontaktuj się z nami – z przyjemnością pomożemy
              </p>
            </div>
          </div>
        </div>

        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 lg:w-1/2">
            <AccordionItem
              header="Jak znaleźć najbliższy punkt druku?"
              text="Użyj naszej strony internetowej lub aplikacji, aby znaleźć najbliższy punkt, wpisując swoją lokalizację."
            />
            <AccordionItem
              header="Czy mogę wydrukować dokumenty w kolorze?"
              text="Tak, oferujemy zarówno wydruki czarno-białe, jak i kolorowe."
            />
            <AccordionItem
              header="Jakie formaty plików są akceptowane?"
              text="Obsługujemy formaty PDF, DOC, DOCX, JPG, PNG i inne popularne typy plików."
            />
          </div>
          <div className="w-full px-4 lg:w-1/2">
            <AccordionItem
              header="Ile czasu zajmuje realizacja wydruku"
              text="Większość wydruków jest gotowa w kilka minut od momentu przesłania pliku."
            />
            <AccordionItem
              header="Czy mogę anulować zamówienie?"
              text="Tak, możesz anulować zamówienie, o ile proces druku jeszcze się nie rozpoczął."
            />
            <AccordionItem
              header="Czy moje dane są bezpieczne?"
              text="Tak, wszystkie przesłane pliki są szyfrowane, a dane są automatycznie usuwane po zakończeniu usługi."
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 z-[-1]">
        <svg
          width="1440"
          height="886"
          viewBox="0 0 1440 886"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.5"
            d="M193.307 -273.321L1480.87 1014.24L1121.85 1373.26C1121.85 1373.26 731.745 983.231 478.513 729.927C225.976 477.317 -165.714 85.6993 -165.714 85.6993L193.307 -273.321Z"
            fill="url(#paint0_linear)"
          />
          <defs>
            <linearGradient
              id="paint0_linear"
              x1="1308.65"
              y1="1142.58"
              x2="602.827"
              y2="-418.681"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#3056D3" stop-opacity="0.36" />
              <stop offset="1" stop-color="#F5F2FD" stop-opacity="0" />
              <stop offset="1" stop-color="#F5F2FD" stop-opacity="0.096144" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default Faq;
