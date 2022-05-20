'use strict';
module.exports = (sequelize, DataTypes) => {
    var Evento_asignacion = sequelize.define('Evento_asignacion', {
        id_tipoequipo: {
            primaryKey: true,
            type: DataTypes.INTEGER(11)
        },
        id_falla: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references:{
                model:'evento_registro',
                key:'id_falla'
            }
        },
        id_evento: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
    },{
        defaultScope: {
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
        },
        timestamps: false,
        paranoid: false,
        underscored: false,
        freezeTableName: true,
        tableName: 'evento_asignacion'
    });

    //hace fk de registro para traerse los datos de esa tabla.
    Evento_asignacion.associate = function (models) {
    Evento_asignacion.belongsTo(models.Evento_registro, { foreignKey: 'id_falla' });
    }
    return Evento_asignacion;
}