export {};

declare global {
  interface APIProduct {
    id: number;
    name: string;
    price: number;
    quantity: number;
    picture: string;
  }

  interface Product {
    id: number;
    name: string;
    price: number;
    quantity: number;
    picture: string;
    sold: number;
  }
}
