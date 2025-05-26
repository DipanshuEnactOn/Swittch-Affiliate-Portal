ALTER TABLE "affiliate_links" ALTER COLUMN "status" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "affiliate_links" ALTER COLUMN "status" SET DEFAULT 'active'::text;--> statement-breakpoint
ALTER TABLE "campaign_goals" ALTER COLUMN "status" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "campaign_goals" ALTER COLUMN "status" SET DEFAULT 'active'::text;--> statement-breakpoint
ALTER TABLE "campaigns" ALTER COLUMN "status" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "campaigns" ALTER COLUMN "status" SET DEFAULT 'active'::text;--> statement-breakpoint
ALTER TABLE "conversions" ALTER COLUMN "status" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "conversions" ALTER COLUMN "status" SET DEFAULT 'pending'::text;--> statement-breakpoint
ALTER TABLE "payouts" ALTER COLUMN "status" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "payouts" ALTER COLUMN "status" SET DEFAULT 'pending'::text;--> statement-breakpoint
ALTER TABLE "postback_logs" ALTER COLUMN "status" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."status";--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('confirmed', 'declined', 'pending', 'active', 'inactive');--> statement-breakpoint
ALTER TABLE "affiliate_links" ALTER COLUMN "status" SET DEFAULT 'active'::"public"."status";--> statement-breakpoint
ALTER TABLE "affiliate_links" ALTER COLUMN "status" SET DATA TYPE "public"."status" USING "status"::"public"."status";--> statement-breakpoint
ALTER TABLE "campaign_goals" ALTER COLUMN "status" SET DEFAULT 'active'::"public"."status";--> statement-breakpoint
ALTER TABLE "campaign_goals" ALTER COLUMN "status" SET DATA TYPE "public"."status" USING "status"::"public"."status";--> statement-breakpoint
ALTER TABLE "campaigns" ALTER COLUMN "status" SET DEFAULT 'active'::"public"."status";--> statement-breakpoint
ALTER TABLE "campaigns" ALTER COLUMN "status" SET DATA TYPE "public"."status" USING "status"::"public"."status";--> statement-breakpoint
ALTER TABLE "conversions" ALTER COLUMN "status" SET DEFAULT 'pending'::"public"."status";--> statement-breakpoint
ALTER TABLE "conversions" ALTER COLUMN "status" SET DATA TYPE "public"."status" USING "status"::"public"."status";--> statement-breakpoint
ALTER TABLE "payouts" ALTER COLUMN "status" SET DEFAULT 'pending'::"public"."status";--> statement-breakpoint
ALTER TABLE "payouts" ALTER COLUMN "status" SET DATA TYPE "public"."status" USING "status"::"public"."status";--> statement-breakpoint
ALTER TABLE "postback_logs" ALTER COLUMN "status" SET DATA TYPE "public"."status" USING "status"::"public"."status";