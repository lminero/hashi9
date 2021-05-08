import { Meteor } from 'meteor/meteor';

Meteor.methods({
    addExercises:function(exercise){
        console.log('Here in Methods');
        if (exercise) {
            console.log("method ran!" + exercise);
            return Exercises.insert(exercise);
        } else {
            console.log("NO method ran!");
            return;
        };
    },
    addExperiences:function(experience){
        console.log('Here in Methods');
        if (experience) {
            experience.name = Meteor.user().username;
            experience.date = new Date();
            console.log('Exp: \n' + experience);
            return Experiences.insert(experience);
        } else {
            console.log("NO method ran!");
            return;
        };
    },
/*     'insertMessage':function(message){
        if (!Meteor.user()){
            return;
        }
        else {
            // force the user field to be the current user
            message.nickname = Meteor.user().username;
            message.createdOn  = new Date();
            return Messages.insert(message);
        }
    },
    'insertChatroom':function(chatroom){
        if (!Meteor.user()){
            return;
        }
        else {
            // force the user field to be the current user
            chatroom.createdBy = Meteor.user().username;
            return Chatrooms.insert(chatroom);
        }
    },
    'removeMessage':function(id){
        if (!Meteor.user()){
            return;
        }
        else {
            var msg = Messages.findOne({_id:id});
            if (msg.nickname == Meteor.user().username){
                    Messages.remove({_id:id});
                    return true;
            }
        }
    }, */
});

Meteor.publish("exercises", function(){
    return Exercises.find();
});

Meteor.publish("experiences", function(){
    return Experiences.find();
});
