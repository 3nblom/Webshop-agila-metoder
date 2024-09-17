$(document).ready(function() {
  // Öppnar och stänger dropdown
  $(".menu-toggle").click(function() {
    if ($(".menu").hasClass("menu-hide")) {
      $(".menu").removeClass("menu-hide");
      $(".menu").addClass("menu-show");
      $(".menu-toggle-container").css("border-bottom", "2px solid black");
      $(".dark").css("display", "block");

    } else {
      $(".menu").addClass("menu-hide");
      $(".menu").removeClass("menu-show");
      $(".menu-toggle-container").css("border-bottom", "0");
      $(".dark").css("display", "none");
    }
  });
  // Stänger meny och sätter filter vid klick av kategori
  $(".filter-button").on("click", function() {
    $(".menu").addClass("menu-hide");
    $(".menu").removeClass("menu-show");
    $(".menu-toggle-container").css("border-bottom", "0");
    $(".dark").css("display", "none");

    let newFilter = this.id;

    localStorage.setItem("filter", newFilter);
  });
  // Ta bort .dark Filter
  $(".dark").on("click", function(){
    $(".dark").css("display", "none");
    $(".menu").addClass("menu-hide");
    $(".menu").removeClass("menu-show");
    $(".menu-toggle-container").css("border-bottom", "0");
    $(".favorites").addClass("favorites-hide");
    $(".favorites").removeClass("favorites-show");
    $(".favorites").css("width", "0");
    $(".favorites-toggle").css("border-bottom", "0");
  });
  // Tar användaren till startsidan
  $(".home").on("click", function() {
    localStorage.setItem("filter", 0);
    window.open("index.html", "_self");
  });

  $(".frontCategory").on("click", function(){
    let newFilter = this.id;
    console.log(newFilter);
    var newFilterMinusOne = newFilter.slice(0, -1);
    localStorage.setItem("filter", newFilterMinusOne);
    window.open("index.html", "_self");

  });

  // Öppnar och stänger favorites
  $(".favorites-toggle").click(function() {
    if ($(".favorites").hasClass("favorites-hide")) {
      $(".favorites").removeClass("favorites-hide");
      $(".favorites").addClass("favorites-show");
      $(".favorites").css("width", "400px");
      $(".favorites-toggle").css("border-bottom", "2px solid black");
      $(".dark").css("display", "block");

    } else {
      $(".favorites").addClass("favorites-hide");
      $(".favorites").removeClass("favorites-show");
      $(".favorites").css("width", "0");
      $(".favorites-toggle").css("border-bottom", "0");
      $(".dark").css("display", "none");
    }
  });

  // Skapar upp HTML för favoriter
  // function createFavorites(){
  //   let listOfFavorites = JSON.parse(localStorage.getItem("favorites"));
  //
  //   $(".favoriteContainer").empty();
  //
  //   for (let i = 0; i < listOfFavorites.length; i++) {
  //     let productContainer = $("<div>").addClass("favoriteProductContainer").appendTo($(".favoriteContainer"));
  //
  //     let imgSrc = listOfFavorites[i].src;
  //     let image = $("<img>").attr("src", imgSrc).addClass("favoriteImage").appendTo(productContainer);
  //
  //     let heartImg = $("<img>").attr("src", "images/remove.png").addClass("favoriteImageLike").appendTo(productContainer);
  //
  //   }
  // };
  // createFavorites();

  // Håller koll på antal varor i varukorgen
  function counter() {
    let currentCartItems = JSON.parse(localStorage.getItem("cart")) || {};

    let totalAmount = 0;
    for (let i = 0; i < currentCartItems.length; i++) {
      totalAmount = totalAmount + currentCartItems[i].quantity;
    }
    console.log(totalAmount);
    if (totalAmount > 0) {
      $(".badge").css("visibility", "visible");
    }

    $(".badge").html(totalAmount);
  };
  counter(); // Kallar på funktionen counter() som ändrar siffran på cart-ikonen


  // Array med alla objekt //
  let listOfAllProducts = [productCoat1, productCoat2, productCoat3, productCoat4, productCoat5, productCoat6, productCoat7, productCoat8, productDress1, productDress2, productDress3, productDress4, productDress5, productDress6, productDress7, productDress8, productShoe1, productShoe2, productShoe3, productShoe4, productShoe5, productShoe6, productShoe7, productShoe8, productShirts1, productShirts2, productShirts3, productShirts4, productShirts5, productShirts6, productShirts7, productShirts8];
  localStorage.setItem("allProducts", JSON.stringify(listOfAllProducts));


  // Funktion som skapar upp produkter på förstasidan //
  if (!localStorage.getItem("filter")) {
    localStorage.setItem("filter", 0);
  }

  if (localStorage.getItem("filter") == 0) {

    $("#start-animation").css("height", "auto");
    $("#recommended").css("display", "none");
    $("#productSection").css("display", "none");
    $(".number-of-items").css("display", "none");
    $("#header").addClass("transparent");

  } else {

    $("#hero").empty().css("height", "0"); // döljer hero
    $("#start-animation").css("height", "0");
    $("#recommended").css("display", "block");
    $("#productSection").css("display", "block");
    $(".number-of-items").css("display", "flex");
    $(".flex-container").empty();
    let category = localStorage.getItem("filter");
    let header = $("#" + category).text().toUpperCase();
    $(".product-header").html(header);

    let numberOfItemsAdded = 0;
    for (let i = 0; i < listOfAllProducts.length; i++) {

      if (listOfAllProducts[i].category === category) {
        numberOfItemsAdded++;

        let productContainer = $("<div>").addClass("productContainer").appendTo($(".flex-container"));

        let imgSrc = listOfAllProducts[i].src;
        let imgSrc2 = listOfAllProducts[i].src2;
        let image = $("<img>").attr("src", imgSrc).addClass("productImage").mouseover(function() {
          image.attr("src", imgSrc2);
        }).mouseout(function() {
          image.attr("src", imgSrc);
        }).appendTo(productContainer);

        image.attr("type", "button")
          .on("click", {
            bought: listOfAllProducts[i]
          }, detailProducts);

        let productTitleContainer = $("<div>").addClass("productTitleContainer").appendTo(productContainer);
        let leftTitleContainer = $("<div>").addClass("leftInnerTitleContainer").appendTo(productTitleContainer);
        let rightTitleContainer = $("<div>").addClass("rightInnerTitleContainer").appendTo(productTitleContainer);
        let title = $("<p>").html(listOfAllProducts[i].title).addClass("titleFont").appendTo(leftTitleContainer);
        let price = $("<p>").html(listOfAllProducts[i].price + " SEK").addClass("priceP").appendTo(leftTitleContainer);

        let favorite = $("<i>").addClass("far fa-heart").attr("id", listOfAllProducts[i].id).on("click", function() {
          let newArray = [];
          let thisId = listOfAllProducts[i].id;

          if (localStorage.getItem("favorites")) {
            let currentFavoriteItems = JSON.parse(localStorage.getItem("favorites")) || [];

            for (let i = 0; i < currentFavoriteItems.length; i++) {
              newArray.push(currentFavoriteItems[i]);
            };

            let alreadyExist = false;
            for (let i = 0; i < newArray.length; i++) {
              if (thisId == newArray[i].id) {
                alreadyExist = true;
                newArray.splice(i, 1);
              }
            };
            if (!alreadyExist) {
              newArray.push(listOfAllProducts[i]);
            }
          } else {
            newArray.push(listOfAllProducts[i]);
          };

          let allProducts = JSON.parse(localStorage.getItem("allProducts")) || [];
          for (let i = 0; i < newArray.length; i++) {
            if (newArray[i].id == allProducts[i].id) {
              allProducts[i].favorite = true;
            }
          }
          localStorage.setItem("allProducts", JSON.stringify(allProducts));

          localStorage.setItem("favorites", JSON.stringify(newArray));

          createFavorites();
        }
      ).appendTo(rightTitleContainer);

      };
      $(".number-of-items").html("- Visar " + numberOfItemsAdded + " av " + numberOfItemsAdded + " produkter -");
    };
  };

  // Filter: Funktion som kollar igenom alla objekt i listan och skapar endast upp de som har samma typ (egenskap) som den klickade knappens ID //
  $(".filter-button").on("click", function() {
    $(".menu").addClass("menu-hide");
    $(".menu").removeClass("menu-show");

    $("#hero").empty().css("height", "0"); // döljer hero
    $("#start-animation").css("height", "0");
    $("#productSection").css("display", "block");
    $("#recommended").css("display", "block");
    $(".number-of-items").css("display", "flex");
    $(".flex-container").empty();

    let category = this.id;
    localStorage.setItem("filter", category);

    let header = $("#" + category).text().toUpperCase();
    $(".product-header").html(header);

    let numberOfItemsAdded = 0;

    for (let i = 0; i < listOfAllProducts.length; i++) {

      if (listOfAllProducts[i].category === category) {

        numberOfItemsAdded++;

        let productContainer = $("<div>").addClass("productContainer").appendTo($(".flex-container"));

        let imgSrc = listOfAllProducts[i].src;
        let imgSrc2 = listOfAllProducts[i].src2;
        let image = $("<img>").attr("src", imgSrc).addClass("productImage").mouseover(function() {
            image.attr("src", imgSrc2);
          }).mouseout(function() {
            image.attr("src", imgSrc);
          }).attr("type", "button")
          .on("click", {
            bought: listOfAllProducts[i]
          }, detailProducts).appendTo(productContainer);

        let productTitleContainer = $("<div>").addClass("productTitleContainer").appendTo(productContainer);
        let leftTitleContainer = $("<div>").addClass("leftInnerTitleContainer").appendTo(productTitleContainer);
        let rightTitleContainer = $("<div>").addClass("rightInnerTitleContainer").appendTo(productTitleContainer);
        let title = $("<p>").html(listOfAllProducts[i].title).addClass("titleFont").appendTo(leftTitleContainer);
        let price = $("<p>").html(listOfAllProducts[i].price + " SEK").addClass("priceP").appendTo(leftTitleContainer);

        let favorite = $("<i>").addClass("far fa-heart").appendTo(rightTitleContainer);

      };
      $(".number-of-items").html("- Visar " + numberOfItemsAdded + " av " + numberOfItemsAdded + " produkter -");
    };
  });

  // Funktion som skapar upp produkter under sektionen: "recommended" //

  function recommend() {
    for (let i = 0; i < 3; i++) {
      let randomNumber = Math.floor((Math.random() * 32));

      let productContainer = $("<div>").addClass("recommendedContainer").appendTo($("#recommended-middle-flex"));

      let image = $("<img>").attr("src", listOfAllProducts[randomNumber].src).addClass("recommendedImage").appendTo(productContainer);

      image.attr("type", "button")
        .on("click", {
          bought: listOfAllProducts[randomNumber]
        }, detailProducts);
    };
  }
  // Kallar på funktionen för att skapa upp objekten under "recommended" vid omladdning av startsidan
  recommend();

  // Sätter en eventListener på framåt- och bakåtpilarna som först tömmer allt under "recommended" och sedan skapar upp 3 nya objekt
  $(".nextPrevious").on("click", function() {
    $("#recommended-middle-flex").empty();
    recommend();
  });

  // skickar i väg till varukorgen
  function detailProducts(event) {
    let detailproduct = event.data.bought;

    localStorage.setItem("products-1", JSON.stringify(detailproduct));
    window.open("html/detaljsida.html", "_self");
  };


});

