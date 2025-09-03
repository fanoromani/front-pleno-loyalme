import CouponModal from "@/components/CouponModal";
import { useCouponModalStore } from "@/store/useCouponModalStore";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock do Zustand store
vi.mock("@/store/useCouponModalStore", () => ({
  useCouponModalStore: vi.fn(),
}));

const mockCoupon = {
  slug: "test-coupon",
  title: "10% OFF em eletrônicos",
  discount: 10,
  rules: "Use até 31/12/2025",
  url: "https://techstore.com",
  store: {
    name: "TechStore",
    logo: "/logo.png",
    cashback: { rate: { current: 5 } },
    url: "https://techstore.com",
  },
} as any;

describe("<CouponModal />", () => {
  const mockClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useCouponModalStore as any).mockReturnValue({
      slug: "test-coupon",
      code: "TESTCODE",
      coupon: mockCoupon,
      loading: false,
      closeCouponModal: mockClose,
    });
  });

  it("renderiza corretamente quando há um cupom", () => {
    render(<CouponModal />);

    expect(screen.getByText("10% OFF")).toBeInTheDocument();
    expect(screen.getByText("5% de cashback")).toBeInTheDocument();
    expect(
      screen.getByText(/Cupom EXCLUSIVO de 10% OFF \+ 5% de cashback/i)
    ).toBeInTheDocument();
    expect(screen.getByText("TESTCODE")).toBeInTheDocument();
    const linkButton = document.querySelector("Ir para a loja");
    expect(linkButton).not.toBeInTheDocument();
    expect(screen.getByText("Copiar e ir para a loja")).toBeInTheDocument();
  });

  it("chama closeCouponModal ao clicar no fundo ou botão de fechar", () => {
    render(<CouponModal />);

    fireEvent.click(screen.getByLabelText("Fechar modal"));
    expect(mockClose).toHaveBeenCalled();

    // resetar e testar clique no backdrop
    vi.clearAllMocks();
    const { container } = render(<CouponModal />);
    fireEvent.click(container.firstChild!);
    expect(mockClose).toHaveBeenCalled();
  });

  it("mostra spinner de loading quando loading é true", () => {
    (useCouponModalStore as any).mockReturnValue({
      slug: "test-coupon",
      code: null,
      coupon: null,
      loading: true,
      closeCouponModal: mockClose,
    });

    render(<CouponModal />);
    const spinner = document.querySelector(".animate-spin");
    expect(spinner).toBeInTheDocument();
  });

  it("não renderiza nada se slug é null", () => {
    (useCouponModalStore as any).mockReturnValue({
      slug: null,
      code: null,
      coupon: null,
      loading: false,
      closeCouponModal: mockClose,
    });

    const { container } = render(<CouponModal />);
    expect(container.firstChild).toBeNull();
  });

  it("abre link correto ao clicar no botão", async () => {
    const writeText = vi.fn();
    vi.stubGlobal("navigator", { clipboard: { writeText } } as any);

    render(<CouponModal />);
    fireEvent.click(screen.getByText("Copiar e ir para a loja"));

    expect(writeText).toHaveBeenCalledWith("TESTCODE");
  });
});
