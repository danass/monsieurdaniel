

var md = require('markdown-it')();
var markdownItAttrs = require('markdown-it-attrs');

md.use(markdownItAttrs);
md.disable("code")

Blaze.Template.registerHelper("markdown", new Template('markdown', function () {
  var view = this;
  var content = '';
  if (view.templateContentBlock) {
    content = Blaze._toText(view.templateContentBlock, HTML.TEXTMODE.STRING);
  }
  return HTML.Raw(md.render(content));
}));




// export {md}
