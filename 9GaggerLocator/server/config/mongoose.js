var mongoose = require('mongoose');

module.exports = function (config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback() {
        console.log('Db connection opened');
    });

    var userSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        username: String
    });

    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function (err, collection) {
            if (collection.length === 0) {
                User.create({
                    firstName: 'Hugues',
                    lastName: 'Stefanski',
                    username: 'ledragon'
                });
                User.create({
                    firstName: 'Joe',
                    lastName: 'Eames',
                    username: 'Joe'
                });
                User.create({
                    firstName: 'John',
                    lastName: 'Papa',
                    username: 'John'
                });
            }
    });
};