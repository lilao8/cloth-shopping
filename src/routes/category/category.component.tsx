import { useParams } from "react-router-dom";
import { CategoriesContext } from "../../contexts/categories.context";
import ProductCard from "../../components/product-card/product-card.component"
import { useContext, useEffect, useState } from "react";
import "./category.styles.scss";

const Category = () => {
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);
  // @ts-ignore
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    // @ts-ignore
    setProducts(categoriesMap[category]);
  },[category, categoriesMap]);

  return (
    <>
      {/*@ts-ignore*/}
      <h2 className="category-title">{category.toUpperCase()}</h2>
      <div className="category-container">
        {products &&
          // @ts-ignore
          products.map((product) => (
            // @ts-ignore
            <ProductCard key={product.id} product={product}/>
          ))}
      </div>
    </>
  )
};

export default Category;
