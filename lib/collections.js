Messages = new Mongo.Collection("messages");
Chatrooms = new Mongo.Collection("chatrooms");
Exercises = new Mongo.Collection("exercises");
Experiences = new Mongo.Collection("experiences");

Experiences.attachSchema(new SimpleSchema({
    topic: {
        type: String,
        label: "Technique attempted",
        max: 30
    },
    name: {
        type: String,
        label: "Name",
        max: 20,
        optional: true
    },
    description: {
        type: String,
        label: "Description (max 1000 characters)",
        max: 1000
    },
    rating: {
        type: Number,
        label: "Rating"
    },
    date: {
        type: Date,
        label: "Date",
        optional: true
    }
}));

Exercises.attachSchema(new SimpleSchema({
    name: {
        type: String,
        label: "Name",
        max: 20
    },
    file: {
        type: String,
        label: "Link",
        max: 40
    },
    description: {
        type: String,
        label: "Description",
        max: 300
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

SimpleSchema.debug = true;