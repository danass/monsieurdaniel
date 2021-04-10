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

  FlowRouter.route('/alive', {
    name: 'alive',
    action(params) {
      BlazeLayout.render('alive', {params: params})
    }
  })

  FlowRouter.route('/articles', {
    name: 'articles',
    action(params) {
      BlazeLayout.render('articles', {params: params})
    }
  })

  FlowRouter.route('/entry/:id', {
    name: 'article',
    action(params) {
      BlazeLayout.render('article', {params: params})
    }
  })