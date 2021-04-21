Template.work.onCreated(function () { 
    this.curindex = new ReactiveVar(0)
    this.orientation = new ReactiveVar(window.innerHeight < window.innerWidth)
    Tracker.autorun((i, e) => {
      this.worksdb = new ReactiveVar(db.find({type:"Works", 'fields.unpublished' : {$exists: false} })  )
      let scopethis = this
      window.addEventListener('resize', function() {
        scopethis.orientation.set(window.innerHeight < window.innerWidth)
      })
    })
    this.dir = new ReactiveVar(1) 

})


Template.work.helpers({
entries(workid) {
  let nextid = Object.values(Template.instance().worksdb.get().map(e => {return e.id}))
  let index = Template.instance().curindex.get()
  nextid = nextid[index]
  return db.find({ 'fields.Work': workid? nextid: nextid  }, { sort: { createdTime: Template.instance().dir.get() } });
},
 requestedid() {
   return FlowRouter.getParam('id')
 },
 orientation() {
   return Template.instance().orientation.get()
 },


})


Template.work.events({
  'click #next' (e, i) {
    let dblen = Template.instance().worksdb.get().count()
    let index = i.curindex.get()
    i.curindex.set(index +1)
    if (i.curindex.get() == dblen) { i.curindex.set(0) }   
    window.scroll(0, 0);

  },
  'click #prev' (e, i) {
    let dblen = Template.instance().worksdb.get().count()
    let index = i.curindex.get()
    i.curindex.set(index -1)
    if (i.curindex.get() <= -1) { i.curindex.set(dblen-1) }
    window.scroll(0, 0);
  },
  'click #up' (e, t) {
    t.dir.set(-1)
  },
  'click #down' (e, t) {
    t.dir.set(1)
  },
  'click #home' (e, i) {
    i.curindex.set(0)
  },
  'click #bio' (e, i) {
    $('#bio').addClass('nobio')
  },
  'click #getbio' (e, i) {
    $('#bio').removeClass('nobio')
  }

})