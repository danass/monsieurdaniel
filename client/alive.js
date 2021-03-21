let done = false;

Template.registerHelper("single", function (type) {
  return db.find({type:type})
});

Template.registerHelper("id", function (id) {
  return db.find({_id: id})
});

Template.registerHelper("arrid", function (arr) {
  let entries = []
  arr.map(o => {
    entries.push(db.find({_id: o}))
  })
  return entries
});

Template.registerHelper("strarr", function (field, compact=false) {
  let str = ''
  if (field) {
    field.map((f, i) => {
      if (i == field.length - 1) { str += f }
      else { str+= f + " " } 
    })
    if (compact == true) {
      return str.replace(' ', '-')
    }
    return str
  }
  else { return '' }
});


Template.registerHelper("br", function (text) {
  let str = text.replace(/\n/gm, '\u003C\u0062\u0072\u003E')
  return str
})

Template.alive.events({
  'load' (e, i) {
    if (!done) {
      $('.entry-text').each(function (e) {
        $(this).html($(this)[0].innerText)
      })
      done = true
    }
  },
})