// --------------------- OBJEKT -------------------- //


function ProductClass() {
  this.id;
  this.category;
  this.titel;
  this.price;
  this.size;
  this.quantity;
  this.display;
  this.description;
  this.src;
  this.src2;
  this.favorite;
};

let productCoat1 = new ProductClass();

productCoat1.id = "idCoat1";
productCoat1.category = "Coat";
productCoat1.title = "Glamorous - Coated Jacket";
productCoat1.price = 3400;
productCoat1.size = "M";
productCoat1.quantity = 1;
productCoat1.description = "PU jacka från Glamorous Rak modell med krage i glansigt material Dekorativa vita sömmar Försluts framtill med dragkedja Fyra fickor framtill Skärp samt hällor i midjan";
productCoat1.src = "images/coat1.jpg";
productCoat1.src2 = "images/coat1_2.jpg";
productCoat1.favorite = false;



let productCoat2 = new ProductClass();

productCoat2.id = "idCoat2";
productCoat2.category = "Coat";
productCoat2.title = "Gant - Double faced coat";
productCoat2.price = 2900;
productCoat2.size = "M";
productCoat2.quantity = 1;
productCoat2.description = "Ullkappa från Gant Synliga knappar framtill Fickor fram med lock Slits baktill Rak modell";
productCoat2.src = "images/coat2.jpg";
productCoat2.src2 = "images/coat2_2.jpg";
productCoat2.favorite = false;

