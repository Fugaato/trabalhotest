const mongoose = require('mongoose');
const { Double } = require('bson');

const OcorrenciaSchema = new mongoose.Schema({
    tipo: {
        type: String,
        required: true
    },
    dataOcorrencia: {
        type: Date,
        required: true
    },
    local: {
        type: String,
        required: true
    },
    nome: {
        type: String,
        required: true
    },
    vitimas: {
        type: Boolean,
        required: true
    },
    verificada: {
        type: Boolean,
        required: true
    },
    dateRegistro: {
        type: Date,
        default: Date.now
    }
});

const Ocorrencia = mongoose.model('Ocorrencia', OcorrenciaSchema);
module.exports = Ocorrencia;