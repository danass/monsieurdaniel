Template.registerHelper("eq", function (a, b) {
  return a == b;
});

Template.registerHelper("log", function (o) {
  console.log(o)
});
 
Template.home.onCreated(function () { 
  if(navigator.userAgent.match(/Android|webOS|iPhone|iPod|Blackberry/i) ){
    console.log(navigator.userAgent)
    $('body ').html('This website cannot be viewed on a cellphone. <br>Yeah, my art is not supposed to be viewed on a 7cm screen. <br>Increase your INCHES sister.')
  }
  else {
    console.log("hey", navigator.userAgent)
   
  }

  $(document).on('keyup', (e) => {
    if (e.key == 'ArrowRight') {
      next()
    }
    if (e.key == 'ArrowLeft') {
      prev()
    }});
});

Template.home.helpers({
  single(type) {
    return db.find({type:type})
  },
  id(id) {
    return db.find({_id: id})
  },
});


let index = 1 ;
let img_i = 1;

Template.home.events({
  'click #next, click .left' (event, instance) {
    
     maindiv = $('#sub-main')
    let scrollh = $(maindiv)[0].scrollHeight
    let clienth = $(maindiv)[0].clientHeight
    console.log(maindiv[0].innerHTML)
     console.log(scrollh, clienth, scrollh > clienth)
     next()
  },
  'click #prev' () {
    prev()
  },
  'click .right'() {
    $(".page-full").css('display', 'flex')
    $(".page-full").append($(".work:nth-child("+ index +") .right").html());
    $(".left").hide()
    $(".right").hide()
  },
  'click .page-full'(e, i) {
    let count =  $(e.target).parent()[0].childElementCount
    $('.page:nth-child('+ img_i +')').hide()
    img_i += 1;
    $('.page:nth-child('+ img_i +')').css('display', 'flex')

    if ( img_i > count ) {

      $(".left").show()
      $(".right").show()
      $('.page:first-child').css('display', 'flex')
      $('.page-full').html("");
      $('.page-full').css("display", "none");
      img_i = 1
      //  $(".work:nth-child("+ index + ")").show()
    }
  },
  'click' (e,i) {

    let maindiv = $('#sub-main')
    let scrollh = $(maindiv)[0].scrollHeight
    let clienth = $(maindiv)[0].clientHeight
    console.log(maindiv)
     console.log(scrollh, clienth, scrollh > clienth)
  }
});


function next() {
  $(".work:nth-child("+ index +")").hide()
  let count = $("#works > *").filter(":hidden").length
  if (index == count) {
    index = 0
  }
  index+=1;
  $(".work:nth-child("+ index + ")").css('display', 'flex')
}


function prev() {
  $(".work:nth-child("+ index +")").hide()
  let count = $("#works > *").filter(":hidden").length
  index-=1;
  if (index <= 0) {
    index = count
  }
  $(".work:nth-child("+ index + ")").css('display', 'flex')
}


function isOverflown(element) {
  return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}