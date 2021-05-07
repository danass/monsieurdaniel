Template.absolute.onCreated(function() {

}

)
Template.eachphoto.helpers({
  works() {
      return  db.find({type:"Works", 'fields.unpublished' : {$exists: false}  }, { sort: { "fields.Year": -1 } }  )
    }
})

Template.absolute.helpers({
  works() {
   return db.find({ type:"Works",  'fields.unpublished' : {$exists: false},  "fields.Field": "Art"} , { sort: { "fields.Type": 1 } }  ) 
  },
  entries(id) {
    window.scroll(0, 0)
    let entriesArray = db.find({_id: id }).map(work => { return work.fields.Entries })
    return entriesArray[0]?.map(entryid => {
      return db.find({_id: entryid}).fetch()[0]
    })
  },
  currentId() {
    if (FlowRouter.getParam('id') === undefined) {
      return "recdZe6i8XsaKbToQ"
    }
    return FlowRouter.getParam('id')
  }

})

Template.menu.helpers({
  tupleId() {
    let curid = FlowRouter.getParam('id')
    let ids = Object.values(db.find({type:"Works", 'fields.unpublished' : { $exists: false } }, { sort: { "fields.Type": 1 } }).map(e => {return e.id}))
    let tupleId = [ids[ids.indexOf(curid) -1], ids[ids.indexOf(curid) + 1]]
    if (curid == undefined) { return [ids[ids.length-1], ids[0]] }
    if (tupleId[1] == undefined ) { return [ids[ids.indexOf(curid) -1], ids[0]] }
    if (tupleId[0] == undefined ) { return [ids[ids.length-1], ids[ids.indexOf(curid) + 1]] }
    else {
      tupleId = [ids[ids.indexOf(curid) -1], ids[ids.indexOf(curid) + 1] ]
      return tupleId
    }      
  },
  currentId() {
    if (FlowRouter.getParam('id') === undefined) {
      return "recdZe6i8XsaKbToQ"
    }
    return FlowRouter.getParam('id')
  }
})



Template.absolute.events({
  'click .second-minus' (e, i) {
    let curval = parseInt($(':root').css('--main-nbcol')) 
    if (curval >= 2) {
      $(':root').css('--main-nbcol', curval -1)
    }

  },
  'click .second-plus' (e, i) {
    let curval = parseInt($(':root').css('--main-nbcol')) 
    if(curval <= 7) {
      $(':root').css('--main-nbcol', curval +1)
      }
  },
})