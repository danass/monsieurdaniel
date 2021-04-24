import {md} from './markdown.js'


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

Template.registerHelper("log", function (o, b) {
  if(!b) {
  console.log(o)
  }
  if(b) {
    console.log(o, b)
    }

});

Template.registerHelper("lenindex", function (o) {
  return o?.length - 1
});

Template.registerHelper("len", function (o) {
  return o.length
});

Template.registerHelper("lessthan", function (a, b) {
  return a <= b
});

Template.registerHelper("fetch", function () {
return db.findOne({ _id: this.params().id});
});


Template.registerHelper("id", function (id) {
 return db.find({_id: id}) 
})
Template.registerHelper("colorType", function(type) {
    return colorType[type]
})
Template.registerHelper("date", function (o) {
  let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  d = new Date(o)
  return d?.toLocaleDateString("en-US", options)
});

Template.registerHelper("strmaxwords", function (str, n) {
return str?.split(" ").splice(0,n).join(" ");
});

Template.registerHelper("typeof", function (o) {
  return typeof(o)
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

Blaze.Template.registerHelper("markdown", new Template('markdown', function () {
  var view = this;
  var content = '';
  if (view.templateContentBlock) {
    content = Blaze._toText(view.templateContentBlock, HTML.TEXTMODE.STRING);
  }

  return HTML.Raw(md.render(content));
}));



Blaze.Template.registerHelper("youtube", new Template('youtube', function () {
  var view = this;
  var content = '';


  if (view.templateContentBlock) {
    content = Blaze._toText(view.templateContentBlock, HTML.TEXTMODE.STRING);
  }
  precontent = '<iframe class="video" src=\"'
  postcontent = '\"</iframe>'
  video = precontent.concat(content, postcontent)
  return HTML.Raw(video);
}));



