CREATE TYPE "public"."match_period_status" AS ENUM('notStarted', 'inProgress', 'paused', 'finished');--> statement-breakpoint
CREATE TYPE "public"."match_type" AS ENUM('league', 'knockout');--> statement-breakpoint
CREATE TYPE "public"."permission" AS ENUM('manageCompetitions');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "competitions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now(),
	"name" varchar NOT NULL,
	"shortName" varchar NOT NULL,
	"startsAt" timestamp NOT NULL,
	"endsAt" timestamp NOT NULL,
	"gameId" uuid NOT NULL,
	"venueId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "teams" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now(),
	"name" varchar NOT NULL,
	"shortName" varchar NOT NULL,
	"regionId" uuid NOT NULL,
	"competitionId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "auto_match_assignment_configs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now(),
	"assignmentId" uuid NOT NULL,
	"targetMatchId" uuid NOT NULL,
	"position" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "match_assignments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now(),
	"matchId" uuid NOT NULL,
	"teamId" uuid,
	"gamePoints" integer,
	"startingZoneId" uuid NOT NULL,
	CONSTRAINT "unique_team" UNIQUE("matchId","teamId"),
	CONSTRAINT "unique_starting_zone" UNIQUE("matchId","startingZoneId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "match_periods" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now(),
	"name" varchar NOT NULL,
	"status" "match_period_status" DEFAULT 'notStarted' NOT NULL,
	"cursorPosition" integer DEFAULT 0 NOT NULL,
	"startsAt" timestamp NOT NULL,
	"competitionId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "matches" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now(),
	"name" varchar NOT NULL,
	"type" "match_type" NOT NULL,
	"sequenceNumber" integer NOT NULL,
	"matchPeriodId" uuid NOT NULL,
	CONSTRAINT "unique_sequence_number" UNIQUE("sequenceNumber","matchPeriodId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "games" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now(),
	"name" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "starting_zones" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now(),
	"name" varchar NOT NULL,
	"color" varchar NOT NULL,
	"gameId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "manual_points_adjustments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now(),
	"issuerId" uuid NOT NULL,
	"teamId" uuid NOT NULL,
	"leaguePoints" integer,
	"reason" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "match_score_entries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now(),
	"scorerId" uuid NOT NULL,
	"matchId" uuid NOT NULL,
	"scoreData" json NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_passwords" (
	"userId" uuid PRIMARY KEY NOT NULL,
	"passwordHash" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now(),
	"name" varchar NOT NULL,
	"username" varchar NOT NULL,
	"permissions" "permission"[] DEFAULT '{}' NOT NULL,
	"isRoot" boolean DEFAULT false NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "regions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now(),
	"name" varchar NOT NULL,
	"venueId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "shepherds" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now(),
	"name" varchar NOT NULL,
	"venueId" uuid NOT NULL,
	"regionIds" uuid[] DEFAULT ARRAY[]::uuid[] NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "venues" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now(),
	"name" varchar NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "teams" ADD CONSTRAINT "teams_regionId_regions_id_fk" FOREIGN KEY ("regionId") REFERENCES "public"."regions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "teams" ADD CONSTRAINT "teams_competitionId_competitions_id_fk" FOREIGN KEY ("competitionId") REFERENCES "public"."competitions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "auto_match_assignment_configs" ADD CONSTRAINT "auto_match_assignment_configs_assignmentId_match_assignments_id_fk" FOREIGN KEY ("assignmentId") REFERENCES "public"."match_assignments"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "auto_match_assignment_configs" ADD CONSTRAINT "auto_match_assignment_configs_targetMatchId_matches_id_fk" FOREIGN KEY ("targetMatchId") REFERENCES "public"."matches"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "match_assignments" ADD CONSTRAINT "match_assignments_matchId_matches_id_fk" FOREIGN KEY ("matchId") REFERENCES "public"."matches"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "match_assignments" ADD CONSTRAINT "match_assignments_teamId_teams_id_fk" FOREIGN KEY ("teamId") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "match_assignments" ADD CONSTRAINT "match_assignments_startingZoneId_starting_zones_id_fk" FOREIGN KEY ("startingZoneId") REFERENCES "public"."starting_zones"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "match_periods" ADD CONSTRAINT "match_periods_competitionId_competitions_id_fk" FOREIGN KEY ("competitionId") REFERENCES "public"."competitions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "matches" ADD CONSTRAINT "matches_matchPeriodId_match_periods_id_fk" FOREIGN KEY ("matchPeriodId") REFERENCES "public"."match_periods"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "starting_zones" ADD CONSTRAINT "starting_zones_gameId_games_id_fk" FOREIGN KEY ("gameId") REFERENCES "public"."games"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "manual_points_adjustments" ADD CONSTRAINT "manual_points_adjustments_issuerId_users_id_fk" FOREIGN KEY ("issuerId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "manual_points_adjustments" ADD CONSTRAINT "manual_points_adjustments_teamId_teams_id_fk" FOREIGN KEY ("teamId") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "match_score_entries" ADD CONSTRAINT "match_score_entries_scorerId_users_id_fk" FOREIGN KEY ("scorerId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "match_score_entries" ADD CONSTRAINT "match_score_entries_matchId_matches_id_fk" FOREIGN KEY ("matchId") REFERENCES "public"."matches"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_passwords" ADD CONSTRAINT "user_passwords_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "regions" ADD CONSTRAINT "regions_venueId_venues_id_fk" FOREIGN KEY ("venueId") REFERENCES "public"."venues"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "shepherds" ADD CONSTRAINT "shepherds_venueId_venues_id_fk" FOREIGN KEY ("venueId") REFERENCES "public"."venues"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
