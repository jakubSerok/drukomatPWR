import React from "react";
import ServiceCard from "./ServiceCard";
import {
  FaPaintBrush,
  FaCss3Alt,
  FaCogs,
  FaRocket,
  FaRegEdit,
  FaSync,
} from "react-icons/fa";

const Service = () => {
  return (
    <section
      className="pb-12 pt-20 dark:bg-dark lg:pb-[90px] lg:pt-[120px] px-10 bg-[#011627]"
      id="oferta"
    >
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-12 max-w-[510px] text-center lg:mb-20">
              <h2 className="mb-3 text-3xl font-bold leading-[1.2] text-[#55d6be] sm:text-4xl md:text-[40px]">
                Co oferujemy
              </h2>
              <p className="text-base text-[#24947f]">
                Zobacz, co możemy Ci zaoferować, aby poprawić komfort pracy!
              </p>
            </div>
          </div>
        </div>

        <div className="-mx-4 flex flex-wrap">
          <ServiceCard
            title="Szybki dostęp do druku"
            details="Drukuj dokumenty w dogodnych lokalizacjach na terenie całego miasta."
            icon={<FaPaintBrush size={36} color="#55d6be" />}
          />
          <ServiceCard
            title="Wysoka jakość wydruków"
            details="Oferujemy nowoczesne urządzenia gwarantujące wyraźne i trwałe wydruki."
            icon={<FaCss3Alt size={36} color="#55d6be" />}
          />
          <ServiceCard
            title="Prosta obsługa online"
            details="Wgraj plik i wybierz najbliższy punkt druku w zaledwie kilka kliknięć."
            icon={<FaCogs size={36} color="#55d6be" />}
          />
          <ServiceCard
            title="Przystępne ceny"
            details="Nasze usługi są dostępne w atrakcyjnych cenach, dostosowanych do Twoich potrzeb."
            icon={<FaRocket size={36} color="#55d6be" />}
          />
          <ServiceCard
            title="Elastyczność formatu"
            details="Drukuj w różnych formatach i na różnorodnych rodzajach papieru."
            icon={<FaRegEdit size={36} color="#55d6be" />}
          />
          <ServiceCard
            title="Bezpieczeństwo danych"
            details="Gwarantujemy poufność przesyłanych plików i szybkie usuwanie po realizacji usługi."
            icon={<FaSync size={36} color="#55d6be" />}
          />
        </div>
      </div>
    </section>
  );
};

export default Service;
