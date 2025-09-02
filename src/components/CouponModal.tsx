"use client";

import { Coupon } from "@/lib/api";
import { fetchCouponDetails } from "@/service/fetchCouponDetails";
import Image from "next/image";
import { useEffect, useState } from "react";

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

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      onClick={onClose}
    >
      <div
        className="flex flex-col items-center bg-white rounded-2xl shadow-lg max-w-96 w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        {loading && <p className="text-center">Carregando...</p>}

        {!loading && coupon && (
          <div className="flex flex-col gap-4 items-center">
            <div className="flex justify-center p-6 gap-4">
              <Image
                src={coupon.store.logo}
                alt={coupon.title}
                width={124}
                height={100}
                className="rounded-full max-w-24 min-w-24"
              />
              <div className="flex flex-col gap-3">
                <div className="flex gap-2 h-fit font-bold text-xs text-red-500 text-center">
                  {coupon.discount !== 0 && (
                    <div className="p-2 border-1 rounded-full border-red-500">
                      <p>{coupon.discount.toString()}% OFF</p>
                    </div>
                  )}
                  {coupon.cashback && (
                    <div className="p-2 border-1 rounded-full border-red-500">
                      <p>
                        {coupon.cashback.rate.current.toString()}% de cashback
                      </p>
                    </div>
                  )}
                </div>
                {coupon.discount !== 0 &&
                  coupon.cashback?.rate.current !== 0 && (
                    <p>
                      Cupom EXCLUSIVO de {coupon.discount.toString()}% +{" "}
                      {coupon.cashback
                        ? `${coupon.cashback.rate.current.toString()}%`
                        : "0%"}{" "}
                      de cashback em compras no site
                    </p>
                  )}
              </div>
            </div>
            <div className="flex items-center text-center border-2 border-red-500 rounded-full w-fit text-sm font-bold">
              <p className="flex-grow">
                {!code || code === "NOCODE" ? "Código não encontrado" : code}
              </p>
              <button className="bg-red-500 text-white max-w-1/3 h-full rounded-r-full">
                Copiar e ir para a loja
              </button>
            </div>
            <div className="text-sm p-4 whitespace-pre-line bg-gray-300">
              <h3 className="font-bold ">Regras de Uso</h3>
              <p>{coupon.rules}</p>
            </div>
          </div>
        )}

        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>
      </div>
    </div>
  );
}
