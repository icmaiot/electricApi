'use strict';
module.exports = (sequelize, DataTypes) => {
    var Area = sequelize.define('Area', {
        idarea: {
            primaryKey: true,
            type: DataTypes.INTEGER(11)
        },
        area: {
            type: DataTypes.STRING,
            allowNull: false
        },
        idcia: {
            type: DataTypes.INTEGER(11),
            references: {
                model: 'cia',
                key: 'idcia'
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
        tableName: 'area'
    });

    Area.associate = function (models) {
        Area.hasMany(models.Maquina);
        Area.belongsTo(models.Cia);
    };
    //Relacion one To Many Cia
    return Area;
}