let productCoat3 = new ProductClass();

productCoat3.id = "idCoat3";
productCoat3.category = "Coat";
productCoat3.title = "Double Breasted Coat";
productCoat3.price = 2900;
productCoat3.size = "M";
productCoat3.quantity = 1;
productCoat3.description = "Jacka från Topshop Rak, medellång modell Dubbelknäppt fram Fyra fickor fram";
productCoat3.src = "images/coat3.jpg";
productCoat3.src2 = "images/coat3_2.jpg";
productCoat3.favorite = false;


let productCoat4 = new ProductClass();

productCoat4.id = "idCoat4";
productCoat4.category = "Coat";
productCoat4.title = "Michael Kors - Wool trench";
productCoat4.price = 2900;
productCoat4.size = "M";
productCoat4.quantity = 1;
productCoat4.description = "Kappa från Michael Michael Kors Försluts med dubbel knappknäppning fram Knytband i midja Två fickor fram Fodrad"
productCoat4.src = "images/coat4.jpg";
productCoat4.src2 = "images/coat4_2.jpg";
productCoat4.favorite = false;

let productCoat5 = new ProductClass();

productCoat5.id = "idCoat5";
productCoat5.category = "Coat";
productCoat5.title = "Ivyrevel - Quilted Coat";
productCoat5.price = 2900;
productCoat5.size = "M";
productCoat5.quantity = 1;
productCoat5.description = "Jacka från Ivyrevel Försluts med dubbelknäppning, tryckknappar Bälte med spänne i midjan Fickor i sidan Dold mudd i ärmslu";
productCoat5.src = "images/coat5.jpg";
productCoat5.src2 = "images/coat5_2.jpg";
productCoat5.favorite = false;


