import { CouponCard } from "@/components/CouponCard";
import { useCouponModalStore } from "@/store/useCouponModalStore";
import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
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

    const { getByRole } = render(<CouponCard coupon={mockCoupon} />);
    fireEvent.click(getByRole("button"));

    expect(openCouponModal).toHaveBeenCalledWith("test-coupon");
  });
});

describe("<CouponCard />", () => {
  it("renders discount and cashback badges when available", () => {
    const { getByText } = render(<CouponCard coupon={mockCoupon} />);

    expect(getByText("10% OFF")).toBeInTheDocument();
    expect(getByText("5% de cashback")).toBeInTheDocument();
  });

  it("renders footer text correctly", () => {
    const { getByText } = render(<CouponCard coupon={mockCoupon} />);

    expect(
      getByText(
        /Cupom EXCLUSIVO de 10% OFF \+ 5% de cashback em compras no site do TechStore/i
      )
    ).toBeInTheDocument();
  });

  it("calls openCouponModal when clicked", () => {
    const openCouponModal = useCouponModalStore().openCouponModal;

    const { getByRole } = render(<CouponCard coupon={mockCoupon} />);

    fireEvent.click(getByRole("button"));

    expect(openCouponModal).toHaveBeenCalledWith("test-coupon");
  });

  it("does not render discount badge if discount is 0", () => {
    const noDiscountCoupon = { ...mockCoupon, discount: 0 };
    const { queryByText } = render(<CouponCard coupon={noDiscountCoupon} />);

    expect(queryByText(/OFF/)).not.toBeInTheDocument();
  });

  it("does not render cashback badge if cashback is 0", () => {
    const noCashbackCoupon = {
      ...mockCoupon,
      store: { ...mockCoupon.store, cashback: { rate: { current: 0 } } },
    };
    const { queryByText } = render(<CouponCard coupon={noCashbackCoupon} />);

    expect(queryByText(/cashback/)).not.toBeInTheDocument();
  });
});
