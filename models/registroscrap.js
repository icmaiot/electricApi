'use strict';
module.exports = (sequelize, DataTypes) => {
    var Registroscrap = sequelize.define('Registroscrap', {
        idscrapreg: {
            primaryKey: true,
            type: DataTypes.INTEGER(11)
        },
        descripcion_scrap: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cod_scrap: {
            type: DataTypes.STRING,
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
        tableName: 'scrapregistro'
    });

    Registroscrap.associate = function (models) {
        Registroscrap.hasOne(models.Asignarscrap, { foreignKey:'idscrapreg' });
        Registroscrap.hasOne(models.Scrap, { foreignKey:'idscrapreg' });
    };

    return Registroscrap;
}