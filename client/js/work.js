Template.work.onCreated(function () { 
    this.curindex = new ReactiveVar(0)
    this.orientation = new ReactiveVar(window.innerHeight > window.innerWidth)
    Tracker.autorun((i, e) => {
      this.worksdb = new ReactiveVar(db.find({type:"Works", 'fields.unpublished' : {$exists: false} })  )
      let scopethis = this
      window.addEventListener('resize', function() {
        scopethis.orientation.set(window.innerHeight > window.innerWidth)
      })
    })
    this.dir = new ReactiveVar(1) 

})


Template.work.helpers({
entries(workid) {
  return db.find({ 'fields.Work': workid }, { sort: { createdTime: Template.instance().dir.get() } });
},
 requestedid() {
   return FlowRouter.getParam('id')
 },
 orientation() {
   return Template.instance().orientation.get()
 }

})
