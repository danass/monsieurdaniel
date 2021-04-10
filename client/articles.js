import {preloadimg} from './load.js'
import {next, prev, exitfullpage} from './jquery.js'

let iconarr = ["🤯", "🧽", "🪑" ,"🗿", "⚰", "🧻", "💊", "📡", "🔨", "🔫", "🪚"]
curimg = 1
done = false
Template.articles.helpers({
  single(type) { return db.find({type:type}) },
  id(id) { return db.find({_id: id}) }
});

Template.articles.onCreated(function () { 
  $(document).on('keyup', (e) => {
    if (e.key == 'ArrowRight') { prev() }
    if (e.key == 'ArrowLeft') { next() }
    // if (e.key == 'Escape') { exitfullpage() }
  });

  Meteor.setTimeout(() => {
    rendered = false
    if(!rendered) { rendered = true; preloadimg()
      //this function is used for parsing raw txt from airtable to formatted text
      $('.entry-text').each(function (e) {
        $(this).html($(this)[0].innerText)
      }) }
    }, 1000)
})

Template.articles.events({
  'click #next' () { next() }, 
  'click #prev' () { prev() },
  // 'click .right'() {
  //   $('.page:not(:first-child)').css('display', 'none')
  //   $(".page-full").css('display', 'flex')
  //   $(".page-full").append($(".work:nth-child("+ index +") .right").html());
  //   $(".left").hide()
  //   $(".right").hide()
  // },
  // 'click .page-full'(e, i) {
  //   let count =  $(e.target).parent()[0].childElementCount
  //   $('.page:nth-child('+ curimg +')').hide()
  //   curimg += 1;
  //   $('.page:nth-child('+ curimg +')').css('display', 'flex')
  //   if ( curimg > count ) {
  //    exitfullpage()
  //   }
  // },
  // 'load' (e, i) {
  //   if (!done) {
  //     $('.entry-text').each(function (e) {
  //       $(this).html($(this)[0].innerText)
  //     })
  //     done = true
  //   }
  // },
  'click .alt' (e, i) {
      $('.right').animate({
          scrollTop: $(".caption").offset().top},'slow')
  }
});





Template.article.onCreated(function () { 

  });
