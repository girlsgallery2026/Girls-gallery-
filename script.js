const products = [
  {id:1,name:"Pearl Drop Earrings",category:"earrings",price:499,icon:"💎"},
  {id:2,name:"Rose Gold Hoops",category:"earrings",price:399,icon:"✨"},
  {id:3,name:"Classic Stone Bangles",category:"bangles",price:699,icon:"💫"},
  {id:4,name:"Floral Gold Bangles",category:"bangles",price:799,icon:"🌸"},
  {id:5,name:"Royal Necklace Set",category:"necksets",price:1499,icon:"💖"},
  {id:6,name:"Elegant Pearl Neck Set",category:"necksets",price:1199,icon:"👑"}
];

let cart = [];

function renderProducts(category="all"){
  const grid=document.getElementById("productGrid");
  const list=category==="all"?products:products.filter(p=>p.category===category);
  grid.innerHTML=list.map(p=>`
    <article class="product">
      <div class="product-image">${p.icon}</div>
      <div class="product-info">
        <div class="category">${p.category}</div>
        <h3>${p.name}</h3>
        <div class="price">₹${p.price.toLocaleString("en-IN")}</div>
        <button class="add-btn" onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    </article>`).join("");
}

function filterProducts(category,btn){
  document.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));
  btn.classList.add("active");
  renderProducts(category);
}

function addToCart(id){
  const item=products.find(p=>p.id===id);
  const existing=cart.find(p=>p.id===id);
  if(existing) existing.qty++;
  else cart.push({...item,qty:1});
  updateCart();
}

function updateCart(){
  document.getElementById("cartCount").textContent=cart.reduce((s,p)=>s+p.qty,0);
  const box=document.getElementById("cartItems");
  if(!cart.length){box.innerHTML="<p>Your cart is empty.</p>";}
  else box.innerHTML=cart.map(p=>`
    <div class="cart-row">
      <span>${p.name} × ${p.qty}</span>
      <span>₹${(p.price*p.qty).toLocaleString("en-IN")} <button class="remove" onclick="removeFromCart(${p.id})">Remove</button></span>
    </div>`).join("");
  document.getElementById("cartTotal").textContent=cart.reduce((s,p)=>s+p.price*p.qty,0).toLocaleString("en-IN");
}

function removeFromCart(id){cart=cart.filter(p=>p.id!==id);updateCart();}
function showCart(){updateCart();document.getElementById("cartModal").classList.remove("hidden");}
function closeCart(){document.getElementById("cartModal").classList.add("hidden");}

function checkout(){
  if(!cart.length){alert("Your cart is empty.");return;}
  alert("Thank you! Your order request has been received. Connect this button to a payment/order backend for real purchases.");
}

function sendMessage(e){
  e.preventDefault();
  alert("Thank you, " + document.getElementById("name").value + "! Your message has been received.");
  e.target.reset();
}

renderProducts();
updateCart();
