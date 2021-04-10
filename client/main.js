import {preloadimg} from './load.js'
import {next, prev, exitfullpage} from './jquery.js'

let iconarr = ["🤯", "🧽", "🪑" ,"🗿", "⚰", "🧻", "💊", "📡", "🔨", "🔫", "🪚"]
curimg = 1

Template.home.helpers({
  single(type) { return db.find({type:type}) },
  id(id) { return db.find({_id: id}) }
});

Template.home.onCreated(function () { 
  $(document).on('keyup', (e) => {
    if (e.key == 'ArrowRight') { prev() }
    if (e.key == 'ArrowLeft') { next() }
    if (e.key == 'Escape') { exitfullpage() }
  });

  Meteor.setTimeout(() => {
    rendered = false
    if(!rendered) { rendered = true; preloadimg() }
    }, 1000)
})

Template.home.events({
  'click #next' () { next() }, 
  'click #prev' () { prev() },
  'click .right'() {
    $('.page:not(:first-child)').css('display', 'none')
    $(".page-full").css('display', 'flex')
    $(".page-full").append($(".work:nth-child("+ index +") .right").html());
    $(".left").hide()
    $(".right").hide()
  },
  'click .page-full'(e, i) {
    let count =  $(e.target).parent()[0].childElementCount
    $('.page:nth-child('+ curimg +')').hide()
    curimg += 1;
    $('.page:nth-child('+ curimg +')').css('display', 'flex')
    if ( curimg > count ) {
     exitfullpage()
    }
  }
});