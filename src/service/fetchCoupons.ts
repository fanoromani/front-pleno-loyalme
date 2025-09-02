import { api, Coupon } from "@/lib/api";

export async function fetchCoupons() {
  try {
    const response = await api<Coupon[]>({
      method: "GET",
      endpoint:
        "public/v4.2/loyalty/cuponeria/category/trend/offer/list?id=5827",
    });

    return response.data;
  } catch (err: any) {
    throw new Error(err.message || "Failed to fetch coupons");
  }
}
