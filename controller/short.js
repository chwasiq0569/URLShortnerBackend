// import shortUrl from '../model/shortStore.js';
const shortUrl = require('../model/shortStore.js')
const mongoose = require('mongoose')
const shortId = require('shortId')
const moment = require('moment');

module.exports.createShortURL = async (req, res) => {
    const found = await shortUrl.find({ full: req.body.full });
    console.log("found", found[0])
    if (found.length > 0) {
        let hours = moment().diff(moment(found[0]?.updatedAt), 'hours');
        console.log('hours', hours)
        if (hours >= 5) {
            await shortUrl.updateOne({ full: req.body.full }, { $set: { short: shortId.generate() } });
            const foundNow = await shortUrl.find({
                full: req.body.full
            });
            res.send(foundNow);
        } else {
            res.send(found);
        }
    }
    else {
        await shortUrl.create({ full: req.body.full, short: shortId.generate() });
        const foundNow = await shortUrl.find({
            full: req.body.full
        });
        res.send(foundNow);
    }
}

module.exports.getShortURL = async (req, res) => {
    const short = await shortUrl.findOne({ short: req.params.shortUrl });
    if (short == null) return res.sendStatus(404);
    res.redirect(`${short.full}`);
}