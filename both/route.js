  FlowRouter.route('/', {
    name: 'works',
    action(params) {
      BlazeLayout.render('works', {params: params})
    }
  })

  FlowRouter.route('/article/:id', {
    name: 'article',
    action(params) {
      BlazeLayout.render('article', {params: params})
    }
  })


  FlowRouter.route('/entry/:id', {
    name: 'entry',
    action(params) {
      BlazeLayout.render('entry', {params: params})
    }
  })



  FlowRouter.route('/temp', {
    name: 'temp',
    action(params) {
      BlazeLayout.render('temp', {params: params})
    }
  })