$(document).ready(function() {
  //hej
  // Öppnar upp/stänger menyn (accordion)
  $(".menu-toggle").click(function() {
    if ($(".menu").hasClass("menu-hide")) {
      $(".menu").removeClass("menu-hide");
      $(".menu").addClass("menu-show");
      $(".menu-toggle-container").css("border-bottom", "2px solid black");
      $(".dark").css("opacity", "0.15");

    } else {
      $(".menu").addClass("menu-hide");
      $(".menu").removeClass("menu-show");
      $(".menu-toggle-container").css("border-bottom", "0");
      $(".dark").css("opacity", "0");
    }
  });
  // Stänger menyn samt skickar filter till localStorage
  $(".filter-button").on("click", function() {
    $(".menu").addClass("menu-hide");
    $(".menu").removeClass("menu-show");
    $(".menu-toggle-container").css("border-bottom", "0");

    let newFilter = this.id;
    localStorage.setItem("filter", newFilter);
    window.open("index.html", "_self");
  });
  // Skickar användaren till index-html och sätter filter till 0
  $(".home").on("click", function() {
    localStorage.setItem("filter", 0);
    window.open("index.html", "_self");
  });

  // Öppnar och stänger favorites
  $(".favorites-toggle").click(function() {
    if ($(".favorites").hasClass("favorites-hide")) {
      $(".favorites").removeClass("favorites-hide");
      $(".favorites").addClass("favorites-show");
      $(".favorites").css("width", "400px");
      $(".favorites-toggle").css("border-bottom", "2px solid black");
      $(".dark").css("opacity", "0.15");

    } else {
      $(".favorites").addClass("favorites-hide");
      $(".favorites").removeClass("favorites-show");
      $(".favorites").css("width", "0");
      $(".favorites-toggle").css("border-bottom", "0");
      $(".dark").css("opacity", "0");
    }
  });

  // Visar antal produkter i varukorgen (badge)
  function counter() {
    let currentCartItems = JSON.parse(localStorage.getItem("cart")) || {};

    let totalAmount = 0;
    for (var i = 0; i < currentCartItems.length; i++) {
      totalAmount = totalAmount + currentCartItems[i].quantity;
    }
    console.log(totalAmount);
    if (totalAmount > 0) {
      $(".badge").css("visibility", "visible");
    }

    $(".badge").html(totalAmount);
  };
  counter();
  // // Hämtar cart från localStorage
  // cart = JSON.parse(localStorage.getItem("cart")) || [];


  function displayCart() {
    let currentCart = JSON.parse(localStorage.getItem("cart")) || [];
   
    
    let hej=$("#checkout_container_items")
    $("#checkout_container_items").html(" ");
    for (let i = 0; i < currentCart.length; i++) {
      let productContainer = $("<div>").addClass("mainCartContainer").appendTo($(hej));
     
      let imageDiv = $("<div>").appendTo(productContainer);
      let imgSrc = currentCart[i].src;
      let image = $("<img>").addClass("cartImage").attr("src", imgSrc).appendTo(imageDiv);

      let nameContainer = $("<div>").html(currentCart[i].title).appendTo(productContainer);

      let sizeContainer = $("<div>").html(currentCart[i].size).appendTo(productContainer);

      let amountContainer = $("<div>").html(currentCart[i].quantity).appendTo(productContainer);

      let removeContainer = $("<div>").appendTo(productContainer);

      let buttonRemove = $("<button>").html("--").appendTo(removeContainer).on("click", function () {handclick1(i)})
  
      let increase= $("<button>").appendTo(removeContainer).html("++").on("click", function (){handclick2(i)})
     
      let buttonRemoveItems=$("<button>").appendTo(removeContainer).html("ta bort").on("click",function(){ handclick4(i)})
      
      let priceContainer = $("<div>").html(currentCart[i].price + " SEK").appendTo(removeContainer);

  
      let removeImg = $("<img>").addClass("removeImage").attr("src", "images/remove.png").appendTo(removeContainer);
 
    }
  // function handclick1(i) {
  //    if (localStorage.getItem("cart")) {
  //       let cart = JSON.parse(localStorage.getItem("cart")) || [];
  //       for (i = 0; i < cart2.length; ++i) {
  //         hej=cart2[i].quantity++;
  
  //         localStorage.setItem("cart3", JSON.stringify(hej));
  //         console.log("hej på dig",hej)
  //       }
  //     }
  
    
  
     function handclick2(i){
      console.log(i);
      let sum1=currentCart[i].quantity++;
      console.log("öka",sum1,i);
      localStorage.setItem("cart", JSON.stringify(currentCart));
      
      displayCart()
    }


     function handclick1(i){
          console.log(i);
         currentCart[i].quantity--;
          localStorage.setItem("cart", JSON.stringify(currentCart));
         
          displayCart()
        }
      
  
    function handclick4(i){
        let cartSplice=currentCart.splice(i,1);
        console.log(i)
        localStorage.setItem("cart", JSON.stringify(currentCart));
  
        displayCart()
       }
      
}
    displayCart()
  
});
