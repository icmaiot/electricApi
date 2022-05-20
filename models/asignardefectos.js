'use strict';
module.exports = (sequelize, DataTypes) => {
    var Asignardefectos = sequelize.define('Asignardefectos', {
        idproducto: {
            primaryKey: true,
            type: DataTypes.INTEGER(11)
        },
        iddefreg: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
    }, {
        defaultScope: {
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
        },
        timestamps: false,
        paranoid: false,
        underscored: false,
        freezeTableName: true,
        tableName: 'defecto_asignacion'
    });

    Asignardefectos.associate = function (models) {
        Asignardefectos.belongsTo(models.Registrodefectos, { foreignKey: 'iddefreg' });
        Asignardefectos.belongsTo(models.Defectos, { foreignKey: 'iddefreg' });
    };

    return Asignardefectos;
}