let productCoat6 = new ProductClass();

productCoat6.id = "idCoat6";
productCoat6.category = "Coat";
productCoat6.title = "Leather Jacket";
productCoat6.price = 1900;
productCoat6.size = "M";
productCoat6.quantity = 1;
productCoat6.description = "Leather jacket. 100% Leather. Smooth.";
productCoat6.src = "images/coat6.jpg";
productCoat6.src2 = "images/coat6_2.jpg";
productCoat6.favorite = false;

let productCoat7 = new ProductClass();

productCoat7.id = "idCoat7";
productCoat7.category = "Coat";
productCoat7.title = "Svea - Joy Jacket";
productCoat7.price = 1900;
productCoat7.size = "M";
productCoat7.quantity = 1;
productCoat7.description = "Jacka från Svea Klassisk modell med två framfickor samt bröstfickor Avtagbar luva med pälsimitation Muddar i ärmslut Dragsko på insidan i midjan";
productCoat7.src = "images/coat7.jpg";
productCoat7.src2 = "images/coat7_2.jpg";
productCoat7.favorite = false;

let productCoat8 = new ProductClass();

productCoat8.id = "idCoat8";
productCoat8.category = "Coat";
productCoat8.title = "Gant - Full length coat";
productCoat8.price = 1900;
productCoat8.size = "M";
productCoat8.quantity = 1;
productCoat8.description = "Lång kappa från Gant Sjalkrage Knäppning framtill Två fickor på vardera sida Fodrad";
productCoat8.src = "images/coat8.jpg";
productCoat8.src2 = "images/coat8_2.jpg";
productCoat8.favorite = false;

let productDress1 = new ProductClass();

productDress1.category = "Dress";
productDress1.id = "idDress1";
productDress1.title = "VILA - Cocktailklänning";
productDress1.price = 500;
productDress1.size = "";
productDress1.quantity = 1;
productDress1.description = "Krage: Ståkrage Förslutning: Dragkedja Mönster: Enfärgat Detaljer: Bystveck, underkjol";
productDress1.src = "images/dress1.jpg";
productDress1.src2 = "images/dress1_2.jpg";
productDress1.favorite = false;


