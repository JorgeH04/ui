import React from "react";
import { CartContext } from "../../context/cart";
import EmptyCart from "../../components/Cart/EmptyCart";
import CartItem from "../../components/Cart/CartItem";
import { Link } from "react-router-dom";
import {Select, Button, Modal, Input} from 'antd'
import PayPalButton from "./PayPalButton"
import { useMoralis } from 'react-moralis';

export default function Cart() {
  const { cart, total } = React.useContext(CartContext);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [delivery, setDelivery] = React.useState("");
  const {Moralis, currentAccount, chainId} = useMoralis();

  const handleOk = async () => {
    const web3 = await Moralis.enableWeb3();
    // Get The Price of MATIC
    const options = {
      address: "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
      chain: "eth"
    };
    const price = await Moralis.Web3API.token.getTokenPrice(options);
    const priceMatic = total / price.usdPrice;
    console.log(priceMatic)
    // Send Matic to book store owenr address
    const options1 = {
      type: "native", 
      amount: Moralis.Units.ETH(priceMatic), 
      receiver: "0x565B5d612323c42F335a75FA0f3576fbb54aE890"
    }
    let result = await Moralis.transfer(options1)
    //Save Transaction Details to DB
    const Transaction = Moralis.Object.extend("Transaction");
    const transaction = new Transaction();

    transaction.set("Customer", currentAccount);
    //transaction.set("Delivery", delivery);
    transaction.set("Product", total);

    transaction.save()
    setIsModalVisible(false);
  }




  if (cart.length === 0) {
    return <EmptyCart />;
  }

  return (
    <section className="cart-items section">
      <h2>Tu carro</h2>
      {cart.map(item => {
        return <CartItem key={item._id} {...item} />;
      })}
      <h2>total : $ {total}</h2>


         <button
            className="login"
            style={{ width: "100%", marginTop: "50px" }}
            onClick={()=>handleOk()}
          >
                 Buy Now
         </button>



       <Modal
        title="Purchase Product"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={()=>setIsModalVisible(false)}
      >
        <div style={{ display: "flex" }}>
          <img   alt="product" style={{ width: "200px" }}></img>
          <div>
            <h3>  </h3>
            <h2>$   </h2>
            <h4>Delivery Address</h4>
            <Input onChange={(value) => setDelivery(value.target.value)}></Input>
          </div>
        </div>
      </Modal>

      <PayPalButton total={total}/>
   
    </section>
  );
}
