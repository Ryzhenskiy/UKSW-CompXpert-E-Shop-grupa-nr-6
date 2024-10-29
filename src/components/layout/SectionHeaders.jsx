const SectionHeaders = ({ header, subheader, className = 'mb-5 mt-2' }) => {
  return (
    <section className={className}>
      <h1 className="text-primary font-bold mb-1 text-2xl italic">{header}</h1>
      <p className="text-gray-500 text-xl underline italic font-semibold">
        {subheader}
      </p>
    </section>
  );
};
export default SectionHeaders;
