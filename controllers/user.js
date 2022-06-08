const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');


exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Votre compte a bien été crée !' }))
                .catch(error => res.status(400).json({ error: 'Un compte existe déjà avec cette adresse email' }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    User.findOne({email:req.body.email})
        .then(user => {
            if(!user) {
                return res.status(401).json({ error: 'Utilisateur ou mot de passe incorrect !'});
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({error : 'Utilisateur ou mot de passe incrorrect !'});
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'ici_c_est_un_test_password_h4K2_dh_KmlK_k_8_gpbv_qqh_Test',
                            { expiresIn: '24h'}
                        )
                    });    
                })
                .catch(error => res.status(500).json({ error }));
            })
            .catch(error => res.status(500).json({ error }));
};