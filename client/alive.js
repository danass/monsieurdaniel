let done = false;

//replace innerhtml by innerText
//to be combined with helpers.js 'br'
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