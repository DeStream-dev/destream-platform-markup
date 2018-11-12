$(document).ready(function() { 

$('a[disabled]').bind("click",function(){  
    return false;
});

svg4everybody();
  
 if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
  $('.selectpicker').selectpicker('mobile');
}
/*
$('.form form').validator().on('submit', function (e) {
  if(e.isDefaultPrevented()){
      
    $(this).find('select:required').each(function(){
      if($(this).val() == ""){
        $(this).parents(".bootstrap-select").addClass("has-error");
      }
    });   

  } 
  else{ //submit
   
   }
});
*/
/**************** выезд главного меню при скролле *******************/
     /* 
      var wasAnimate = false; 
      var offset = parseInt($('header').height()); 
      var ta;
      var place = function(){   
      var dy = $(window).scrollTop();
          
      if (dy > offset){       
        if(wasAnimate == false){
          ta = setTimeout(function(){
          $('body').addClass('fixedHeader');
          $('header, .top-menu').css("top","-60px").animate({"top":0},500);
          },300);
          
          wasAnimate = true;
        }    
      }
      else{
      $('body').removeClass('fixedHeader');
      clearTimeout(ta);
      wasAnimate = false;
      }
    
    };
  place();        
    
  $(window).scroll(function(){       
        place();    
    });
*/

$('.menu-toggle').on("click",function(){
  $('body').toggleClass("sidebar-collapse");
   setTimeout(function(){
  //  $('.slider').coverflow('refresh');
    $('.slick-slider').slick('resize');
  },300);
   return false;
});

function searchH(){
   var wH = $(window).height();
   var hH = $('header').outerHeight(); 
  $('header .search-results').height((wH-hH) - 30);
}
searchH();
function screen(){
  $('.main-content').css("min-height","unset");
  var wH = $(window).height();
  var hH = $('header').outerHeight(); 
  var aH = $('aside').outerHeight();
    if(aH > wH)  $('.main-content').css("min-height",(aH)+"px");
      else  $('.main-content').css("min-height",(wH - hH)+"px");     
} 

/* setTimeout(function(){
  screen();
},100);
*/
$(window).resize(function() {
  searchH();
     /*  setTimeout(function(){
        screen();    
      },300);*/
      if( $('.slider').lehgth){
      setTimeout(function(){
        $('.slider').refresh();      
      },300);
    }
 });

/************************  quicksearch    ****************************/

if($('.main-sidebar .block .title .search-input').length){
$('.main-sidebar .block.people .title .search-input input[type="search"]').quicksearch('.main-sidebar .block.people ul li',{
   selector: 'span.name'
});
$('.main-sidebar .block.game .title .search-input input[type="search"]').quicksearch('.main-sidebar .block.game ul li',{
   selector: 'span.name'
});
$('.main-sidebar .block.lifestyle .title .search-input input[type="search"]').quicksearch('.main-sidebar .block.lifestyle ul li',{
   selector: 'span.name'
});
}

var smallSlider = $('.slides'); 
var options = {
  dots: true,
  arrows: false,
  infinite: false,
  speed: 700,
  slidesToShow: 1,
  centerMode: false,
  variableWidth: false,
  adaptiveHeight: false,
  autoplay: false,
  responsive: true
};
smallSlider.slick(options);


var announcementSlider = $('.large.carousel'); 
var announcementliderOptions = {
  dots: false,
  arrows: true,
  prevArrow: "<a class='slick-prev'><svg><use xlink:href='img/vectors.svg#arrow-prev'></use></svg></a>",
  nextArrow: "<a class='slick-next'><svg><use xlink:href='img/vectors.svg#arrow-next'></use></svg></a>",
  infinite: false,
  speed: 700,
  slidesToShow: 2,
  centerMode: false,
  variableWidth: false,
  adaptiveHeight: false,
  autoplay: false,
      responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true
      }
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true
      }
    }
  ]
};
announcementSlider.slick(announcementliderOptions);

$('.modal .links a').click(function(){  
  if($(this).hasClass("reg-link")){
    $('.modal-auth .nav-pills li a').removeClass("active");
    $('.modal-auth .nav-pills li a#registration-tab').addClass("active");
    $('.modal-auth .tab-pane').removeClass("show").removeClass("active");
    $('.modal-auth .tab-pane#registration').addClass("show").addClass("active");
  }  
});


$('.modal').on('shown.bs.modal', function () {
  var thisWin = $(this);
  var sliderM;
  if(thisWin.find('.slides').length){
      sliderM = thisWin.find('.slides'); 
      if(sliderM.hasClass('slick-initialized')){
        sliderM.slick('unslick');
      } 
    setTimeout(function(){
      if(thisWin.find('.slides').length){
             sliderM.slick(options);
        }
      }, 100);     
    } 
});



//счетчики
$('.quantity a').click(function(){
  var inputField = $(this).parent('.quantity').find('input[type="text"]');
  var inputVal = parseInt(inputField.val());
 
  if($(this).hasClass("increase")){
      inputField.val(++inputVal);;
  }
  else{
    if(inputVal == 1) {
      return false;
    }
     inputField.val(--inputVal);
  }
  return false;
})


