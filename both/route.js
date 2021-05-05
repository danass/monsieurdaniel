  FlowRouter.route('/', {
    name: 'absolute',
    action(params) {
      BlazeLayout.render('absolute', {params: params})
    }
  })

  FlowRouter.route('/project/:id', {
    name: 'absolute',
    action(params) {
      BlazeLayout.render('absolute', {params: params})
    }
  })