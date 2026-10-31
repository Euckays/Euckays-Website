// Shapes returned by the Euckays API (github.com/Euckays/Backend). Money is in naira as plain
// numbers; dates are ISO strings.

export type ProductCategory = "HAIRCARE" | "SKINCARE";

export type OrderStatus =
  | "PENDING_PAYMENT"
  | "PAID"
  | "PROCESSING"
  | "READY_FOR_DISPATCH"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED"
  | "REFUNDED";

export type ProductImage = {
  id: string;
  url: string;
  altText: string;
  position: number;
  productId: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  price: number;
  compareAtPrice: number | null;
  shortDescription: string;
  description: string;
  keyBenefits: string[];
  keyIngredients: string[];
  howToUse: string;
  suitableFor: string;
  size: string;
  cautionInfo: string | null;
  stock: number;
  isActive: boolean;
  seoTitle: string | null;
  seoDescription: string | null;
  images: ProductImage[];
  createdAt: string;
  updatedAt: string;
};

export type OrderItem = {
  id: string;
  orderId: string;
  productId: string | null;
  name: string;
  price: number;
  quantity: number;
};

export type Order = {
  id: string;
  orderNumber: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  state: string;
  city: string;
  deliveryInstructions: string | null;
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  paymentReference: string | null;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
};

/** Public order confirmation data: no contact details or payment reference. */
export type OrderConfirmation = Pick<
  Order,
  "orderNumber" | "status" | "customerName" | "address" | "city" | "state" | "subtotal" | "deliveryFee" | "total" | "createdAt"
> & { items: Pick<OrderItem, "id" | "productId" | "name" | "price" | "quantity">[] };

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  createdAt: string;
};

export type VendorApplication = {
  id: string;
  name: string;
  businessName: string;
  phone: string;
  email: string;
  location: string;
  businessType: string;
  productsOfInterest: string;
  expectedVolume: string | null;
  createdAt: string;
};

export type AdminOverview = {
  productCount: number;
  paidOrders: number;
  pendingOrders: number;
  lowStock: number;
  lowStockThreshold: number;
  messageCount: number;
  vendorCount: number;
  revenue: number;
};
