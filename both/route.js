  FlowRouter.route('/', {
    name: 'home',
    action(params) {
      BlazeLayout.render('home', {params: params})
    }
  })

  FlowRouter.route('/test', {
    name: 'test',
    action(params) {
      BlazeLayout.render('test', {params: params})
    }
  })