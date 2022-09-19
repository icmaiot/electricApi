'use strict';
module.exports = (sequelize, DataTypes) => {
    var Grafico_mntto = sequelize.define('Grafico_mntto', {
        idparos: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.INTEGER(11)
        },
        maquina: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        sensor: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        hri:{
            type: DataTypes.DATE,
            allowNull: false
        },
        reporto:{
            type: DataTypes.STRING,
            allowNull: false
        },
        hrf:{
            type: DataTypes.DATE,
            allowNull: false
        },
        desbloqueo:{
            type: DataTypes.STRING,
            allowNull: false
        },
        tiempoe:{
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        paroi:{
            type: DataTypes.DATE,
            allowNull: false
        },
        reportoparo:{
            type: DataTypes.STRING,
            allowNull: false
        },
        parof:{
            type: DataTypes.DATE,
            allowNull: false
        },
        tiempop:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        atencioni:{
            type: DataTypes.DATE,
            allowNull: false
        },
        atendio:{
            type: DataTypes.STRING,
            allowNull: false
        },
        atencionf:{
            type: DataTypes.DATE,
            allowNull: false
        },
        atendiof:{
            type: DataTypes.STRING,
            allowNull: false
        },
        atenciont:{
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        respuestat:{
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        serviciot:{
            type: DataTypes.DECIMAL,
            allowNull: false
        }, 
        idcausa:{
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
            defaultScope: {
                attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
            },
            timestamps: false,
            paranoid: false,
            underscored: false,
            freezeTableName: true,
            tableName: '4'
        });

    return Grafico_mntto;
}