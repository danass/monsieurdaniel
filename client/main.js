let iconarr = ["🤯", "🧽", "🪑" ,"🗿", "⚰", "🧻", "💊", "📡", "🔨", "🔫", "🪚"]

Template.registerHelper("eq", function (a, b) {
  return a == b;
});

Template.registerHelper("log", function (o) {
  console.log(o)
});

Template.registerHelper("date", function (o) {
  d = new Date(o)
  return d
});


Template.home.onCreated(function () { 
  
  if(navigator.userAgent.match(/Android|webOS|iPhone|iPod|Blackberry/i) ){
    console.log(navigator.userAgent)
    $('body ').html('This website cannot be viewed on a cellphone. <br>Do you really think that art is supposed to be viewed on a 7cm screen?')
    $('.blogcentered').parent().css('background-color', '#aeaeae!important')
  }


  $(document).on('keyup', (e) => {
    if (e.key == 'ArrowRight') {
      next()
    }
    if (e.key == 'ArrowLeft') {
      prev()
    }
    if(e.key == 'Escape') {
      exitfullpage()
    }
  });


      
    Meteor.setTimeout(() => {
      
      rendered = false

      if(!rendered) { 
        rendered = true;

      //   jQuery('<canvas/>', {
      //     id: 'flipbar',
      // }).appendTo('#works');
        preloadimg()
      }
      
    }, 1000);
      


});

Template.home.helpers({
  single(type) {
    return db.find({type:type})
  },
  id(id) {
    return db.find({_id: id})
  },
  idarr(arr) {
    
  }
});


let index = 1
let img_i = 1
let scrollY = 0
let activeclass = 0
let incrY = 0

Template.home.events({

  'wheel' (e, i) {
    // incrY+=e.originalEvent.wheelDelta ?? -e.originalEvent.deltaY 
    // if (incrY <= 0) {
    // $(".right .page").css('position', 'relative')
    // $(".right .page").css('transition', 'top 0.1s')   
    // $(".right .page").css('top', incrY)  

    // }
    // else {
    //   incrY = 0
    // }
    // console.log(incrY, $('.work-' + activeclass + ' .right .page:last' )[0].clientHeight)  
  },
  'click #next' (event, instance) {
    incrY = 0
     prev()
     
  },
  'click #prev' () {
    incrY = 0
    next()
    
  },
  'click .right'() {
    $('.page:not(:first-child)').css('display', 'none')
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
      // console.log(img_i )
     exitfullpage()

    }
  },
  'click #uncensoredbox' (e, i) {
    if($(e.currentTarget).is(':checked')) {
      $('body').addClass('darkmode') // changes background on click
    }
    else {
      $('body').removeClass('darkmode') // changes background on click
    }
  }
});


function next() {
  $('.blogcentered').parent().css('background-color', '#aeaeae!important')
  // lastdivh = $('.work-' + activeclass + ' .right .page:last' )[0].clientHeight
  incrY = 0
  if(activeclass == $('.right').length -1) {
    activeclass = 0
  }
  else {
  activeclass += 1
  }

  $(".right .page").css('top', 0)  
  $(".work:nth-child("+ index +")").hide()
  let count = $("#works > *").filter(":hidden").length
  if (index == count) {
    index = 0
  }
  index+=1;
  $(".work:nth-child("+ index + ")").css('display', 'flex')
}


function prev() {
  $('.blogcentered').parent().addClass('greybc')
  lastdivh = $('.work-' + activeclass + ' .right .page:last' )[0].clientHeight
    // console.log(lastdivh)
  incrY = 0
  if(activeclass == 0) {
    activeclass = $('.right').length -1
  }
  else {
    activeclass -= 1
  }

  activeclass = Math.abs(activeclass)
  $(".right .page").css('top', 0)  
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

function preloadimg() {
  preloadurl = []
  let arr = db.find({type: "Works"}).fetch()
  
  arr.forEach(e=> { 
    if (e.fields.Photos) {
    e.fields.Photos.forEach(p => preloadurl.push(p.url))
    }
    else {
      preloadurl.push("")
    }
  })

  var images = new Array()
			function preload() {
				for (i = 0; i < preload.arguments.length; i++) {
					images[i] = new Image()
					images[i].src = preload.arguments[i]
				}
			}
      preloadurl.forEach(u=> preload(u))
      console.log()
  return preloadurl

}


function exitfullpage() {
  $(".left").show()
  $(".right").show()
  $(".right .page").show()
  // $('.img-fullpage ').css('background-size', 'cover');
  $('.page:first-child').css('display', 'flex')
  $('.page-full').html("");
  $('.page-full').css("display", "none");
  
  img_i = 1
}

