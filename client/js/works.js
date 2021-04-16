Template.works.onCreated(function () { 

  $(document).on('keyup', (e) => {
    if (e.key == 'ArrowRight') { }
    if (e.key == 'ArrowLeft') { }
    // if (e.key == 'Escape') {  }
  });

    this.curindex = new ReactiveVar(0)
    Tracker.autorun(() => {
      this.dblen = new ReactiveVar(Object.values(db.find({type:"Works"}).map(e => {return e.id})).length )
    })
})

Template.works.helpers({
  single(type) { return db.find({type:type}) },
  id(id) { return db.find({_id: id}) },
  getwork() {
    let ids = Object.values(db.find({type:"Works"}).map(e => {return e.id}))
    let index = Template.instance().curindex.get()
    let getwork = db.findOne({_id: ids[index]})
    return getwork 
  },
  curindex() { return Template.instance().curindex.get() },
  getentries() {
    let ids = Object.values(db.find({type:"Works"}).map(e => {return e.id}))
    let index = Template.instance().curindex.get()
    list = db.findOne({_id: ids[index]}).fields['Entries']
    return db.find({_id: {$in: list}}) 
  }
});

Template.works.events({
  'click .alt' (e, i) {
      $('.right').animate({
          scrollTop: $(".caption").offset().top},'slow')
  },
  'click #next' (e, i) {
    let dblen = i.dblen.get()
    let index = i.curindex.get()
    i.curindex.set(index +1)
    if (i.curindex.get() == dblen) { i.curindex.set(0) }   
  },
  'click #prev' (e, i) {
    let dblen = i.dblen.get()
    let index = i.curindex.get()
    i.curindex.set(index -1)
    if (i.curindex.get() <= -1) { i.curindex.set(dblen-1) }
  } 
})
