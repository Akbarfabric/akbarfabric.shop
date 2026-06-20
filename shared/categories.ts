export interface SizeChartRow {
  size: string;
  chest: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  nameUrdu: string;
  description: string;
  sizeChart?: SizeChartRow[];
}

export const categories: Category[] = [
  {
    id: "lawn-print-3pc",
    slug: "lawn-print-3pc",
    name: "Lawn Print 3PC",
    nameUrdu: "لان پرنٹ 3 پیس",
    description: "Premium printed lawn, 3 piece suit (shirt, trouser, dupatta).",
  },
  {
    id: "lawn-print-2pc",
    slug: "lawn-print-2pc",
    name: "Lawn Print 2PC",
    nameUrdu: "لان پرنٹ 2 پیس",
    description: "Premium printed lawn, 2 piece suit (shirt, trouser).",
  },
  {
    id: "lawn-embroidered-3pc",
    slug: "lawn-embroidered-3pc",
    name: "Lawn Embroidered 3PC",
    nameUrdu: "لان ایمبرائیڈرڈ 3 پیس",
    description: "Embroidered front, daman and sleeves, 3 piece lawn suit.",
  },
  {
    id: "lawn-embroidered-2pc",
    slug: "lawn-embroidered-2pc",
    name: "Lawn Embroidered 2PC",
    nameUrdu: "لان ایمبرائیڈرڈ 2 پیس",
    description: "Embroidered lawn suit, 2 piece (shirt, trouser).",
  },
  {
    id: "stitch-suit-3pc",
    slug: "stitch-suit-3pc",
    name: "Stitch Suit 3PC",
    nameUrdu: "سلائی سوٹ 3 پیس",
    description: "Ready-to-wear stitched 3 piece suit, available in S / M / L.",
    sizeChart: [
      { size: "Small", chest: "21 inch" },
      { size: "Medium", chest: "22 inch" },
      { size: "Large", chest: "23 inch" },
    ],
  },
  {
    id: "palachi-shawls",
    slug: "palachi-branded-shawls",
    name: "Palachi Branded Shawls",
    nameUrdu: "پلاچی برانڈڈ شالز",
    description: "Branded Palachi shawls, soft texture and rich patterns.",
  },
  {
    id: "velvet-collection",
    slug: "velvet-collection",
    name: "Velvet Collection",
    nameUrdu: "ویلویٹ کلیکشن",
    description: "Luxurious velvet suits and shawls for winter and bridal wear.",
  },
  {
    id: "jacquard-3pc",
    slug: "jacquard-3pc",
    name: "Jacquard 3PC",
    nameUrdu: "جیکارڈ 3 پیس",
    description: "Woven jacquard fabric, 3 piece suit with refined texture.",
  },
  {
    id: "wool-shawls",
    slug: "wool-shawls",
    name: "Wool Shawls",
    nameUrdu: "اونی شالز",
    description: "Warm wool shawls, perfect for the winter season.",
  },
  {
    id: "bed-sheets",
    slug: "bed-sheets",
    name: "Bed Sheets",
    nameUrdu: "بیڈ شیٹس",
    description: "Comfortable, durable bed sheets in a variety of designs.",
  },
  {
    id: "ac-kamble",
    slug: "ac-kamble",
    name: "AC Kamble",
    nameUrdu: "اے سی کمبل",
    description: "Lightweight AC blankets, ideal for summer nights.",
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
