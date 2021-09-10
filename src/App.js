import React , {useState, useEffect} from "react";
import './App.css';
// import { Data } from "./Data";
import {csv} from 'd3';

function App() {
  const [products,setProducts] = useState([]);
  const [cart,setCart] = useState([]);
  // const [category,setCategory] = useState([])

  const [keyword,setKeyword] = useState('');

    useEffect (() => {
      if(keyword.length > 0 ){ 
        setProducts(products.filter((products) =>  products.name.toLowerCase().includes(keyword.toLowerCase()) || products.desc.toLowerCase().includes(keyword.toLowerCase()) ))
      }
      else{
        csv('/data.csv').then(data => {
      setProducts(data);
    })
      };
  },[keyword]); 


  useEffect(()=>{
    csv('/data.csv').then(data => {
      setProducts(data);
    })
  },[])

  const btn = (x) =>{
    if(x == 0){
      return <p><i className="fa fa-cart-plus" aria-hidden="true"></i></p>
    }else{
      return <p><i className="fa fa-cart-plus" aria-hidden="true"></i></p>
    }
  }
  const disable_btn = (x) => {
    if( x == 0) {return false;}
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
    var sumQty = 0;
    cart.map((x) => (
          sum = sum + x.qty * x.mrp
          )
        );
    cart.map((x) => (
          sumQty = sumQty + x.qty
          )
        );
    if (cart.length === 0){
      return <h1></h1> 
    }
    return (
      <div className="total">
        <h2>Total Qty: {sumQty}</h2> 
        <h2>Total Amount: {sum}</h2> 
        <button className="placeOrder">Place Order</button>
      </div>   
    );
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
        <a href="#" onClick={()=>{document.getElementById("cart").style.display = "grid";}}><i className="fa fa-shopping-cart" aria-hidden="true"></i> {cart.length}</a>
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
            <span><b>MRP</b> <i className="fa fa-inr" aria-hidden="true"></i> {product.mrp}</span>
            <h4>{product.discount}<b>% off</b></h4>
            <h5><b>Our Price : <i className="fa fa-inr" aria-hidden="true"></i></b>{product.mrp * (100-product.discount)*.01}</h5>
            <button href="#" onClick = {() => {
              product.qty=1;
              setCart([...cart, product]);
            }} disabled={disable_btn(product.qty)}> {btn(product.qty)} </button>
          </div>
        ))}  
      </div>
    </div>

    <div className="cart" id="cart">
      <a href="#" className="Close" onClick={()=>{document.getElementById("cart").style.display = "none";}}><i className="fa fa-times" aria-hidden="true"></i></a>
          {cart.length === 0 ? <h1 className="emptyCart">Empty Cart </h1> : <div className="cartItems"> 
          {cart.map((product) => (
            <div className="cart_item" key={product.id}>
              <img src={product.img_src} alt="" />
              <h1>{product.name}</h1>
              <h2>{product.mrp}</h2>
              <h3>{product.mrp * product.qty}</h3>
              <button className="less" onClick = {() => onRemove(product)}><i className="fa fa-minus-square-o" aria-hidden="true"></i></button>
                <h4>{product.qty}</h4>
              <button className="more" onClick = {() => onAdd(product)}><i className="fa fa-plus-square-o" aria-hidden="true"></i></button>
            </div>
          ))}
        </div>
          }
          {/* <br /> */}
        {total()}
    </div>  
    
    </div>
  );
}

export default App;
