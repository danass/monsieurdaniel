Template.work.onCreated(function () { 

    this.curindex = new ReactiveVar(0)
    Tracker.autorun(() => {
      this.worksdb = new ReactiveVar(db.find({type:"Works", 'fields.unpublished' : {$exists: false} })  )
    })
    this.dir = new ReactiveVar(1) 
})


Template.work.helpers({
entries(workid) {
  return db.find({ 'fields.Work': workid }, { sort: { createdTime: Template.instance().dir.get() } });
},
 currentworkid() {
   return FlowRouter.getParam('id')
 }
})