import { CouponCard } from "@/components/CouponCard";
import { useCouponModalStore } from "@/store/useCouponModalStore";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const mockCoupon = {
  slug: "test-coupon",
  title: "10% OFF em eletrônicos",
  discount: 10,
  store: {
    name: "TechStore",
    logo: "/logo.png",
    cashback: {
      rate: { current: 5 },
    },
  },
} as any;

vi.mock("@/store/useCouponModalStore", () => {
  const openCouponModal = vi.fn();
  return {
    useCouponModalStore: () => ({ openCouponModal }),
    __esModule: true,
  };
});

describe("<CouponCard />", () => {
  it("calls openCouponModal when clicked", () => {
    const { openCouponModal } = useCouponModalStore();

    render(<CouponCard coupon={mockCoupon} />);
    fireEvent.click(screen.getByRole("button"));

    expect(openCouponModal).toHaveBeenCalledWith("test-coupon");
  });
});

describe("<CouponCard />", () => {
  it("renders discount and cashback badges when available", () => {
    render(<CouponCard coupon={mockCoupon} />);

    expect(screen.getByText("10% OFF")).toBeInTheDocument();
    expect(screen.getByText("5% de cashback")).toBeInTheDocument();
  });

  it("renders footer text correctly", () => {
    render(<CouponCard coupon={mockCoupon} />);

    expect(
      screen.getByText(
        /Cupom EXCLUSIVO de 10% OFF \+ 5% de cashback em compras no site do TechStore/i
      )
    ).toBeInTheDocument();
  });

  it("calls openCouponModal when clicked", () => {
    const openCouponModal = useCouponModalStore().openCouponModal;

    render(<CouponCard coupon={mockCoupon} />);

    fireEvent.click(screen.getByRole("button"));

    expect(openCouponModal).toHaveBeenCalledWith("test-coupon");
  });

  it("does not render discount badge if discount is 0", () => {
    const noDiscountCoupon = { ...mockCoupon, discount: 0 };
    render(<CouponCard coupon={noDiscountCoupon} />);

    expect(screen.queryByText(/OFF/)).not.toBeInTheDocument();
  });

  it("does not render cashback badge if cashback is 0", () => {
    const noCashbackCoupon = {
      ...mockCoupon,
      store: { ...mockCoupon.store, cashback: { rate: { current: 0 } } },
    };
    render(<CouponCard coupon={noCashbackCoupon} />);

    expect(screen.queryByText(/cashback/)).not.toBeInTheDocument();
  });
});
