Template.temp.onCreated(function () { 
  this.curindex = new ReactiveVar(0)
  Tracker.autorun(() => {
    // this.dblen = new ReactiveVar(Object.values(db.find({type:"Works"}).map(e => {return e.id})).length )

    this.worksdb = new ReactiveVar(db.find({type:"Works", 'fields.unpublished' : {$exists: false} })  )
  })
  this.dir = new ReactiveVar(1)
  
}); 

Template.temp.events({
  'click #next' (e, t) {
    let dblen = Template.instance().worksdb.get().count()
    let index = t.curindex.get()
    t.curindex.set(index +1)
    if (t.curindex.get() == dblen) { t.curindex.set(0) }
  },
  'click #prev' (e, t) {
    let dblen = Template.instance().worksdb.get().count()
    let index = t.curindex.get()
    t.curindex.set(index -1)
    if (t.curindex.get() <= -1) { t.curindex.set(dblen-1) }
  },
  'click #up' (e, t) {
    t.dir.set(-1)
  },
  'click #down' (e, t) {
    t.dir.set(1)
  }
})

Template.temp.helpers({

  // getwork() {
  //   let ids = Object.values(db.find({type:"Works"}).map(e => {return e.id}) )
  //   let objs = Object.values(db.find({type:"Works"}).map(e => {return e}).sort((a, b) => {
  //     if (Template.instance().dir.get() == true) {
  //       return new Date(b.createdTime) - new Date(a.createdTime)  
  //      }
  //      if (Template.instance().dir.get() == false ) { 
  //        return new Date(a.createdTime) - new Date(b.createdTime)  }
  //     }).map(e => {
  //       console.log(e.id)
  //       return e.id }) )

  //   let index = Template.instance().curindex.get()
  //   return db.findOne({_id: objs.map(o => { return o.id})[index]})
  // },
  // getentries() {
  //   // {_id: {$in: list}}
  //   let ids = Object.values(db.find({type:"Works"}).map(e => {return e.id}))
  //   let index = Template.instance().curindex.get()
  //   list = db.findOne({_id: ids[index]}).fields['Entries']
  //   return db.find({_id: {$in: list}})
  // },
  // id(o) {
  //   return db.findOne({ _id: o?.toString() })
  // }
  entries(workid) {
    return db.find({ 'fields.Work': workid }, { sort: { createdTime: Template.instance().dir.get() } });
  },
  workid() {
    let ids = Object.values(Template.instance().worksdb.get().map(e => {return e.id}))
    let index = Template.instance().curindex.get()
    return ids[index]    
    // return db.find({_id: {$in: list}})
  }
});

Template.temp.events({

})


