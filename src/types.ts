export interface Gift {
  id: string;
  name: string;
  image_url: string;
  link1: string;
  link2?: string;
  link3?: string;
  is_purchased: boolean;
  buyer_name?: string;
  buyer_phone?: string;
  buyer_message?: string;
  min_price?: number;
  max_price?: number;
}

export interface NewGift {
  name: string;
  image_url: string;
  link1: string;
  link2?: string;
  link3?: string;
  min_price?: number;
  max_price?: number;
}