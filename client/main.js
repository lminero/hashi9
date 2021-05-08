import './../lib/routes';
import '../lib/collections';
import { Session } from 'meteor/session';

// code that is only sent to the client

// subscribe to read data
Meteor.subscribe("exercises");
Meteor.subscribe("experiences");

Session.setDefault("selected", false);

// this will configure the sign up field so it
// they only need a username
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});

// let mpSong = 'Beattles.mp3';


//// ***** Helpers ******

Template.shareExperienceForm.helpers({
    "topicOptions": () => {
        return topicNames;
    },
    "ratingOptions": () => {
        return [
            {label: '1', value: 1 },
            {label: '2', value: 2 },
            {label: '3', value: 3 },
            {label: '4', value: 4 },
            {label: '5', value: 5 }
        ];
    }
});

Template.insertExercisesForm.helpers({
    "yearOptions":() => {
        return [
            {label: '2021', value: '2021' },
            {label: '2022', value: '2022' },
            {label: '2023', value: '2023' },
            {label: '2024', value: '2024' },
        ];
    },
    "monthOptions":() => {
        return [
            {label: 'January', value: 'January' },
            {label: 'February', value: 'February' },
            {label: 'March', value: 'March' },
            {label: 'April', value: 'April' },
            {label: 'May', value: 'May' },
            {label: 'June', value: 'June' },
            {label: 'July', value: 'July' },
            {label: 'August', value: 'August' },
            {label: 'September', value: 'September' },
            {label: 'October', value: 'October' },
            {label: 'November', value: 'November' },
            {label: 'December', value: 'December' },
        ];
    },
});

Template.showExercises.helpers({
    // find all visible docs
    exercises:function(){
      return Exercises.find();
    }
  });

  Template.playExercise.helpers({
    selectedExerciseExists:function(){
        let select = Session.equals("selected", true);
        return select ? true : false;
    },    
  });

  Template.playing.helpers({
    play:function(){
        let ec = Session.get("target");
        ec.play = new Audio('../shared/audio.wav');
        // console.log(ec);
        return ec;
    },
  });

Template.shareExperienceForm.helpers({
    signedUser:function(){
        if (Meteor.user()){
            return true;
        } else {
            alert('Sign in to share an experience');
            return false;
        };
    },
});

Template.showExperiences.helpers({
    // find all visible docs
    experiences:function(){
      return Experiences.find();
    }
  });

Template.chatroomList.helpers({
    chatrooms:function(){
        Meteor.subscribe("chatrooms");
        return Chatrooms.find();
    }
});

Template.header.helpers({
    nickname:function(){
        if (Meteor.user()){
            return Meteor.user().username;
        }
    },
});

Template.messageList.helpers({
    messages:(chatroomId) => {
        if (Meteor.user() && chatroomId){
            return Messages.find({chatroomId:chatroomId}, {sort: {createdOn: -1}});
        }
    }
});

//// ***** Events ********

Template.chatroomList.events({
    'click .js-toggle-chatform':function(){
        $('#chatroomForm').toggle();
    }
});

Template.messageList.events({
    'click .js-del-message':function(){
        Meteor.call('removeMessage', this._id, function(err, res){
            if (!res){
                alert('Can only delete your own ones...');
            }
        });
    }
});

Template.showExercises.events({
    'click .js-selectedTech':(event) => {
        event.preventDefault();
        console.log(event.target.pathname.slice(1));
        Session.set("selected", true);        
        let exerciseChosen = Exercises.findOne({_id: event.target.pathname.slice(1)});
        console.log(exerciseChosen);
        Session.set("target", exerciseChosen);
    }
});

Template.playing.onRendered( () => {
    const instance = this;
    const parent = instance.find('#player');
    instance.audio = document.createElement('audio');
    console.dir('here' + instance.audio);
    instance.audio.setAttribute('id', 'audioID');
    instance.audio.setAttribute('type', 'audio/mp3');
    instance.audio.setAttribute('crossorigin', 'same-origin');
    instance.audio.setAttribute('Content-type', 'audio/mp3');
    instance.audio.src = `../shared/${mpSong}`;
    parent.append(instance.audio);
    instance.audio.addEventListener('audioID', () => {
      instance.audio.controls = true;
      instance.audio.playsinline = true;
      instance.audio.muted = false;
      instance.audio.loop = false;
      instance.audio.autoplay = true;
      instance.audio.play();
    })
    instance.audio.load();
  });

  topicNames = () => {
    let allExercises = {};
    allExercises = Exercises.find();
    console.log(allExercises);
    let allExercises1 = {};
    allExercises1 = allExercises.collection._docs._map;
    console.log(allExercises1);
    let exercisesName = new Array;
    let i = 0;
    for (var id in allExercises1) {
        console.log(allExercises1[id].name);
        exercisesName.push( { label: `${allExercises1[id].name}`, value: `${allExercises1[id].name}` } );
        i++;
    };
    console.log(exercisesName);
    return exercisesName;
  }