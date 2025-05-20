import type { ResultCardProps } from "../types";

const ResultCard = ({ currency, rate, amount }: ResultCardProps) => {
  return (
    <div className="bg-[#87e2ae]/10 p-4 rounded-lg">
      <div className="flex justify-between items-center">
        <span className="text-white">{currency}</span>
        <span className="text-[#87e2ae]">{amount.toFixed(2)}</span>
      </div>
      <div className="text-sm text-gray-300 mt-1">
        1 EUR = {rate.toFixed(4)} {currency}
      </div>
    </div>
  );
};

export default ResultCard;
