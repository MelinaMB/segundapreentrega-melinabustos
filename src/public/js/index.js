/*
  front socket del lado del cliente que se va a conectar con 
  socket del lado del servidor
 */
const socket = io();

// tengo que recibir los datos del back
socket.on("msg_back_to_front", products => {
  
});


const form = document.getElementById('formulario-productos'); 
const inputTitle = document.getElementById('title');
const inputDescription = document.getElementById('description');
const inputCode = document.getElementById('code');
const inputPrice = document.getElementById('price');
const inputStatus = document.getElementById('status');
const inputStock = document.getElementById('stock');
const inputCategory = document.getElementById('category');
const inputThumbnails = document.getElementById('thumbnails');
const div = document.getElementById('productos')

// creo un nuevo producto
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const newProduct = {
    title: inputTitle.value,
    description: inputDescription.value,
    code: inputCode.value,
    price: +inputPrice.value,
    status: inputStatus.value,
    stock: +inputStock.value,
    category: inputCategory.value,
    thumbnails: inputThumbnails.value
  } 
 
  // envio el nuevo producto al back
  socket.emit('new product', newProduct);
});

// el front recibe el producto creado  mas los otros productos
socket.on('new product', (productosTotal) => {
  console.log(productosTotal)
  let productVista = "";
  productosTotal.forEach(producto => {
    productVista += "<ul>";
    productVista += "<li>" + "Title:" + producto.title +"</li>";
    productVista += "<li>" + "Description:" + producto.description +"</li>";
    productVista += "<li>" + "Code:" + producto.code +"</li>";
    productVista += "<li>" + "Price:" + producto.price +"</li>";
    productVista += "<li>" + "Status:" + producto.status +"</li>";
    productVista += "<li>" + "Stock:" + producto.stock +"</li>";
    productVista += "<li>" + "Category:" + producto.category +"</li>";
    productVista += "<li>" + "Thumbnails:"+ producto.thumbnails  +"</li>";
    productVista += "<li>" + "id:" + producto.id + "</li>";
    productVista += "</ul>";
  });
  const productTodos = document.getElementById("productos");
  productTodos.innerHTML = productVista;
});


