let campaign = (await getCampaignById(clickRecord.campaignId))?.data;
let campaignGoal = (await getCampaignGoalById(goal_id))?.data;
let affiliateCampaignGoal = null;

if (!campaign || !campaignGoal) {
  return commonResponse({
    data: null,
    status: "error",
    message: t("conversion.invalidCampaignOrGoal"),
  });
}

affiliateCampaignGoal = (await getAffiliateCampaignGoalById(Number(goal_id)))
  ?.data;

// if (goal_id) {
//   const campaignGoalforId = await getCampaignGoalById(Number(goal_id));
// const affiliateCampaignGoalforId = await getAffiliateCampaignGoalById(
//   Number(goal_id)
// );

//   if (!campaignGoalforId && !affiliateCampaignGoalforId) {
//     return commonResponse({
//       data: null,
//       status: "error",
//       message: t("conversion.invalidGoalId"),
//     });
//   }

//   campaignGoal = campaignGoalforId?.data;
//   affiliateCampaignGoal = affiliateCampaignGoalforId?.data;
// }

// if (campaign_id) {
//   campaign = (await getCampaignById(Number(campaign_id)))?.data;
//   if (!campaign) {
//     return commonResponse({
//       data: null,
//       status: "error",
//       message: t("conversion.invalidCampaignId"),
//     });
//   }
// }

const existingConversion = (await getConversionByTransactionId(transactionId))
  ?.data;

if (existingConversion) {
  if (existingConversion.status === "pending") {
    const updateResult = await updateConversionStatus(
      existingConversion.id,
      status
    );

    if (updateResult.status === "error") {
      return commonResponse({
        data: null,
        status: "error",
        message: t("conversion.updateFailed"),
      });
    }

    // await markClickAsConverted(clickRecord.clickCode);

    return commonResponse({
      data: updateResult.data,
      status: "success",
      message: t("conversion.statusUpdated"),
    });
  } else {
    return commonResponse({
      data: null,
      status: "error",
      message: t("conversion.conversionNotPending"),
    });
  }
} else {
  let conversionValue = campaignGoal?.commissionAmount || "0";
  let commission = campaignGoal?.commissionAmount || "0";
  let postabackLogId = 0;

  if (affiliateCampaignGoal) {
    conversionValue = affiliateCampaignGoal.customCommissionRate || "0";
    commission = affiliateCampaignGoal.customCommissionRate || "0";
  }

  const newConversion: NewConversion = {
    campaignGoalId: goal_id ? Number(goal_id) : 1,
    campaignId: clickRecord.campaignId ? Number(clickRecord.campaignId) : 1,
    clickCode: clickRecord.clickCode,
    affiliateId: clickRecord.affiliateId,
    transactionId: transactionId,
    conversionValue,
    commission,
    sub1: clickRecord.sub1,
    sub2: clickRecord.sub2,
    sub3: clickRecord.sub3,
    status: status || "pending",
    postbackLogId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    convertedAt: new Date().toISOString(),
  };

  const createResult = await insertConversion(newConversion);

  console.log("Conversion creation result:", createResult);
  if (createResult.status === "error") {
    return commonResponse({
      data: null,
      status: "error",
      message: t("conversion.createFailed"),
    });
  }

  await markClickAsConverted(clickRecord.clickCode);

  // TODO: Handle multiple postbacks for the user

  const affiliatePostback = (
    await getAffiliatePostbackByAffiliateAndCampaign(
      clickRecord.affiliateId,
      clickRecord.campaignId ? Number(clickRecord.campaignId) : 1,
      goal_id ? Number(goal_id) : 1
    )
  )?.data;

  affiliatePostback.forEach(async (postback) => {
    const postbackData = {
      affiliateId: clickRecord.affiliateId,
      campaignId: clickRecord.campaignId ? Number(clickRecord.campaignId) : 1,
      campaignGoalId: goal_id ? Number(goal_id) : 1,
      conversionId: createResult.data.id,
      // Add data from conversion record
      transactionId: transactionId,
      clickCode: clickRecord.clickCode,
      status: status || "pending",
    };

    // Here you would typically send the postback to the URL
    // For now, we just log it
    fetch(postback.postbackUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postbackData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Postback response:", data);
      })
      .catch((error) => {
        console.error("Postback error:", error);
      });
  });

  await updatePostbackLogStatus(postback_log.id, "completed"); // Add this method to update the postback log status

  return commonResponse({
    data: createResult.data,
    status: "success",
    message: t("conversion.conversionCreated"),
  });
}
