"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = __importDefault(require("passport-google-oauth20"));
const keys_1 = __importDefault(require("./keys"));
const user_model_1 = require("../models/user-model");
function passportSetup() {
    const GoogleStrategy = passport_google_oauth20_1.default.Strategy;
    passport_1.default.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport_1.default.deserializeUser((id, done) => {
        user_model_1.User.findById(id).then((user) => {
            done(null, user);
        });
    });
    passport_1.default.use(new GoogleStrategy({
        // options for google strategy
        clientID: keys_1.default.google.clientID,
        clientSecret: keys_1.default.google.clientSecret,
        callbackURL: "/auth/google/redirect",
    }, (accessToken, refreshToken, profile, done) => {
        user_model_1.User.findOne({ googleId: profile.id }).then((currentUser) => {
            if (currentUser) {
                //이미 db에 사용자가 있다. 생성할 필요 없음
                console.log("user is:", currentUser);
                done(null, currentUser);
            }
            else {
                //db에 사용자가 없다.
                new user_model_1.User({
                    username: profile.displayName,
                    googleId: profile.id,
                    thumbnail: profile._json.picture,
                })
                    .save()
                    .then((newUser) => {
                    console.log(`new user created: ${newUser}`);
                    console.log(profile._json.picture);
                    done(null, newUser);
                });
            }
        });
    }));
}
exports.default = passportSetup;
