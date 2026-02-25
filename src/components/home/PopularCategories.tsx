import { Link } from "react-router-dom";
import { popularCategories } from "@/data/products";

const PopularCategories = () => (
  <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
    <div className="text-center mb-10">
      <h2 className="text-3xl sm:text-4xl font-display font-semibold text-foreground">
        Popular Categories
      </h2>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {popularCategories.map((cat) => (
        <Link
          key={cat.slug}
          to={`/collections/${cat.slug}`}
          className="group relative overflow-hidden aspect-[4/3]"
        >
          <img
            src={cat.image}
            alt={cat.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-foreground/25 group-hover:bg-foreground/35 transition-colors" />
          <div className="absolute bottom-4 left-4">
            <h3 className="text-lg font-display font-semibold text-background">
              {cat.title}
            </h3>
          </div>
        </Link>
      ))}
    </div>
  </section>
);

export default PopularCategories;
