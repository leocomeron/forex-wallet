import { useState, useEffect, useRef } from "react";
import Chevron from "./icons/Chevron";
import { getCurrencies } from "../api/coinbase";
import type { Currency, CurrencySelectorProps } from "../types";
import { getStoredCurrencies, setStoredCurrencies } from "../utils/storage";

const CurrencySelector = ({ onCurrenciesChange }: CurrencySelectorProps) => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [selectedCurrencies, setSelectedCurrencies] =
    useState<string[]>(getStoredCurrencies);
  const [error, setError] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const data = await getCurrencies();
        setCurrencies(data);
      } catch {
        setError("Error al cargar las divisas. Por favor, intente nuevamente.");
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

  return (
    <div className="space-y-2" ref={dropdownRef}>
      <h3 className="text-lg font-medium text-white">Divisas</h3>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-3 text-left ring-1 ring-[#87e2ae] rounded-md bg-[#240837] text-white focus:outline-none focus:ring-2 focus:ring-[#87e2ae] focus:border-[#87e2ae] hover:border-[#a5e9c4]"
        >
          <div className="flex justify-between items-center">
            <span className="text-white truncate">
              {getSelectedCurrenciesText()}
            </span>
            <Chevron isOpen={isOpen} />
          </div>
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-[#240837] border border-[#87e2ae] rounded-md shadow-lg max-h-60 overflow-auto">
            {currencies.map((currency) => (
              <label
                key={currency.id}
                className={`flex items-center px-4 py-2 cursor-pointer hover:bg-[#87e2ae]/10
                  ${
                    selectedCurrencies.includes(currency.id)
                      ? "bg-[#87e2ae]/20"
                      : ""
                  }`}
              >
                <input
                  type="checkbox"
                  checked={selectedCurrencies.includes(currency.id)}
                  onChange={() => handleCurrencyChange(currency.id)}
                  className="h-4 w-4 text-[#87e2ae] rounded border-[#87e2ae] focus:ring-[#87e2ae]"
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
            className="text-xs text-[#87e2ae] hover:text-[#a5e9c4] cursor-pointer"
          >
            Limpiar selección
          </span>
        )}
      </div>
    </div>
  );
};

export default CurrencySelector;
