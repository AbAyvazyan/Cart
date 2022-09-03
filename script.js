const elements = items

const main = document.getElementById("container")

elements.forEach(key=>{
    let gridItem = document.createElement("div")
    let gridImage = document.createElement("img")
    let gridName = document.createElement("p")
    let gridPrice = document.createElement("p")
    let gridCart = document.createElement("div")
    let gridLike = document.createElement("img")

    gridItem.setAttribute("class","grid-item")

    gridImage.setAttribute("src",key.url)

    gridName.setAttribute("class","item-name")
    gridName.innerText = key.productName

    gridPrice.setAttribute("class","item-item-price")
    gridPrice.innerText = key.Price

    gridCart.setAttribute("class","add-to-cart")
    gridCart.innerText = "Add to cart"

    gridLike.setAttribute("src","images/unfill.png")
    gridLike.setAttribute("class","heart")
    gridLike.setAttribute("value","true")

    gridItem.append(gridImage,gridName,gridPrice,gridCart,gridLike)

    main.appendChild(gridItem)
})

let likeHearts = document.querySelectorAll(".heart")


likeHearts.forEach(element=>{
    element.addEventListener("click",function(){


        if (element.hasAttribute("value")){
            element.removeAttribute("value")
            element.src = "images/fullfill.png"
        }else{
            element.src = "images/unfill.png"
            element.setAttribute("value","true")
        }
    })
})

let openCart = document.getElementById("cart")
let cartCover = document.getElementById("cover")
let cartAside = document.getElementById("aside")
let header = document.getElementById("header")
let cartItemsList = document.getElementById("cart-items")
let addToCart = document.getElementsByClassName("add-to-cart")
let emptyCheck = document.getElementById("empty")
let shadowArea = document.getElementById("shadow")
let buyButton = document.getElementById("buy")
let cartArr = []

for (let i = 0; i < addToCart.length; i++) {
    addToCart[i].addEventListener("click",function (){
        let parentElement = this.parentElement
        cartArr.push({
            src:parentElement.children[0].src,
            name:parentElement.children[1].innerText,
            price:parentElement.children[2].innerText
        })
    })
}




openCart.addEventListener("click",function (){
    emptyCheck.style.display = "none"
    cartCover.style.display = "flex"
    document.body.style.overflow = 'hidden';
    if (cartArr.length>0 || cartItemsList.childElementCount>1){
        cartArr.forEach(key=> {
            let cartItem = document.createElement("div")
            let cartImg = document.createElement("img")
            let cartContent = document.createElement("div")
            let cartItemName = document.createElement("div")
            let cartItemPrice = document.createElement("div")
            let cartItemRemove = document.createElement("div")

            cartItem.setAttribute("class","cart-item")

            cartImg.setAttribute("src",key.src)
            cartImg.className = "cart-image"

            cartContent.setAttribute("class","cart-content")

            cartItemName.setAttribute("class","cart-item-name")
            cartItemName.innerText = key.name

            cartItemPrice.setAttribute("class","cart-item-price")
            cartItemPrice.innerText = key.price

            cartItemRemove.setAttribute("class","delete")
            cartItemRemove.innerText = "Remove"

            cartItemRemove.addEventListener("click",function(){
                cartItemsList.removeChild(this.parentElement)
                if (cartItemsList.childElementCount===1){
                    emptyCheck.style.display = "block"
                }
            })

            cartContent.append(cartItemName,cartItemPrice)

            cartItem.append(cartImg,cartContent,cartItemRemove)

            cartItemsList.appendChild(cartItem)
            cartArr = []
        })
    }else{
        emptyCheck.style.display = "block"
    }
})

shadowArea.addEventListener("click",function (){
    cartCover.style.display = "none"
    document.body.style.overflow = 'auto';
})


buyButton.addEventListener("click",function (){
    if (cartItemsList.childElementCount===1){
        return alert("Your cart is empty,fill it")
    }else{
        let cartChild = cartItemsList.children.length

        for (let i =cartChild-1; i >0; i--) {
            console.log(cartItemsList.children[i])
            cartItemsList.children[i].remove()
        }

        emptyCheck.style.display = "block"

    }
    alert("You bought it")
})