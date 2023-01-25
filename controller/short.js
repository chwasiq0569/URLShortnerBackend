import shortUrl from '../model/shortStore.js';
import mongoose from 'mongoose';
import moment from 'moment';
import shortId from 'shortid';

export const createShortURL = async (req, res) => {
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

export const getShortURL = async (req, res) => {
    const short = await shortUrl.findOne({ short: req.params.shortUrl });
    if (short == null) return res.sendStatus(404);
    res.redirect(`${short.full}`);
}