// Meteor.subscribe("chatrooms");

Router.configure({
  layoutTemplate: 'ApplicationLayout',
  template: 'DefaultTemplate'
});

// the main route. showing the list of sites.
Router.route('/', function () {
    this.render('home');
});

Router.route('/experiences', function () {
  this.render('experiences');
});

Router.route('/others', function () {
  this.render('experiences-others');
});

Router.route('/exercises', function () {
  this.render('exercises');
});

Router.route('/contents', function () {
  this.render('content');
});

// Router.route('/chat', function () {
//   this.render('chat');
// });

Router.route('/admin', function () {
  this.render('admin');
});

// this route is for the discussion page for a site
Router.route('/chatrooms/:_id', function () {
    var chatroomId = this.params._id;
    // at this point, we know the chatroom id
    // so we can subscribe to the messages for that chatroom
    Meteor.subscribe("messages.filtered", chatroomId);
    // now we retrieve the chatroom itself
    // and pass it to the template for rendering
    chatroom = Chatrooms.findOne({_id:chatroomId});
    this.render('messageList', {data:chatroom});
});
