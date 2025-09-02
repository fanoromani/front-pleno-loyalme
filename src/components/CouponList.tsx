"use client";

import { Coupon } from "@/lib/api";
import { fetchCouponCode } from "@/service/fetchCouponCode";
import { useState } from "react";
import { CouponCard } from "./CouponCard";
import CouponModal from "./CouponModal";

export default function CouponList({ coupons }: { coupons: Coupon[] }) {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [couponCode, setCouponCode] = useState<string | null | undefined>(null);

  const pickCoupon = async (slug: string) => {
    const response = await fetchCouponCode(slug);
    setCouponCode(response?.code);
    return response;
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      {coupons.map((coupon) => (
        <button
          key={coupon.id}
          onClick={() => {
            setSelectedSlug(coupon.slug);
            pickCoupon(coupon.slug);
          }}
          className="cursor-pointer"
        >
          <CouponCard coupon={coupon} />
        </button>
      ))}

      {selectedSlug && (
        <CouponModal
          slug={selectedSlug}
          code={couponCode}
          onClose={() => setSelectedSlug(null)}
        />
      )}
    </div>
  );
}
