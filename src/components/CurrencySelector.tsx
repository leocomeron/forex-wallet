import { useState, useEffect, useRef } from "react";
import Chevron from "./icons/Chevron";
import { getCurrencies } from "../api/coinbase";
import type { Currency, CurrencySelectorProps } from "../types";
import { getStoredCurrencies, setStoredCurrencies } from "../utils/storage";
import CurrencySelectorSkeleton from "./CurrencySelectorSkeleton";

const CurrencySelector = ({ onCurrenciesChange }: CurrencySelectorProps) => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [selectedCurrencies, setSelectedCurrencies] =
    useState<string[]>(getStoredCurrencies);
  const [error, setError] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        setIsLoading(true);
        const data = await getCurrencies();
        setCurrencies(data);
      } catch {
        setError("Error al cargar las divisas. Por favor, intente nuevamente.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurrencies();
  }, []);

  useEffect(() => {
    setStoredCurrencies(selectedCurrencies);
    onCurrenciesChange(selectedCurrencies);
  }, [selectedCurrencies, onCurrenciesChange]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCurrencyChange = (currencyId: string) => {
    setSelectedCurrencies((prev) => {
      const newSelection = prev.includes(currencyId)
        ? prev.filter((id) => id !== currencyId)
        : prev.length < 3
        ? [...prev, currencyId]
        : prev;

      onCurrenciesChange(newSelection);
      return newSelection;
    });
  };

  const handleClearSelection = () => {
    setSelectedCurrencies([]);
    onCurrenciesChange([]);
  };

  const getSelectedCurrenciesText = () => {
    if (selectedCurrencies.length === 0) return "Selecciona hasta 3 divisas";
    return selectedCurrencies
      .map((id) => currencies.find((c) => c.id === id)?.name)
      .filter(Boolean)
      .join(", ");
  };

  if (error) {
    return (
      <div className="text-red-400 bg-red-900/20 p-3 rounded-md">{error}</div>
    );
  }

  if (isLoading) {
    return <CurrencySelectorSkeleton />;
  }

  return (
    <div className="space-y-2" ref={dropdownRef}>
      <h3 className="text-lg font-medium text-white">Divisas</h3>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-3 text-left ring-1 ring-mint rounded-md bg-blueberry text-white focus:outline-none focus:ring-2 focus:ring-mint focus:border-mint hover:border-[#a5e9c4]"
        >
          <div className="flex justify-between items-center">
            <span className="text-white truncate">
              {getSelectedCurrenciesText()}
            </span>
            <Chevron isOpen={isOpen} />
          </div>
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-blueberry border border-mint rounded-md shadow-lg max-h-60 overflow-auto">
            {currencies.map((currency) => (
              <label
                key={currency.id}
                className={`flex items-center px-4 py-2 cursor-pointer hover:bg-mint/10
                  ${
                    selectedCurrencies.includes(currency.id) ? "bg-mint/20" : ""
                  }`}
              >
                <input
                  type="checkbox"
                  checked={selectedCurrencies.includes(currency.id)}
                  onChange={() => handleCurrencyChange(currency.id)}
                  className="h-4 w-4 text-mint rounded border-mint focus:ring-mint"
                />
                <span className="ml-3 text-white">{currency.name}</span>
              </label>
            ))}
          </div>
        )}
      </div>
      <div className="flex justify-between items-center">
        {selectedCurrencies.length > 0 && (
          <p className="text-sm text-gray-300">
            {selectedCurrencies.length}/3 divisas seleccionadas
          </p>
        )}
        {selectedCurrencies.length > 0 && (
          <span
            onClick={handleClearSelection}
            className="text-xs text-mint hover:text-[#a5e9c4] cursor-pointer"
          >
            Limpiar selección
          </span>
        )}
      </div>
    </div>
  );
};

export default CurrencySelector;
