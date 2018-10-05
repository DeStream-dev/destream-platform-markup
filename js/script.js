$(document).ready(function() { 

$('a[disabled]').bind("click",function(){  
    return false;
});

svg4everybody();
   setTimeout(function(){
    $('.slider').coverflow({
    duration:   1000,
    index:      1,
    innerAngle: 75,
    innerScale: 1,
    visible:    'density',
    selectedCss:  { opacity: 1  },
    outerCss:   { opacity: 1 }
  });
  },100);


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


$('.menu-toggle').on("click",function(){
  $('body').toggleClass("sidebar-collapse");
   setTimeout(function(){
    $('.slider').coverflow('refresh');
    $('.slick-slider').slick('resize');
  },300);
});

function screen(){
  $('.main-content').css("min-height","auto");
  var wH = $(window).height();
  var hH = $('header').outerHeight(); 
  var aH = $('aside').outerHeight();
    if(aH > wH)  $('.main-content').css("min-height",(aH)+"px");
      else  $('.main-content').css("min-height",(wH - hH)+"px");     
} 

 setTimeout(function(){
  screen();
},100);

$(window).resize(function() {
      screen();
      if( $('.slider').lehgth){
      setTimeout(function(){
        $('.slider').refresh();      
      },300);
    }
 });


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
  responsive: true
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
 if(!this_item.hasClass("open")){
  $('.services .list a').each(function(i){
    var this_a1 = $(this);   
    var this_item1 = $(this).parents('.list');;   
      if(this_item1.hasClass("open")) {
        $(this).next(".units").slideUp();
        this_item1.removeClass("open");
      }    
  });
}
    $(this).next(".units").slideToggle(300,function(){
      this_item.toggleClass("open");
    });

   return false;
});

var player = new Plyr('.live-broadcast .player video');
var player1 = new Plyr('.player1 video');
var player2 = new Plyr('.player2 video');
var player3 = new Plyr('.player3 video');
var player4 = new Plyr('.player4 video');
var player5 = new Plyr('.player5 video');



$('.widget .side-group .colors a').each(function(){
  if($(this).data('color')){
    $(this).css("background",$(this).data('color'));
  }
});



});



Dropzone.options.transferform = { 
  autoProcessQueue: false,
  uploadMultiple: false,
  parallelUploads: 1,
  maxFiles: 200,
  createImageThumbnails: false,
  addRemoveLinks: false,
  previewsContainer: ".modal-transfer .preview",
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
 
}

Dropzone.options.addblockform = { 
  autoProcessQueue: false,
  uploadMultiple: false,
  parallelUploads: 1,
  maxFiles: 200,
  createImageThumbnails: true,
  addRemoveLinks: false,
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
 
}
