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
  {
    label: "Best Sellers",
    megaMenu: [
      {
        heading: "Best Selling Subjects",
        links: [
          { label: "Cultural Icons", slug: "cultural-icons" },
          { label: "Music", slug: "music" },
          { label: "Movies & TV", slug: "movies-tv" },
          { label: "Cars", slug: "cars" },
          { label: "Christianity", slug: "christianity" },
          { label: "History", slug: "history" },
        ],
      },
      {
        heading: "Best Selling Styles",
        links: [
          { label: "Beach & Coastal", slug: "beach-coastal" },
          { label: "Vintage Art", slug: "vintage-art" },
          { label: "Landscapes", slug: "landscapes" },
          { label: "Floral & Garden", slug: "floral-garden" },
        ],
      },
      {
        heading: "Best Selling Artists",
        links: [
          { label: "Ansel Adams", slug: "ansel-adams" },
          { label: "Claude Monet", slug: "monet" },
          { label: "Vincent Van Gogh", slug: "van-gogh" },
        ],
      },
    ],
  },
  {
    label: "Subjects",
    megaMenu: [
      {
        heading: "Trending",
        links: [
          { label: "Cultural Icons", slug: "cultural-icons" },
          { label: "Movies & TV", slug: "movies-tv" },
          { label: "Music", slug: "music" },
          { label: "Trendy Art", slug: "trendy-art" },
        ],
      },
      {
        heading: "Popular",
        links: [
          { label: "Animals", slug: "animals" },
          { label: "Cars", slug: "cars" },
          { label: "Sports", slug: "sports" },
          { label: "Vintage Art", slug: "vintage-art" },
        ],
      },
      {
        heading: "Best Sellers",
        links: [
          { label: "Christianity", slug: "christianity" },
          { label: "Dogs", slug: "dogs" },
          { label: "History", slug: "history" },
          { label: "Horses", slug: "horses" },
          { label: "Smoking & Cigars", slug: "smoking" },
          { label: "Bar Decor", slug: "bar-decor" },
          { label: "Bathroom", slug: "bathroom" },
        ],
      },
    ],
  },
  {
    label: "Styles",
    megaMenu: [
      {
        heading: "Popular",
        links: [
          { label: "Beach & Coastal", slug: "beach-coastal" },
          { label: "Farmhouse", slug: "farmhouse" },
          { label: "Vintage", slug: "vintage-art" },
          { label: "Western", slug: "western" },
        ],
      },
      {
        heading: "Decor Styles",
        links: [
          { label: "Forests, Lakes & Cabins", slug: "forests-lakes" },
          { label: "Floral & Garden", slug: "floral-garden" },
          { label: "Landscapes", slug: "landscapes" },
          { label: "Seascapes", slug: "seascapes" },
        ],
      },
      {
        heading: "Art Styles",
        links: [
          { label: "Abstract", slug: "abstract" },
          { label: "Impressionism", slug: "impressionism" },
          { label: "Modern", slug: "modern" },
        ],
      },
    ],
  },
  {
    label: "Rooms",
    dropdown: [
      { label: "Bathroom", slug: "bathroom" },
      { label: "Bedroom", slug: "bedroom" },
      { label: "Dining Room", slug: "dining-room" },
      { label: "Kitchen", slug: "kitchen" },
      { label: "Living Room", slug: "living-room" },
      { label: "Man Cave", slug: "man-cave" },
    ],
  },
  {
    label: "Colors",
    megaMenu: [
      {
        heading: "Main Colors",
        links: [
          { label: "Blue", slug: "color-blue" },
          { label: "Green", slug: "color-green" },
          { label: "Red", slug: "color-red" },
          { label: "Yellow", slug: "color-yellow" },
        ],
      },
      {
        heading: "Trending",
        links: [
          { label: "Beige", slug: "color-beige" },
          { label: "Orange", slug: "color-orange" },
          { label: "Purple", slug: "color-purple" },
        ],
      },
      {
        heading: "Blacks & Whites",
        links: [
          { label: "Black", slug: "color-black" },
          { label: "White", slug: "color-white" },
          { label: "Black & White", slug: "color-bw" },
        ],
      },
    ],
  },
  {
    label: "Artists",
    dropdown: [
      { label: "Ansel Adams", slug: "ansel-adams" },
      { label: "Caravaggio", slug: "caravaggio" },
      { label: "Claude Monet", slug: "monet" },
      { label: "Edgar Degas", slug: "degas" },
      { label: "Eugène Delacroix", slug: "delacroix" },
      { label: "Pierre-Auguste Renoir", slug: "renoir" },
      { label: "Vincent Van Gogh", slug: "van-gogh" },
    ],
  },
  { label: "About Us", href: "/about" },
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
