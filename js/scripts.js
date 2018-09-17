/*
* Whiteblock LLC
**/
$(function() {
    "use strict";

    var wind = $(window);

    // scrollIt
    $.scrollIt({
      upKey: 38,                // key code to navigate to the next section
      downKey: 40,              // key code to navigate to the previous section
      easing: 'swing',          // the easing function for animation
      scrollTime: 600,          // how long (in ms) the animation takes
      activeClass: 'active',    // class given to the active nav element
      onPageChange: null,       // function(pageIndex) that is called when page is changed
      topOffset: -80            // offste (in px) for fixed top navigation
    });

    // navbar scrolling background
    wind.on("scroll",function () {
        var bodyScroll = wind.scrollTop(),
            navbar = $(".navbar"),
            navbloglogo = $(".blog-nav .logo> img"),
            logo = $(".navbar .logo> img");

        if(bodyScroll > 100){
            navbar.addClass("nav-scroll");
            logo.attr('src', 'img/whiteblock-logo-dark.png');
        }else{
            navbar.removeClass("nav-scroll");
            logo.attr('src', 'img/whiteblock-logo-light.png');
            navbloglogo.attr('src', 'img/whiteblock-logo-dark.png');
        }
    });

    // close navbar-collapse when a  clicked
    $(".navbar-nav a").on('click', function () {
        $(".navbar-collapse").removeClass("show");
    });

    // sections background image from data background
    var pageSection = $(".bg-img, section");
    pageSection.each(function(indx){
        if ($(this).attr("data-background")){
            $(this).css("background-image", "url(" + $(this).data("background") + ")");
        }
    });

    // === owl-carousel === //
    // Testimonials owlCarousel
    $('.testimonails .owl-carousel').owlCarousel({
        items:1,
        loop:true,
        margin: 15,
        mouseDrag:false,
        autoplay:true,
        smartSpeed:500
    });

    // Team owlCarousel
    $('.team .owl-carousel').owlCarousel({
        loop:true,
        margin: 30,
        mouseDrag:false,
        autoplay:true,
        smartSpeed:500,
        responsiveClass:true,
        responsive:{
            0:{
                items:1
            },
            700:{
                items:2
            },
            1000:{
                items:4
            }
        }
    });

    // Blog owlCarousel
    $('.blog .owl-carousel').owlCarousel({
        loop:true,
        margin: 30,
        mouseDrag:false,
        autoplay:true,
        smartSpeed:500,
        responsiveClass:true,
        responsive:{
            0:{
                items:1
            },
            700:{
                items:2
            },
            1000:{
                items:3
            }
        }
    });

    // Services Tabs
    $(".tabs-icon").on("click", ".item", function(){

        var myID = $(this).attr("id");

        $(this).addClass("active").siblings().removeClass("active");

        $("#" + myID + "-content").fadeIn(700).siblings().hide();

    });

    // Map Show
    $(".info").on("click", ".icon-toggle", function(){

        $(".info").toggleClass("map-show");
        $(".map").toggleClass("o-hidden");

    });
});

// === window When Loading === //
$(window).on("load",function (){

    var wind = $(window);
    // Preloader
    $(".loading-logo").fadeOut(500);

    // isotope
    $('.gallery').isotope({
      // options
      itemSelector: '.items'
    });

    var $gallery = $('.gallery').isotope({
      // options
    });

    // filter items on button click
    $('.filtering').on( 'click', 'span', function() {
        var filterValue = $(this).attr('data-filter');
        $gallery.isotope({ filter: filterValue });
    });

    $('.filtering').on( 'click', 'span', function() {
        $(this).addClass('active').siblings().removeClass('active');
    });

    // contact form validator
    $('#contact-form').validator();
});

// Submission through AJAX to prevent taking the users to "Thank you"
// confirmation page of Mailchimp
// Credit: http://stackoverflow.com/a/15120409/215821
  $(document).ready(function(){
      ajaxMailChimpForm($("#subscribe-form"), $("#subscribe-result"));

      // Turn the given MailChimp form into an ajax version of it.
      // If resultElement is given, the subscribe result is set as html to
      // that element.
      function ajaxMailChimpForm($form, $resultElement){

          // Hijack the submission. Submit the form manually.
          $form.submit(function(e) {
              e.preventDefault();

              if (!isValidEmail($form)) {
                  var error =  "Please provide a valid email.";
                  $resultElement.html(error);
                  $resultElement.css("color", "white");
              } else {
                  $resultElement.css("color", "white");
                  $resultElement.html("Subscribing...");
                  submitSubscribeForm($form, $resultElement);
              }
          });
      }

      // Validate the email address in the form
      function isValidEmail($form) {
          var email = $form.find("input[type='email']").val();
          if (!email || !email.length) {
              return false;
          } else if (email.indexOf("@") == -1) {
              return false;
          }
          return true;
      }

      // Submit the form with an ajax/jsonp request.
      function submitSubscribeForm($form, $resultElement) {
          $.ajax({
              type: "GET",
              url: $form.attr("action"),
              data: $form.serialize(),
              cache: false,
              dataType: "jsonp",
              jsonp: "c", // trigger MailChimp to return a JSONP response
              contentType: "application/json; charset=utf-8",

              error: function(error){
                  // According to jquery docs, this is never called for cross-domain JSONP requests
              },

              success: function(data){
                  if (data.result != "success") {
                      var message = data.msg || "Unable to subscribe. Please try again.";
                      $resultElement.css("color", "red");

                      if (data.msg && data.msg.indexOf("already subscribed") >= 0) {
                          message = "You're already subscribed.";
                          $resultElement.css("color", "white");
                      }

                      $resultElement.html(message);

                  } else {
                      $resultElement.css("color", "white");
                      $resultElement.html("Thank you for subscribing!");
                  }
              }
          });
      }
  });

  // Toaster message
  function toaster() {
    var x = document.getElementById("subscribe-result");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }

// Slider
$(document).ready(function() {
    var owl = $('.header .owl-carousel');

    // Slider owlCarousel
    $('.slider .owl-carousel').owlCarousel({
        items: 1,
        loop:true,
        margin: 0,
        autoplay:true,
        smartSpeed:500
    });

    // Slider owlCarousel
    $('.slider-fade .owl-carousel').owlCarousel({
        items: 1,
        loop:true,
        margin: 0,
        autoplay:true,
        smartSpeed:500,
        animateOut: 'fadeOut'
    });

    owl.on('changed.owl.carousel', function(event) {
        var item = event.item.index - 2;     // Position of the current item
        $('h3').removeClass('animated fadeInLeft');
        $('h1').removeClass('animated fadeInRight');
        $('p').removeClass('animated fadeInUp');
        $('.butn').removeClass('animated zoomIn');
        $('.owl-item').not('.cloned').eq(item).find('h3').addClass('animated fadeInLeft');
        $('.owl-item').not('.cloned').eq(item).find('h1').addClass('animated fadeInRight');
        $('.owl-item').not('.cloned').eq(item).find('p').addClass('animated fadeInUp');
        $('.owl-item').not('.cloned').eq(item).find('.butn').addClass('animated zoomIn');
    });
});
