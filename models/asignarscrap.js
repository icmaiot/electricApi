'use strict';
module.exports = (sequelize, DataTypes) => {
    var Asignarscrap = sequelize.define('Asignarscrap', {
        idproducto: {
            primaryKey: true,
            type: DataTypes.INTEGER(11)
        },
        idscrapreg: {
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
        tableName: 'scrap_asignacion'
    });

    Asignarscrap.associate = function (models) {
        Asignarscrap.belongsTo(models.Registroscrap, { foreignKey: 'idscrapreg' });
        Asignarscrap.belongsTo(models.Scrap, { foreignKey: 'idscrapreg' });
    };

    return Asignarscrap;
}