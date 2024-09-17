$(document).ready(function() {
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
    window.open("../index.html", "_self");
  });
  // Skickar användaren till index-html och sätter filter till 0
  $(".home").on("click", function() {
    localStorage.setItem("filter", 0);
    window.open("../index.html", "_self");
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

    if (totalAmount > 0) {
      $(".badge").css("visibility", "visible");
    }

    $(".badge").html(totalAmount);
  };
  counter();

  // Hämtar objektet som ska visas på sidan
  detailProduct = JSON.parse(localStorage.getItem("products-1")) || [];

  $("#h3").html(detailProduct.title)
  $("#detail-description").html(detailProduct.description)
  $("#spaan").html(detailProduct.price + " SEK")
  imgSrc3 = "../" + detailProduct.src;
  let detailImg = $("<img>").attr("src", imgSrc3);
  $("#id-detail-innerbox-Img").append(detailImg);


  $("#detailButtontoCart").attr("disabled", "disabled")
  let inputSize = $("input:checked").val();
  $("input").on("click", function() {
    $("#detailButtontoCart").removeAttr("disabled");
  });
  // Skickar objekt till cart i localStorage
  $("#detailButtontoCart").on("click", function() {
    let newArray = [];
    let inputSize = $("input:checked").val();
    detailProduct.size = inputSize;

    if (localStorage.getItem("cart")) {
      let currentCartItems = JSON.parse(localStorage.getItem("cart")) || [];

      for (let i = 0; i < currentCartItems.length; i++) {
        newArray.push(currentCartItems[i]);
      };

      let alreadyExist = false;
      for (let i = 0; i < newArray.length; i++) {
        if (detailProduct.id == newArray[i].id && inputSize == newArray[i].size) {
          alreadyExist = true;
          newArray[i].quantity++;
        }
      };
      if (!alreadyExist) {
        newArray.push(detailProduct);
      }
    } else {
      newArray.push(detailProduct);
    };

    localStorage.setItem("cart", JSON.stringify(newArray));
    counter();
  });

});