let productDress2 = new ProductClass();
productDress2.category = "Dress";
productDress2.id = "idDress2";
productDress2.title = "Mid weight dress";
productDress2.price = 560;
productDress2.size = "";
productDress2.quantity = 1;
productDress2.description = "Hals: Omlottringning  Mönster: Enfärgat  Detaljer: Underkjol";
productDress2.src = "images/dress2.jpg";
productDress2.src2 = "images/dress2_2.jpg";
productDress2.favorite = false;



let productDress3 = new ProductClass();
productDress3.category = "Dress";
productDress3.id = "idDress3";
productDress3.title = "River Island - Blazer";
productDress3.price = 740;
productDress3.size = "";
productDress3.quantity = 1;
productDress3.description = "Hals: Djupt v-ringad  Förslutning: Knapp  Mönster: Enfärgat  Detaljer: Med skärp, bystveck";
productDress3.src = "images/dress3.jpg";
productDress3.src2 = "images/dress3_2.jpg";
productDress3.favorite = false;



let productDress4 = new ProductClass();
productDress4.category = "Dress";
productDress4.id = "idDress4";
productDress4.title = "Mango - Vardagsklänning";
productDress4.price = 900;
productDress4.size = "";
productDress4.quantity = 1;
productDress4.description = "Krage: Kinakrage/ståkrage  Förslutning: Knapp  Mönster: Enfärgat  Detaljer: Med skärp";
productDress4.src = "images/dress4.jpg";
productDress4.src2 = "images/dress4_2.jpg";
productDress4.favorite = false;


let productDress5 = new ProductClass();
productDress5.category = "Dress";
productDress5.id = "idDress5";
productDress5.title = "Selected - Midi dress";
productDress5.price = 688;
productDress5.size = "";
productDress5.quantity = 1;
productDress5.description = "Krage: Ståkrage  Förslutning: Snörning  Mönster: Enfärgat  Detaljer: Bystveck, underkjol";
productDress5.src = "images/dress5.jpg";
productDress5.src2 = "images/dress5_2.jpg";
productDress5.favorite = false;

let productDress6 = new ProductClass();
productDress6.category = "Dress";
productDress6.id = "idDress6";
productDress6.title = "Esprit - Belt dress"
productDress6.price = 699;
productDress6.size = "";
productDress6.quantity = 1;
productDress6.description = "Hals: Kuverthals  Mönster: Rutigt  Detaljer: Med skärp, bystveck";
productDress6.src = "images/dress6.jpg";
productDress6.src2 = "images/dress6_2.jpg";
productDress6.favorite = false;

let productDress7 = new ProductClass();
productDress7.category = "Dress";
productDress7.id = "idDress7";
productDress7.title = "Morrison Mini Dress";
productDress7.price = 559;
productDress7.size = "";
productDress7.quantity = 1;
productDress7.description = "Paljettklänning från For Love & Lemons Långärmad, figurnära modell Djup V-rigning fram Rynkad effekter fram med rosett Ballongärmar med resår i ärmslut Öppen rygg med knappar samt dragkedja Fodrad med body undertill med knäppning i gren";
productDress7.src = "images/dress7.jpg";
productDress7.src2 = "images/dress7_2.jpg";
productDress7.favorite = false;

let productDress8 = new ProductClass();
productDress8.category = "Dress";
productDress8.id = "idDress8";
productDress8.title = "Ax Paris - Long Sleeve";
productDress8.price = 999;
productDress8.size = "";
productDress8.quantity = 1;
productDress8.description = "Klänning från Ax Paris Kavajmodell med dekroativa knappar framtill Två fickor framtill";
productDress8.src = "images/dress8.jpg";
productDress8.src2 = "images/dress8_2.jpg";
productDress8.favorite = false;


let productShoe1 = new ProductClass();

productShoe1.id = "idShoe1";
productShoe1.category = "Shoe";
productShoe1.title = "Tamaris - Sneakers";
productShoe1.price = 700;
productShoe1.size = "";
productShoe1.quantity = 1;
productShoe1.description = "Tå: Rund  Klack/sula: Platt  Stängning: Snörning  Mönster: Med djurtryck";
productShoe1.src = "images/shoe1.jpg";
productShoe1.src2 = "images/shoe1_2.jpg";
productShoe1.favorite = false;



