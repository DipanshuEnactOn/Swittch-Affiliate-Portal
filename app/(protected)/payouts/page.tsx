import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import EarningCards from "@/components/payouts/EarningCards";
import PaymentInformation from "@/components/payouts/PaymentInformation";
import PayoutsTable from "@/components/payouts/PayoutsTable";
import { getAffiliateById } from "@/models/affiliates-model";
import { getAuthSession } from "@/models/auth-models";
import { getEarningsDataForAffiliate } from "@/models/conversions-model";
import {
  getApprovedPayoutsByAffiliateId,
  getPayoutsByAffiliateId,
} from "@/models/payouts-model";
import { createTranslation } from "@/i18n/server";
import { AppRoutes } from "@/utils/routes";
import { redirect } from "next/navigation";

export default async function PayoutsPage({ searchParams }: any) {
  const { t } = await createTranslation();

  const user = await getAuthSession();
  const userStatus = user?.user?.status;

  if (userStatus === "pending") {
    return redirect(AppRoutes.auth.pending);
  }
  const { rows_per_page, page } = searchParams;
  const affilite = (await getAffiliateById(user.user.id))?.data || null;
  const paymentInfo = {
    paypalId: affilite?.paypalAddress || null,
    bankInfo: affilite?.bankDetails || null,
  };
  const payouts =
    (
      await getPayoutsByAffiliateId(user.user.id, {
        filters: { rows_per_page, page },
      })
    )?.data || [];

  const affiliatePaidAmount = (
    await getApprovedPayoutsByAffiliateId(user.user.id)
  )?.data;

  const affiliateEarnings = await getEarningsDataForAffiliate(user.user.id);

  const data = {
    totalEarnings: affiliateEarnings.totalEarnings || 0,
    pendingEarnings: affiliateEarnings.pendingEarning || 0,
    paidEarnings: affiliatePaidAmount || 0,
    availableAmount:
      (affiliateEarnings.totalEarnings || 0) - (affiliatePaidAmount || 0),
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">
            {t("payouts.title")}
          </h1>
        </div>

        <div className="text-sm text-gray-600 mb-6">
          {t("payouts.subtitle")}
        </div>

        <EarningCards earningsData={data} />

        <PaymentInformation
          paymentInfo={paymentInfo}
          amount={data.availableAmount}
        />

        <PayoutsTable data={payouts} />
      </div>
    </DashboardLayout>
  );
}
