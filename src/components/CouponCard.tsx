"use client";

import { Coupon } from "@/lib/api";
import { useCouponModalStore } from "@/store/useCouponModalStore";
import Image from "next/image";

interface CouponCardProps {
  coupon: Coupon;
}

export function CouponCard({ coupon }: CouponCardProps) {
  const { openCouponModal } = useCouponModalStore();
  const hasDiscount = coupon.discount !== 0;
  const hasCashback =
    coupon.store.cashback && coupon.store.cashback.rate.current !== 0;

  const discountBadge = hasDiscount && (
    <span className="w-fit font-bold px-3 py-[5px] text-xs border rounded-full text-accent text-center border-accent">
      {coupon.discount}% OFF
    </span>
  );

  const cashbackBadge = hasCashback && (
    <span className="w-fit font-bold px-3 py-[5px] text-xs border rounded-full text-accent text-center border-accent">
      {coupon.store.cashback.rate.current}% de cashback
    </span>
  );

  const footerText = `Cupom EXCLUSIVO ${
    hasDiscount ? `de ${coupon.discount}% OFF` : ""
  } ${
    hasCashback ? `+ ${coupon.store.cashback.rate.current}% de cashback` : ""
  } em compras no site do ${coupon.store.name}`;

  return (
    <button
      onClick={() => openCouponModal(coupon.slug)}
      className="bg-white rounded-2xl p-6 gap-4 flex flex-col shadow-[3px_3px_10px_rgba(0,0,0,0.06)] max-w-xs cursor-pointer"
    >
      <div className="flex gap-2 items-center">
        <Image
          src={coupon.store.logo}
          alt={coupon.title}
          width={80}
          height={80}
          className="rounded-full"
        />
        <div className="flex flex-col gap-1">
          {discountBadge}
          {cashbackBadge}
        </div>
      </div>
      <div className="h-1 w-full border-t-2 border-dashed border-[#EFEFEF]" />
      <div>
        <h2 className="text-start text-text">{footerText}</h2>
      </div>
    </button>
  );
}
