import { db } from "@/db";
import { affiliatePostbacks } from "@/db/schema";
import { and, desc, eq } from "drizzle-orm";

export const insertAffiliatePostback = async (postbackData: any) => {
  try {
    const result = await db.transaction(async (tx) => {
      const inserted = await tx
        .insert(affiliatePostbacks)
        .values(postbackData)
        .returning();
      return inserted[0];
    });

    return {
      data: result,
      message: "Affiliate postback created successfully",
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

export const updateAffiliatePostback = async (id: number, updateData: any) => {
  try {
    const result = await db.transaction(async (tx) => {
      const updated = await tx
        .update(affiliatePostbacks)
        .set({ ...updateData, updatedAt: new Date() })
        .where(eq(affiliatePostbacks.id, id))
        .returning();
      return updated[0];
    });

    if (!result) {
      return {
        data: null,
        message: "Affiliate postback not found",
        status: "error",
      };
    }

    return {
      data: result,
      message: "Affiliate postback updated successfully",
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

export const deleteAffiliatePostback = async (id: number) => {
  try {
    const result = await db.transaction(async (tx) => {
      const deleted = await tx
        .delete(affiliatePostbacks)
        .where(eq(affiliatePostbacks.id, id))
        .returning();
      return deleted[0];
    });

    if (!result) {
      return {
        data: null,
        message: "Affiliate postback not found",
        status: "error",
      };
    }

    return {
      data: result,
      message: "Affiliate postback deleted successfully",
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

export const getAffiliatePostbackById = async (id: number) => {
  try {
    const result = await db
      .select()
      .from(affiliatePostbacks)
      .where(eq(affiliatePostbacks.id, id))
      .limit(1);

    if (result.length === 0) {
      return {
        data: null,
        message: "Affiliate postback not found",
        status: "error",
      };
    }

    return {
      data: result[0],
      message: "Affiliate postback retrieved successfully",
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

export const getAffiliatePostbacksByAffiliate = async (affiliateId: number) => {
  try {
    const result = await db
      .select()
      .from(affiliatePostbacks)
      .where(eq(affiliatePostbacks.affiliateId, affiliateId))
      .orderBy(desc(affiliatePostbacks.createdAt));

    return {
      data: result,
      message: "Affiliate postbacks retrieved successfully",
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

export const getAffiliatePostbacksByCampaign = async (campaignId: number) => {
  try {
    const result = await db
      .select()
      .from(affiliatePostbacks)
      .where(eq(affiliatePostbacks.campaignId, campaignId))
      .orderBy(desc(affiliatePostbacks.createdAt));

    return {
      data: result,
      message: "Affiliate postbacks retrieved successfully",
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

export const getAffiliatePostbackByAffiliateAndCampaign = async (
  affiliateId: number,
  campaignId: number,
  campaignGoalId?: number
) => {
  try {
    let query = db
      .select()
      .from(affiliatePostbacks)
      .where(
        and(
          eq(affiliatePostbacks.affiliateId, affiliateId),
          eq(affiliatePostbacks.campaignId, campaignId)
        )
      );

    // if (campaignGoalId) {
    //   query = query.where(
    //     and(
    //       eq(affiliatePostbacks.affiliateId, affiliateId),
    //       eq(affiliatePostbacks.campaignId, campaignId),
    //       eq(affiliatePostbacks.campaignGoalId, campaignGoalId)
    //     )
    //   );
    // }

    const result = await query.limit(1);

    if (result.length === 0) {
      return {
        data: null,
        message: "Affiliate postback not found",
        status: "error",
      };
    }

    return {
      data: result[0],
      message: "Affiliate postback retrieved successfully",
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
