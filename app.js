const express = require('express');
const app = express();
const path = require("node:path");
const router = express.Router();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use('/new', router);

const messages = [
    {
      text: "Hi there!",
      user: "Amando",
      added: new Date()
    },
    {
      text: "Hello World!",
      user: "Charles",
      added: new Date()
    }
];

const links = [
    { href: "/", text: "Home" },
    { href: "/new", text: "New" },
];

app.get('/', (req, res) => {
    res.render("index", { messages: messages, links: links })
})

router.get('', (req, res) => {
    res.render('form', { links: links });
})

router.post('', (req, res) => {
    messages.push({ text: req.body.text, user: req.body.user, added: new Date() });
    res.redirect("/");
})

app.listen(8000, () => {
    console.log('Listening on port 8000');
})

module.exports = router;