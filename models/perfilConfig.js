'use strict';
module.exports = (sequelize, Datatypes) => {
    var PerfilConfig = sequelize.define('PerfilConfig', {
        idperfil: {
            primaryKey: true,
            type: Datatypes.INTEGER(11)
        },
        nombreperfil: {
            type: Datatypes.STRING,
            allowNull: false
        },
        descripcion: {
            type: Datatypes.STRING
        },
        automanual: {
            type: Datatypes.INTEGER(1),
            allowNull: false
        }
    },
        {
            defaultScope: {
                attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
            },
            timestamps: false,
            paranoid: false,
            underscored: false,
            freezeTableName: true,
            tableName: 'perfilconfig'
        });

    PerfilConfig.associate = function (models) {
        PerfilConfig.hasOne(models.ModuloInterfaz);
        PerfilConfig.hasMany(models.ConfiguracionModulo, { foreignKey: 'idperfil' });
    };
    //Relacion 1-1 con ModuloInterfaz
    //Rrlacion 1-muchos ConfiguracionModulo one-To-Many
    return PerfilConfig;
}