import type { Currency, ExchangeRate } from "../types";

const BASE_URL = "https://api.coinbase.com/v2";

export const getCurrencies = async (): Promise<Currency[]> => {
  try {
    const response = await fetch(`${BASE_URL}/currencies`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error al cargar las divisas", error);
    throw new Error("Error al cargar las divisas");
  }
};

export const getExchangeRate = async (
  fromCurrency: string,
  toCurrency: string
): Promise<number> => {
  try {
    const response = await fetch(
      `${BASE_URL}/prices/${fromCurrency}-${toCurrency}/spot`
    );
    const data = await response.json();
    return parseFloat(data.data.amount);
  } catch (error) {
    console.error("Error al cargar la tasa de cambio", error);
    throw new Error("Error al cargar la tasa de cambio");
  }
};

export const getExchangeRates = async (
  fromCurrency: string,
  toCurrencies: string[],
  amount: number
): Promise<ExchangeRate[]> => {
  try {
    const rates = await Promise.all(
      toCurrencies.map(async (currency) => {
        const rate = await getExchangeRate(fromCurrency, currency);
        return {
          currency,
          rate,
          amount: amount * rate,
        };
      })
    );
    return rates;
  } catch (error) {
    console.error("Error al cargar las tasas de cambio", error);
    throw new Error("Error al cargar las tasas de cambio");
  }
};
