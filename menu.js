let cartList = [];

$(document).ready(function () {
	cartList = JSON.parse(localStorage.getItem("cartList")) || [];
	console.log(cartList);

	$(".header-brand").click(function () {
		window.location.href = "home.html";

	});

	$("#itemPastries").click(function () {
		window.location.href = "pastries.html";

	});

	$("#itemDesserts").click(function () {
		window.location.href = "desserts.html";

	});

	$("#itemDrinks").click(function () {
		window.location.href = "drinks.html";

	});

	$(".order-item").click(function () {
		let name = $(this).find(".item-name").text();
		let price = $(this).find(".price").text();
		let img = $(this).find("img").attr("src");
		
		let category = $(this).find(".item-name").attr("class").split(" ")[1];
		
		$(".parent-container").prepend("<div class='block-screen'></div><div class='item-popup'>"
					+ "<button class='x-cancel' onclick='removePopup()'>✖</button>"
					+ "<div class='center-flex'>"
						+ "<img class='brand-img' src='https://i.imgur.com/ChSKUzT.png'>"
						+ "<label class='brand-label'>" + $(".banner-texts label:first").text() + "</label>"
					+ "</div><div class='center-flex'>"
						+ "<img src='" + img + "' height='170px'>"
						+ "<div>"
							+ "<label>" + name + "</label>"
							+ "<label>" + price + "</label>"
							+ "<button class='popup-ok' onclick='addToCart(\"" + name + "\"," + price.substring(2) + ",\"" + img + "\",\"" + category + "\")'>ADD TO CART</button>"
					+ "</div></div></div>");
		$(".item-popup").fadeIn("ease");
	});
		
	if (cartList.length != 0) {
		let totalAmount = 0;		
		
		cartList.forEach(item => {
			let cartCategories = document.querySelectorAll(".cart-category");
			
			totalAmount += parseFloat(item.price);

			for  (let index = 0; index < cartCategories.length; index++) {
				if (cartCategories[index].classList.contains(item.category)) {


					cartCategories[index].innerHTML += "<div class='cart-item center-flex'>"
								+ "<div class='center-flex'><img src='" + item.img + "'></div>"
								+ "<p>" + item.name + "<br>P " + item.price + ".00</p>"
							+ "</div>";
				}
			}


			$(".order-list").append("<div class='listed center-flex'>"
							+ "<label>1 " + item.name + "</label>" 
							+ "<label>P " + item.price + ".00</label>" 
						+ "</div>");

		});

		$("#totalAmount").text("Total Amount: P " + totalAmount + ".00");
		$(".order-list").append("<div class='listed center-flex'>"
						+ "<label>TOTAL</label>" 
						+ "<label>P " + totalAmount + ".00</label>" 
					+ "</div>");
	}

	if (localStorage.getItem("payment") === null) {
		localStorage.setItem("payment", "Cash On Delivery");
	}
	
	$(".mode-options div:first").click( function () {
		$(this).css("border", "4px solid blue");
		$(".mode-options div:last").css("border", "4px solid #67481b");
		localStorage.setItem("payment", "Cash On Delivery");
	});

	$(".mode-options div:last").click( function () {
		$(this).css("border", "4px solid blue");
		$(".mode-options div:first").css("border", "4px solid #67481b");
		localStorage.setItem("payment", "GCash");
	});

	$("#modePayment").text("Mode of Payment: " + localStorage.getItem("payment"));
});

class Order {
	constructor (name, price, img, category) {
		this.name = name;
		this.price = price;
		this.img = img;
		this.category = category;
	}
}

function removePopup() {
	$(".item-popup").fadeOut("1000", function() {
		$(this).remove();
		$(".block-screen").remove();
	});
}

function backToCategory() {
		window.location.href = "categories.html";
}

function seeCart() {
		window.location.href = "cart.html";
}

function addToCart(name, price, img, category) {
	console.log(name);
	console.log(price);
	console.log(img);
	console.log(category);

	let order = new Order(name, price, img, category); 
	
	cartList.push(order);
	localStorage.setItem("cartList", JSON.stringify(cartList));

	$(".popup-ok").text("ORDER ADDED!")
	$(".popup-ok").css("background-color", "#fa9600");

	removePopup();
}

function checkOut() {
	window.location.href = "payment.html";
}

function backToMenu() {
	localStorage.clear();
	window.location.href = "categories.html";
}
