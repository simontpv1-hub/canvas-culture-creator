import catCars from "@/assets/cat-cars.jpg";
import catChristianity from "@/assets/cat-christianity.jpg";
import catSmoking from "@/assets/cat-smoking.jpg";
import catBathroom from "@/assets/cat-bathroom.jpg";
import catMusic from "@/assets/cat-music.jpg";
import catVintage from "@/assets/cat-vintage.jpg";
import catBar from "@/assets/cat-bar.jpg";
import catAnselAdams from "@/assets/cat-ansel-adams.jpg";
import catCities from "@/assets/cat-cities.jpg";
import catHistory from "@/assets/cat-history.jpg";
import catAnimals from "@/assets/cat-animals.jpg";

export interface Product {
  id: string;
  title: string;
  slug: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  hoverImage?: string;
  category: string[];
  tags: string[];
  sizes: { label: string; price: number }[];
  description: string;
  inStock: boolean;
}

export interface Collection {
  slug: string;
  title: string;
  image: string;
  count: number;
}

export const featuredCollections: Collection[] = [
  { slug: "music", title: "Music", image: catMusic, count: 245 },
  { slug: "christianity", title: "Christian Art", image: catChristianity, count: 189 },
  { slug: "vintage-art", title: "Vintage Art", image: catVintage, count: 312 },
  { slug: "cars", title: "Cars", image: catCars, count: 156 },
  { slug: "smoking", title: "Smoking & Cigars", image: catSmoking, count: 98 },
  { slug: "bar-decor", title: "Bar Decor", image: catBar, count: 134 },
  { slug: "ansel-adams", title: "Ansel Adams", image: catAnselAdams, count: 67 },
  { slug: "cities", title: "Cities", image: catCities, count: 203 },
  { slug: "history", title: "History", image: catHistory, count: 178 },
  { slug: "animals", title: "Animals", image: catAnimals, count: 267 },
];

export const popularCategories: Collection[] = [
  { slug: "bathroom", title: "Bathroom", image: catBathroom, count: 145 },
  { slug: "monet", title: "Monet", image: catVintage, count: 56 },
  { slug: "landscapes", title: "Landscapes", image: catAnselAdams, count: 389 },
  { slug: "van-gogh", title: "Van Gogh", image: catVintage, count: 48 },
  { slug: "maps", title: "Maps", image: catHistory, count: 92 },
  { slug: "world-war-two", title: "World War Two", image: catHistory, count: 67 },
];

const generateProducts = (): Product[] => {
  const templates = [
    { title: "Golden Hour Porsche 911", category: ["cars"], image: catCars, tags: ["best-seller", "cars"] },
    { title: "Guardian Angel", category: ["christianity"], image: catChristianity, tags: ["christianity", "best-seller"] },
    { title: "Jazz Club Noir", category: ["music"], image: catMusic, tags: ["music", "vintage"] },
    { title: "Tuscan Countryside", category: ["vintage-art"], image: catVintage, tags: ["vintage", "landscapes"] },
    { title: "Old Fashioned", category: ["bar-decor"], image: catBar, tags: ["bar-decor", "smoking"] },
    { title: "Half Dome Winter", category: ["ansel-adams"], image: catAnselAdams, tags: ["ansel-adams", "landscapes"] },
    { title: "Manhattan Skyline 1940", category: ["cities", "history"], image: catCities, tags: ["cities", "history"] },
    { title: "The Last Supper", category: ["christianity"], image: catChristianity, tags: ["christianity"] },
    { title: "Havana Smoke", category: ["smoking"], image: catSmoking, tags: ["smoking", "vintage"] },
    { title: "African Lion Portrait", category: ["animals"], image: catAnimals, tags: ["animals", "best-seller"] },
    { title: "Eucalyptus Dreams", category: ["bathroom"], image: catBathroom, tags: ["bathroom", "botanical"] },
    { title: "Victory at Austerlitz", category: ["history"], image: catHistory, tags: ["history"] },
    { title: "Ferrari 250 GTO", category: ["cars"], image: catCars, tags: ["cars"] },
    { title: "Saxophone Solo", category: ["music"], image: catMusic, tags: ["music"] },
    { title: "Yosemite Valley", category: ["ansel-adams"], image: catAnselAdams, tags: ["ansel-adams"] },
    { title: "Cigar Lounge", category: ["smoking", "bar-decor"], image: catSmoking, tags: ["smoking", "bar-decor"] },
  ];

  return templates.map((t, i) => ({
    id: `product-${i + 1}`,
    title: t.title,
    slug: t.title.toLowerCase().replace(/\s+/g, "-"),
    price: 49.99 + (i % 5) * 20,
    compareAtPrice: i % 3 === 0 ? 89.99 + (i % 5) * 20 : undefined,
    image: t.image,
    category: t.category,
    tags: t.tags,
    sizes: [
      { label: '12×16"', price: 49.99 },
      { label: '18×24"', price: 69.99 },
      { label: '24×36"', price: 99.99 },
      { label: '36×48"', price: 149.99 },
    ],
    description: "Museum-quality canvas print on premium cotton canvas. Hand-stretched over solid wood stretcher bars. Ready to hang. Made in USA.",
    inStock: true,
  }));
};

export const products = generateProducts();
