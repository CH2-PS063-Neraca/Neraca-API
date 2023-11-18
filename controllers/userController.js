exports.allAccess = (req, res) => {
    res.status(200).send('Public Content');
}

exports.advokatBoard = (req, res) => {
    res.status(200).send('Advokat Content');
}

exports.adminBoard = (req, res) => {
    res.status(200).send('Admin Content');
}