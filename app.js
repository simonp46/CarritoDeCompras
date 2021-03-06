const items = document.getElementById('items')
const templateCard = document.getElementById('template-card').content
const fragment = document.createDocumentFragment()
let Carrito = {}

document.addEventListener('DOMContentLoaded', () => {
    fetchData()
})
items.addEventListener('clic',e =>{
    addCarrito(e)
})

const fetchData = async () => {
    try{
        const res = await fetch('api.json')
        const data = await res.json()
        //console.log(data)
        pintarCards(data)
    } catch (error){
        console.log(error)
    }
}

const pintarCards = data => {
    data.forEach(producto => {
        templateCard.querySelector('h5').textContent = producto.title
        templateCard.querySelector('p').textContent = producto.precio
        templateCard.querySelector('img').setAttribute("src",producto.thumbnailUrl)
        templateCard.querySelector('.btn-dark').dataset.id = producto.id

        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)
}

const addCarrito = e => {
    if (e.target.classList.contains('btn-dark')){
        console.log(e.target.parentElement) 
    }
    e.stopPropagation()
}
const setCarrito = objeto =>{
     //console.log(objeto)
     const producto = {
         id: objeto.querySelector('.btn-dark').dataset.id,
         title: objeto.querySelector('h5').textContent,
         precio: objeto.querySelector('p').textContent,
         cantidad: 1
     }

     if(Carrito.hasOwnProperty(producto.id)) {
         producto.cantidad = Carrito[producto.id].cantidad + 1
     }
     Carrito[producto.id] = {...producto}

     console.log(producto)
}