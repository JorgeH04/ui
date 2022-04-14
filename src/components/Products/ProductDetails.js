import React from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../../context/products";
import { CartContext } from "../../context/cart";
import { useHistory } from "react-router-dom";
import Loading from "./Loading";
export default function ProductDetails() {
  const { _id } = useParams();
  const history = useHistory();

  const { products } = React.useContext(ProductContext);
  const { addToCart } = React.useContext(CartContext);
  const product = products.find(item => item._id === _id);

  const [details, setDetails] = React.useState([{title: "", price: "", amount: ""}]);
  const [price, setPrice] = React.useState();
  const [title, setTitle] = React.useState();
  const [amount, setAmount] = React.useState();

// accounts.map(({friends}) => friends)


 


  React.useEffect(() => {
    let prod = products.find(item => item._id === _id);
    setDetails(prod) 
  }, []);
 

  React.useEffect(() => {
    let vim = products.find(item => item._id === _id);
    let bb = vim.price
    setPrice(bb) 
  }, []);



  const handleCheckdos = (e) => {

    const checked = e.target.checked;

    if (checked) {
      let vv = products.find(item => item._id === _id);
      let ca = vv.price
      let car = vv.amountdos
      let val = ca + car
      console.log( ca + car)
      setPrice(ca + car)
    } else {
      let vc = products.find(item => item._id === _id);
      let cac = vc.price
       setPrice(cac)
    }
  };


  const handleCheck = (e) => {

    const checked = e.target.checked;

    if (checked) {
      let vv = products.find(item => item._id === _id);
      let ca = vv.price
      let car = vv.amount
      let val = ca + car
      console.log( ca + car)
      setPrice(ca + car)
      // setDetails({
      //   ...details,
      //   [e.target.name]: e.target.value
      // })   
    } else {
      let vc = products.find(item => item._id === _id);
      let cac = vc.price
       setPrice(cac)
    }
  };


  if (products.length === 0) {
    return <Loading />;
  } else {
    //const { image, title, price, description, amount } = product;


 


    
    return (
      <section className="single-product">
        <img     className="single-product-image" />
        <article>
          <h1>{title} </h1>
          <h2>${price}</h2>
          <p> </p>

          <div>
            <div>
              <input
                type="checkbox"
                name={details.price}
                value={details.val}
                onChange={(e) => handleCheck(e)}
              />
              <label htmlFor="double"></label>
            </div>
        </div>


          <div>
            <div>
              <input
                type="checkbox"
                name={details.price}
                value={details.val}
                onChange={(e) => handleCheckdos(e)}
              />
              <label htmlFor="double"></label>
            </div>
        </div>


          <button
            className="btn btn-primary btn-block"
            onClick={() => {
              addToCart( {...details, price, });
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
