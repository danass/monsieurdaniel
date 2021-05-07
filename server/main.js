import { Meteor } from 'meteor/meteor';
import  axios from 'axios'
import _ from 'lodash';


let ledger = ["Works", "Entries", "Shows", "Venues", "Materials"]
let buffersize = 10 
let memory = [] 

let delayms = 200

let localdbIds = new Set()

Meteor.startup( () => {
  db.remove({})
})

async function airpatch(data, table) {
   await axios({
      method: 'patch',
      headers: { 'Authorization': "Bearer " + apikey, 
          'Content-Type': "application/json"},
      baseURL: "https://api.airtable.com/v0/" + user_app + "/" + table,
      data: data
    }).catch(e=> {console.error("Error in axios call, catch", e.Error)})
  }

helper = {}

async function mongotoair(data, table) {
  await axios({
    method: 'post',
    headers: { 'Authorization': "Bearer " + apikey, 
        'Content-Type': "application/json"},
    baseURL: "https://api.airtable.com/v0/" + user_app + "/" + table,
    data: {
      records: [
        {
          fields: data
        }
      ]},
  }).then(r=> {console.log(r.status) 
    helper.mongotoairid = r.data.records
  }).catch(e=> {console.error("oui?", e.Error)})
  
  return helper.mongotoairid
}

 function get(table) {
    return  axios({
        method: 'get',
        url: 'https://api.airtable.com/v0/' + user_app + '/' + table + '?api_key='+ apikey
      })
}

async function update(ledger) {
    // INITIALISE DELAY AT 0 
    let delay = 0

    for (table of ledger) {
        delay += delayms
        const promise = new Promise((resolve, reject) => {
            setTimeout(resolve, delay, get(table), table)
        })
        promise.then(r=> {
            let table = r.config.url.slice(46, -26) // return table name ['users'... ]
            r.data.records.map(record => {
                record['type'] = table
                db.upsert(record.id, record)
                localdbIds.add(record.id)
            })
            
            // UPDATE DB ..    

        }).catch(e => {
          console.log("hmm,", e.code)
          return
        })
        // END OF FOR LOOP
    }
    // COMPARE LOCALDB IDS WITH FETCH DATA IDS

    let dbIdsCopy = new Set([...db.find({}).fetch()])

    if (dbIdsCopy.size != 0) {
        let differenceIds = new Set([...dbIdsCopy].filter(x => !localdbIds.has(x.id)))

        // console.log(dbIdsCopy.size, differenceIds.size, localdbIds.size)
        
        if (differenceIds.size == 0) {
          memory.unshift(dbIdsCopy.size)
          if (memory.length == buffersize) {
            memory.pop()
          }
        }
        
        differenceIds.forEach(id =>
             {
              //  console.log("removing?")
              // console.log("hey", differenceIds.size, id.type)
              // checking consistency: if memory buffer average is consistent (average of buffer == db size) 
              if (memory.reduce((a, b) => { return (a + b)/ memory.length }) == dbIdsCopy.size) {
                console.log("yes")
                db.remove(id)
              }
              else {
                // console.log("no")
              }
              })   
    }
     localdbIds.clear()
}

setInterval(function() {
    update(ledger)
}
, delayms * ledger.length)


 function removeuser() {
  return Meteor.users.remove({_id: Meteor.user()._id})
 }

 function removeusername(name, userId) {
  
  // Roles.addUsersToRoles(Meteor.user()._id, 'admin', Roles.GLOBAL_GROUP)
  if (isAdmin(userId) == true) {
    
     return Meteor.users.remove({username: name})
  }
  else {
    console.log("no sufficient rights")
    return "no proper rights"
  }
 }

 Meteor.methods({
  async register(arg1, arg2) {
    return await mongotoair(arg1, arg2)
  },
  async airpatch(arg1, arg2) {
    return await airpatch(arg1, arg2)
  },
  remove() {
    return removeuser()
  },
  update() {
    return update()
  }, 
  removeusername(name, userid) {
    removeusername(name, userid)
  },
  isAdmin(userId) { 
    return isAdmin(userId)
}
})



function isAdmin(userId) { 
  return Roles.userIsInRole(userId,
  ['admin']);
}