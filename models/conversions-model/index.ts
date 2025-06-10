import { db } from "@/db";
import { affiliateConversionsSummary, conversions } from "@/db/schema";
import {
  and,
  count,
  desc,
  eq,
  gte,
  InferSelectModel,
  lte,
  or,
  sql,
  sum,
} from "drizzle-orm";
import { date } from "drizzle-orm/mysql-core";
import moment from "moment";

type AffiliateConversionsSummaryType = InferSelectModel<
  typeof affiliateConversionsSummary
>;

export const insertConversion = async (conversionData: any) => {
  try {
    const result = await db.transaction(async (tx) => {
      const inserted = await tx
        .insert(conversions)
        .values(conversionData)
        .returning();
      return inserted[0];
    });

    return {
      data: result,
      message: "Conversion created successfully",
      status: "success",
    };
  } catch (error: any) {
    return {
      data: error,
      message: error.message || "An error occurred",
      status: "error",
    };
  }
};

export const updateConversion = async (id: number, updateData: any) => {
  try {
    const result = await db.transaction(async (tx) => {
      const updated = await tx
        .update(conversions)
        .set({ ...updateData, updatedAt: new Date() })
        .where(eq(conversions.id, id))
        .returning();
      return updated[0];
    });

    if (!result) {
      return {
        data: null,
        message: "Conversion not found",
        status: "error",
      };
    }

    return {
      data: result,
      message: "Conversion updated successfully",
      status: "success",
    };
  } catch (error: any) {
    return {
      data: null,
      message: error.message || "An error occurred",
      status: "error",
    };
  }
};

export const deleteConversion = async (id: number) => {
  try {
    const result = await db.transaction(async (tx) => {
      const deleted = await tx
        .delete(conversions)
        .where(eq(conversions.id, id))
        .returning();
      return deleted[0];
    });

    if (!result) {
      return {
        data: null,
        message: "Conversion not found",
        status: "error",
      };
    }

    return {
      data: result,
      message: "Conversion deleted successfully",
      status: "success",
    };
  } catch (error: any) {
    return {
      data: null,
      message: error.message || "An error occurred",
      status: "error",
    };
  }
};

export const getConversionById = async (id: number) => {
  try {
    const result = await db
      .select()
      .from(conversions)
      .where(eq(conversions.id, id))
      .limit(1);

    if (result.length === 0) {
      return {
        data: null,
        message: "Conversion not found",
        status: "error",
      };
    }

    return {
      data: result[0],
      message: "Conversion retrieved successfully",
      status: "success",
    };
  } catch (error: any) {
    return {
      data: null,
      message: error.message || "An error occurred",
      status: "error",
    };
  }
};

export const getConversionsByAffiliate = async (
  affiliateId: number,
  rows_per_page: number = 10,
  page: number = 1,
  status?: "pending" | "approved" | "declined" | "paid",
  from?: string,
  to?: string
) => {
  try {
    const defaultTo = new Date();
    const defaultFrom = new Date();
    defaultFrom.setMonth(defaultFrom.getMonth() - 1);

    const fromDate = from ? new Date(from) : defaultFrom;
    const toDate = to ? new Date(to) : defaultTo;

    let whereConditions = [
      eq(conversions.affiliateId, affiliateId),
      gte(conversions.createdAt, fromDate),
      lte(conversions.createdAt, toDate),
    ];

    if (status) {
      whereConditions.push(eq(conversions.status, status));
    }

    const offset = (page - 1) * rows_per_page;

    const countResult = await db
      .select({
        count: sql<number>`COUNT(DISTINCT ${conversions.id})`,
      })
      .from(conversions)
      .where(and(...whereConditions));

    const totalCount = countResult[0]?.count || 0;
    const totalPages = Math.ceil(totalCount / rows_per_page);

    const result = await db
      .select()
      .from(conversions)
      .where(and(...whereConditions))
      .limit(rows_per_page)
      .offset(offset)
      .orderBy(desc(conversions.createdAt));

    // console.log(result);

    return {
      data: result,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        rowsPerPage: rows_per_page,
      },
      message: "Conversions retrieved successfully",
      status: "success",
    };
  } catch (error: any) {
    return {
      data: [],
      message: error.message || "An error occurred",
      status: "error",
    };
  }
};

