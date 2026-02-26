export interface MegaMenuColumn {
  heading: string;
  links: { label: string; slug: string }[];
}

export interface NavItem {
  label: string;
  href?: string;
  megaMenu?: MegaMenuColumn[];
  dropdown?: { label: string; slug: string; href?: string }[];
}

export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Shop All", href: "/collections/all" },
  { label: "New Releases", href: "/collections/new-releases" },
  { label: "Best Sellers", href: "/collections/best-sellers" },
  {
    label: "Collections",
    megaMenu: [
      {
        heading: "Mood & Style",
        links: [
          { label: "Dark & Gloomy", slug: "dark-gloomy" },
          { label: "Aesthetic Art", slug: "aesthetic-art" },
          { label: "Modern Monochrome", slug: "modern-monochrome" },
          { label: "Stockholm Design", slug: "stockholm-design" },
        ],
      },
      {
        heading: "Culture",
        links: [
          { label: "Movie Posters", slug: "movie-posters" },
          { label: "The New Yorker", slug: "the-new-yorker" },
          { label: "Vintage Travel", slug: "vintage-travel" },
          { label: "Cars", slug: "cars" },
        ],
      },
      {
        heading: "Spaces",
        links: [
          { label: "Bathroom Humor", slug: "bathroom-humor" },
          { label: "Bar Prints", slug: "bar-prints" },
          { label: "Kitchen Prints", slug: "kitchen-prints" },
          { label: "Beach House", slug: "beach-house" },
        ],
      },
    ],
  },
  {
    label: "Rooms",
    dropdown: [
      { label: "Bathroom", slug: "room-bathroom" },
      { label: "Bedroom", slug: "room-bedroom" },
      { label: "Kitchen", slug: "room-kitchen" },
      { label: "Living Room", slug: "room-living-room" },
      { label: "Man Cave", slug: "room-man-cave" },
      { label: "Dining Room", slug: "room-dining-room" },
    ],
  },
  {
    label: "Artists",
    dropdown: [
      { label: "Claude Monet", slug: "artist-monet" },
      { label: "Vincent Van Gogh", slug: "artist-van-gogh" },
      { label: "Ansel Adams", slug: "artist-ansel-adams" },
      { label: "Keith Haring", slug: "artist-keith-haring" },
      { label: "Yayoi Kusama", slug: "artist-yayoi-kusama" },
      { label: "Henri Matisse", slug: "artist-henri-matisse" },
      { label: "Picasso", slug: "artist-picasso" },
    ],
  },
  { label: "About", href: "/about" },
  {
    label: "Help",
    dropdown: [
      { label: "Shipping & Returns", slug: "shipping-returns", href: "/shipping-returns" },
      { label: "FAQ", slug: "faq", href: "/faq" },
      { label: "Contact Us", slug: "contact", href: "/contact" },
      { label: "Size Guide", slug: "size-guide", href: "/size-guide" },
    ],
  },
];
