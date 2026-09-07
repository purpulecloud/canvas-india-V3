
const CART_KEY='canvasIndiaV3Cart';
let cart=JSON.parse(localStorage.getItem(CART_KEY)||'[]');
function saveCart(){localStorage.setItem(CART_KEY,JSON.stringify(cart));renderCart();document.querySelectorAll('[data-cart-count]').forEach(x=>x.textContent=cart.reduce((a,b)=>a+b.qty,0))}
function addToCart(item){const found=cart.find(x=>x.id===item.id);if(found)found.qty++;else cart.push({...item,qty:1});saveCart();openCart()}
function renderCart(){const box=document.querySelector('#cart-items');if(!box)return;box.innerHTML=cart.length?cart.map((x,i)=>`<div class="cardbody" style="border-bottom:1px solid var(--line)"><div style="display:flex;justify-content:space-between;gap:10px"><div><b>${x.name}</b><div class="small muted">${x.price} · Qty ${x.qty}</div></div><button class="iconbtn" onclick="removeCart(${i})">×</button></div></div>`).join(''):`<p class="muted">Your cart is waiting for something made personal.</p>`}
function removeCart(i){cart.splice(i,1);saveCart()}
function openCart(){document.querySelector('#cart-drawer')?.classList.add('open');document.querySelector('#overlay')?.classList.add('open');renderCart()}
function closeCart(){document.querySelector('#cart-drawer')?.classList.remove('open');document.querySelector('#overlay')?.classList.remove('open')}
document.addEventListener('DOMContentLoaded',()=>{saveCart();document.querySelectorAll('[data-open-cart]').forEach(x=>x.onclick=openCart);document.querySelector('#overlay')?.addEventListener('click',closeCart);document.querySelector('#mobile-toggle')?.addEventListener('click',()=>document.querySelector('#mobile-links')?.classList.toggle('hide'));document.querySelectorAll('[data-add]').forEach(btn=>btn.addEventListener('click',()=>addToCart({id:btn.dataset.id,name:btn.dataset.name,price:btn.dataset.price})));});
