import React , {useState, useEffect} from "react";
import './App.css';
import { Data } from "./Data";

function App() {
  const [products,setProducts] = useState(Data);
  const [cart,setCart] = useState([]);
  // const [category,setCategory] = useState([])

  const [keyword,setKeyword] = useState('');

    useEffect (() => {
      if(keyword.length > 0 ){ 
        setProducts(products.filter((products) =>  products.name.toLowerCase().includes(keyword.toLowerCase()) || products.desc.toLowerCase().includes(keyword.toLowerCase()) ))
      }
      else{
        setProducts(Data)
      }
  },[keyword]); 


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

  const total = () =>{
    var sum = 0;
    cart.map((x) =>
          sum = sum + x.qty * x.price
        );
    return <h1>{sum}</h1>    
  }

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
        <input type="text" placeholder="Search..." name="search" className="search" value = {keyword} onChange={(e) => setKeyword(e.target.value)}/>  
        {/* <button type="submit" className="search_btn">search</button> */}
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
          {cart.length === 0 ? <h1>Empty Cart </h1> : <div className="cartItems"> 
          {cart.map((product) => (
            <div className="cart_item" key={product.id}>
              <img src={product.img_src} alt="" />
              <h1>{product.name}</h1>
              <h2>{product.price}</h2>
              <h3>{product.price * product.qty}</h3>
              <button className="less" onClick = {() => onRemove(product)}>-</button>
                {product.qty}
              <button className="more" onClick = {() => onAdd(product)}>+</button>
            </div>
          ))}
        </div>
          }
        {total()}
        <button className="placeOrder">Place Order</button>
    </div>  
    
    </div>
  );
}

export default App;
