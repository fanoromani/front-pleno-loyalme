import { api } from "@/lib/api";

export async function fetchCouponCode(slug: string) {
  try {
    const response = await api<{ code: string }>({
      method: "GET",
      endpoint: `public/v4.1/loyalty/cuponeria/offer/pick`,
      params: { slug },
    });

    return response.data;
  } catch (err: any) {
    throw new Error(err.message || "Failed to fetch coupon code");
  }
}
