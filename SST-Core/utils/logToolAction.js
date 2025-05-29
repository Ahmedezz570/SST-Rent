const ToolHistory = require('../models/HistorySchema');

const logToolAction = async ({ tool, user, admin ,action }) => {
  try {
    const log = new ToolHistory({
      tool,
      user,
      admin ,
      action,
    });
    await log.save();
    console.log('Action logged successfully:', action , admin , tool, user);
  } catch (err) {
    console.error("Error logging tool action:", err.message);
  }
};

module.exports = logToolAction;
