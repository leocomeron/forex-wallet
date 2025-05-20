import type { ChangeEvent } from "react";

interface InitialBalanceProps {
  balance: string;
  onBalanceChange: (value: string) => void;
}

const InitialBalanceInput = ({
  balance,
  onBalanceChange,
}: InitialBalanceProps) => {
  return (
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
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onBalanceChange(e.target.value)
        }
        className="w-full p-3 border border-mint rounded-md bg-blueberry text-white focus:ring-2 focus:ring-mint focus:border-mint outline-none transition placeholder-gray-400"
        placeholder="Ingresa tu saldo en EUR"
        step="0.01"
        min="0"
      />
    </div>
  );
};

export default InitialBalanceInput;
