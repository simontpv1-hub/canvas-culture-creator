export interface NavItem {
  label: string;
  href?: string;
  dropdown?: { label: string; href: string }[];
}

export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Shop All", href: "/collections/all" },
  { label: "New Releases", href: "/collections/new-releases" },
  { label: "Best Sellers", href: "/collections/best-sellers" },
  {
    label: "Mood & Style",
    dropdown: [
      { label: "Dark & Gloomy", href: "/collections/dark-gloomy" },
      { label: "Aesthetic Art", href: "/collections/aesthetic-art" },
      { label: "Modern Monochrome", href: "/collections/modern-monochrome" },
      { label: "Stockholm Design", href: "/collections/stockholm-design" },
      { label: "Beach House", href: "/collections/beach-house" },
    ],
  },
  {
    label: "Culture",
    dropdown: [
      { label: "The New Yorker", href: "/collections/the-new-yorker" },
      { label: "Travel", href: "/collections/travel" },
      { label: "Cars", href: "/collections/cars" },
    ],
  },
  {
    label: "Movie Posters",
    dropdown: [
      { label: "1950s", href: "/collections/movie-posters-1950s" },
      { label: "1960s", href: "/collections/movie-posters-1960s" },
      { label: "1970s", href: "/collections/movie-posters-1970s" },
      { label: "1980s", href: "/collections/movie-posters-1980s" },
      { label: "1990s", href: "/collections/movie-posters-1990s" },
    ],
  },
  {
    label: "Spaces",
    dropdown: [
      { label: "Bar", href: "/collections/bar" },
      { label: "Kitchen", href: "/collections/kitchen" },
      { label: "Bathroom", href: "/collections/bathroom" },
      { label: "Bedroom", href: "/collections/bedroom" },
      { label: "Living Room", href: "/collections/living-room" },
    ],
  },
  {
    label: "Artists",
    dropdown: [
      { label: "Claude Monet", href: "/collections/artist-monet" },
      { label: "Vincent Van Gogh", href: "/collections/artist-van-gogh" },
      { label: "Ansel Adams", href: "/collections/artist-ansel-adams" },
      { label: "Keith Haring", href: "/collections/artist-keith-haring" },
      { label: "Yayoi Kusama", href: "/collections/artist-yayoi-kusama" },
      { label: "Henri Matisse", href: "/collections/artist-henri-matisse" },
      { label: "Picasso", href: "/collections/artist-picasso" },
    ],
  },
  { label: "About", href: "/about" },
  {
    label: "Help",
    dropdown: [
      { label: "Shipping & Returns", href: "/shipping-returns" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact Us", href: "/contact" },
      { label: "Size Guide", href: "/size-guide" },
    ],
  },
];
