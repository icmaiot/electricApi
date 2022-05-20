'use strict';
module.exports = (sequelize, DataTypes) => {
    var Defectos = sequelize.define('Defectos', {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER(11)
        },
        cantdef: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        lotedef: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        iddefreg: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        idusuarios: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        idusuarioreg: {
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
        tableName: 'defectos'
    });

    Defectos.associate = function (models) {
       Defectos.belongsTo(models.Registrodefectos, { foreignKey: 'iddefreg' });
       Defectos.belongsTo(models.Usuario, { foreignKey: 'idusuarios' });
       Defectos.belongsTo(models.Usuario, { foreignKey:'idusuarioreg', as:'usreg' });
    };

    return Defectos;
}