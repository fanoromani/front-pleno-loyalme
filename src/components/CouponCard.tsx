import { Coupon } from "@/lib/api";
import Image from "next/image";

interface CouponCardProps {
  coupon: Coupon;
  onClick: (slug: string) => void;
}

export function CouponCard({ coupon, onClick }: CouponCardProps) {
  const footerText = `Cupom EXCLUSIVO ${
    coupon.discount ? `de ${coupon.discount.toString()}% OFF` : ""
  } ${
    coupon.cashback
      ? `+ ${coupon.cashback.rate.current.toString()}% de cashback`
      : ""
  } em compras no site do ${coupon.store.name}`;

  return (
    <button
      onClick={() => onClick(coupon.slug)}
      className="bg-white rounded-2xl p-6 gap-4 flex flex-col shadow-2xl max-w-xs cursor-pointer"
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
          {coupon.discount !== 0 && (
            <h1 className="font-bold px-3 text-xs border rounded-full text-red-500 text-center border-red-500">
              {coupon.discount.toString()}% OFF
            </h1>
          )}
          {coupon.cashback && (
            <p className="font-bold px-3 text-xs border rounded-full text-red-500 text-center border-red-500">
              {coupon.cashback.rate.current.toString()}% de cashback
            </p>
          )}
        </div>
      </div>
      <div className="h-1 w-full border-t-2 border-dashed border-[#EFEFEF]" />
      <div>
        <p className="text-[#2E3238]">{footerText}</p>
      </div>
    </button>
  );
}
