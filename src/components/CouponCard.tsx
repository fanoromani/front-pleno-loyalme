import { Coupon } from "@/lib/api";
import Image from "next/image";

interface CouponCardProps {
  coupon: Coupon;
}

export function CouponCard({ coupon }: CouponCardProps) {
  const footerText = `Cupom EXCLUSIVO ${
    coupon.discount ? `de ${coupon.discount.toString()}%` : ""
  } ${
    coupon.cashback
      ? `${coupon.cashback.rate.current.toString()}% de cashback`
      : ""
  } em compras no site do ${coupon.store.name}`;

  return (
    <div className="bg-white rounded-2xl p-5 gap-3 flex flex-col shadow-2xl max-w-xs">
      <div className="flex gap-5 items-center">
        <Image
          src={coupon.store.logo}
          alt={coupon.title}
          width={100}
          height={100}
          className="rounded-full"
        />
        <div className="flex flex-col gap-2">
          {coupon.discount !== 0 && (
            <h1 className="font-bold px-2 text-2xl border-2 rounded-full text-red-500 text-center border-red-500">
              {coupon.discount.toString()}% OFF
            </h1>
          )}
          {coupon.cashback && (
            <p className="font-bold px-2 text-sm border-2 rounded-full text-red-500 text-center border-red-500">
              {coupon.cashback.rate.current.toString()}% de cashback
            </p>
          )}
        </div>
      </div>
      <div className="h-1 w-full border-t-2 border-dashed border-gray-400" />
      <div>
        <p>{footerText}</p>
      </div>
    </div>
  );
}
