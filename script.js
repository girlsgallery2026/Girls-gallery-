const phone="9100686263";
const products=[
 {id:1,name:"Designer Jhumka Earrings",cat:"earrings",price:499,img:"assets/bangles-designer.jpg"},
 {id:2,name:"Colourful Designer Bangles",cat:"bangles",price:399,img:"assets/bangles-colourful.jpg"},
 {id:3,name:"Pastel Stone Bangles",cat:"bangles",price:449,img:"assets/bangles-pastel.jpg"},
 {id:4,name:"Crystal Gold Bangles",cat:"bangles",price:599,img:"assets/bangles-crystal.jpg"},
 {id:5,name:"Classic Gold Bangles",cat:"bangles",price:549,img:"assets/bangles-gold.jpg"},
 {id:6,name:"Designer Gold Finish Neck Set",cat:"necksets",price:699,img:"assets/bangles-designer.jpg"},
 {id:7,name:"Red & White Stone Bangles",cat:"bangles",price:499,img:"assets/bangles-pink.jpg"},
 {id:8,name:"Gold Grid Bangles",cat:"bangles",price:649,img:"assets/bangles-grid.jpg"},
 {id:9,name:"Traditional Designer Bangle Set",cat:"bangles",price:799,img:"assets/bangles-colour-pack.jpg"},
 {id:10,name:"Elegant Gold & Silver Bangles",cat:"bangles",price:599,img:"assets/bangles-striped.jpg"}
];
let cart=JSON.parse(localStorage.getItem("gg_cart")||"[]");
let orders=JSON.parse(localStorage.getItem("gg_orders")||"[]");
let feedback=JSON.parse(localStorage.getItem("gg_feedback")||"[]");

