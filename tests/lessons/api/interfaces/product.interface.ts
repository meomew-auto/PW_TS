export type ProductType = 'bean' | 'equipment' | 'accessory';

export type RoastLevel = 'Light' | 'Medium' | 'Dark';

export type UnitType = 'kg' | 'piece' | 'box';

export interface FlavorProfile {
  acidity: number;
  bitterness: number;
  sweetness: number;
  floral: number;
  notes: string[];
}

export interface BrewingGuide {
  temperature: string;
  ratio: string;
  time: string;
  method: string;
}

export interface BeanSpecifications {
  region: string;
  altitude: string;
  processing: string;
  grade?: string;
  flavor_profile?: FlavorProfile;
  grind_options?: string[];
  weight_options?: number[];
  brewing_guide?: BrewingGuide;
}

export interface EquipmentSpecifications {
  brand: string;
  model: string;
  type?: string;
  power?: string;
  voltage?: string;
  burr_type?: string;
  grind_settings?: string;
  capacity?: string;
  features?: string[];
  includes?: string[];
  color_options?: string[];
}

export interface Product {
  id: number;
  name: string;
  type: string;
  unit_type?: string;
  origin?: string;
  description?: string;
  roast_level?: RoastLevel;
  price_per_unit: number;
  warranty_months?: number;
  image_url?: string;
  gallery?: string[];
  specifications: BeanSpecifications | EquipmentSpecifications;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductCreate {
  name: string;
  type: ProductType;
  price_per_unit: number;
  unit_type?: UnitType;
  origin?: string;
  description?: string;
  roast_level?: RoastLevel;
  warranty_months?: number;
  specifications: BeanSpecifications | EquipmentSpecifications;
}

export interface ProductUpdate extends ProductCreate {}

export interface ProductPatch {
  name?: string;
  type?: ProductType;
  price_per_unit?: number;
  unit_type?: string;
  origin?: string;
  description?: string;
  roast_level?: RoastLevel;
  warranty_months?: number;
  specifications?: BeanSpecifications | EquipmentSpecifications;
  is_active?: boolean;
}

export interface Pagination {
  page: number;
  limit: number;
  total_items: number;
  total_pages: number;
}

export interface PaginationResponse<T> {
  data: T[];
  pagination: Pagination;
}
