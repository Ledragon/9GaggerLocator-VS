var mongoose = require('mongoose');
var crypto = require('../utilities/encryption');

exports.createDefaultUsers = createDefaultUsers;


var userSchema = mongoose.Schema({
    firstName: { type: String, required: '{PATH} is required' },
    lastName: { type: String, required: '{PATH} is required' },
    username: {
        type: String,
        required: '{PATH} is required',
        unique: true
    },
    salt: { type: String, required: '{PATH} is required' },
    hashed_pwd: { type: String, required: '{PATH} is required' },
    roles: [String],
    country: String,
    state: String,
    city: String,
    latitude: Number,
    longitude: Number,
    gender: String
});

userSchema.methods = {
    authenticate: function(password) {
        return crypto.hashPassword(this.salt, password) === this.hashed_pwd;
    }
};
var User = mongoose.model('User', userSchema);

function createDefaultUsers() {
    User.find({}).exec(function(err, collection) {
        if (collection.length === 0) {
            var salt = crypto.createSalt();
            var hash = crypto.hashPassword(salt, 'hugues');
            User.create({
                firstName: 'Hugues',
                lastName: 'Stefanski',
                username: 'ledragon',
                gender: 'Male',
                country: 'Belgium',
                state: 'Liege',
                city: 'Oupeye',
                salt: salt,
                hashed_pwd: hash,
                roles: ['admin'],
                latitude: 50,
                longitude: 5
            });

            salt = crypto.createSalt();
            hash = crypto.hashPassword(salt, 'joe');
            User.create({
                firstName: 'Joe',
                lastName: 'Eames',
                username: 'Joe',
                salt: salt,
                hashed_pwd: hash,
                gender: 'Male',
                country: 'United States',
                state: 'Utah',
                city: 'Salt Lake City',
                roles: [],
                latitude: 40.75,
                longitude: -111.883333
            });
            salt = crypto.createSalt();
            hash = crypto.hashPassword(salt, 'john');
            User.create({
                firstName: 'John',
                lastName: 'Papa',
                username: 'John',
                gender: 'Male',
                country: 'United States',
                state: 'California',
                city:'San Francisco',
                salt: salt,
                hashed_pwd: hash,
                latitude: 37.783333,
                longitude: -122.416667
            });
        }
    });
}