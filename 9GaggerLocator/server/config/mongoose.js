var mongoose = require('mongoose');
var crypto = require('crypto');


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
        hashed_pwd:String
    });

    userSchema.methods = {
        authenticate: function (password) {
            return hashPassword(this.salt, password) === this.hashed_pwd;
        }
    }

    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function (err, collection) {
        if (collection.length === 0) {
            var salt = createSalt();
            var hash = hashPassword(salt, 'hugues');
                User.create({
                    firstName: 'Hugues',
                    lastName: 'Stefanski',
                    username: 'ledragon',
                    salt: salt,
                    hashed_pwd:hash
                });

                salt = createSalt();
                hash = hashPassword(salt, 'joe');
                User.create({
                    firstName: 'Joe',
                    lastName: 'Eames',
                    username: 'Joe',
                    salt: salt,
                    hashed_pwd: hash
                });
                salt = createSalt();
                hash = hashPassword(salt, 'john');
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

function createSalt() {
    return crypto.randomBytes(128).toString('base64');
}

function hashPassword(salt, password) {
    var hmac = crypto.createHmac('sha1', salt);
    return hmac.update(password).digest('hex');
}