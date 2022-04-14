import React from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../../context/products";
import { CartContext } from "../../context/cart";
import { useHistory } from "react-router-dom";
import Loading from "./Loading";
export default function ProductDetails() {
  const { _id } = useParams();
  const history = useHistory();

  const { products, handleCheck, changePrice } = React.useContext(ProductContext);
  const { addToCart } = React.useContext(CartContext);
  const product = products.find(item => item._id === _id);
  if (products.length === 0) {
    return <Loading />;
  } else {
    const { image, title, price, description, amount } = product;


 console.log(product.price)



    
    return (
      <section className="single-product">
        <img src={image} alt={title} className="single-product-image" />
        <article>
          <h1>{title}</h1>
          <h2>${price}</h2>
          <p>{description}</p>

          <div >
          
            <div >
              <input
                type="checkbox"
           
                name={amount}
                onChange={(e) => handleCheck(e)}
              />
              <label htmlFor="double"></label>
            </div>
      
        </div>


          <button
            className="btn btn-primary btn-block"
            onClick={() => {
              addToCart(product);
              history.push("/cart");
            }}
          >
            Agregar al carro
          </button>
        </article>
      </section>
    );
  }
}
