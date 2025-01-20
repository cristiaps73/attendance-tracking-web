module.exports = (sequelize, DataTypes) => {
  const Attendee = sequelize.define('Attendee', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    eventId: DataTypes.INTEGER,
    checkIn: { type: DataTypes.DATE, defaultValue: sequelize.NOW }
  });

  Attendee.associate = function(models) {
    Attendee.belongsTo(models.Event, { foreignKey: 'eventId', as: 'event' });
  };

  return Attendee;
};
