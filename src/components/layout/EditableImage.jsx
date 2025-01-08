import Image from 'next/image';
import toast from 'react-hot-toast';

const EditableImage = ({ link, setLink }) => {
  async function handleFileChange(ev) {
    const files = ev.target.files;

    if (files?.length === 1) {
      const data = new FormData();
      data.set('file', files[0]);

      const uploadingPromise = fetch('/api/upload', {
        method: 'POST',
        body: data,
      }).then((response) => {
        if (response.ok) {
          return response.json().then((link) => {
            setLink(link);
          });
        }
        throw new Error('Coś poszło nie tak!');
      });

      await toast.promise(uploadingPromise, {
        loading: 'Ładowanie...',
        error: 'Błąd',
        success: 'PLik został załadowany',
      });
    }
  }
  return (
    <div className="p-2 relative max-w-[120px]">
      {link && (
        <Image
          src={link}
          width={250}
          height={250}
          alt={'avatar'}
          className="rounded-lg w-full h-full mb-1"
        />
      )}
      {!link && (
        <div className=" bg-gray-200 p-2 text-center text-gray-500 rounded-lg mb-1">
          Niema zdjęcia
        </div>
      )}
      <label>
        <input type="file" className="hidden" onChange={handleFileChange} />
        <span className="block border border-gray-300 rounded-lg p-2 text-center cursor-pointer">
          Zmień
        </span>
      </label>
    </div>
  );
};
export default EditableImage;
