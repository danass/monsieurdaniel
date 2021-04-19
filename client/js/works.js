Template.works.onCreated(function () { 
  
  this.orientation = new ReactiveVar(window.innerHeight > window.innerWidth)

  $(document).on('keyup', (e) => {
    if (e.key == 'ArrowRight') { }
    if (e.key == 'ArrowLeft') { }
    // if (e.key == 'Escape') {  }
  });

    this.curindex = new ReactiveVar(0)
    Tracker.autorun(() => {
      let scopethis = this
      window.addEventListener('resize', function() {
        scopethis.orientation.set(window.innerHeight > window.innerWidth)
      })

      this.worksdb = new ReactiveVar(db.find({type:"Works", 'fields.unpublished' : {$exists: false} })  )
    })
    this.dir = new ReactiveVar(1)
})

Template.works.helpers({
  id(id) { return db.find({_id: id}) },
  getwork() {
    let ids = Object.values(Template.instance().worksdb.get().map(e => {return e.id}))
    let index = Template.instance().curindex.get()
    return db.findOne({_id: ids[index]})
  },
  entries(workid) {
    console.log()
    return db.find({ 'fields.Work': workid }, { sort: { createdTime: Template.instance().dir.get() } });
  },
  workid() {
    let ids = Object.values(Template.instance().worksdb.get().map(e => {return e.id}))
    let index = Template.instance().curindex.get()
    return ids[index]    
  },
  // orientation() {
  //   console.log(Template.instance().orientation.get())

  //   return Template.instance().orientation.get()
  // }
});

Template.works.events({
  'click .alt' (e, i) {
      // $('.right').animate({
      //     scrollTop: $(".caption").offset().top},'slow')
  },
  'click #next' (e, i) {
    let dblen = Template.instance().worksdb.get().count()
    let index = i.curindex.get()
    i.curindex.set(index +1)
    if (i.curindex.get() == dblen) { i.curindex.set(0) }   
  },
  'click #prev' (e, i) {
    
    let dblen = Template.instance().worksdb.get().count()
    let index = i.curindex.get()
    i.curindex.set(index -1)
    if (i.curindex.get() <= -1) { i.curindex.set(dblen-1) }
  },
  'click #up' (e, t) {
    t.dir.set(-1)
  },
  'click #down' (e, t) {
    console.log(screen.orientation.type.match(/\w+/)[0])
    t.dir.set(1)
  }

})
