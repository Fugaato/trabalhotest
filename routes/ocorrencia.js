const express = require('express');
const router = express.Router();

// Ocorrencia model
const Ocorrencia = require('../models/Ocorrencia');

// Registro Ocorrencia page
router.get('/registrar', (req, res) => res.render('ocorrenciaReg'));

//Registro Ocorrencia handle
router.post('/registrar', (req, res) => {
    const { tipo, dataOcorrencia, local, nome, vitimas } = req.body
    console.log(req.body);
    console.log(tipo);
    const verificada = false;
    let errors = [];

    // Check required fields
    if (!tipo || !dataOcorrencia || !local || !nome) {
        errors.push({ msg: 'Por favor complete todos os campos' })
    }

    if (errors.length > 0) {
        res.render('ocorrenciaReg', {
            errors,
            tipo,
            dataOcorrencia,
            local,
            nome,
            vitimas,
            verificada
        });
    }

    else {
        const newOcorrencia = new Ocorrencia({
            tipo,
            dataOcorrencia,
            local,
            nome,
            vitimas,
            verificada
        });

        if (!newOcorrencia.vitimas ) {
            newOcorrencia.vitimas = false;
        }

        newOcorrencia.save()
            .then(ocorrencia => {
                console.log ('A ocorrencia foi SALVA RAPEIZES')
                res.redirect('/dashADM')
            })
            .catch(err => console.log(err))
        
        console.log(newOcorrencia);
    }
});

//Consulta Ocorrencia page
router.get('/consultar', (req, res) => {
    Ocorrencia.find({}, (err, ocorrencias) => {
        if (err) {
            console.log('TA DANDO ERRO NAO ACHO ANDA');
        }
        else {
            let ocor = []
            console.log(global);
            ocorrencias.forEach(element => {
                if (element.verificada) {
                    ocor.push(element)
                }
                
            })

            console.log(ocor);

            res.render('ocorrenciaCon', { details: ocor })
        }
    })
});

// Validar Ocorrencia page
router.get('/validar', (req, res) => {
    Ocorrencia.find({}, (err, ocorrencias) => {
        if (err) {
            console.log(err);
        }
        else {
            let ocor = []
            ocorrencias.forEach(element => {
                if (!element.verificada) {
                    ocor.push(element)
                }
            })
            res.render('ocorrenciaVal', { details: ocor })
        }
    })
});

router.post('/validar', (req, res) => {
    const id = req.body['id'];
    Ocorrencia.findOne({ _id: id }).then(ocorrencia => {
        ocorrencia.verificada = true;
        ocorrencia.save()
            .then(ocorrencia => {
                console.log('Ocorrência validada!');
                res.redirect('/ocorrencia/consultar');
            })
            .catch(err => console.log(err))
            console.log(id + " validado...");
    });
});

router.post('/negar', (req, res) => {
    const id = req.body['id'];
    Ocorrencia.findOne({ _id: id }).then(ocorrencia => {
        ocorrencia.verificada = true;
        ocorrencia.remove()
            .then(ocorrencia => {
                console.log('Ocorrência negada!');
                res.redirect('/ocorrencia/consultar');
            })
            .catch(err => console.log(err)) 
        console.log(id + " negada com sucesso!");
    });
});

module.exports = router;