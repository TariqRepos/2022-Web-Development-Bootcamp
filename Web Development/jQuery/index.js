// Arg1 is getting css element and arg2 is seeting the value
// $("h1").addClass("big-title margin-50");

$("h1").text("Bye");

$("button").text("<em>Hey</em>");

// Getting img attribute
console.log($("img").attr("src"));

$("a").attr("href", "https://www.yahoo.com");

$("h1").click(function() {
  $("h1").css("color", "purple");
});


// // Using click event ro change h1 color ro purple
// // With only js
// // for (var i = 0; i<5; i++){
// //   document.querySelectorAll("button")[i].addEventListener("click", function() {
// //     document.querySelector("h1").style.color = "purple";
// //   });
// // }
//
// // With jQuery
// $("button").click(function() {
//   $("h1").css("color", "purple");
// });


// $("input").keypress(function(event) {
//   console.log(event.key);
// });

$("input").keypress(function(event) {
  $("h1").text(event.key);
});


// // Specfiying the event
// $("h1").mouseover(function() {
//   $("h1").css("color", "blue");
// });

// Just using on
$("h1").on("mouseover", function() {
  $("h1").css("color", "blue");
});


// Creating elements with before, after, prepend, append
$("h1").before("<button>Before</button>");
$("h1").after("<button>After</button>");
$("h1").prepend("<button>Prepend</button>");
$("h1").append("<button>Append</button>");

// // Remove elements
// $("button").remove();


// Animation practice
$("button").click(function() {
  // $("h1").hide();
  // $("h1").show();
  // $("h1").toggle();

  // $("h1").fadeOut();
  // $("h1").fadeIn();

  // $("h1").slideUp();
  // $("h1").slideDown();
  // $("h1").slideToggle();

  // // Will only work on numeric values
  // $("h1").animate({opacity: 0.5});
  // $("h1").animate({margin: 20}); // Pixels
  // $("h1").animate({margin: "20%"}); // Percentage

  // You can chain animations
  $("h1").slideUp().slideDown().animate({opacity: 0.5});
});
