Messages = new Mongo.Collection("messages");
Chatrooms = new Mongo.Collection("chatrooms");
Exercises = new Mongo.Collection("exercises");

Exercises.attachSchema(new SimpleSchema({
    name: {
        type: String,
        label: "Name",
        max: 20
    },
    file: {
        type: String,
        label: "Audio File Name",
        max: 30
    },
    description: {
        type: String,
        label: "Description",
        max: 200
    },
    month: {
        type: String,
        label: "Month",
        max: 10
    },
    year: {
        type: String,
        label: "Year",
        max: 4
    }
}));

// set up a schema controlling the allowable
// structure of Chatroom objects
Chatrooms.attachSchema(new SimpleSchema({
    title: {
        type: String,
        label: "Title",
        max: 200
    },
    description: {
        type: String,
        label: "Description",
        max: 1000
    },
    createdBy: {
        type: String,
        autoform: {
            type: "hidden",
            label: false
        },
        defaultValue: 'anon'
    },
}));

Messages.attachSchema(new SimpleSchema({
    messageText: {
        type: String,
        label: "Message",
        max: 200
    },
    nickname: {
        type: String,
        autoform: {
            type: "hidden",
            label: false
        },
        defaultValue: '0'
    },
    createdOn: {
        type: Date,
        autoform: {
            type: "hidden",
            label: false
        },
        defaultValue: new Date(),
    },
    chatroomId: {
        type: String,
        autoform: {
            type: "hidden",
            label: false
        },
        defaultValue: '0'
    },

}));