function $(id){return document.getElementById(id)}
function save(){localStorage.setItem("gg_cart",JSON.stringify(cart)); updateCartCount()}
function updateCartCount(){$("cartCount").textContent=cart.reduce((a,x)=>a+x.qty,0)}
function toggleMenu(){$("navlinks").classList.toggle("open")}
function hidePages(){document.querySelectorAll(".page").forEach(x=>x.classList.remove("active"))}
function showHome(){hidePages();$("home").classList.add("active");window.scrollTo(0,0)}
function showSection(id){hidePages();$(id).classList.add("active");if(id==="orders")renderOrders();if(id==="feedback")renderFeedback();if(id==="admin")renderAdmin();window.scrollTo(0,0)}
function showCategory(cat){hidePages();$("shop").classList.add("active");$("shopTitle").textContent=cat==="all"?"All Products":cat[0].toUpperCase()+cat.slice(1);renderProducts(cat)}
function searchProducts(q){hidePages();$("shop").classList.add("active");$("shopTitle").textContent="Search Results";renderProducts("all",q)}
function renderProducts(cat="all",q=""){let list=products.filter(p=>(cat==="all"||p.cat===cat)&&(!q||p.name.toLowerCase().includes(q.toLowerCase())));$("productGrid").innerHTML=list.length?list.map(p=>`<article class="card"><img src="${p.img}" alt="${p.name}"><div class="cardBody"><h3>${p.name}</h3><div class="price">₹${p.price}</div><p>Fashion accessory</p><button onclick="viewProduct(${p.id})">View</button> <button class="primary" onclick="addToCart(${p.id})">Add to Cart</button></div></article>`).join(""):"<div class='panel'><h2>No products found</h2></div>"}
function viewProduct(id){let p=products.find(x=>x.id===id);hidePages();$("product").classList.add("active");$("productDetail").innerHTML=`<div class="panel"><img src="${p.img}" style="width:100%;max-height:500px;object-fit:contain;border-radius:15px"><h1>${p.name}</h1><h2>₹${p.price}</h2><p>Beautiful fashion accessory from Girls Gallery.</p><button class="primary" onclick="addToCart(${p.id})">Add to Cart</button> <button onclick="showCategory('${p.cat}')">← Back</button></div>`}
function addToCart(id){let item=cart.find(x=>x.id===id);item?item.qty++:cart.push({id,qty:1});save();openCart()}
function openCart(){$("cartModal").classList.add("open");renderCart()}
function closeCart(){$("cartModal").classList.remove("open")}
function removeCart(id){cart=cart.filter(x=>x.id!==id);save();renderCart()}
function renderCart(){let total=0;let html=cart.length?cart.map(x=>{let p=products.find(z=>z.id===x.id),sub=p.price*x.qty;total+=sub;return `<div class="cartRow"><span>${p.name} × ${x.qty}</span><b>₹${sub}</b><button onclick="removeCart(${x.id})">Remove</button></div>`}).join(""):"<p>Your cart is empty.</p>";$("cartItems").innerHTML=html;$("cartTotal").textContent=`Total: ₹${total}`}
function checkout(){if(!cart.length)return alert("Your cart is empty.");let total=cart.reduce((s,x)=>s+products.find(p=>p.id===x.id).price*x.qty,0);let order={id:"GG"+Date.now(),date:new Date().toLocaleString(),items:cart.map(x=>({name:products.find(p=>p.id===x.id).name,qty:x.qty,price:products.find(p=>p.id===x.id).price})),total,status:"Order request received"};orders.unshift(order);localStorage.setItem("gg_orders",JSON.stringify(orders));cart=[];save();closeCart();alert("Thank you! Your order request has been received. Please contact Girls Gallery to confirm the order.");showSection("orders")}
function login(){let n=$("loginName").value.trim();if(!n){$("loginMsg").textContent="Please enter your name.";return}localStorage.setItem("gg_user",n);$("loginMsg").textContent=`Welcome, ${n}!`;setTimeout(showHome,500)}
function renderOrders(){let el=$("ordersList");el.innerHTML=orders.length?orders.map(o=>`<div class="cartRow"><span><b>${o.id}</b><br>${o.date}<br>${o.items.map(i=>i.name+" × "+i.qty).join(", ")}</span><b>₹${o.total}<br><small>${o.status}</small></b></div>`).join(""):"<p>No orders yet.</p>"}
function saveFeedback(){let n=$("fbName").value.trim()||"Customer",text=$("fbText").value.trim(),rating=$("fbRating").value;if(!text)return alert("Please write your feedback.");feedback.unshift({n,text,rating,date:new Date().toLocaleString()});localStorage.setItem("gg_feedback",JSON.stringify(feedback));$("fbText").value="";renderFeedback()}
function renderFeedback(){let el=$("feedbackList");el.innerHTML=feedback.length?"<h3>Recent feedback</h3>"+feedback.map(f=>`<div class="cartRow"><span><b>${f.n}</b> • ${"★".repeat(f.rating)}<br>${f.text}</span><small>${f.date}</small></div>`).join(""):"<p>No feedback yet.</p>"}
function renderAdmin(){renderOrders();renderFeedback();$("adminOrders").innerHTML=orders.length?orders.map(o=>`<div class="cartRow"><span>${o.id}<br>${o.items.map(i=>i.name+" × "+i.qty).join(", ")}</span><b>₹${o.total}</b></div>`).join(""):"<p>No order requests.</p>";$("adminFeedback").innerHTML=feedback.length?feedback.map(f=>`<div class="cartRow"><span>${f.n} • ${"★".repeat(f.rating)}<br>${f.text}</span></div>`).join(""):"<p>No feedback.</p>"}
const wa=`https://wa.me/91${phone}?text=Hello%20Girls%20Gallery,%20I%20would%20like%20to%20place%20an%20order.`;
$("waHome").href=wa;$("waContact").href=wa;
updateCartCount();renderFeedback();
function focusSearch(){document.getElementById('search').focus();window.scrollTo({top:0,behavior:'smooth'});}
