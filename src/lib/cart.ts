// Client-side cart using localStorage (replaces PHP session cart)
import { COURSES, type Course } from "../data/courses";

const CART_KEY = "integer_cart";
const CART_MODE_KEY = "integer_cart_mode";

export type PaymentMode = "full" | "monthly";

export interface CartItem {
  course: Course;
  quantity: number;
}

function getRawCart(): Record<string, number> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveRawCart(cart: Record<string, number>): void {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new CustomEvent("cart-updated"));
}

export function getCart(): CartItem[] {
  const raw = getRawCart();
  const items: CartItem[] = [];
  for (const [id, qty] of Object.entries(raw)) {
    const course = COURSES[id];
    if (course && qty > 0) {
      items.push({ course, quantity: qty });
    }
  }
  return items;
}

export function addToCart(courseId: string): boolean {
  if (!COURSES[courseId]) return false;
  const cart = getRawCart();
  cart[courseId] = 1; // Only allow qty 1 per course (same as PHP site)
  saveRawCart(cart);
  return true;
}

export function removeFromCart(courseId: string): void {
  const cart = getRawCart();
  delete cart[courseId];
  saveRawCart(cart);
}

export function clearCart(): void {
  localStorage.removeItem(CART_KEY);
  localStorage.removeItem(CART_MODE_KEY);
  window.dispatchEvent(new CustomEvent("cart-updated"));
}

export function getCartCount(): number {
  return Object.keys(getRawCart()).length;
}

export function getCartTotal(): number {
  return getCart().reduce(
    (sum, item) => sum + item.course.price * item.quantity,
    0,
  );
}

export function getCartMonthlyTotal(): number {
  return getCart().reduce(
    (sum, item) => sum + item.course.monthlyPrice * item.quantity,
    0,
  );
}

export function getCartCourseIds(): string[] {
  return Object.keys(getRawCart());
}

export function isInCart(courseId: string): boolean {
  return courseId in getRawCart();
}

export function getPaymentMode(): PaymentMode {
  if (typeof window === "undefined") return "full";
  return (localStorage.getItem(CART_MODE_KEY) as PaymentMode) || "full";
}

export function setPaymentMode(mode: PaymentMode): void {
  localStorage.setItem(CART_MODE_KEY, mode);
  window.dispatchEvent(new CustomEvent("cart-updated"));
}
