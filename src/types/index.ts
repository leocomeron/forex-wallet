export interface Currency {
  id: string;
  name: string;
}

export interface ExchangeRate {
  currency: string;
  rate: number;
  amount: number;
}

export interface ResultCardProps {
  currency: string;
  rate: number;
  amount: number;
}

export interface CurrencySelectorProps {
  onCurrenciesChange: (currencies: string[]) => void;
}

export interface Conversion {
  currency: string;
  rate: number;
  amount: number;
}
