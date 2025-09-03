export interface Coupon {
  id: string;
  title: string;
  discount: number;
  slug: string;
  rules: string;
  url: string;
  cashback?: {
    type: string;
    rate: {
      current: number;
      previous: number;
    };
  };
  image: string;
  store: {
    logo: string;
    name: string;
    url: string;
    cashback: {
      type: string;
      rate: {
        current: number;
        previous: number;
      };
    };
  };
}

interface ApiRequestParams {
  method: "GET";
  endpoint: string;
  params?: { [key: string]: string | number };
}

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const api = async <T = any>({
  method,
  endpoint,
  params,
}: ApiRequestParams): Promise<{
  error: string | null;
  data: T | null;
  status: number;
}> => {
  try {
    const queryString = params
      ? "?" +
        new URLSearchParams(
          Object.entries(params).map(([k, v]) => [k, String(v)])
        ).toString()
      : "";

    const url = `${baseURL}${endpoint}${queryString}`;

    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const result = await fetch(url, options);

    if (!result.ok) {
      return {
        error: result.statusText,
        data: null,
        status: result.status,
      };
    }

    const response = await result.json();

    return {
      error: null,
      data: response.data,
      status: response.status,
    };
  } catch (e: any) {
    return {
      error: e.message || "Unexpected error",
      data: null,
      status: e.status || 500,
    };
  }
};
