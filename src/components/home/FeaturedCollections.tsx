import { Link } from "react-router-dom";
import { featuredCollections } from "@/data/products";

const FeaturedCollections = () => (
  <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
    <div className="text-center mb-10">
      <h2 className="text-3xl sm:text-4xl font-display font-semibold text-foreground">
        Featured Collections
      </h2>
      <p className="mt-2 text-muted-foreground font-body">
        Explore our most popular curated collections
      </p>
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {featuredCollections.map((col) => (
        <Link
          key={col.slug}
          to={`/collections/${col.slug}`}
          className="group relative overflow-hidden aspect-square"
        >
          <img
            src={col.image}
            alt={col.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-foreground/30 group-hover:bg-foreground/40 transition-colors" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h3 className="text-sm sm:text-base font-display font-semibold text-background text-center px-2">
              {col.title}
            </h3>
          </div>
        </Link>
      ))}
    </div>
  </section>
);

export default FeaturedCollections;
