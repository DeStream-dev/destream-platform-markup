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

$('.menu-toggle').on("click",function(){
  $('body').toggleClass("sidebar-collapse");
   setTimeout(function(){
    $('.slider').coverflow('refresh');
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




});