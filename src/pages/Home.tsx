import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CurrencySelector from "../components/CurrencySelector";

const Home = () => {
  const [balance, setBalance] = useState<string>("");
  const [selectedCurrencies, setSelectedCurrencies] = useState<string[]>([]);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

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

    localStorage.setItem("balance", balance);
    localStorage.setItem(
      "selectedCurrencies",
      JSON.stringify(selectedCurrencies)
    );

    navigate("/results");
  };

  return (
    <div className="w-full mx-auto p-8 bg-[#240837] rounded-lg border border-[#87e2ae] shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-8 text-white">
        Cartera Virtual de Divisas
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="balance"
            className="block text-sm font-medium text-white mb-2"
          >
            Saldo inicial (EUR)
          </label>
          <input
            type="number"
            id="balance"
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
            className="w-full p-3 border border-[#87e2ae] rounded-md bg-[#240837] text-white focus:ring-2 focus:ring-[#87e2ae] focus:border-[#87e2ae] outline-none transition placeholder-gray-400"
            placeholder="Ingresa tu saldo en EUR"
            step="0.01"
            min="0"
          />
        </div>

        <CurrencySelector onCurrenciesChange={setSelectedCurrencies} />

        {error && (
          <div className="text-red-400 text-sm bg-red-900/20 p-3 rounded-md">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-[#87e2ae] text-[#240837] py-3 px-4 rounded-md hover:opacity-90 transition-colors font-medium"
        >
          Ver Resultados
        </button>
      </form>
    </div>
  );
};

export default Home;