export const getConversionsByCampaign = async (
  campaignId: number,
  limit: number = 50,
  offset: number = 0
) => {
  try {
    const result = await db
      .select()
      .from(conversions)
      .where(eq(conversions.campaignId, campaignId))
      .limit(limit)
      .offset(offset)
      .orderBy(desc(conversions.createdAt));

    return {
      data: result,
      message: "Conversions retrieved successfully",
      status: "success",
    };
  } catch (error: any) {
    return {
      data: [],
      message: error.message || "An error occurred",
      status: "error",
    };
  }
};

export const getConversionByTransactionId = async (transactionId: string) => {
  try {
    const result = await db
      .select()
      .from(conversions)
      .where(eq(conversions.transactionId, transactionId))
      .limit(1);

    if (result.length === 0) {
      return {
        data: null,
        message: "Conversion not found",
        status: "error",
      };
    }

    return {
      data: result[0],
      message: "Conversion retrieved successfully",
      status: "success",
    };
  } catch (error: any) {
    return {
      data: null,
      message: error.message || "An error occurred",
      status: "error",
    };
  }
};

export const updateConversionStatus = async (
  id: number,
  status: "approved" | "declined" | "pending" | "paid"
) => {
  try {
    const result = await db.transaction(async (tx) => {
      const updated = await tx
        .update(conversions)
        .set({ status, updatedAt: new Date() })
        .where(eq(conversions.id, id))
        .returning();
      return updated[0];
    });

    if (!result) {
      return {
        data: null,
        message: "Conversion not found",
        status: "error",
      };
    }

    return {
      data: result,
      message: "Conversion status updated successfully",
      status: "success",
    };
  } catch (error: any) {
    return {
      data: null,
      message: error.message || "An error occurred",
      status: "error",
    };
  }
};

export const getConversionStatsForAffiliate = async (affiliateId: number) => {
  try {
    const result = await db
      .select({
        totalCount: count(),
        totalValue: sum(conversions.conversionValue),
        totalCommission: sum(conversions.commission),
      })
      .from(conversions)
      .where(
        and(
          eq(conversions.affiliateId, affiliateId),
          or(eq(conversions.status, "approved"), eq(conversions.status, "paid"))
        )
      );

    return {
      data: {
        count: result[0]?.totalCount || 0,
        totalValue: result[0]?.totalValue || "0",
        totalCommission: result[0]?.totalCommission || "0",
      },
      message: "Conversion stats retrieved successfully",
      status: "success",
    };
  } catch (error: any) {
    return {
      data: {
        count: 0,
        totalValue: "0",
        totalCommission: "0",
      },
      message: error.message || "An error occurred",
      status: "error",
    };
  }
};

export async function getWeeklyCommissionDataByAffiliateId(
  affiliate_id: number
) {
  const endDate = moment().endOf("day").toDate();
  const startDate = moment().subtract(6, "days").startOf("day").toDate();

  try {
    const result = await db
      .select({
        dayOfWeek: sql<number>`EXTRACT(DOW FROM ${conversions.updatedAt})`,
        totalCommission: sql<string>`SUM(${conversions.commission})`,
      })
      .from(conversions)
      .where(
        and(
          eq(conversions.affiliateId, affiliate_id),
          eq(conversions.status, "approved"),
          gte(conversions.updatedAt, startDate),
          lte(conversions.updatedAt, endDate)
        )
      )
      .groupBy(sql`EXTRACT(DOW FROM ${conversions.updatedAt})`)
      .orderBy(sql`EXTRACT(DOW FROM ${conversions.updatedAt})`);

    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const chartData: any = [];

    for (let i = 6; i >= 0; i--) {
      const date = moment().subtract(i, "days");
      const dayOfWeek = date.day();
      const dayName = dayNames[dayOfWeek];

      chartData.push({
        day: dayName,
        amount: 0,
        date: date.format("YYYY-MM-DD"),
      });
    }

    result.forEach((row: any) => {
      const dayIndex = parseInt(row.dayOfWeek);
      const commission = parseFloat(row.totalCommission) || 0;

      const chartItem = chartData.find((item: any) => {
        const itemDayIndex = dayNames.indexOf(item.day);
        return itemDayIndex === dayIndex;
      });

      if (chartItem) {
        chartItem.amount = commission;
      }
    });

    return chartData;
  } catch (error) {
    console.error("Error fetching weekly commission data:", error);
  }
}