let productShoe2 = new ProductClass();

productShoe2.id = "idShoe2";
productShoe2.category = "Shoe";
productShoe2.title = "Crossover - Sandaler";
productShoe2.price = 2900;
productShoe2.size = "";
productShoe2.quantity = 1;
productShoe2.description = "Tå: Öppen  Klack/sula: Blockklack  Stängning: Spänne/rosett  Mönster: Med djurtryck";
productShoe2.src = "images/shoe2.jpg";
productShoe2.src2 = "images/shoe2_2.jpg";
productShoe2.favorite = false;

let productShoe3 = new ProductClass();

productShoe3.id = "idShoe3";
productShoe3.category = "Shoe";
productShoe3.title = "Stan Smith - Sneakers";
productShoe3.price = 2800;
productShoe3.size = "";
productShoe3.quantity = 1;
productShoe3.description = "ADMIRE UPDATE - Ankelboots";
productShoe3.src = "images/shoe3.jpg";
productShoe3.src2 = "images/shoe3_2.jpg";
productShoe3.favorite = false;


let productShoe4 = new ProductClass();

productShoe4.id = "idShoe4";
productShoe4.category = "Shoe";
productShoe4.title = "Winde - Classic pumps";
productShoe4.price = 2300;
productShoe4.size = "";
productShoe4.quantity = 1;
productShoe4.description = "Tå: Spetsig Klack/sula: Stilettklack Stängning: Rem Mönster: Enfärgat Detaljer: Elastisk isättning";
productShoe4.src = "images/shoe4.jpg";
productShoe4.src2 = "images/shoe4_2.jpg";
productShoe4.favorite = false;

let productShoe5 = new ProductClass();

productShoe5.id = "idShoet5";
productShoe5.category = "Shoe";
productShoe5.title = "Katy - yellow";
productShoe5.price = 2900;
productShoe5.size = "";
productShoe5.quantity = 1;
productShoe5.description = "Tå: Spetsig,Klack/sula: Blockklack,Stängning: Spänne/rosett,Mönster: Med djurtryck,Detaljer: Elastisk isättning";
productShoe5.src = "images/shoe5.jpg";
productShoe5.src2 = "images/shoe5_2.jpg";
productShoe5.favorite = false;


let productShoe6 = new ProductClass();
productShoe6.id = "idShoe6";
productShoe6.category = "Shoe";
productShoe6.title = "Cara - Pumps";
productShoe6.price = 1900;
productShoe6.size = "";
productShoe6.quantity = 1;
productShoe6.description = "Tå: Rund  Klack/sula: Blockklack  Stängning: Öppen  Mönster: Enfärgat";
productShoe6.src = "images/shoe6.jpg";
productShoe6.src2 = "images/shoe6_2.jpg";
productShoe6.favorite = false;

let productShoe7 = new ProductClass();

productShoe7.id = "idShoe7";
productShoe7.category = "Shoe";
productShoe7.title = "Dorothy Perkins";
productShoe7.price = 1900;
productShoe7.size = "";
productShoe7.quantity = 1;
productShoe7.description = "Tå: Rund  Klack/sula: Platt  Stängning: Snörning  Mönster: Tryck  Detaljer: Cut-outs";
productShoe7.src = "images/shoe7.jpg";
productShoe7.src2 = "images/shoe7_2.jpg";
productShoe7.favorite = false;

let productShoe8 = new ProductClass();

productShoe8.id = "idShoe8";
productShoe8.category = "Shoe";
productShoe8.title = "Converse - Superlåga sneakers";
productShoe8.price = 1100;
productShoe8.size = "";
productShoe8.quantity = 1;
productShoe8.description = "Väder: Regn  Tå: Rund  Klack/sula: Platt  Stängning: Snörning  Mönster: Enfärgat  Detaljer: Bergsklättringsöglor";
productShoe8.src = "images/shoe8.jpg";
productShoe8.src2 = "images/shoe8_2.jpg";
productShoe8.favorite = false;


let productShirts1 = new ProductClass();

