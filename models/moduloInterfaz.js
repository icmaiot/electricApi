'use strict';
module.exports = (sequelize, DataTypes) => {
    var ModuloInterfaz = sequelize.define('ModuloInterfaz', {
        idmodulo: {
            primaryKey: true,
            type: DataTypes.INTEGER(11)
        },
        serial: {
            type: DataTypes.STRING,
            allowNull: false
        },
        activo: {
            type: DataTypes.INTEGER(1),
            allowNull: false
        },
        idperfil: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references:{
                model:'perfilconfig',
                key:'idperfil'
            }
        }
    }, {
        defaultScope: {
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
        },
        timestamps: false,
        paranoid: false,
        underscored: false,
        freezeTableName: true,
        tableName: 'modulointerfaz'
    });

    ModuloInterfaz.associate = function (models) {
        ModuloInterfaz.hasOne(models.Maquina);
        ModuloInterfaz.belongsTo(models.PerfilConfig, { foreignKey: 'idperfil' });
    };
    return ModuloInterfaz;

    //ModuloInterfaz.hasOne(models.Maquina) idmodulo will be added on ModuloInbterfaz
    //Relacion 1-1 con Maquina
}