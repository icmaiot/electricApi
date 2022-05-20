'use strict';
module.exports = (sequelize, DataTypes) => {
    var SUB = sequelize.define('SUB', {
        id_submaquina: {
            primaryKey: true,
            type: DataTypes.INTEGER(11)
        },
        id_subensamble: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        id_maquina:{
            type: DataTypes.INTEGER(11),
            references: {
                model: 'maquina',
                key: 'idmaquina'
            }
        }
    }, {
        defaultScope: {
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
        },
        timestamps: false,
        paranoid: false,
        underscored: false,
        freezeTableName: true,
        tableName: 'SUBmaquina'
    });

    SUB.associate = function (models) {
        SUB.belongsTo(models.Maquina, { foreignKey: 'id_maquina' });
    };

    return SUB;
}