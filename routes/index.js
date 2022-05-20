const router = require('express').Router()
const maquina = require('./maquina')
const eventoSensor = require('./evento')
const evento = require('./evento')
const area = require('./area')
const sensor = require('./sensor')
const paro = require('./paro')
const eventos = require('./eventos')
const grafica = require('./grafica')
const cia = require('./cia')
const depto = require('./departamento')
const usuario = require('./usuario')
const tipoEquipo = require('./tipoEquipo')
const moduloInterfaz = require('./moduloInterfaz')
const perfilConfig = require('./perfilConfig')
const configuracionModulo = require('./configuracionModulo')
const raw = require('./raw')
const subensamble = require('./subensamble')
const producto = require('./producto')
const um = require('./um')
const relcomp = require('./relcomp')
const pais = require('./pais')
const ciudad = require('./ciudad')
const estado = require('./estado')
const condpago = require('./condpago')
const contemp = require('./contemp')
const empresa = require('./empresa')
const wo = require('./wo')
const wosub = require('./wosub')
const statuswo = require('./statuswo')
const skuMaquina = require('./skuMaquina')
const subMaquina = require('./subMaquina')
const statuswosub = require('./statuswosub')
const turnos = require('./turnos')
const turnosdescanso = require('./turnosdescanso')
const progprod = require('./progprod')
const funcusu = require('./funcusu')
const produccion = require('./produccion')
const eventocausa = require('./eventocausa')
const prodregisro = require('./prodregisro')
const acumcal = require('./acumcal')
const acumscrap = require('./acumscrap')
const produccionlote = require('./produccionlote')
const controlprod = require('./controlprod')
const lineaprod = require('./lineaprod')
const progprodlinea = require('./progprodlinea')
const defectos = require('./defectos')
const scrap = require('./scrap')
const modulormt = require('./modulormt')
const registroscrap = require('./registroscrap')
const registrodefectos = require('./registrodefectos')
const asignardefectos = require('./asignardefectos')
const asignarscrap = require('./asignarscrap')
const tiempomuertop = require('./tiempomuertop')
const produccionhistorico = require('./produccionhistorico')

//nuevos-9/02/2022
const evento_registro = require('./evento_registro')
const evento_asignacion = require('./evento_asignacion')
const lineaemail = require('./lineaemail')

//all of the routing will be done here

module.exports = function (app) {

  app.use('/maquina', maquina),
    app.use('/sensor', sensor),
    app.use('/evento', evento),
    app.use('/area', area),
    app.use('/paro', paro),
    app.use('/evento', eventos),
    app.use('/grafica', grafica),
    app.use('/cia', cia),
    app.use('/departamento', depto),
    app.use('/usuario', usuario),
    app.use('/tipoEquipo', tipoEquipo),
    app.use('/eventoSensor', eventoSensor),
    app.use('/moduloInterfaz', moduloInterfaz),
    app.use('/perfilConfig', perfilConfig),
    app.use('/configuracionModulo', configuracionModulo),
    app.use('/subensamble', subensamble),
    app.use('/um', um),
    app.use('/producto', producto),
    app.use('/raw', raw),
    app.use('/relcomp', relcomp),
    app.use('/pais', pais),
    app.use('/ciudad', ciudad),
    app.use('/estado', estado),
    app.use('/condpago', condpago),
    app.use('/contemp', contemp),
    app.use('/empresa', empresa),
    app.use('/wo', wo),
    app.use('/wosub', wosub),
    app.use('/statuswo', statuswo),
    app.use('/skuMaquina', skuMaquina),
    app.use('/subMaquina', subMaquina),
    app.use('/statuswosub', statuswosub),
    app.use('/turnos', turnos),
    app.use('/turnosdescanso', turnosdescanso),
    app.use('/progprod', progprod),
    app.use('/funcusu', funcusu),
    app.use('/produccion', produccion),
    app.use('/eventocausa', eventocausa),
    app.use('/prodregisro', prodregisro),
    app.use('/acumcal', acumcal),
    app.use('/acumscrap', acumscrap),
    app.use('/produccionlote', produccionlote),
    app.use('/controlprod', controlprod),
    app.use('/lineaprod', lineaprod),
    app.use('/progprodlinea', progprodlinea),
    app.use('/scrap', scrap),
    app.use('/defectos', defectos),
    app.use('/modulormt', modulormt),
    app.use('/registroscrap', registroscrap),
    app.use('/registrodefectos', registrodefectos),
    app.use('/asignardefectos', asignardefectos),
    app.use('/asignarscrap', asignarscrap),
    app.use('/tiempomuertop', tiempomuertop),
    app.use('/produccionhistorico', produccionhistorico),
    
    //evento_registro - 09/02/2022
    app.use('/evento_registro', evento_registro),
    app.use('/evento_asignacion', evento_asignacion),
    app.use('/lineaemail', lineaemail),

    app.use(router)
}