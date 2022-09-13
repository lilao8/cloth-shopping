import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component"
import { useEffect, useState } from "react";
import "./category.styles.scss";
import { selectCategoriesMap } from "../../store/categories/category.selector";

const Category = () => {
  const { category } = useParams();
  const categoriesMap = useSelector(selectCategoriesMap);

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
