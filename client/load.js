
function preloadimg() {
  preloadurl = []
  let arr = db.find({type: "Works"}).fetch()
  
  arr.forEach(e=> { 
    if (e.fields.Photos) {
    e.fields.Photos.forEach(p => preloadurl.push(p.url))
    }
    else {
      preloadurl.push("")
    }
  })

  var images = new Array()
			function preload() {
				for (i = 0; i < preload.arguments.length; i++) {
					images[i] = new Image()
					images[i].src = preload.arguments[i]
				}
			}
      preloadurl.forEach(u=> preload(u))
  return preloadurl
}

export {preloadimg}
