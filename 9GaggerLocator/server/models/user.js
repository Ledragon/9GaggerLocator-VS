var mongoose = require('mongoose');
var crypto = require('../utilities/encryption');

exports.createDefaultUsers  =createDefaultUsers;


var userSchema = mongoose.Schema({
    firstName: { type: String, required: '{PATH} is required' },
    lastName: { type: String, required: '{PATH} is required' },
    username: {
        type: String,
        required: '{PATH} is required',
        unique:true
    },
    salt: { type: String, required: '{PATH} is required' },
    hashed_pwd: { type: String, required: '{PATH} is required' },
    roles: [String]
});

userSchema.methods = {
    authenticate: function (password) {
        return crypto.hashPassword(this.salt, password) === this.hashed_pwd;
    }
}

var User = mongoose.model('User', userSchema);
function createDefaultUsers() {
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
                roles: ['admin']
            });

            salt = crypto.createSalt();
            hash = crypto.hashPassword(salt, 'joe');
            User.create({
                firstName: 'Joe',
                lastName: 'Eames',
                username: 'Joe',
                salt: salt,
                hashed_pwd: hash,
                roles: []
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
}