export const getEarningsDataForAffiliate = async (affiliateId: number) => {
  const earningsData = await db.execute(
    sql.raw(`
      SELECT
        COALESCE(SUM(CASE WHEN status IN ('approved', 'paid') THEN commission ELSE 0 END), 0) AS total_earnings,
        COALESCE(SUM(CASE WHEN status = 'pending' THEN commission ELSE 0 END), 0) AS pending_earning
      FROM
        conversions
      WHERE
        affiliate_id = ${affiliateId}
    `)
  );

  return {
    totalEarnings: (earningsData[0]?.total_earnings as number) || 0,
    pendingEarning: (earningsData[0]?.pending_earning as number) || 0,
  };
};

export const getAllAffiliateTransactions = async (
  affiliateId: number,
  rows_per_page: number = 10,
  page: number = 1,
  status?: "pending" | "approved" | "declined" | "paid",
  from?: string,
  to?: string
) => {
  try {
    const defaultTo = new Date();
    const defaultFrom = new Date();
    defaultFrom.setMonth(defaultFrom.getMonth() - 1);

    const fromDate = from ? new Date(from) : defaultFrom;
    const toDate = to ? new Date(to) : defaultTo;
    toDate.setHours(23, 59, 59, 999);

    let whereConditions = [
      eq(affiliateConversionsSummary.affiliateId, affiliateId),
      gte(
        affiliateConversionsSummary.conversionCreatedAt,
        fromDate.toISOString()
      ),
      lte(
        affiliateConversionsSummary.conversionCreatedAt,
        toDate.toISOString()
      ),
    ];

    if (status) {
      whereConditions.push(
        eq(affiliateConversionsSummary.conversionStatus, status)
      );
    }

    const offset = (page - 1) * rows_per_page;

    const countResult = await db
      .select({
        count: sql<number>`COUNT(DISTINCT ${affiliateConversionsSummary.clickCode})`,
      })
      .from(affiliateConversionsSummary)
      .where(and(...whereConditions));

    const totalCount = countResult[0]?.count || 0;
    const totalPages = Math.ceil(totalCount / rows_per_page);

    const result = await db
      .select()
      .from(affiliateConversionsSummary)
      .where(and(...whereConditions))
      .limit(rows_per_page)
      .offset(offset)
      .orderBy(desc(affiliateConversionsSummary.conversionCreatedAt));

    return {
      data: result,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        rowsPerPage: rows_per_page,
      },
      message: "Conversions retrieved successfully",
      status: "success",
    };
  } catch (error: any) {
    return {
      data: error,
      message: error.message || "An error occurred",
      status: "error",
    };
  }
};

export const getAffiliateConversionsSummaryByTrackingCode = async (
  tracking_code: string
): Promise<{
  data: AffiliateConversionsSummaryType | null;
  message: string;
  status: "success" | "error";
}> => {
  try {
    const result = await db
      .select()
      .from(affiliateConversionsSummary)
      .where(eq(affiliateConversionsSummary.trackingCode, tracking_code))
      .limit(1);
    return {
      data: result[0] || null,
      message: "Conversion retrieved successfully",
      status: "success",
    };
  } catch (error: any) {
    return {
      data: null,
      message: error.message || "An error occurred",
      status: "error",
    };
  }
};