$('.confirm-transfer input[name="key"]').on("change",function(){
  var val = $(this).val();
  $('.field').hide();
  $('.'+ val +'-field').show();
});

$('.switch input[name="switch"]').on("change",function(){
 var val = $(this).val();
  if(val == '1'){
    $('.is-voting').show();
  }
    else $('.is-voting').hide();
  
});

if($('.text-editor').length){
  $.trumbowyg.svgPath = 'img/text-editor/icons.svg';
  $('.text-editor').trumbowyg({
    btns: ['unorderedList', 'orderedList', 'em', 'strong', 'link'],
    autogrow: true
  });
}

$('.services .list a').on("click",function(){
 var this_a = $(this);
 var this_item = $(this).parents('.list');
 
     this_item.find(".units").slideToggle(300,function(){
     this_item.toggleClass("open");
    });

   return false;
});


$('.settings .notification .item .name').on("click",function(){
 var this_a = $(this);
 var this_item = $(this).parents('.item');
 
     this_item.find(".parameters").slideToggle(300,function(){
     this_item.toggleClass("open");
    });

   return false;
});



$('.bars').each(function(){
  var this_bar = $(this);
  if(this_bar.hasClass("open")){      
      this_bar.find(".contain").show();
    }
});
$('.bars a').on("click",function(){
 var this_a = $(this);
 var this_item = $(this).parents('.bars');
 
   $('.bars').each(function(){
    var this_bar = $(this);
    if(this_bar.hasClass("open")){      
      this_bar.find(".contain").slideUp(300,function(){
       this_bar.removeClass("open");
      });
    }
   });
if(!this_item.hasClass("open")){
   this_item.find(".contain").slideDown(300,function(){
     this_item.addClass("open");
     });
}
   return false;
});



var player = new Plyr('.live-broadcast .player video');

        
//var audioplayer = new Plyr('.audioplayer');
//const players = Plyr.setup('.modal-audio .items dl dd.play .audioplayer');
const players = Array.from(document.querySelectorAll('.modal-audio .items dl dd.play .audioplayer')).map(p => new Plyr(p));


$('.widget .side-group .colors a').each(function(){
  if($(this).data('color')){
    $(this).css("background",$(this).data('color'));
  }
});

$('.main-sidebar .block .title .search-input .btn').on("click", function(){
  $(this).parents(".search-input").removeClass("minimize");
  $(this).parents(".search-input").css({'width':'100%'});
  $(this).parents(".search-input").find("input[type='search']").focus();
});

$(".main-sidebar .block .title .search-input input[type='search']").on("blur", function(){

  $(this).parents(".search-input").animate({'width': '40px'},300,function(){
    $(this).addClass("minimize");
  });


 // $(this).parents(".search-input").addClass("minimize");
});


/*
var availableTags = [
      "The Witcher 3: Wild H…Grand Theft",
      "Auto V",
      "Rise of the Tomb Raider",
      "Ведьмак 3",
      "Battlefield 1",
      "Fortnite",
      "For honor",
      "Новости",
      "Мультики",
      "Forza Horizon 4"
    ];
    $( "header .search-input input, .main-sidebar .block .title .search-input input" ).autocomplete({
      source: availableTags,
       open: function( event, ui ) {
        var input = event.target;
        $(input).parents(".search-input").addClass("search-active");
       },
       close: function( event, ui ) {
        var input = event.target;
        $(input).parents(".search-input").removeClass("search-active");
       }
    });
*/
$( "header .search-input input[type='search'" ).on("focus",function(){
  $('header .search-results').addClass("open");
  $(this).parents(".search-input").addClass("search-active");
});
$( "header .search-input input[type='search'" ).on("blur",function(){
   $('header .search-results').removeClass("open");
    $(this).parents(".search-input").removeClass("search-active");
});

$('.form .tags span').on('click', function(){
  //remove tag here
});

$('.modal-audio .add-audio').on('click', function(){
  $('.modal-audio').toggleClass('adding-audio')
  $('.modal-audio .adding-audio-cont').fadeToggle();
 // $('.modal-audio .items').fadeToggle();
  return false;
});
$('.adding-audio-cont .btn').on('click', function(){
  $('.modal-audio').removeClass('adding-audio')
  $('.modal-audio .adding-audio-cont').fadeOut();
//  $('.modal-audio .items').fadeIn();
  return false;
});

$('.modal-audio .items dl').on('click', function(){
  $('.modal-audio .items dl').removeClass("selected");
  $(this).addClass('selected');
});

function dropdownSimpleScroll(){
  $('.dropdown .dropdown-menu.inner').each(function(){
    new SimpleBar($(this)[0]);
  });
}

setTimeout(function(){
  dropdownSimpleScroll();
},500);
 

  $('header .search-btn').on("click", function(){
    $('header .search-panel').addClass("open");
    return false;
  });
