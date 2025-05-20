import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CurrencySelector from "../components/CurrencySelector";
import InitialBalanceInput from "../components/InitialBalanceInput";
import ErrorMessage from "../components/ErrorMessage";
import {
  getStoredBalance,
  setStoredBalance,
  setStoredCurrencies,
} from "../utils/storage";

const Home = () => {
  const [balance, setBalance] = useState<string>(getStoredBalance);
  const [selectedCurrencies, setSelectedCurrencies] = useState<string[]>([]);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    setStoredBalance(balance);
  }, [balance]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const balanceNum = parseFloat(balance);

    if (isNaN(balanceNum) || balanceNum <= 0) {
      setError("El saldo debe ser mayor a 0");
      return;
    }

    if (selectedCurrencies.length === 0) {
      setError("Debes seleccionar al menos una divisa");
      return;
    }

    setStoredCurrencies(selectedCurrencies);
    navigate("/results");
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 sm:p-8 bg-blueberry rounded-lg border border-mint shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-8 text-white">
        Cartera Virtual de Divisas
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <InitialBalanceInput balance={balance} onBalanceChange={setBalance} />
        <CurrencySelector onCurrenciesChange={setSelectedCurrencies} />
        {error && <ErrorMessage message={error} />}
        <button
          type="submit"
          className="w-full bg-mint text-blueberry py-3 px-4 rounded-md hover:opacity-90 transition-colors font-medium"
        >
          Ver Resultados
        </button>
      </form>
    </div>
  );
};

export default Home;
