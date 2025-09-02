import { Coupon } from "@/lib/api";
import { CouponCard } from "./CouponCard";
import CouponModal from "./CouponModal";

export default function CouponList({ coupons }: { coupons: Coupon[] }) {
  return (
    <div className="flex flex-col gap-4 items-center">
      {coupons.map((coupon) => (
        <CouponCard key={coupon.id} coupon={coupon} />
      ))}
      <CouponModal />
    </div>
  );
}
