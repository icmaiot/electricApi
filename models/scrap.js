'use strict';
module.exports = (sequelize, DataTypes) => {
    var Scrap = sequelize.define('Scrap', {
        Idacscrap: {
            primaryKey: true,
            type: DataTypes.INTEGER(11)
        },
        cantscrap: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        lotescrap: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        idscrapreg: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        idusuarios: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        idusuarioreg: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        idtipo_scrap: {
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
        tableName: 'scrap'
    });

    Scrap.associate = function (models) {
        Scrap.belongsTo(models.Registroscrap, { foreignKey: 'idscrapreg' });
        Scrap.belongsTo(models.Usuario, { foreignKey: 'idusuarios' });
        Scrap.belongsTo(models.Usuario, { foreignKey:'idusuarioreg', as:'usregs' });
     };

    return Scrap;
}