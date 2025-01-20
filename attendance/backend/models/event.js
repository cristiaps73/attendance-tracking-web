module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    name: DataTypes.STRING,
    startTime: DataTypes.DATE,
    endTime: DataTypes.DATE,
    status: { type: DataTypes.STRING, defaultValue: 'CLOSED' },
    code: DataTypes.STRING
  });

  Event.associate = function(models) {
    Event.hasMany(models.Attendee, { foreignKey: 'eventId', as: 'attendees' });
  };

  return Event;
};
