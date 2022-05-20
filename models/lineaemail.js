'use strict';
module.exports = (sequelize, DataTypes) => {
    var Lineaemail = sequelize.define('Lineaemail', {
        id_le: {
            primaryKey: true,
            type: DataTypes.INTEGER(11)
        },
        id_linea:{
            type: DataTypes.INTEGER(11),
        },
        id_usuario: {
            type: DataTypes.INTEGER(11),
            references: {
                model: 'usuario',
                key: 'id'
            }
        },
    }, {
        defaultScope: {
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
        },
        timestamps: false,
        paranoid: false,
        underscored: false,
        freezeTableName: true,
        tableName: 'linea_email'
    });

    Lineaemail.associate = function (models) {
        Lineaemail.belongsTo(models.Usuario, { foreignKey: 'id_usuario' });
    };

    return Lineaemail;
}