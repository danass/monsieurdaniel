index = 1
activeclass = 0

function next() {
  exitfullpage()
  
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
  
  if($('.work-' + activeclass + ' .right .page').hasClass('blogcentered'))
  { $('.blogcentered').parent().css('background-color', '#aeaeae!important')}
}


function prev() {
  exitfullpage()

  $('.blogcentered').parent().addClass('greybc')
  lastdivh = $('.work-' + activeclass + ' .right .page:last' )[0]?.clientHeight
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

  if($('.work-' + activeclass + ' .right .page').hasClass('blogcentered'))
  { $('.blogcentered').parent().css('background-color', '#aeaeae!important')}

}


function exitfullpage() {
  $(".left").show()
  $(".right").show()
  $(".right .page").show()
  $('.page:first-child').css('display', 'flex')
  $('.page-full').html("");
  $('.page-full').css("display", "none"); 
  curimg = 1
}

export {next, prev, exitfullpage}