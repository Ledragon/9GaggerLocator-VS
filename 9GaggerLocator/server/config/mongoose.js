var mongoose = require('mongoose');
var crypto = require('../utilities/encryption');


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
        username: String,
        salt: String,
        hashed_pwd: String,
        roles: [String]
    });

    userSchema.methods = {
        authenticate: function (password) {
            return crypto.hashPassword(this.salt, password) === this.hashed_pwd;
        }
    }

    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function (err, collection) {
        if (collection.length === 0) {
            var salt = crypto.createSalt();
            var hash = crypto.hashPassword(salt, 'hugues');
                User.create({
                    firstName: 'Hugues',
                    lastName: 'Stefanski',
                    username: 'ledragon',
                    salt: salt,
                    hashed_pwd: hash,
                    roles:['admin']
                });

                salt = crypto.createSalt();
                hash = crypto.hashPassword(salt, 'joe');
                User.create({
                    firstName: 'Joe',
                    lastName: 'Eames',
                    username: 'Joe',
                    salt: salt,
                    hashed_pwd: hash,
                    roles:[]
                });
                salt = crypto.createSalt();
                hash = crypto.hashPassword(salt, 'john');
                User.create({
                    firstName: 'John',
                    lastName: 'Papa',
                    username: 'John',
                    salt: salt,
                    hashed_pwd: hash
                });
            }
    });
};
