import {preloadimg} from './global/load.js'
// import {exitfullpage} from './global/jquery.js'

let iconarr = ["🤯", "🧽", "🪑" ,"🗿", "⚰", "🧻", "💊", "📡", "🔨", "🔫", "🪚"]
curimg = 1
done = false
Template.works.helpers({
  single(type) { return db.find({type:type}) },
  id(id) { return db.find({_id: id}) },
  getwork() {
    let ids = Object.values(db.find({type:"Works"}).map(e => {return e.id}))
    let index = Template.instance().curindex.get()
    return db.findOne({_id: ids[index]})
  },
  curindex() {
    return Template.instance().curindex.get()
  }
});

Template.works.onCreated(function () { 
  $(document).on('keyup', (e) => {
    // if (e.key == 'ArrowRight') { prev() }
    // if (e.key == 'ArrowLeft') { next() }
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

    this.curindex = new ReactiveVar(0)
    Tracker.autorun(() => {
      this.dblen = new ReactiveVar(Object.values(db.find({type:"Works"}).map(e => {return e.id})).length )
    })
    
})

Template.works.events({
  'click .alt' (e, i) {
      $('.right').animate({
          scrollTop: $(".caption").offset().top},'slow')
  },
  'click #next' (e, t) {
    let dblen = t.dblen.get()
    let index = t.curindex.get()
    t.curindex.set(index +1)
    if (t.curindex.get() == dblen) { t.curindex.set(0) }
  },
  'click #prev' (e, t) {
    let dblen = t.dblen.get()
    let index = t.curindex.get()
    t.curindex.set(index -1)
    if (t.curindex.get() <= -1) { t.curindex.set(dblen-1) }
  },
});