$('header .search-panel .close').on("click", function(){
    $('header .search-panel').removeClass("open");
    return false;
  });
$('.main-sidebar .close').on("click", function(){
    $('body').removeClass("sidebar-collapse");
    return false;
  });


});



Dropzone.options.transferform = { 
  autoProcessQueue: false,
  uploadMultiple: false,
  parallelUploads: 1,
  maxFiles: 1,
  createImageThumbnails: false,
  addRemoveLinks: false,
  clickable: ".modal-transfer-2 .dropzone .dz-message",
  previewsContainer: ".modal-transfer-2 .preview",
  previewTemplate: "<div class=\"dz-preview dz-file-preview\">\n    <div class=\"dz-filename\"><span data-dz-name></span></div>\n  </div>\n ",

  init: function() {
    var myDropzone = this;
    var newfile = "";

    this.on("addedfile", function(file) {
      if(newfile) {
        $('.confirm-transfer .key-file-field .preview .dz-preview:first-of-type').remove();
      }
      newfile = $('.confirm-transfer .key-file-field [data-dz-name]').html();
      $('.confirm-transfer .key-file-field').addClass("file-added");
      $('.confirm-transfer .key-file-field .ok').show();
     });
  }
 
};

Dropzone.options.addblockform = { 
  autoProcessQueue: false,
  uploadMultiple: false,
  parallelUploads: 1,
  maxFiles: 1,
  createImageThumbnails: true,
  addRemoveLinks: false,
  clickable: ".modal-addblock .dropzone .dz-message",
  thumbnailWidth: null,
  thumbnailHeight: null,
  previewsContainer: ".modal-addblock .preview",
  previewTemplate: "<div class=\"dz-preview dz-file-preview\">\n  <div class=\"dz-image\"><img data-dz-thumbnail /></div>\n  </div>",

  init: function() {
    var myDropzone = this; 
    var newfile = "";
    this.on("addedfile", function(file) {
       if(newfile) {
        $('.modal-addblock .preview .dz-preview:first-of-type').remove();
      }
      newfile = $('.modal-addblock [data-dz-name]').html();
      $('.modal-addblock .dropzone').addClass("file-added");

    });
  }
 
};



Dropzone.options.personaltabform = { 
  autoProcessQueue: false,
  uploadMultiple: false,
  parallelUploads: 1,
  maxFiles: 1,
  createImageThumbnails: true,
  addRemoveLinks: false,
  clickable: ".settings .personal .change-photo",
  thumbnailWidth: null,
  thumbnailHeight: null,
  previewsContainer: ".settings .personal .preview",
  previewTemplate: "<div class=\"dz-preview dz-file-preview\">\n  <div class=\"dz-image\"><img data-dz-thumbnail /></div>\n  </div>",

  init: function() {
    var myDropzone = this; 
    var newfile = "";
    this.on("addedfile", function(file) {
       if(newfile) {
        $('.settings .personal .preview .dz-preview:first-of-type').remove();
      }
      newfile = $('.settings .personal [data-dz-name]').html();
      $('.settings .personal .change-photo').addClass("added");

    });
  }
 
};


Dropzone.options.addaudioform = { 
  autoProcessQueue: false,
  uploadMultiple: false,
  parallelUploads: 1,
  maxFiles: 1,
  createImageThumbnails: false,
  addRemoveLinks: false,
  clickable: ".modal-audio .dropzone .dz-message",
  previewsContainer: ".modal-audio .preview",
  previewTemplate: "<div class=\"dz-preview dz-file-preview\">\n    <div class=\"dz-filename\"><span data-dz-name></span></div>\n  </div>\n ",

  init: function() {
    var myDropzone = this;
    var newfile = "";

    this.on("addedfile", function(file) {
      if(newfile) {
        $('.modal-audio .preview .dz-preview:first-of-type').remove();
      }
      newfile = $('.modal-audio [data-dz-name]').html();
      $('.modal-audio .form').addClass("file-added");
     });
  }
 
};


$(function() {
if($('[data-rangeslider]').length){
        var $document = $(document);
        var selector = '[data-rangeslider]';
        var $element = $(selector);
        var textContent = ('textContent' in document) ? 'textContent' : 'innerText';
       
        function valueOutput(element) {
            var value = element.value;
            var output = element.parentNode.getElementsByTagName('output')[0] || element.parentNode.parentNode.getElementsByTagName('output')[0];
            if(output) output[textContent] = value;
            if($(element).data("for") != undefined){
              output = $('#'+$(element).data("for"));
              output.val(value);
            }
        }

        $document.on('input', 'input[type="range"], ' + selector, function(e) {
            valueOutput(e.target);
        });

        $element.rangeslider({
            polyfill: false,
            onInit: function() {
               valueOutput(this.$element[0]);
            },
            onSlide: function(position, value) {
               // console.log('onSlide');
               // console.log('position: ' + position, 'value: ' + value);
            },
            onSlideEnd: function(position, value) {
               // console.log('onSlideEnd');
               // console.log('position: ' + position, 'value: ' + value);
            }
        });
      }

    });