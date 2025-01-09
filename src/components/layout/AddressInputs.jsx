const AddressInputs = ({ addressProps, setAddressProps, disabled }) => {
  const { phone, streetAddress, postalCode, country, city } = addressProps;
  return (
    <>
      <label className="text-primary font-semibold border-b border-primary block">
        Numer telefonu
      </label>
      <input
        disabled={disabled}
        type="tel"
        placeholder="Numer telefonu"
        value={phone}
        onChange={(ev) => setAddressProps('phone', ev.target.value)}
      />
      <label className="text-primary font-semibold border-b border-primary block">
        Adres
      </label>
      <input
        disabled={disabled}
        type="text"
        placeholder="Adres"
        value={streetAddress}
        onChange={(ev) => setAddressProps('streetAddress', ev.target.value)}
      />

      <div className="flex gap-2">
        <div clas>
          <label className="text-primary font-semibold border-b border-primary block mb-2">
            Kod pocztowy
          </label>
          <input
            disabled={disabled}
            style={{ margin: '0px' }}
            type="text"
            placeholder="Kod pocztowy"
            value={postalCode}
            onChange={(ev) => setAddressProps('postalCode', ev.target.value)}
          />
        </div>
        <div>
          <label className="text-primary font-semibold border-b border-primary block mb-2">
            Miasto
          </label>
          <input
            disabled={disabled}
            style={{ margin: '0px' }}
            type="text"
            placeholder="Miasto"
            value={city}
            onChange={(ev) => setAddressProps('city', ev.target.value)}
          />
        </div>
      </div>
      <label className="text-primary font-semibold border-b border-primary block">
        Państwo
      </label>
      <input
        disabled={disabled}
        type="text"
        placeholder="Państwo"
        value={country}
        onChange={(ev) => setAddressProps('country', ev.target.value)}
      />
    </>
  );
};
export default AddressInputs;
