'use strict';
module.exports = (sequelize, DataTypes) => {
    var Registrodefectos = sequelize.define('Registrodefectos', {
        iddefreg: {
            primaryKey: true,
            type: DataTypes.INTEGER(11)
        },
        descripcion_defecto: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cod_defecto: {
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
        tableName: 'defectosregistro'
    });
    
    Registrodefectos.associate = function (models) {
        Registrodefectos.hasOne(models.Asignardefectos, { foreignKey:'iddefreg' });
        Registrodefectos.hasOne(models.Defectos, { foreignKey:'iddefreg' });
    };

    return Registrodefectos;
}