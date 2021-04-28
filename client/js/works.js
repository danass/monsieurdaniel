Template.works.onCreated(function () { 
  this.orientation = new ReactiveVar(window.innerHeight < window.innerWidth)
  this.gradient = new ReactiveVar(0)
    this.curindex = new ReactiveVar(0)
    Tracker.autorun(() => {
      
      let scopethis = this
      window.addEventListener('resize', function() {
        if (window.innerHeight < window.innerHeight) {
          $('#background').css('display', "block")
          $('#background3').css('display', "block")
        }
        else {
          $('#background').css('display', "none")
          $('#background3').css('display', "none")
        }
        scopethis.orientation.set(window.innerHeight < window.innerWidth)
      })
      this.worksdb = new ReactiveVar(db.find({type:"Works", 'fields.unpublished' : {$exists: false} }, { sort: { "fields.Type": 1 } }  )  )
      gogo = 0
      $(document).on('keyup', (e) => {
        if (e.key == 'ArrowRight') { 
          gogo = 0
          let dblen = this.worksdb.get().count()
          let index = this.curindex.get()
          this.curindex.set(index +1)
          if (this.curindex.get() == dblen) { this.curindex.set(0) }   
        }
        if (e.key == 'ArrowLeft') { 
          gogo = 0
          let dblen = this.worksdb.get().count()
          let index = this.curindex.get()
          this.curindex.set(index -1)
          if (this.curindex.get() == dblen) { this.curindex.set(0) }   



        }
        // if (e.key == 'Escape') {  }
      });
    })
    this.dir = new ReactiveVar(1)
})


Template.works.helpers({

  getwork() {
    let ids = Object.values(Template.instance().worksdb.get().map(e => {return e.id}))
    let index = Template.instance().curindex.get()
    return db.findOne({_id: ids[index]})
  },
  entries(workid) {
    Tracker.autorun(() => {
      Meteor.setTimeout(() => {
        $('.right').prop("scrollTop", $('.bugger')[0].clientHeight ); 
        $('.left').css('opacity', 1)

      }, 1)
    })
    let meta = db.find({id: workid}).map(o => { return o.fields.Meta})

    if (meta[0]?.includes('Reverse') == true) {
      Template.instance().dir.set(-1)
     return db.find({ 'fields.Work': workid }, { sort: { createdTime: Template.instance().dir.get() } });
    }
    else {
      Template.instance().dir.set(1)
    return db.find({ 'fields.Work': workid }, { sort: { createdTime: Template.instance().dir.get() } });
    }
  },
  workid() {
    let ids = Object.values(Template.instance().worksdb.get().map(e => {return e.id}))
    let index = Template.instance().curindex.get()
    return ids[index]    
  },
  orientation() {
    return Template.instance().orientation.get()
  }
});

Template.works.events({
  'click #next' (e, i) {
    gogo = 0
    let dblen = Template.instance().worksdb.get().count()
    let index = i.curindex.get()
    i.curindex.set(index +1)
    if (i.curindex.get() == dblen) { i.curindex.set(0) }   
  },
  'click #prev' (e, i) {
    gogo = 0
    let dblen = Template.instance().worksdb.get().count()
    let index = i.curindex.get()
    i.curindex.set(index -1)
    if (i.curindex.get() <= -1) { i.curindex.set(dblen-1) }

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
  'click .info' (e, i) {
    $('.right').prop("scrollTop", 0); 
  },
  'click .right' (e, i) {
    $('.right').prop("scrollTop",gogo); 
    gogo = gogo + $('.right')[0].clientHeight
  },
  'click #all' (e, i) {
    window.scroll(0, $('#works')[0].clientHeight)
  }

})


Template.works.onRendered(function() {
  $('.right').prop("scrollTop", $('.bugger')[0].clientHeight ); 
  $('.left').css('opacity', 1)
})


Template.menu.events({
  'click #bio' (e, i) {
    $('#bio').addClass('nobio')
  },
  'click #getbio' (e, i) {
    $('#bio').removeClass('nobio')
  },

})

Template.menu.helpers({
  getbio() {
    return db.find({_id: "recdZe6i8XsaKbToQ"})
  },
  id(id) { return db.find({_id: id}) },
  
})


Template.menu.onCreated(function () {
  Meteor.setTimeout(function go() {

  if(navigator.userAgent.match(/Android|webOS|iPhone|iPod|Blackberry/i) ){
    $('#menu').addClass('largeMenu')
    $('#works').css('height', '77.5vh')
  }
  else {

  }

  }, 2000)

})


Template.portrait.helpers({
  clear() {
    $('#background').css('display', "none")
    $('#background3').css('display', "none")

  }
})

Template.eachphoto.helpers({
  works() {
      return  db.find({type:"Works", 'fields.unpublished' : {$exists: false} }, { sort: { "fields.Year": 1 } }  )
    }
})

Template.absolute.helpers({
  works() {
   return db.find({type:"Works", 'fields.unpublished' : {$exists: false} }, { sort: { "fields.Type": 1 } }  ) 
  },
  entries(id) {
    let entriesArray = db.find({_id: id }).map(work => { return work.fields.Entries })
    return entriesArray[0]?.map(entryid => {
      return db.find({_id: entryid}).fetch()[0]
    })
  },

})