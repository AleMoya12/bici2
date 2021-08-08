
//VARIABLES

let total = 0;
const PREFIJO = "productoID";
let listaDatos = [];



//MUESTRO LOS PRUDUCTOS POR DOM
//elijo el sector del html
let contenedorProduct = document.getElementById("container-productos");
//EJECUTO METODO READY PARA CARGAR UNA VEZ ME DIGA QUE ESTA TODO OK
$(document).ready(function () {

  //OBTENGO DATOS DESDE JSON - PETISION ASINCRONICA
  $.getJSON("data/data.json", function (respuesta, estado) {
    console.log(respuesta);
    console.log(estado);
    if (estado === "success") {
      listaDatos = respuesta;

      //ORDENO POR GENERO
      let ordenado = listaDatos.filter(x => x.orientacion === "Masculino");
        console.log(ordenado);

       
      //AGREGAMOS UN NUEVO ELEMENTO AL HTML POR CADA REGISTRO DE DATO ESTATICO
      
      for (const bici of ordenado) {
        $(contenedorProduct).append(crearElemento(bici));
      }
      
      const rango = document.querySelector("#rango");
      const valor = document.querySelector("#valor");
      rango.oninput = () =>{
        valor.innerHTML =rango.value
      }
      $("#queryLista").click(function (e) { 
        let min = $("#minamount").val();
        console.log(min);
        console.log(ordenado);
        let max = $("#maxamount").val();

        const filtrados = ordenado.filter(producto => (producto.precio > min) &&  (producto.precio < max));
        console.log(filtrados);
       
        for (const bici of filtrados) {
          $(contenedorProduct).append(crearElemento(bici));
        }
    });
    
      /* if ($("#ordenar > option[value=3]").attr("selected", true)) {
        let ordPrecioMenor = listaDatos.sort((precioUno, precioDos) => precioUno.precio - precioDos.precio);
        console.log(ordPrecioMenor);

        for (const bici of ordPrecioMenor) {
          $(contenedorProduct).append(crearElemento(bici));
        }
      }; */


    }
  }
  );
});


//funcion para crear en elemento del DOM
function crearElemento(dato) {
  
  nuevoElemento = document.createElement("div");
  nuevoElemento.classList.add("col-md-6");
  nuevoElemento.classList.add("col-lg-4");
  nuevoElemento.classList.add("mt-2");

  //creo la plantilla del contenido
  nuevoElemento.innerHTML = `
                <div class="product-item">
                  <div class="pi-img-wrapper">
                    <img src="${dato.img}" class="img-responsive" alt="${dato.nombre}">
                    <div>
                        <a href="${dato.img}" class="btn btn-outline-success image-popup m-1"">Zoom</a>
                        
                        
                        <!-- Button trigger modal -->
                        <button type="button" class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#exampleModal${dato.id}">
  Ver más!!!
</button>
                    </div>
                  </div>
                  <h3><a href="shop-item.html">${dato.nombre}</a></h3>
                  <div class="pi-price">$ ${dato.precio}</div>
                  <a href="javascript:;" class="btn btn-success add2cart">Comprar</a>
                </div>

                <!-- Modal -->
<div class="modal fade" id="exampleModal${dato.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-scrollable modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">${dato.nombre}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        
      <div class="product-page product-pop-up">
      <div class="row">
        <div class="col-md-6 col-sm-6 col-xs-3">
          <div class="product-main-image">
            <img src="${dato.img}" alt="${dato.nombre}" class="img-responsive">
          </div>
           <div class="product-other-images">
            <a href="javascript:;" class="active"><img alt="${dato.nombre}" src="${dato.img1}"></a>
            <a href="javascript:;"><img alt="${dato.nombre}" src="${dato.img2}"></a>
            <a href="javascript:;"><img alt="${dato.nombre}" src="${dato.img3}"></a>
            <a href="javascript:;"><img alt="${dato.nombre}" src="${dato.img4}"></a>
            <a href="javascript:;"><img alt="${dato.nombre}" src="${dato.img5}"></a>
            <a href="javascript:;"><img alt="${dato.nombre}" src="${dato.img6}"></a>
            <a href="javascript:;"><img alt="${dato.nombre}" src="${dato.img7}"></a>
            
          </div> 
        </div>
        <div class="col-md-6 col-sm-6 col-xs-9">
          <h1>${dato.nombre}</h1>
          <div class="price-availability-block clearfix">
            <div class="price">
              <strong><span>$</span>${dato.precio}</strong>
             
            </div>
            <div class="availability">
              Disponibilidad: <strong>En Stock</strong>
            </div>
          </div>
          <div class="description mt-1">
            <p>Lorem ipsum dolor ut sit ame dolore  adipiscing elit, sed nonumy nibh sed euismod laoreet dolore magna aliquarm erat volutpat 
  Nostrud duis molestie at dolore.</p>
          </div>
          <div class="product-page-options">
            <div class="pull-left">
              <label class="control-label">Size:</label>
              <select class="form-control input-sm">
                <option>L</option>
                <option>M</option>
                <option>XL</option>
              </select>
            </div>
            <div class="pull-left">
              <label class="control-label">Color:</label>
              <select class="form-control input-sm">
                <option>Red</option>
                <option>Blue</option>
                <option>Black</option>
              </select>
            </div>
          </div>
          <div class="product-page-cart">
           
            <button class="btn btn-success m-2" type="submit">Comprar</button>
            
          </div>
        </div>
  
        <div class="sticker sticker-sale"></div>
      </div>
    </div>


      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        
    </div>
  </div>
</div>
               `;
               
  //agrego cada nodo creado al padre
  contenedorProduct.appendChild(nuevoElemento);


}
//EVENTO AL HACER CLICK A VER


