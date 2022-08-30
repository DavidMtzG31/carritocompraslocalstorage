 // Variables

 const carrito = document.querySelector('#carrito');                             // Selecciona el elemento carrito de compras
 const listaCursos = document.querySelector('#lista-cursos');                    // Selecciona la parte del html donde están los cursos
 const contenedorCarrito = document.querySelector('#lista-carrito tbody');       // El espacio donde se añadirán las cosas al carrito
 const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');             // Botón de vaciar carrito
 let articulosCarrito= [];                                                       // Arreglo de los articulos que se añaden
 let totalArticulos = 0;
 
 
 // Función para los eventListener
 addEventListeners();
 function addEventListeners(){
     listaCursos.addEventListener('click', agregarCurso);             // Cuando agregar un curso dando click en "Agregar al carrito"
    
     // Elimina un curso del carrito
     carrito.addEventListener('click', eliminarCurso);
 
     // VaciarCarrito
     vaciarCarritoBtn.addEventListener('click', vaciarCarrito);       // Espera un click en el botón de vaciar carrito

     // Muestra los cursos del Local Storage
     document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse(localStorage.getItem('carrito') ) || [];

        carritoHTML();
     })
 }
 
 
 
 // Funciones
 function agregarCurso (e){
     
     e.preventDefault();  // Evita que al dar click en agregar al carrito de el salto al inicio
     if(e.target.classList.contains('agregar-carrito')){
         const cursoSeleccionado = e.target.parentElement.parentElement;
         totalArticulos ++;
         leerDatosCurso(cursoSeleccionado); // voy a hacerun curso, con los datos de curso seleccionado
     }
 }
 
 // Elimina un curso del carrito
 function eliminarCurso(e){
     if(e.target.classList.contains('borrar-curso')){
         const cursoId = e.target.getAttribute('data-id');
         //Elimina cursos del carrito por el dataID
         articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId)
         console.log(articulosCarrito);
         carritoHTML();
     }
 }
 
 // Leer los datos del curso y extraer esa información
 
 function leerDatosCurso(curso){
     // Creando objeto con el contenido del curso actual
     const infoCurso = {
         imagen: curso.querySelector('img').src,
         titulo: curso.querySelector('h4').textContent,
         precio: curso.querySelector('.precio span').textContent,
         id: curso.querySelector('a').getAttribute('data-id'),
         cantidad: 1
     }
 
 
  // Revisar si el elemento ya está en el carrito   
 const existe = articulosCarrito.some(curso =>  curso.id === infoCurso.id);
 if(existe) {
     const cursos = articulosCarrito.map( curso => {
         if(curso.id === infoCurso.id){
             curso.cantidad++;
             return curso;   // Retorna el objeto actualizado
         } else{
             return curso;   // Retorna los objetos que no son duplicados
         }
     } )
     articulosCarrito = [...cursos];
 } else{
     articulosCarrito = [...articulosCarrito, infoCurso];
 }
 
  // Agregando elementos al arreglo de articulosCarrito
      // Se toma una copia de articulos carritos para ir tomando los artículos que ya hay en el carrito
     carritoHTML();  // Llamando la función que agregará los elementos al HTML
 }
 
 
 // Muestra el carrito de compras en el HTML
 function carritoHTML(){
     limpiarHTML();                                           // Limpiar el HTML
     
     articulosCarrito.forEach( curso => {                            // Recorre el carrito y crea el HTML
         const { imagen, titulo, precio, cantidad, id} = curso;      // Destructuring             
         const row = document.createElement('tr');                   
         row.innerHTML = `
         <td> <img src="${imagen}" width="100"> </td>
         <td> ${titulo} </td>
         <td> ${precio} </td>
         <td> ${cantidad} </td>
         <td> <a href="#" class=borrar-curso data-id="${id}"> X </a>  </td>
         `
         // Agrega el html del carrito en el tbody
         contenedorCarrito.appendChild(row);
     })
     sincronizarStorage()
 }
 
 
 // Limpia el HTML para evitar cursos repetidos en el arreglo
 function limpiarHTML(){
     // Forma lenta
     // contenedorCarrito.innerHTML= '';
 
     while(contenedorCarrito.firstChild) {
         contenedorCarrito.removeChild(contenedorCarrito.firstChild);
     }
 }
 
 function vaciarCarrito(){
     articulosCarrito= [];
     totalArticulos = 0;
     limpiarHTML();
     sincronizarStorage()
 }
 

 // Crear un LocalStorage del carrito de compras
function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify( articulosCarrito) );
}
