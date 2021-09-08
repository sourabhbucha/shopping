import React , {useState, useEffect} from "react";
import './App.css';
import { Data } from "./Data";

function App() {
  const [products,setProducts] = useState(Data);
  const [cart,setCart] = useState([]);

  useEffect(()=>{
    console.log(cart)
  })

  const btn = (x) =>{
    if(x === 0){
      return <p>Add to Cart</p>
    }else{
      return <p>Already in the cart</p>
    }
  }
  const disable_btn = (x) => {
    if( x === 0) {return false;}
    else{
      return true;
    }
  }

  const onAdd = (product) => {
    const exist = cart.find((x) => x.id === product.id);
      setCart(
        cart.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
  };

  const onRemove = (product) => {
    const exist = cart.find((x) => x.id === product.id);
    if (exist.qty === 1) {
      setCart(cart.filter((x) => x.id !== product.id));
      setProducts(
        products.map((x) =>
          x.id === product.id ? { ...exist, qty: 0 } : x
        )
      );
    } else {
      setCart(
        cart.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };

  return (
    <div className="App">
      <div className="navbar">
        <a href="#" onClick={()=>{document.getElementById("cart").style.display = "grid";}}>Cart {cart.length}</a>
      </div>
    <div className="content">
      <div className="sidebar">
    
      </div>
      <div className="items">
        {products.map((product) => (
          <div className="product" key={product.id}>
            <img src={product.img_src} alt="" />
            <p>{product.name}</p>
            <span>{product.price}</span>
            <button onClick = {() => {
              product.qty=1;
              setCart([...cart, product]);
            }} disabled={disable_btn(product.qty)}> {btn(product.qty)} </button>
          </div>
        ))} 
      </div>
    </div>

    <div className="cart" id="cart">
      <button onClick={()=>{document.getElementById("cart").style.display = "none";}}>Close</button>
        <div className="cartItems">
          {cart.map((product) => (
            <div className="cart_item" key={product.id}>
              <img src={product.img_src} alt="" />
              <p>{product.name}</p>
              <span>{product.price}</span>
              <button className="less" onClick = {() => onRemove(product)}>-</button>
                {product.qty}
              <button className="more" onClick = {() => onAdd(product)}>+</button>
            </div>
          ))} 
        </div>
    </div>  

    </div>
  );
}

export default App;
