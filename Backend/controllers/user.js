exports.create = (req, res) => {
    console.log(req.body);
    // res.send('I will create later');
    res.json({ user: req.body});
};
