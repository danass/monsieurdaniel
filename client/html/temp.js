Template.temp.onCreated(function () { 
  this.curindex = new ReactiveVar(0)
  Tracker.autorun(() => {
    this.dblen = new ReactiveVar(Object.values(db.find({type:"Works"}).map(e => {return e.id})).length )
  })
  this.currentText = new ReactiveVar("")
  
}); 

Template.temp.events({
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
})

Template.temp.helpers({
  getwork() {
    let ids = Object.values(db.find({type:"Works"}).map(e => {return e.id}))
    let index = Template.instance().curindex.get()
    return db.findOne({_id: ids[index]})
  },
  getentries() {
    // {_id: {$in: list}}
    let ids = Object.values(db.find({type:"Works"}).map(e => {return e.id}))
    let index = Template.instance().curindex.get()
    list = db.findOne({_id: ids[index]}).fields['Entries']
    return db.find({_id: {$in: list}})
  },
  get() {
      return  Template.instance().currentText.get()
  },
  set(data) {
     Template.instance().currentText.set(data)
  },
});

Template.temp.events({
  'click #br' (e, t) {
    // $('.entry-text').each((i, o) =>  { $(o).html(o.innerText) })
  }
})


