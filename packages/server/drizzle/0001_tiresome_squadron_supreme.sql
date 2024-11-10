CREATE TYPE "public"."role" AS ENUM('viewer', 'scorer', 'admin', 'sysadmin');--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" "role" DEFAULT 'viewer';--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "permissions";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "isRoot";--> statement-breakpoint
DROP TYPE "public"."permission";