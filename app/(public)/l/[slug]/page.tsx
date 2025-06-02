import { UAParser } from "ua-parser-js";
import { headers } from "next/headers";
import { generateClickCode } from "@/utils/generateClickCode";
import {
  getAffiliateLinkBySlug,
  updateAffiliateLinkStats,
} from "@/models/affiliate-link-model";
import { insertClick } from "@/models/clicks-model";
import { NewClick } from "@/db/schema";

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { sub1?: string; sub2?: string; sub3?: string };
}) {
  const { slug } = params;
  const { sub1, sub2, sub3 } = searchParams;
  const headersList = headers();
  const userAgent = headersList.get("user-agent") || "";
  const parser = new UAParser(userAgent);
  const deviceInfo = parser.getResult();
  const clickCode = generateClickCode();
  const ipAddress =
    headersList.get("x-forwarded-for") ||
    headersList.get("x-real-ip") ||
    headersList.get("cf-connecting-ip") ||
    "Unknown";

  const affiliateLink = (await getAffiliateLinkBySlug(slug))?.data;
  if (!affiliateLink) {
    console.log(ipAddress);
    return <p>Affiliate link not found for slug: {slug}</p>;
  }
  if (affiliateLink.status === "inactive") {
    return <p>Affiliate link is inactive for slug: {slug}</p>;
  }

  const data: NewClick = {
    campaignId: 1,
    affiliateId: affiliateLink.affiliateId,
    affiliateLinkId: affiliateLink.id,
    clickCode,
    userAgent,
    ipAddress,
    sub1,
    sub2,
    sub3,
    isConverted: false,
    clickedAt: new Date().toISOString(),
  };

  const result = await insertClick(data);
  const newClickCount = affiliateLink.totalClicks + 1;
  const updateClicks = await updateAffiliateLinkStats(
    affiliateLink.id,
    newClickCount
  );

  return (
    <div>
      <p>Slug: {slug}</p>
      <p>Sub1: {sub1}</p>
      <p>Sub2: {sub2}</p>
      <p>Sub3: {sub3}</p>
      <h3>Full Device Info (JSON)</h3>
      <pre>{JSON.stringify(deviceInfo, null, 2)}</pre>
      <h3>Click Code</h3>
      <p>{clickCode}</p>
    </div>
  );
}