productShirts1.id = "idShirts1";
productShirts1.category = "Shirts";
productShirts1.title = "Michael Kors - Top";
productShirts1.price = 500;
productShirts1.size = "";
productShirts1.quantity = 1;
productShirts1.description = "Blus från Michael Michael Kors Hög i hals Dold dragkedja baktill Knapp i ärmslut";
productShirts1.src = "images/shirts1.jpg";
productShirts1.src2 = "images/shirts1_2.jpg";
productShirts1.favorite = false;


let productShirts2 = new ProductClass();

productShirts2.id = "idShirts2";
productShirts2.category = "Shirts";
productShirts2.title = "Ivyrevel - Cropped shirt";
productShirts2.price = 500;
productShirts2.size = "";
productShirts2.quantity = 1;
productShirts2.description = "Skjorta från Ivyrevel Rak samt kort modell Tillhörande shorts Mjuk kvalitet Blå-vit randig bäckebölja Knappknäppning framtill";
productShirts2.src = "images/shirts2.jpg";
productShirts2.src2 = "images/shirts2_2.jpg";
productShirts2.favorite = false;

let productShirts3 = new ProductClass();

productShirts3.id = "idShirts3";
productShirts3.category = "Shirts";
productShirts3.title = "Co'couture - Denim Shirt";
productShirts3.price = 500;
productShirts3.size = "";
productShirts3.quantity = 1;
productShirts3.description = "Skjorta från Co'couture Loose fit med knytband i midjan Bröstfickor med lock Tryckknappar framtill, i ärmslut samt på bröstfickor";
productShirts3.src = "images/shirts3.jpg";
productShirts3.src2 = "images/shirts3_2.jpg";
productShirts3.favorite = false;



let productShirts4 = new ProductClass();

productShirts4.id = "idShirts4";
productShirts4.category = "Shirts";
productShirts4.title = "Top-down bottom shirt";
productShirts4.price = 500;
productShirts4.size = "";
productShirts4.quantity = 1;
productShirts4.description = "Blue top-down bottom shirt. 100% nice material";
productShirts4.src = "images/shirts4.jpg";
productShirts4.src2 = "images/shirts4_2.jpg";
productShirts4.favorite = false;




let productShirts5 = new ProductClass();

productShirts5.id = "idShirts5";
productShirts5.category = "Shirts";
productShirts5.title = "Bottle-neck nothing shirt";
productShirts5.price = 500;
productShirts5.size = "";
productShirts5.quantity = 1;
productShirts5.description = "description missing";
productShirts5.src = "images/shirts5.jpg";
productShirts5.src2 = "images/shirts5_2.jpg";
productShirts5.favorite = false;


let productShirts6 = new ProductClass();

productShirts6.id = "idShirts6";
productShirts6.category = "Shirts";
productShirts6.title = "De Yong - Shirt";
productShirts6.price = 500;
productShirts6.size = "";
productShirts6.quantity = 1;
productShirts6.description = "Skjorta från Jacqueline de Yong Två bröstfickor med lock och knapp Försluts med knappar fram"
productShirts6.src = "images/shirts6.jpg";
productShirts6.src2 = "images/shirts6_2.jpg";
productShirts6.favorite = false;




let productShirts7 = new ProductClass();

productShirts7.id = "idShirts7";
productShirts7.category = "Shirts";
productShirts7.title = "Topshop - Shirtless";
productShirts7.price = 500;
productShirts7.size = "";
productShirts7.quantity = 1;
productShirts7.description = "Knytblus från Munthe Rak modell med långa ballongärmar med knäppning i ärmslut Dekorativa volanger på ärmar med dragsko Något rundad nederkant samt något längre bakstycke";
productShirts7.src = "images/shirts7.jpg";
productShirts7.src2 = "images/shirts7_2.jpg";
productShirts7.favorite = false;



let productShirts8 = new ProductClass();

productShirts8.id = "idShirts8";
productShirts8.category = "Shirts";
productShirts8.title = "Filippa - Silk Shirt";
productShirts8.price = 500;
productShirts8.size = "";
productShirts8.quantity = 1;
productShirts8.description = "Skjorta från Filippa K Oversized rak modell Krage Knäppning fram samt i ärmslut Silkes material";
productShirts8.src = "images/shirts8.jpg";
productShirts8.src2 = "images/shirts8_2.jpg";
productShirts8.favorite = false;




let productSweater1 = new ProductClass();

