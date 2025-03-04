const Thing = require('../models/Thing');
// permettent de modifier le système de fichiers,
//  y compris aux fonctions permettant de supprimer les fichiers.
const fs = require('fs');

exports.createThing = (req, res, next) => {
    // delete req.body._id;
    // const thing = new Thing({
    //   ...req.body
    // });

    const thingObject = JSON.parse(req.body.thing);
    delete thingObject._id;
    delete thingObject._userId;

    const thing = new Thing({
        ...thingObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });

    thing.save()
    .then(() => res.status(201).json({message: 'Objet enrégistré !'}))
    .catch(error => res.status(400).json({error}));
};


exports.getOneThing =  (req, res, next) => {
    Thing.findOne({_id: req.params.id})
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json(error));
};

exports.modifyThing = (req, res, next) => {
    // Thing.updateOne({_id : req.params.id}, {...req.body, _id : req.params.id })
    // .then(() => res.status(200).json({message : 'Objet modifié !'}))
    // .catch(error => res.status(400).json({error}));

    const thingObject = req.file ? {
        ...JSON.parse(req.body.thing),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    delete thingObject._userId;

    Thing.findOne({_id: req.params.id})
    .then((thing) => {
        if (thing.userId != req.auth.userId) {
            res.status(401).json({message: 'Not authorized !'});
        } else {
            Thing.updateOne({_id: req.params.id}, {...thingObject, _id: req.params.id})
            .then(() => res.status(200).json({message: 'Object modified !'}))
            .catch(error => res.status(401).json({error}))
        }
    })
    .catch((error) => {
        res.status(400).json({error});
    });
};

exports.deleteThing = (req, res, next) => {
    // Thing.deleteOne({_id: req.params.id})
    // .then(() => res.status(200).json({message : 'Objet supprimé !'}))
    // .catch(error => res.status(400).json({error}));
    Thing.findOne({_id: req.params.id})
    .then(thing => {
        if(thing.userId != req.auth.userId) {
            res.status(401).json({message: 'Not authorized'});
        } else {
            const filename = thing.imageUrl.split('/images/')[1];
            // La méthode unlink() du package  fs  vous permet de
            //  supprimer un fichier du système de fichiers
            fs.unlink(`images/${filename}`, () => {
                Thing.deleteOne({_id: req.params.id})
                .then(() => res.status(200).json({message: 'Objet supprimé'}))
                .catch(error => {
                    res.status(401).json({ error });
                })
            });
        }
    })
    .catch(error => {
        res.status(500).json({ error });
    });
};

exports.getAllStuff = (req, res, next) => {
    Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({error}));
};
