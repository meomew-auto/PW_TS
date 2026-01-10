export interface Product {
  id: number;
  name: string;
  type: 'bean' | 'equipment' | 'accessory';
  unit_type: 'kg' | 'piece' | 'box';
  price_per_unit: number;
  description?: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface PaginationResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total_items: number;
    total_pages: number;
  };
}

// export interface ProductCreate {
//     name:
// }

// kg
// piece
// box

//  "data": [
//     {
//       "id": 30,
//       "name": "AeroPress Original + Travel Kit",
//       "type": "equipment",
//       "unit_type": "piece",
//       "description": "Bộ pha cà phê AeroPress Original kèm túi du lịch. Compact và versatile.",
//       "price_per_unit": 950000,
//       "warranty_months": 12,
//       "specifications": {
//         "brand": "AeroPress",
//         "model": "Original",
//         "brewing_methods": [
//           "Standard",
//           "Inverted",
//           "Cold brew"
//         ],
//         "capacity": "1-3 cups",
//         "brewing_time": "1-2 phút",
//         "filter_type": "Micro paper filters",
//         "origin": "USA",
//         "features": [
//           "BPA-free plastic",
//           "Portable",
//           "Easy cleanup",
//           "350+ included filters"
//         ],
//         "includes": [
//           "AeroPress",
//           "Paddle",
//           "Scoop",
//           "Funnel",
//           "Filter holder",
//           "350 filters",
//           "Tote bag"
//         ],
//         "color_options": [
//           "Gray/Black"
//         ]
//       },
//       "is_active": true,
//       "created_at": "2026-01-07T17:45:05Z",
//       "updated_at": "2026-01-07T17:45:05Z"
//     },
