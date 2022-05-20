'use strict'

module.exports = (sequelize, Datatypes) => {
    var ConfiguracionModulo = sequelize.define('ConfiguracionModulo', {
        idconfiguracion: {
            primaryKey: true,
            type: Datatypes.INTEGER(11)
        },
        entrada: {
            type: Datatypes.INTEGER(11),
            allowNull: false
        },
        tipoentrada: {
            type: Datatypes.INTEGER(1),
            allowNull:false
        },
        idevento: {
            type: Datatypes.INTEGER(11),
            references: {
                model: 'evento',
                key: 'idevento'
            },
            field: 'idevento'
        },
        idperfil: {
            type: Datatypes.INTEGER(11),
            references: {
                model: 'perfilconfig',
                key: 'idperfil'
            }
        },
        intermitente:{
            type: Datatypes.INTEGER(1),
            allowNull:false
        },
        estacion_1:{
            type:Datatypes.BOOLEAN,
            defaultValue: false,
            field: '1'
        },
        estacion_2:{
            type:Datatypes.BOOLEAN,
            defaultValue: false,
            field: '2'
        },
        estacion_3:{
            type:Datatypes.BOOLEAN,
            defaultValue: false,
            field: '3'
        },
        estacion_4:{
            type:Datatypes.BOOLEAN,
            defaultValue: false,
            field: '4'
        },
        estacion_5:{
            type:Datatypes.BOOLEAN,
            defaultValue: false,
            field: '5'
        },
        estacion_6:{
            type:Datatypes.BOOLEAN,
            defaultValue: false,
            field: '6'
        },
        estacion_7:{
            type:Datatypes.BOOLEAN,
            defaultValue: false,
            field: '7'
        },
        estacion_8:{
            type:Datatypes.BOOLEAN,
            defaultValue: false,
            field: '8'
        },
        estacion_9:{
            type:Datatypes.BOOLEAN,
            defaultValue: false,
            field: '9'
        },
        estacion_10:{
            type:Datatypes.BOOLEAN,
            defaultValue: false,
            field: '10'
        },
        estacion_11:{
            type:Datatypes.BOOLEAN,
            defaultValue: false,
            field: '11'
        },
        estacion_12:{
            type:Datatypes.BOOLEAN,
            defaultValue: false,
            field: '12'
        },
        estacion_13:{
            type:Datatypes.BOOLEAN,
            defaultValue: false,
            field: '13'
        },
        estacion_14:{
            type:Datatypes.BOOLEAN,
            defaultValue: false,
            field: '14'
        },
        estacion_15:{
            type:Datatypes.BOOLEAN,
            defaultValue: false,
            field: '15'
        },
        estacion_16:{
            type:Datatypes.BOOLEAN,
            defaultValue: false,
            field: '16'
        }
    }, {
        defaultScope: {
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
        },
        timestamps: false,
        paranoid: false,
        underscored: false,
        freezeTableName: true,
        tableName: 'configuracionmodulo'
    });

    ConfiguracionModulo.associate = function (models) {
        ConfiguracionModulo.belongsTo(models.PerfilConfig, { foreignKey: 'idperfil' });
        ConfiguracionModulo.belongsTo(models.Evento, { foreignKey: 'idevento' });
    };

    //Relacion one to Many con PerfilConfig
    return ConfiguracionModulo;

}