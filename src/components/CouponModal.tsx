"use client";

import { Coupon } from "@/lib/api";
import { fetchCouponDetails } from "@/service/fetchCouponDetails";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";

interface CouponModalProps {
  slug: string | null;
  code: string | null | undefined;
  onClose: () => void;
}

export default function CouponModal({ slug, onClose, code }: CouponModalProps) {
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!slug) return;

    const fetchDetails = async () => {
      setLoading(true);
      try {
        const data = await fetchCouponDetails(slug);
        setCoupon(data);
      } catch (err) {
        console.error("Erro ao buscar detalhes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [slug]);

  if (!slug) return null;

  const hasDiscount = coupon?.discount !== 0;
  const hasCashback =
    coupon?.store.cashback && coupon.store.cashback.rate.current !== 0;

  const discountBadge = hasDiscount && (
    <div className="p-2 border rounded-full border-red-500 font-bold text-xs text-red-500">
      {coupon?.discount}% OFF
    </div>
  );

  const cashbackBadge = hasCashback && (
    <div className="p-2 border rounded-full border-red-500 font-bold text-xs text-red-500">
      {coupon.store.cashback.rate.current}% de cashback
    </div>
  );

  const footerText = `Cupom EXCLUSIVO ${
    hasDiscount ? `de ${coupon?.discount}% OFF` : ""
  } ${
    hasCashback ? `+ ${coupon.store.cashback.rate.current}% de cashback` : ""
  } em compras no site`;

  const displayCode = useMemo(() => {
    return !code || code === "NOCODE" ? "" : code;
  }, [code]);

  const displayButton = displayCode
    ? "Copiar e ir para a loja"
    : "Ir para a loja";

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

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      onClick={onClose}
    >
      <div
        className="flex flex-col items-center bg-white rounded-2xl shadow-lg max-w-96 w-full absolute bottom-0"
        onClick={(e) => e.stopPropagation()}
      >
        {loading && <p className="text-center">Carregando...</p>}

        {!loading && coupon && (
          <div className="flex flex-col gap-8 items-center">
            <div className="flex justify-center px-6 pt-6 gap-2">
              <Image
                src={coupon.store.logo}
                alt={coupon.title}
                width={80}
                height={80}
                className="rounded-full h-20 w-20"
              />
              <div className="flex flex-col gap-3">
                <div className="flex gap-2 h-fit font-bold text-xs text-red-500 text-center">
                  {discountBadge}
                  {cashbackBadge}
                </div>
                {footerText && <p className="text-[#2E3238]">{footerText}</p>}
              </div>
            </div>
            <div className="flex items-center text-center h-[50px] w-xs border-2 border-red-500 rounded-full text-sm font-bold">
              {displayCode && <p className="flex-grow">{displayCode}</p>}
              <button
                onClick={handleClick}
                className={`bg-red-500 text-white h-full cursor-pointer 
          ${displayCode ? "max-w-23 rounded-r-full" : "w-full rounded-full"}`}
              >
                {displayButton}
              </button>
            </div>
            <div className="flex flex-col text-sm p-4 gap-3 bg-[#F6F6F6]">
              <h3 className="font-bold ">Regras de Uso</h3>
              <p>{coupon.rules}</p>
            </div>
          </div>
        )}

        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
          aria-label="Fechar modal"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
