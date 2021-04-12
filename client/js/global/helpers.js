Template.registerHelper("eq", function (a, b) {
  return a == b;
});

Template.registerHelper("iNe", function (a, b) {
  if (a !==  undefined) {
  return a.length !== 0
  }
});

Template.registerHelper("has", function (a, b) {
  return a?.includes(b)
});

Template.registerHelper("log", function (o) {
  console.log(o)
});

Template.registerHelper("lenindex", function (o) {
  return o?.length - 1
});

Template.registerHelper("fetch", function () {
return db.findOne({ _id: this.params().id});
});



Template.registerHelper("date", function (o) {
  let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  d = new Date(o)
  return d?.toLocaleDateString("en-US", options)
});

Template.registerHelper("strmaxwords", function (str, n) {
return str?.split(" ").splice(0,n).join(" ");
});


Template.registerHelper("single", function (type) {
  return db.find({type:type})
});


Template.registerHelper("sortWorkBy", function (arr, method = "cd", order = "des") {
  let sorting = [] 
  let entries = []
  arr?.map( (o,i) => {
    // cd: CreatedDate, ab: Alphabetical, year: Year
    if (method == "cd"){ sorting.push([o, new Date(db.findOne(o)?.createdTime)]) }
    if (method == "ab"){ sorting.push([o, new Date(db.findOne(o)?.fields?.Name)]) }
    if (method == "year"){ sorting.push([o, new Date(db.findOne(o)?.fields?.Year)]) }
  })
  let sorted = sorting.sort((a,b) =>  {
    // des: descending, asc: ascending
    if(order== "des") {return  b[1] - a[1] }
    if(order== "asc") {return  a[1] - b[1] }
  })
  sorted?.map(o => {
    entries.push(db.find({_id: o[0] })) 
  })
  return entries
});

Template.registerHelper("sortEntryBy", function (arr, method = "cd", order = "des") {
  let sorting = [] 
  let entries = []
  arr?.map( (o,i) => {
    // cd: CreatedDate, ab: Alphabetical, year: Year
    if (method == "cd"){ sorting.push([o, new Date(db.findOne(o)?.createdTime)]) }
  })
  let sorted = sorting.sort((a,b) =>  {
    // des: descending, asc: ascending
    if(order== "des") {return  b[1] - a[1] }
    if(order== "asc") {return  a[1] - b[1] }
  })
  sorted?.map(o => {
    entries.push(db.find({_id: o[0] })) 
  })
  return entries
});


//['item1', 'item2', ...] => 'item1 item2...' 
//variant compact true: 'item1-item2'
Template.registerHelper("strarr", function (field, compact=false) {
  let str = ''
  if (field) {
    field?.map((f, i) => {
      if (i == field.length - 1) { str += f }
      else { str+= f + " " } 
    })
    if (compact == true) {
      return str?.replace(' ', '-')
    }
    return str
  }
  else { return '' }
});

//add a <br> to \n raw text
Template.registerHelper("br", function (text) {
  let str = text?.replace(/\n/gm, '\u003C\u0062\u0072\u003E')
  return str
})
