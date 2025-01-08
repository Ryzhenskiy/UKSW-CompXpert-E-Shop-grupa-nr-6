import SectionHeaders from '@/components/layout/SectionHeaders';

const About = () => {
  return (
    <section>
      <section className="text-center my-8">
        <SectionHeaders header={'Nasza historia'} />
        <div className="text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4">
          <p>
          CompXpert powstał w 2024 roku w Warszawie z inicjatywy, pasjonatów technologii, 
          którzy dostrzegli brak profesjonalnych sklepów z akcesoriami komputerowymi. 
          Początkowo założyciele sami obsługiwali klientów, oferując eksperckie doradztwo i 
          starannie dobrany sprzęt, co szybko przyciągnęło grono wiernych użytkowników.
          </p>
          <p>
          Dzięki współpracy z profesjonalistami, personalizacji produktów i rozbudowie oferty
          o podzespoły komputerowe, firma dynamicznie rosła, a dziś jest jednym z liderów na
          polskim rynku. CompXpert zatrudnia ponad 50 osób, prowadzi własną linię akcesoriów i
          stawia na innowacje oraz ekologię, budując społeczność wokół jakości i profesjonalizmu.
          </p>
          <p>
          Historia CompXpert pokazuje, że pasja i zaangażowanie w rozwiązywanie realnych
          roblemów klientów mogą stać się fundamentem trwałego sukcesu. CompXpert to przykład
          na to, że nawet w obliczu dużej konkurencji można znaleźć swoją niszę i odnieść
          sukces, jeśli stawia się na unikalne podejście do klienta i nieustannie się rozwija.
          </p>
        </div>
      </section>
      <section className="text-center my-8">
        <SectionHeaders
          subHeader={"Don't hesitate"}
          mainHeader={'Contact us'}
        />
        <div className="mt-8">
          <a
            ahref="tel:+46738123123"
            className="text-4xl underline text-gray-500"
          >
            +46 738 123 123
          </a>
        </div>
      </section>
    </section>
  );
};
export default About;
