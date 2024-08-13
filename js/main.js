const shopContent = document.getElementById("shopContent")

const verCarrito = document.getElementById("verCarrito")

const modalContainer = document.getElementById("modalContainer")

const cantidadCarrito = document.getElementById("cantidadCarrito")

const productos = [
    {
      id:1,
      nombre: "Aceite",
      precio: 2000,
      img: "https://statics.dinoonline.com.ar/imagenes/large_460x460/2320008_l.jpg",
      cantidad: 1,
    },
    {
      id:2,
      nombre: "Galletas Dulces",
      precio: 1000,
      img: "https://www.elcomercio.com/wp-content/uploads/2022/09/galletas-700x391.jpg",
      cantidad: 1,
    },
    {
      id:3,
      nombre: "Azucar",
      precio: 800,
      img:"https://empresasiansa.cl/wp-content/uploads/2020/02/azucar.jpg",
      cantidad: 1,
    },
    {
      id:4,
      nombre: "Leche",
      precio: 1500,
      img:"https://acdn.mitiendanube.com/stores/093/780/products/serenisima-clasica-751-95fea92d1a27f8e9ab15710914346750-480-0.png",
      cantidad: 1,
    },
    {
      id:5,
      nombre: "Cafe",
      precio: 3500,
      img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_IzrYGIRUwOkCt-Owh-Jp2rK577LU1ad1EA&s",
      cantidad: 1,
    },
  ];

  let carrito = JSON.parse(localStorage.getItem ("carrito")) || [];

  productos.forEach((product) => {
    let content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
    <img src="${product.img}">
    <h3>${product.nombre}</h3>
    <p class="price">$ ${product.precio}</p>
    `;

    shopContent.append(content);

    let botonCompra = document.createElement("button");
    botonCompra.innerText = "Agregar";
    botonCompra.className = "boton-compra"


    content.append(botonCompra);

    botonCompra.addEventListener (("click"), () => {

    const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id);

    if(repeat) {
      carrito.map((prod) => {
        if(prod.id === product.id){
          prod.cantidad++
        }
      });
     
    
    } else{
      carrito.push({
        id: product.id,
        nombre: product.nombre,
        img:product.img,
        precio: product.precio,
        cantidad: product.cantidad,
      });

      carritoCounter();
      saveLocal();
  }
      
    }
     )
  }
  );

  const carritoFinal = () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `<h1 class=modal-header-title>Tu Compra</h1>`;
    modalContainer.append(modalHeader);

    const modalButton = document.createElement("h1");
    modalButton.className = "modal-button";
    modalButton.innerText = "X";
    modalButton.className = "modal-header-button";

    modalButton.addEventListener(("click"), () => {
      modalContainer.style.display = "none";
    })

    modalHeader.append(modalButton)

    carrito.forEach((product) => {
      let carritoContent = document.createElement("div");
      carritoContent.className = "modal-content";
      carritoContent.innerHTML =`
    <img src="${product.img}">
    <h3>${product.nombre}</h3>
    <p class="price">$ ${product.precio}</p>
    <span class="restar"> - </span>
    <p>Cantidad: ${product.cantidad}</p>
    <span class="sumar"> + </span>
    <p>Total: ${product.cantidad * product.precio}</p>
    `;

    modalContainer.append(carritoContent);

    let restar = carritoContent.querySelector(".restar");

    restar.addEventListener("click", () => {
      if (product.cantidad !==1) {
        product.cantidad--;
      }
      carritoFinal();
    });

    let sumar = carritoContent.querySelector(".sumar");

    sumar.addEventListener ("click", () => {
      product.cantidad++;
      carritoFinal();
    })

    let eliminar = document.createElement ("span");
    eliminar.innerText = "❎";
    eliminar.className = "eliminar-boton";
    carritoContent.append(eliminar);

    eliminar.addEventListener("click", eliminarProducto); 
    })

    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
    
    const totalCompra = document.createElement("div");
    totalCompra.className = "totalCompra";
    totalCompra.innerHTML = `<h2>Total: $${total}</h2>`;
    modalContainer.append(totalCompra);


  };


  verCarrito.addEventListener("click", carritoFinal); 

  const eliminarProducto = () => {
    const foundId = carrito.find((element) => element.id);

    carrito = carrito.filter((carritoId) => {
      return carritoId !== foundId;
    });
    carritoCounter();
    saveLocal();
    carritoFinal();
  }


  const carritoCounter = () => {
    cantidadCarrito.style.display = "block";
    const carritoLength = carrito.length;
    localStorage.setItem("carritoLength", JSON.stringify(carritoLength));
    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
  }

const saveLocal = () =>{
  localStorage.setItem("carrito", JSON.stringify(carrito));
}
  

carritoCounter();

