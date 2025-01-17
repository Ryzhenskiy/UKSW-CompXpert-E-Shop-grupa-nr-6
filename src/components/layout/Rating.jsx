import SectionHeaders from '@/components/layout/SectionHeaders';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import StartRating from '@/components/layout/StarRating';
import StarRating from '@/components/layout/StarRating';

const Rating = ({ productId }) => {
  const session = useSession();

  const name = session?.data?.user?.name;
  const email = session?.data?.user?.email;
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0); // Wybrana ocena
  const [hover, setHover] = useState(0);
  console.log(userName);

  useEffect(() => {
    if (session?.data?.user) {
      setUserName(name || ''); // Pobierz nazwę użytkownika z sesji
      setUserEmail(email || ''); // Pobierz email użytkownika z sesji
    }
  }, [session]);

  function handleRateSubmit(ev) {
    ev.preventDefault();
    const data = {
      userName,
      userEmail,
      reviewText,
      productId,
      rating,
    };

    const reviewPromsie = new Promise(async (resolve, reject) => {
      const response = await fetch('/api/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (rating === 0) {
        toast.error('Wybierz ocenę!');
      }
      if (response.ok) resolve();
      else reject();
      setReviewText('');
    });

    toast.promise(reviewPromsie, {
      loading: 'Ładowanie  recenzji...',
      success: 'Recenzja została utworzona',
      error: 'Wystąpił błąd przy tworzeniu recenzji!',
    });
  }
  return (
    <div>
      <div className="">
        <SectionHeaders header={'Zostaw opinię'} className="mb-2 mt-5" />
        <div className="flex flex-col w-4">
          <span className="text-start text-gray-600">Ocena</span>
          <StarRating
            onHover={setHover}
            onRate={setRating}
            hover={hover}
            rating={rating}
          />
        </div>
      </div>
      <form className="mt-2 flex flex-col" onSubmit={handleRateSubmit}>
        <div className="flex gap-4">
          <div>
            <label className="text-primary font-semibold border-b border-primary block mb-2">
              Twoje imię
            </label>
            <input
              style={{ margin: '0px' }}
              type="text"
              placeholder="Twoje imię"
              value={userName}
              disabled={true}
              readOnly
            />
          </div>
          <div>
            {' '}
            <label className="text-primary font-semibold border-b border-primary block mb-2">
              E-mail
            </label>
            <input
              style={{ margin: '0px' }}
              type="text"
              placeholder="E-mail"
              value={userEmail}
              disabled={true}
              readOnly
            />
          </div>
        </div>
        <label className="text-primary font-semibold border-b border-primary block mb-2">
          Tekst recenzji
        </label>
        <textarea
          class="border rounded p-2 w-full min-h-20"
          rows="1"
          value={reviewText}
          onChange={(ev) => setReviewText(ev.target.value)}
        ></textarea>

        <button type="submit">Dodaj</button>
      </form>
    </div>
  );
};
export default Rating;
