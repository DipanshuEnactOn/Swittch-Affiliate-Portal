CREATE TYPE "public"."approval_status" AS ENUM('approved', 'declined', 'pending');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('approved', 'declined', 'pending', 'active', 'inactive');--> statement-breakpoint
CREATE TABLE "affiliate_campaign_goals" (
	"id" serial PRIMARY KEY NOT NULL,
	"affiliate_id" bigint NOT NULL,
	"campaign_id" bigint NOT NULL,
	"campaign_goal_id" bigint NOT NULL,
	"custom_commission_rate" numeric(5, 2),
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "affiliate_links" (
	"id" serial PRIMARY KEY NOT NULL,
	"campaign_id" bigint NOT NULL,
	"affiliate_id" bigint NOT NULL,
	"slug" varchar(255) NOT NULL,
	"destination_url" varchar(1000) NOT NULL,
	"sub1" varchar(255),
	"sub2" varchar(255),
	"sub3" varchar(255),
	"total_clicks" bigint DEFAULT 0 NOT NULL,
	"total_earnings" numeric(12, 2) DEFAULT '0' NOT NULL,
	"status" "status" DEFAULT 'active' NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp,
	CONSTRAINT "affiliate_links_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "affiliate_postbacks" (
	"id" serial PRIMARY KEY NOT NULL,
	"affiliate_id" bigint NOT NULL,
	"campaign_id" bigint NOT NULL,
	"campaign_goal_id" bigint,
	"postback_url" varchar(1500) NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "affiliates" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password_hash" varchar(255) NOT NULL,
	"approval_status" "approval_status" DEFAULT 'pending' NOT NULL,
	"paypal_address" varchar(255),
	"bank_details" jsonb,
	"address" jsonb,
	"tax_id" varchar(255),
	"created_at" timestamp,
	"updated_at" timestamp,
	CONSTRAINT "affiliates_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "campaign_goals" (
	"id" serial PRIMARY KEY NOT NULL,
	"campaign_id" bigint NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" varchar(255) NOT NULL,
	"commission_type" varchar(255) NOT NULL,
	"commission_amount" numeric(10, 2) NOT NULL,
	"tracking_code" char(10) NOT NULL,
	"status" "status" DEFAULT 'active' NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp,
	CONSTRAINT "campaign_goals_tracking_code_unique" UNIQUE("tracking_code")
);
--> statement-breakpoint
CREATE TABLE "campaigns" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"logo_url" varchar(255),
	"campaign_type" varchar(255) NOT NULL,
	"status" "status" DEFAULT 'active' NOT NULL,
	"terms_and_conditions" text,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "clicks" (
	"id" serial PRIMARY KEY NOT NULL,
	"campaign_id" bigint NOT NULL,
	"affiliate_link_id" bigint NOT NULL,
	"affiliate_id" bigint NOT NULL,
	"click_code" varchar(255) NOT NULL,
	"ip_address" varchar(255) NOT NULL,
	"user_agent" varchar(1000) NOT NULL,
	"referrer" varchar(255),
	"country" varchar(255),
	"city" varchar(255),
	"device_type" varchar(255),
	"sub1" varchar(255),
	"sub2" varchar(255),
	"sub3" varchar(255),
	"is_converted" boolean DEFAULT false NOT NULL,
	"clicked_at" timestamp NOT NULL,
	CONSTRAINT "clicks_click_code_unique" UNIQUE("click_code")
);
--> statement-breakpoint
CREATE TABLE "conversions" (
	"id" serial PRIMARY KEY NOT NULL,
	"campaign_id" bigint NOT NULL,
	"postback_log_id" bigint NOT NULL,
	"click_code" varchar(255) NOT NULL,
	"campaign_goal_id" bigint NOT NULL,
	"affiliate_id" bigint NOT NULL,
	"transaction_id" varchar(255) NOT NULL,
	"conversion_value" numeric(12, 2) NOT NULL,
	"commission" numeric(12, 2) NOT NULL,
	"sub1" varchar(255),
	"sub2" varchar(255),
	"sub3" varchar(255),
	"status" "status" DEFAULT 'pending' NOT NULL,
	"payout_id" bigint,
	"admin_notes" varchar(500),
	"converted_at" timestamp NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp,
	CONSTRAINT "conversions_transaction_id_unique" UNIQUE("transaction_id")
);
--> statement-breakpoint
CREATE TABLE "payouts" (
	"id" serial PRIMARY KEY NOT NULL,
	"affiliate_id" bigint NOT NULL,
	"requested_amount" numeric(12, 2) NOT NULL,
	"status" "status" DEFAULT 'pending' NOT NULL,
	"payment_method" varchar(50) NOT NULL,
	"payment_account" varchar(255) NOT NULL,
	"payment_details" jsonb,
	"admin_notes" varchar(500),
	"transaction_id" varchar(255),
	"api_response" jsonb,
	"paid_at" timestamp,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "postback_logs" (
	"id" serial PRIMARY KEY NOT NULL,
	"raw_postback_data" jsonb NOT NULL,
	"transaction_id" varchar(255) NOT NULL,
	"status" "status" NOT NULL,
	"status_messages" jsonb,
	"received_at" timestamp NOT NULL,
	"processed_at" timestamp
);
