Template.works.onCreated(function () { 
  this.orientation = new ReactiveVar(window.innerHeight < window.innerWidth)
  this.gradient = new ReactiveVar(0)
  $(document).on('keyup', (e) => {
    if (e.key == 'ArrowRight') { }
    if (e.key == 'ArrowLeft') { }
    // if (e.key == 'Escape') {  }
  });
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
      this.worksdb = new ReactiveVar(db.find({type:"Works", 'fields.unpublished' : {$exists: false} }, { sort: { "fields.Typeofwork": 1 } }  )  )
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
    return db.find({ 'fields.Work': workid }, { sort: { createdTime: Template.instance().dir.get() } });
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

let gogo = 100
Template.works.events({
  'click .alt' (e, i) {
      // $('.right').css({
      //     scrollTop: $(".caption").offset().top},'slow')
  },
  'click #next' (e, i) {
    gogo = 0
    let dblen = Template.instance().worksdb.get().count()
    let index = i.curindex.get()
    i.curindex.set(index +1)
    if (i.curindex.get() == dblen) { i.curindex.set(0) }   
    $('.right').prop("scrollTop",0); 
    $('.left').css('opacity', 1)
 
    
  },
  'click #prev' (e, i) {
    gogo = 0
    let dblen = Template.instance().worksdb.get().count()
    let index = i.curindex.get()
    i.curindex.set(index -1)
    if (i.curindex.get() <= -1) { i.curindex.set(dblen-1) }
    $('.right').prop("scrollTop",0); 
    $('.left').css('opacity', 1)

    
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
  'mousemove .right' (e, i) {
    $('.left').css('opacity', 0)
  },
  'click .info' (e, i) {
    $('.left').css('opacity', 1)
  },
  'click .right' (e, i) {
    $('.right').prop("scrollTop",gogo); 
    gogo = gogo + 600
  }

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
    console.log("bobo", navigator.userAgent)
    $('#menu').addClass('largeMenu')
  }
  else {
    console.log("hey", navigator.userAgent)
  }

  }, 2000)

})


Template.portrait.helpers({
  clear() {
    $('#background').css('display', "none")
    $('#background3').css('display', "none")

  }
})