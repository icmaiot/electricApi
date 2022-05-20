'use strict';
module.exports = (sequelize, DataTypes) => {
    var Wo = sequelize.define('Wo', {
        idwo: {
            primaryKey: true,
            type: DataTypes.INTEGER(11)
        },
        woasig: {
            type: DataTypes.STRING,
            allowNull: true
        },
        idempresa: {
            type: DataTypes.INTEGER(11),
            references: {
                model: 'empresa',
                key: 'idempresa'
            }
        },
        idcontacto: {
            type: DataTypes.INTEGER(11),
            references: {
                model: 'contemp',
                key: 'idcontemp'
            }
        },
        idempleado: {
            type: DataTypes.INTEGER(11),
            references: {
                model: 'usuarios',
                key: 'id'
            }
        },
        fechasol: {
            type: DataTypes.STRING,
            allowNull: true
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true
        },
        brief: {
            type: DataTypes.STRING,
            allowNull: true
        },
        ocliente: {
            type: DataTypes.STRING,
            allowNull: true
        },
        fecharecoc: {
            type: DataTypes.STRING,
            allowNull: true
        },
        fechavenoc: {
            type: DataTypes.STRING,
            allowNull: true
        },
        idstatuswo: {
            type: DataTypes.INTEGER(11),
            references: {
                model: 'statuswo',
                key: 'idstatuswo'
            }
        },
        fechatermoc: {
            type: DataTypes.STRING,
            allowNull: true
        },
        cotizacion: {
            type: DataTypes.STRING,
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
        tableName: 'wo'
    });

    Wo.associate = function (models) {
        Wo.belongsTo(models.Contemp, { foreignKey: 'idcontacto' });
        Wo.belongsTo(models.Empresa, { foreignKey: 'idempresa' });
        Wo.belongsTo(models.Usuario, { foreignKey: 'idempleado' });
        Wo.belongsTo(models.Statuswo, { foreignKey: 'idstatuswo' });
    };

    return Wo;
}