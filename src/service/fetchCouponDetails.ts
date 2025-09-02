import { api, Coupon } from "@/lib/api";

export async function fetchCouponDetails(slug: string) {
  try {
    const response = await api<Coupon>({
      method: "GET",
      endpoint: `public/v4.1/loyalty/cuponeria/offer`,
      params: { slug },
    });

    return response.data;
  } catch (err: any) {
    throw new Error(err.message || "Failed to fetch coupon details");
  }
}
