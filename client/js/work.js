Template.work.onCreated(function () { 
    this.curindex = new ReactiveVar(0)
    // this.orientation = new ReactiveVar(screen.orientation.type.match(/\w+/)[0])
    Tracker.autorun((i, e) => {
      this.worksdb = new ReactiveVar(db.find({type:"Works", 'fields.unpublished' : {$exists: false} })  )
    //   let instance = this
    //   screen.orientation.onchange = function (){
    //     // logs 'portrait' or 'landscape'
    //   instance.orientation.set(screen.orientation.type.match(/\w+/)[0])
    // }
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
//  orientation() {
//    return Template.instance().orientation.get()
//  }

})
