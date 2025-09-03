"use client";

import { useCouponModalStore } from "@/store/useCouponModalStore";
import Image from "next/image";
import { useCallback, useMemo } from "react";

export default function CouponModal() {
  const { closeCouponModal, coupon, slug, code, loading } =
    useCouponModalStore();

  const displayCode = useMemo(() => {
    return !code || code === "NOCODE" ? "" : code;
  }, [code]);

  const copyCode = useCallback(async () => {
    if (displayCode) {
      await navigator.clipboard.writeText(displayCode);
    }
  }, [displayCode]);

  const redirectToStore = useCallback(() => {
    const targetUrl = coupon?.url || coupon?.store.url;
    if (targetUrl) {
      window.open(targetUrl, "_blank");
    }
  }, [coupon]);

  const handleClick = useCallback(async () => {
    await copyCode();
    redirectToStore();
  }, [copyCode, redirectToStore]);

  const hasDiscount = coupon?.discount !== 0;

  const hasCashback =
    coupon?.store.cashback && coupon.store.cashback.rate.current !== 0;

  const discountText = hasDiscount && (
    <span className="p-2 border rounded-full border-accent font-bold text-xs text-accent">
      {coupon?.discount}% OFF
    </span>
  );

  const cashbackText = hasCashback && (
    <span className="p-2 border rounded-full border-accent font-bold text-xs text-accent">
      {coupon.store.cashback.rate.current}% de cashback
    </span>
  );

  const footerText = `Cupom EXCLUSIVO ${
    hasDiscount ? `de ${coupon?.discount}% OFF` : ""
  } ${
    hasCashback ? `+ ${coupon.store.cashback.rate.current}% de cashback` : ""
  } em compras no site`;

  const displayButton = displayCode
    ? "Copiar e ir para a loja"
    : "Ir para a loja";

  if (!slug) return null;
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      onClick={closeCouponModal}
    >
      <div
        className="flex flex-col items-center bg-white rounded-2xl shadow-lg max-w-96 w-full absolute bottom-0 h-[426px]"
        onClick={(e) => e.stopPropagation()}
      >
        {loading && (
          <div className="h-10 w-10 rounded-full animate-spin border-t-2 border-r-2 border-accent mt-10" />
        )}

        {!loading && coupon && (
          <div className="flex flex-col gap-8 items-center">
            <div className="flex justify-center px-4 pt-9 gap-2">
              <Image
                src={coupon.store.logo}
                alt={coupon.title}
                width={80}
                height={80}
                className="rounded-full h-20 w-20"
              />
              <div className="flex flex-col gap-3">
                <div className="flex gap-2 h-fit font-bold text-xs text-accent text-center">
                  {discountText}
                  {cashbackText}
                </div>
                {footerText && <h2 className="text-text">{footerText}</h2>}
              </div>
            </div>
            <div className="flex items-center text-center h-[50px] w-xs border-2 border-accent rounded-full text-sm font-bold">
              {displayCode && (
                <p className="flex-grow text-text">{displayCode}</p>
              )}
              <button
                onClick={handleClick}
                className={`bg-accent text-white h-full cursor-pointer 
          ${displayCode ? "max-w-23 rounded-r-full" : "w-full rounded-full"}`}
              >
                {displayButton}
              </button>
            </div>
            <div className="flex flex-col h-[170px] overflow-scroll text-sm px-4 pt-5 pb-16 gap-3 bg-footer text-text">
              <h3 className="font-bold ">Regras de Uso</h3>
              <p>{coupon.rules}</p>
            </div>
          </div>
        )}

        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={closeCouponModal}
          aria-label="Fechar modal"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
