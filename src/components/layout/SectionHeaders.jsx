const SectionHeaders = ({ header, subheader }) => {
  return (
    <section className="text-center mb-5 mt-2">
      <h1 className="text-primary text-center font-bold mb-3 text-5xl italic">
        {header}
      </h1>
      <p className="text-gray-500 text-2xl underline italic font-semibold">
        {subheader}
      </p>
    </section>
  );
};
export default SectionHeaders;
