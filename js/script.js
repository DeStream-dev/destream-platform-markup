$(document).ready(function() { 

$('a[disabled]').bind("click",function(){  
    return false;
});

svg4everybody();

$('.slider').coverflow({
  duration:   1000,
  index:      1,
  innerAngle: 75,
  innerScale: 1,
  visible:    'density',
  selectedCss:  { opacity: 1  },
  outerCss:   { opacity: .5 }
});

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
      setTimeout(function(){
        $('.slider').refresh();      
      },300);
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


var channelSlider = $('.mychannel .list-announcement-tile .large'); 
var channelSliderOptions = {
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
channelSlider.slick(channelSliderOptions);



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

});

if(Dropzone != undefined){

Dropzone.options.transferform = { // The camelized version of the ID of the form element

  // The configuration we've talked about above
  autoProcessQueue: false,
  uploadMultiple: false,
  parallelUploads: 1,
  maxFiles: 1,
  createImageThumbnails: false,
  addRemoveLinks: false,
  previewsContainer: ".preview",
  previewTemplate: "<div class=\"dz-preview dz-file-preview\">\n    <div class=\"dz-filename\"><span data-dz-name></span></div>\n  </div>\n ",

  init: function() {
    var myDropzone = this;
    this.on("addedfile", function(file) {$('.confirm-transfer .key-file-field').addClass("file-added");$('.confirm-transfer .key-file-field .ok').show();});
  }
 
}

}