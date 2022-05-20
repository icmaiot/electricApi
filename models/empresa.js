'use strict';
module.exports = (sequelize, DataTypes) => {
    var Empresa = sequelize.define('Empresa', {
        idempresa: {
            primaryKey: true,
            type: DataTypes.INTEGER(11)
        },
        nomemp: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nombcortemp: {
            type: DataTypes.STRING,
            allowNull: false
        },
        calleemp: {
            type: DataTypes.STRING,
            allowNull: true
        },
        numextemp: {
            type: DataTypes.STRING,
            allowNull: true
        },
        numintemp: {
            type: DataTypes.STRING,
            allowNull: true
        },
        colemp: {
            type: DataTypes.STRING,
            allowNull: true
        },
        cpemp: {
            type: DataTypes.STRING,
            allowNull: true
        },
        pais: {
            type: DataTypes.STRING,
            allowNull: true
        },
        estado: {
            type: DataTypes.STRING,
            allowNull: true
        },
        ciudad: {
            type: DataTypes.STRING,
            allowNull: true
        },
        pbx1emp: {
            type: DataTypes.STRING,
            allowNull: true
        },
        pbx2emp: {
            type: DataTypes.STRING,
            allowNull: true
        },
        webemp: {
            type: DataTypes.STRING,
            allowNull: true
        },
        idrelacion: {
            type: DataTypes.INTEGER(11),
            references: {
             model: 'relcomp',
             key:' idrelcomercial'
            }
        },
        descuentoemp: {
            type: DataTypes.STRING,
            allowNull: true
        },
        nomchequeemp: {
            type: DataTypes.STRING,
            allowNull: true
        },
        numfiscalemp: {
            type: DataTypes.STRING,
            allowNull: true
        },
        taxemp: {
            type: DataTypes.STRING,
            allowNull: true
        },
        idcondpago: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            references: {
                model: 'condpago',
                key: 'idcondpago'
            }
        },
        activoemp: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
    }, {
        defaultScope: {
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
        },
        timestamps: false,
        paranoid: false,
        underscored: false,
        freezeTableName: true,
        tableName: 'empresa'
    });

    Empresa.associate = function (models) {
        Empresa.belongsTo(models.Relcomp, { foreignKey: 'idrelacion' });
       // Empresa.belongsTo(models.Pais, { foreignKey: 'idpais' });
       // Empresa.belongsTo(models.Estado, { foreignKey: 'idestado' });
       // Empresa.belongsTo(models.Ciudad, { foreignKey: 'idciudad' });
        Empresa.belongsTo(models.Condpago, { foreignKey: 'idcondpago' });

        Empresa.hasOne(models.Wo, { foreignKey: 'idempresa' });
        Empresa.hasMany(models.Producto);
    };


    return Empresa;
}