productSweater1.id = "idSweater1";
productSweater1.category = "Sweater";
productSweater1.title = "Ivyrevel - Fuzzy Cardigan Knit";
productSweater1.price = 500;
// productSweater1.size1 = "S";
// productSweater1.size2 = "M";
// productSweater1.size3 = "L";
productSweater1.size = "";
productSweater1.description = "Stickad cardigan från Ivyrevel V-ringad hals Oversize modell Långärmad";
productSweater1.src = "";
productSweater1.favorite = false;


let productSweater2 = new ProductClass();

productSweater2.id = "idSweater2";
productSweater2.category = "Sweater";
productSweater2.title = "Selected Femme - SLFINGA LS KNIT FRILL-NECK B";
productSweater2.price = 500;
// productSweater2.size1 = "S";
// productSweater2.size2 = "M";
// productSweater2.size3 = "L";
productSweater2.size = "";
productSweater2.description = "Tröja från Selected Femme Polokrage med veckad detalj Ribbad mudd nedtill samt i ärmslut";
productSweater2.src = "";
productSweater2.favorite = false;



let productSweater3 = new ProductClass();

productSweater3.id = "idSweater3";
productSweater3.category = "Sweater";
productSweater3.title = "Adidas Originals LRG LOGO HOODIE";
productSweater3.price = 500;
// productSweater3.size1 = "S";
// productSweater3.size2 = "M";
// productSweater3.size3 = "L";
productSweater3.size = "";
productSweater3.description = "Hoodie från Adidas Originals Oversized fit Luva med snörning Mudd i nederkant samt i ärmslut";
productSweater3.src = "";
productSweater3.favorite = false;


let productSweater4 = new ProductClass();

productSweater4.id = "idSweater4";
productSweater4.category = "Sweater";
productSweater4.title = "NLY Trend - Chunky Turtleneck Sweater";
productSweater4.price = 500;
// productSweater4.size1 = "S";
// productSweater4.size2 = "M";
// productSweater4.size3 = "L";
productSweater4.size = "";
productSweater4.description = "Grovstickad tröja från NLY Trend Långa puffärmar Polokrage";
productSweater4.src = "";
productSweater4.favorite = false;



let productSweater5 = new ProductClass();

productSweater5.id = "idSweater5";
productSweater5.category = "Sweater";
productSweater5.title = "Ivyrevel - Fuzzy Cardigan Knit";
productSweater5.price = 500;
// productSweater5.size1 = "S";
// productSweater5.size2 = "M";
// productSweater5.size3 = "L";
productSweater5.size = "";
productSweater5.description = "";
productSweater5.src = "";
productSweater5.favorite = false;



let productSweater6 = new ProductClass();

productSweater6.id = "idSweater6";
productSweater6.category = "Sweater";
productSweater6.title = "THE CLASSY ISSUE - Nudes Hoodie";
productSweater6.price = 500;
// productSweater6.size1 = "S";
// productSweater6.size2 = "M";
// productSweater6.size3 = "L";
productSweater6.size = "";
productSweater6.description = "Hoodie från THE CLASSY ISSUE Oversized Luva med snörning Magficka Ribbstickad mudd i ärmslut samt nedtill Logotyp framtill Tryck baktill";
productSweater6.src = "";
productSweater6.favorite = false;


let productSweater7 = new ProductClass();

productSweater7.id = "idSweater7";
productSweater7.category = "Sweater";
productSweater7.title = "Ivyrevel - Fuzzy Cardigan Knit";
productSweater7.price = 2390;
// productSweater7.size1 = "S";
// productSweater7.size2 = "M";
// productSweater7.size3 = "L";
productSweater7.size = "";
productSweater7.description = "";
productSweater7.src = "";
productSweater7.favorite = false;


let productSweater8 = new ProductClass();

productSweater8.id = "idSweater8";
productSweater8.category = "Sweater";
productSweater8.title = "Gina Tricot - Bella Teddy Sweater";
productSweater8.price = 780;
// productSweater8.size1 = "S";
// productSweater8.size2 = "M";
// productSweater8.size3 = "L";
productSweater8.size = "";
productSweater8.description = "Tröja i teddy från Gina Tricot Hög krage med dragkedja Resår i ärmslut och nederkant";
productSweater8.src = "";
productSweater8.favorite = false;
