import { db } from "@/db";
import { conversions } from "@/db/schema";
import { and, count, desc, eq, gte, or, sql, sum } from "drizzle-orm";
import moment from "moment";

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
  limit: number = 50,
  offset: number = 0
) => {
  try {
    const result = await db
      .select()
      .from(conversions)
      .where(eq(conversions.affiliateId, affiliateId))
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
  const startOfWeek = moment().startOf("week");
  const endOfWeek = moment().endOf("week");
  const startDate = startOfWeek.toDate();
  const endDate = endOfWeek.toDate();

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
          gte(conversions.updatedAt, endDate)
        )
      )
      .groupBy(sql`EXTRACT(DOW FROM ${conversions.updatedAt})`)
      .orderBy(sql`EXTRACT(DOW FROM ${conversions.updatedAt})`);

    const chartData = [
      { day: "Sunday", value: 0 },
      { day: "Monday", value: 0 },
      { day: "Tuesday", value: 0 },
      { day: "Wednesday", value: 0 },
      { day: "Thursday", value: 0 },
      { day: "Friday", value: 0 },
      { day: "Saturday", value: 0 },
    ];

    result.forEach((row) => {
      const dayIndex = row.dayOfWeek;
      const commission = parseFloat(row.totalCommission) || 0;

      if (dayIndex >= 0 && dayIndex <= 6) {
        chartData[dayIndex].value = commission;
      }
    });

    return chartData;
  } catch (error) {
    console.error("Error fetching weekly commission data:", error);
    // throw new Error("Failed to fetch weekly commission data");
  }
}
