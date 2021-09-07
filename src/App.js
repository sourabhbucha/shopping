import React , {useState, useEffect} from "react";
import './App.css';
import { Data } from "./Data";

function App() {
  const [products,setProducts] = useState(Data);
  const [cart,setCart] = useState([]);

  useEffect(()=>{
    console.log(cart.length)
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

  return (
    <div className="App">
      <div className="navbar">

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
    </div>
  );
}

export default App;
