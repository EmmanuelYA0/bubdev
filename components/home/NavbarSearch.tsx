import React, { useState, useEffect, useRef } from 'react';
import { Product } from '@prisma/client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { LoaderCircleIcon } from 'lucide-react';

interface SearchModalProps {}

const SearchModal: React.FC<SearchModalProps> = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);

  const checkSuggestion = suggestions.length === 0 ? 'bg-transparent' : 'bg-white';
  const router = useRouter();

  useEffect(() => {
    const fetchSuggestions = async () => {
      setIsLoading(true);
      if (searchTerm.length > 2) {
        const response = await fetch(`/api/search?searchTerm=${searchTerm}`);
        const suggestions = await response.json();
        setSuggestions(suggestions);
      } else {
        setSuggestions([]);
      }
      setIsLoading(false);
    };

    fetchSuggestions();
  }, [searchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSuggestionClick = (suggestion: Product) => {
    setShowModal(false);
    router.push(`http://localhost:3000/vins/${suggestion.id}`);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (
      modalRef.current &&
      !modalRef.current.contains(e.target as Node) &&
      searchButtonRef.current &&
      !searchButtonRef.current.contains(e.target as Node)
    ) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <>
      <button
        className=" bg-transparent px-3"
        onClick={() => setShowModal(!showModal)}
        ref={searchButtonRef}
      >
        <Image
          src="/search.svg"
          alt="search-icon"
          width={35}
          height={35}
          className=" bg-transparent hidden h-full lg:flex cursor-pointer hover:stroke-[#4A050D] hover:scale-125"
        />
      </button>

      {showModal && (
        <div
          ref={modalRef}
          className="bg-slate-600 bg-opacity-50 rounded-lg p-8 left-[-750px] top-32 absolute inset-0 z-50 overflow-auto h-[400px] w-[700px] flex items-center justify-center"
        >
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="border absolute border-gray-300 focus:border-gray-600 rounded-md py-2 px-4 top-4 w-2/3 mx-auto"
          />
          {isLoading ? (
            <div className="mt-20 text-white"><LoaderCircleIcon color='red' className=' animate-spin'/></div>
          ) : (
            <ul className={`${checkSuggestion} mt-1 rounded-md px-5 py-4`}>
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion.id}
                  className="py-2 px-4 bg-gray-100 rounded-md cursor-pointer my-1 w-[600px] hover:bg-gray-200"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  );
};

export default SearchModal;