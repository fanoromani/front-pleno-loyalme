import { Coupon } from "@/lib/api";
import { fetchCouponCode } from "@/service/fetchCouponCode";
import { fetchCouponDetails } from "@/service/fetchCouponDetails";
import { create } from "zustand";

interface CouponModalState {
  slug: string | null;
  code: string | null | undefined;
  coupon: Coupon | null;
  loading: boolean;
  openCouponModal: (slug: string, code?: string | null) => void;
  closeCouponModal: () => void;
}

export const useCouponModalStore = create<CouponModalState>((set) => ({
  slug: null,
  code: null,
  coupon: null,
  loading: false,
  openCouponModal: async (slug) => {
    set({ loading: true, slug, coupon: null, code: null });

    try {
      const couponCode = await fetchCouponCode(slug);
      const couponDetails = await fetchCouponDetails(slug);

      set({
        code: couponCode,
        coupon: couponDetails,
        loading: false,
      });
    } catch (err) {
      console.error(err);
      set({ loading: false });
    }
  },
  closeCouponModal: () =>
    set(() => ({
      slug: null,
      code: null,
    })),
}));
