'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useDispatch } from 'react-redux';
import { addToLiked } from '../../../../redux/slices/likedProductsSlice';
import { addToShoppingList as addToShoppingList_1 } from '../../../../redux/slices/shoppingListSlice';
import { addToShoppingList as addToShoppingList_2 } from '../../../../redux/slices/shoppingListSlice_2';
import { addToShoppingList as addToShoppingList_3 } from '../../../../redux/slices/shoppingListSlice_3';
import { addToShoppingList as addToShoppingList_4 } from '../../../../redux/slices/shoppingListSlice_4';
import { addToShoppingList as addToShoppingList_5 } from '../../../../redux/slices/shoppingListSlice_5';
import { addToShoppingList } from '../../../../redux/slices/shoppingListSlice';
import Rating from '@/components/layout/Rating';
import ReviewCard from '@/components/layout/ReviewCard';
import Link from 'next/link';
import SectionHeaders from '@/components/layout/SectionHeaders';
import toast from 'react-hot-toast';
import Heart from '@/components/icons/Heart';
import Edit from '@/components/icons/Edit';

import jsPDF from 'jspdf';
import { addToCart } from '../../../../redux/slices/cartSlice';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const session = useSession();
  const dispatch = useDispatch();
  const { status } = session;
  const [categories, setCategories] = useState([]);

  const pdfRef = useRef();

  useEffect(() => {
    fetch('/api/adminProducts').then((res) =>
      res.json().then((data) => {
        const foundProduct = data.find((p) => p._id === id);
        setProduct(foundProduct);
      })
    );

    fetch('/api/categories', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }).then((res) =>
      res.json().then((data) => {
        setCategories(data);
      })
    );

    fetchReviews();
  }, []);

  function fetchReviews() {
    fetch('/api/review').then((res) =>
      res.json().then((data) => {
        const foundReviews = data.filter((r) => r.productId === id);
        setReviews(foundReviews);
      })
    );
  }

  function handleAddProductToFavourites() {
    dispatch(addToLiked(product));
    toast.success('Produkt został dodany do ulubionych.');
  }

  const generatePdf = () => {
    const input = pdfRef.current;

    const margin = 50;

    const pdf = new jsPDF('p', 'pt', 'a4');

    const normalizeText = (text) => (text ? text.normalize('NFC') : '');
    pdf.setFont('helvetica', 'normal');

    const productName = product?.name || 'Brak nazwy produktu.';
    const productPrice = product?.basePrice || 'Brak ceny produktu.';
    const productCategory =
      categories.length > 0 && product?.category
        ? categories.find((cat) => cat._id === product.category)?.name ||
          'Nieznana'
        : 'Błąd';
    const productDescription = normalizeText(
      product?.description || 'Brak opisu produktu.'
    );

    pdf.setFontSize(18);
    pdf.text('Podstawowe informacje o produkcie:', margin, 70);

    pdf.setFontSize(12);
    pdf.text(`Nazwa produktu: ${productName}`, margin, 110);
    pdf.text(`Kategoria: ${productCategory}`, margin, 130);
    pdf.text(`Cena: ${productPrice} zl`, margin, 150);
    pdf.text('Opis:', margin, 170);

    const splitDescription = pdf.splitTextToSize(productDescription, 510);
    pdf.text(splitDescription, margin, 190);

    pdf.text('CompXpert 2025 all rights reserved.', margin + 150, 800);

    pdf.save('product-details.pdf');
  };

  function handleAddToCart() {
    dispatch(addToCart(product));
  }

  function handleAddProductToShoppingList(nr) {
    switch (nr) {
      case 1:
        dispatch(addToShoppingList_1(product));
        break;
      case 2:
        dispatch(addToShoppingList_2(product));
        break;
      case 3:
        dispatch(addToShoppingList_3(product));
        break;
      case 4:
        dispatch(addToShoppingList_4(product));
        break;
      case 5:
        dispatch(addToShoppingList_5(product));
        break;
    }
    toast.success('Produkt został dodany do listy zakupowej.');
  }

  return (
    <div className="flex flex-col max-w-4xl mx-auto mt-8">
      <div className="flex flex-col md:flex-row justify-between max-w-4xl gap-36 mx-auto">
        <div className="max-w-lg md:w-1/2">
          <img
            src={product?.image}
            alt={product?.name}
            className="object-cover"
          />
        </div>
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-4">{product?.name}</h1>
          <div className="max-w-lg md:w-2/2">
            <p className="mb-4">
              Kategoria:{' '}
              {categories.length > 0 && product?.category
                ? categories.find((cat) => cat._id === product.category)
                    ?.name || 'Nieznana'
                : 'Ładowanie...'}
            </p>
          </div>
          <p>Opis</p>
          <div className="w-96">
            <div
              className={`text-gray-600 mb-4 ${
                isExpanded ? '' : 'line-clamp-3 overflow-hidden'
              }`}
            >
              {product?.description}
            </div>
            {!isExpanded && (
              <button
                className="text-blue-500  mb-5"
                onClick={() => setIsExpanded(true)}
              >
                Pokaż więcej
              </button>
            )}
            {isExpanded && (
              <button
                className="text-blue-500 mb-5"
                onClick={() => setIsExpanded(false)}
              >
                Pokaż mniej
              </button>
            )}
            <p className="text-2xl font-semibold text-blue-600 mb-6">
              {product?.basePrice} zł
            </p>
            <button className="primary" onClick={handleAddToCart}>
              Dodaj do koszyka
            </button>
          </div>
          <p className="mt-8">
            <button
              type="button"
              onClick={(ev) => {
                handleAddProductToFavourites();
              }}
              className="w-10 text-primary hover:text-white border border-primary p-1 rounded-md hover:bg-primary hover:cursor-pointer transition-all"
            >
              <Heart className="w-6 h-6" />
            </button>
          </p>
          <p className="mt-4">Dodaj do listy zakupowej:</p>
          <div className="flex w-xl gap-2 mt-4">
            {' '}
            {/* Flex container for buttons */}
            {[1, 2, 3, 4, 5].map((nr) => (
              <button
                key={nr}
                type="button"
                onClick={() => handleAddProductToShoppingList(nr)}
                className="w-10 text-primary hover:text-white border border-primary p-1 rounded-md hover:bg-primary hover:cursor-pointer transition-all flex items-center justify-center"
              >
                {nr}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col max-w-4xl mx-auto mt-8" ref={pdfRef}>
        <button onClick={generatePdf}>
          Wygeneruj informacje o produkcie do PDF
        </button>
      </div>
      {status === 'unauthenticated' ? (
        <div className="text-center text-gray-500 mt-4 border-t pt-4">
          Jeśli chcesz zostawić opinię,{' '}
          <Link href={'/login'} className="underline">
            Zaloguj się tutaj &raquo;
          </Link>
        </div>
      ) : (
        <Rating productId={id} />
      )}
      <SectionHeaders
        header={'Recenzje' + ' (' + reviews?.length + ')'}
        className="mt-2"
      />
      {reviews?.length > 0 && reviews.map((r) => <ReviewCard review={r} />)}
    </div>
  );
};

export default ProductPage;
