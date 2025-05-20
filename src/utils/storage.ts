const STORAGE_KEYS = {
  BALANCE: "balance",
  SELECTED_CURRENCIES: "selectedCurrencies",
} as const;

export const getStoredBalance = (): string => {
  return localStorage.getItem(STORAGE_KEYS.BALANCE) || "";
};

export const setStoredBalance = (balance: string): void => {
  localStorage.setItem(STORAGE_KEYS.BALANCE, balance);
};

export const getStoredCurrencies = (): string[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.SELECTED_CURRENCIES);
  return stored ? JSON.parse(stored) : [];
};

export const setStoredCurrencies = (currencies: string[]): void => {
  localStorage.setItem(
    STORAGE_KEYS.SELECTED_CURRENCIES,
    JSON.stringify(currencies)
  );
};
