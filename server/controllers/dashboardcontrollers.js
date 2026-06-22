import scamAnalyticsSchema from "../models/scamAnalyticsSchema.js";

export const getDashboardStats = async (req, res) => {
  try {
    const today = new Date();

    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(today.getDate() - 1);

    const startDate = twoDaysAgo
      .toISOString()
      .split("T")[0];

    const [
      totalAnalyses,
      totalScams,
      categoryDistribution,
      threatDistribution,
      languageDistribution,
      avgMetrics,
      dailyTrend
    ] = await Promise.all([

      // Total analyses
      scamAnalyticsSchema.countDocuments(),

      // Total scams
      scamAnalyticsSchema.countDocuments({
        isScam: true
      }),

      // Category distribution
      scamAnalyticsSchema.aggregate([
        {
          $group: {
            _id: "$category",
            count: { $sum: 1 }
          }
        },
        {
          $sort: {
            count: -1
          }
        }
      ]),

      // Threat distribution
      scamAnalyticsSchema.aggregate([
        {
          $group: {
            _id: "$threatLevel",
            count: { $sum: 1 }
          }
        }
      ]),

      // Language distribution
      scamAnalyticsSchema.aggregate([
        {
          $group: {
            _id: "$detectedLanguage",
            count: { $sum: 1 }
          }
        },
        {
          $sort: {
            count: -1
          }
        }
      ]),

      // Average metrics
      scamAnalyticsSchema.aggregate([
        {
          $group: {
            _id: null,
            avgRiskScore: {
              $avg: "$riskScore"
            },
            avgConfidence: {
              $avg: "$confidence"
            }
          }
        }
      ]),

      // Daily trends (last 2 days only)
      scamAnalyticsSchema.aggregate([
        {
          $match: {
            analysisDate: {
              $gte: startDate
            }
          }
        },
        {
          $group: {
            _id: "$analysisDate",
            total: {
              $sum: 1
            },
            scams: {
              $sum: {
                $cond: ["$isScam", 1, 0]
              }
            }
          }
        },
        {
          $sort: {
            _id: 1
          }
        }
      ])
    ]);

    const scamPercentage =
      totalAnalyses === 0
        ? 0
        : Number(
            (
              (totalScams / totalAnalyses) *
              100
            ).toFixed(1)
          );

    const mostCommonScam =
      categoryDistribution.length > 0
        ? categoryDistribution[0]._id
        : "N/A";

    const topLanguage =
      languageDistribution.length > 0
        ? languageDistribution[0]._id
        : "N/A";

    res.status(200).json({
      success: true,

      overview: {
        totalAnalyses,
        totalScams,
        totalSafeMessages:
          totalAnalyses - totalScams,
        scamPercentage,
        mostCommonScam,
        topLanguage,
        avgRiskScore:
          avgMetrics.length > 0
            ? Number(
                avgMetrics[0].avgRiskScore.toFixed(1)
              )
            : 0,
        avgConfidence:
          avgMetrics.length > 0
            ? Number(
                avgMetrics[0].avgConfidence.toFixed(1)
              )
            : 0
      },

      categoryDistribution,

      threatDistribution,

      languageDistribution,

      dailyTrend
    });

  } catch (error) {
    console.error("Dashboard Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard statistics"
    });
  }
};