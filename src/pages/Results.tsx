import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getExchangeRates } from "../api/coinbase";
import ResultCard from "../components/ResultCard";
import type { Conversion } from "../types";

const Results = () => {
  const [balance, setBalance] = useState<string>("");
  const [selectedCurrencies, setSelectedCurrencies] = useState<string[]>([]);
  const [conversions, setConversions] = useState<Conversion[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedBalance = localStorage.getItem("balance");
    const storedCurrencies = localStorage.getItem("selectedCurrencies");

    if (!storedBalance || !storedCurrencies) {
      navigate("/");
      return;
    }

    setBalance(storedBalance);
    setSelectedCurrencies(JSON.parse(storedCurrencies));
  }, [navigate]);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const balanceNum = parseFloat(balance);
        const rates = await getExchangeRates(
          "EUR",
          selectedCurrencies,
          balanceNum
        );
        setConversions(rates);
      } catch {
        setError(
          "Error al cargar las tasas de cambio. Por favor, intente nuevamente."
        );
      } finally {
        setLoading(false);
      }
    };

    if (balance && selectedCurrencies.length > 0) {
      fetchRates();
    }
  }, [balance, selectedCurrencies]);

  const handleBack = () => {
    navigate("/");
  };

  if (loading) {
    return (
      <div className="w-full mx-auto p-8 bg-[#240837] rounded-lg border border-[#87e2ae] shadow-lg">
        <div className="text-white text-center">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto p-8 bg-[#240837] rounded-lg border border-[#87e2ae] shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-8 text-white">
        Resultados
      </h1>

      <div className="space-y-6">
        <div className="bg-[#87e2ae]/10 p-4 rounded-lg">
          <h2 className="text-xl font-semibold text-white mb-2">
            Saldo en EUR
          </h2>
          <p className="text-2xl text-[#87e2ae]">
            €{parseFloat(balance).toFixed(2)}
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Conversiones</h2>
          {error ? (
            <div className="text-red-400 bg-red-900/20 p-3 rounded-md">
              {error}
            </div>
          ) : (
            <div className="grid gap-4">
              {conversions.map((conversion) => (
                <ResultCard
                  key={conversion.currency}
                  currency={conversion.currency}
                  rate={conversion.rate}
                  amount={conversion.amount}
                />
              ))}
            </div>
          )}
        </div>

        <button
          onClick={handleBack}
          className="w-full bg-[#87e2ae] text-[#240837] py-3 px-4 rounded-md hover:opacity-90 transition-colors font-medium"
        >
          Volver
        </button>
      </div>
    </div>
  );
};

export default Results;
