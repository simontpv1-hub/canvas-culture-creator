export interface NavItem {
  label: string;
  href?: string;
  dropdown?: { label: string; href: string }[];
  megaMenu?: {
    columns: { heading: string; items: { label: string; href: string }[] }[];
  };
}

export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Shop All", href: "/collections/all" },
  { label: "Best Sellers", href: "/collections/best-sellers" },
  {
    label: "Format",
    dropdown: [
      { label: "Landscape (Horizontal)", href: "/collections/landscape" },
      { label: "Portrait (Vertical)", href: "/collections/portrait" },
    ],
  },
  {
    label: "Subjects",
    megaMenu: {
      columns: [
        {
          heading: "Popular Subjects",
          items: [
            { label: "Cars", href: "/collections/cars" },
            { label: "Animals", href: "/collections/animals" },
            { label: "Smoking", href: "/collections/smoking" },
            { label: "Sports", href: "/collections/sports" },
          ],
        },
        {
          heading: "Media & Entertainment",
          items: [
            { label: "Magazines", href: "/collections/magazines" },
            { label: "Music", href: "/collections/music" },
            { label: "Movies", href: "/collections/movies" },
          ],
        },
      ],
    },
  },
  {
    label: "Styles",
    dropdown: [
      { label: "Stockholm", href: "/collections/stockholm" },
      { label: "Beach", href: "/collections/beach" },
      { label: "Floral", href: "/collections/floral" },
      { label: "Vintage", href: "/collections/vintage" },
      { label: "Landscapes", href: "/collections/landscapes" },
    ],
  },
  {
    label: "Rooms",
    dropdown: [
      { label: "Bedroom", href: "/collections/bedroom" },
      { label: "Mancave", href: "/collections/mancave" },
      { label: "Bar", href: "/collections/bar" },
      { label: "Living Room", href: "/collections/living-room" },
      { label: "Bathroom", href: "/collections/bathroom" },
      { label: "Kitchen", href: "/collections/kitchen" },
      { label: "Gym", href: "/collections/gym" },
    ],
  },
  {
    label: "Artists",
    dropdown: [
      { label: "Picasso", href: "/collections/artist-picasso" },
      { label: "Claude Monet", href: "/collections/artist-monet" },
      { label: "Vincent Van Gogh", href: "/collections/artist-van-gogh" },
      { label: "Ansel Adams", href: "/collections/artist-ansel-adams" },
      { label: "Keith Haring", href: "/collections/artist-keith-haring" },
      { label: "Yayoi Kusama", href: "/collections/artist-yayoi-kusama" },
      { label: "Henri Matisse", href: "/collections/artist-henri-matisse" },
    ],
  },
  {
    label: "Ambiance",
    dropdown: [
      { label: "Dark & Gloomy", href: "/collections/dark-gloomy" },
      { label: "Aesthetic", href: "/collections/aesthetic-art" },
      { label: "Modern", href: "/collections/modern-monochrome" },
    ],
  },
  { label: "New Releases", href: "/collections/new-releases" },
  { label: "About Us", href: "/about" },
  {
    label: "Help",
    dropdown: [
      { label: "Order Tracking", href: "/contact" },
      { label: "Support", href: "/faq" },
      { label: "Shipping & Returns", href: "/shipping-returns" },
      { label: "Size Guide", href: "/size-guide" },
    ],
  },
];
