import CouponList from "@/components/CouponList";
import { fetchCoupons } from "@/service/fetchCoupons";

export default async function Home() {
  const coupons = await fetchCoupons();

  if (!coupons?.length) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <h1 className="text-3xl font-bold underline my-8 text-center">
          Nenhum cupom disponível
        </h1>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="bg-background p-5">
        <CouponList coupons={coupons} />
      </div>
    </div>
  );
}
