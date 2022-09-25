"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_setup_1 = __importDefault(require("../config/passport-setup"));
const mongoose_1 = require("mongoose");
const user_model_1 = require("../models/user-model");
const keys_1 = __importDefault(require("../config/keys"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const app = (0, express_1.default)();
app.use((0, express_session_1.default)({
    secret: [keys_1.default.session.cookieKey],
    resave: false,
    saveUninitialized: true,
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
(0, passport_setup_1.default)();
mongoose_run();
async function mongoose_run() {
    await (0, mongoose_1.connect)(keys_1.default.mongodb.dbURI);
    console.log("conneted to mongodb");
    const user = new user_model_1.User({
        username: "Bill",
        googleId: "bill@initech.com",
        thumbnail: "https://i.imgur.com/dM7Thhn.png",
    });
    await user.save();
    console.log(user.googleId);
}
app.get("/", (req, res) => {
    res.send("hello world3");
});
app.get("/google", passport_1.default.authenticate("google", {
    scope: ["profile", "email"],
}));
app.get("/signin-google", passport_1.default.authenticate("google"), (req, res) => {
    res.send(req.user);
});
app.listen(4000, () => {
    console.log(`
      ################################################
      🛡️  Server listening on port: 4000
      ################################################
    `);
});
