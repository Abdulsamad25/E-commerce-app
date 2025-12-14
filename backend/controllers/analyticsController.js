import analyticsModel from "../models/analyticsModel.js";

// Track a visitor
const trackVisitor = async (req, res) => {
  try {
    const { page, sessionId } = req.body;
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];

    const visit = new analyticsModel({
      ipAddress,
      userAgent,
      page,
      sessionId,
    });

    await visit.save();

    res.json({ success: true, message: "Visit tracked" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Get analytics stats
const getAnalytics = async (req, res) => {
  try {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    const monthAgo = new Date(today);
    monthAgo.setMonth(monthAgo.getMonth() - 1);

    // Total visits
    const totalVisits = await analyticsModel.countDocuments();

    // Unique visitors (all time)
    const uniqueVisitors = await analyticsModel.distinct('sessionId').then(sessions => sessions.length);

    // Today's stats
    const todayVisits = await analyticsModel.countDocuments({
      timestamp: { $gte: today }
    });
    
    const todayUnique = await analyticsModel.distinct('sessionId', {
      timestamp: { $gte: today }
    }).then(sessions => sessions.length);

    // Yesterday's stats
    const yesterdayVisits = await analyticsModel.countDocuments({
      timestamp: { $gte: yesterday, $lt: today }
    });

    // This week's stats
    const weekVisits = await analyticsModel.countDocuments({
      timestamp: { $gte: weekAgo }
    });
    
    const weekUnique = await analyticsModel.distinct('sessionId', {
      timestamp: { $gte: weekAgo }
    }).then(sessions => sessions.length);

    // This month's stats
    const monthVisits = await analyticsModel.countDocuments({
      timestamp: { $gte: monthAgo }
    });
    
    const monthUnique = await analyticsModel.distinct('sessionId', {
      timestamp: { $gte: monthAgo }
    }).then(sessions => sessions.length);

    // Recent visitors (last 10)
    const recentVisitors = await analyticsModel.find()
      .sort({ timestamp: -1 })
      .limit(10)
      .select('page timestamp ipAddress sessionId');

    // Daily visits for last 7 days
    const dailyStats = await Promise.all(
      Array.from({ length: 7 }, async (_, i) => {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const nextDate = new Date(date);
        nextDate.setDate(nextDate.getDate() + 1);
        
        const visits = await analyticsModel.countDocuments({
          timestamp: { $gte: date, $lt: nextDate }
        });
        
        const unique = await analyticsModel.distinct('sessionId', {
          timestamp: { $gte: date, $lt: nextDate }
        }).then(sessions => sessions.length);
        
        return {
          date: date.toISOString().split('T')[0],
          visits,
          unique
        };
      })
    );

    res.json({
      success: true,
      analytics: {
        totalVisits,
        uniqueVisitors,
        today: { visits: todayVisits, unique: todayUnique },
        yesterday: { visits: yesterdayVisits },
        week: { visits: weekVisits, unique: weekUnique },
        month: { visits: monthVisits, unique: monthUnique },
        recentVisitors,
        dailyStats: dailyStats.reverse()
      }
    });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Get active users (visited in last 5 minutes)
const getActiveUsers = async (req, res) => {
  try {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    
    const activeUsers = await analyticsModel.distinct('sessionId', {
      timestamp: { $gte: fiveMinutesAgo }
    }).then(sessions => sessions.length);

    res.json({ success: true, activeUsers });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { trackVisitor, getAnalytics, getActiveUsers };