import { pgTable, foreignKey, uuid, timestamp, text, pgPolicy, jsonb, integer, boolean, check, bigint, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const pricingPlanInterval = pgEnum("pricing_plan_interval", ['day', 'week', 'month', 'year'])
export const pricingType = pgEnum("pricing_type", ['one_time', 'recurring'])
export const subscriptionStatus = pgEnum("subscription_status", ['trialing', 'active', 'canceled', 'incomplete', 'incomplete_expired', 'past_due', 'unpaid'])


export const files = pgTable("files", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }),
	title: text().notNull(),
	iconId: text("icon_id").notNull(),
	data: text(),
	inTrash: text("in_trash"),
	logo: text(),
	bannerUrl: text("banner_url"),
	workspaceId: uuid("workspace_id"),
	folderId: uuid("folder_id"),
}, (table) => [
	foreignKey({
			columns: [table.folderId],
			foreignColumns: [folders.id],
			name: "files_folder_id_folders_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.workspaceId],
			foreignColumns: [workspaces.id],
			name: "files_workspace_id_workspaces_id_fk"
		}).onDelete("cascade"),
]);

export const folders = pgTable("folders", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }),
	title: text().notNull(),
	iconId: text("icon_id").notNull(),
	data: text(),
	inTrash: text("in_trash"),
	logo: text(),
	bannerUrl: text("banner_url"),
	workspaceId: uuid("workspace_id"),
}, (table) => [
	foreignKey({
			columns: [table.workspaceId],
			foreignColumns: [workspaces.id],
			name: "folders_workspace_id_workspaces_id_fk"
		}).onDelete("cascade"),
]);

export const users = pgTable("users", {
	id: uuid().primaryKey().notNull(),
	fullName: text("full_name"),
	avatarUrl: text("avatar_url"),
	billingAddress: jsonb("billing_address"),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`timezone('utc'::text, now())`),
	paymentMethod: jsonb("payment_method"),
	email: text(),
}, (table) => [
	foreignKey({
			columns: [table.id],
			foreignColumns: [table.id],
			name: "users_id_fkey"
		}),
	pgPolicy("Can update own user data.", { as: "permissive", for: "update", to: ["public"], using: sql`(auth.uid() = id)` }),
	pgPolicy("Everyone Can view own user data.", { as: "permissive", for: "select", to: ["public"] }),
]);

export const customers = pgTable("customers", {
	id: uuid().primaryKey().notNull(),
	stripeCustomerId: text("stripe_customer_id"),
}, (table) => [
	foreignKey({
			columns: [table.id],
			foreignColumns: [users.id],
			name: "customers_id_fkey"
		}),
]);

export const subscriptions = pgTable("subscriptions", {
	id: text().primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	status: subscriptionStatus(),
	metadata: jsonb(),
	priceId: text("price_id"),
	quantity: integer(),
	cancelAtPeriodEnd: boolean("cancel_at_period_end"),
	created: timestamp({ withTimezone: true, mode: 'string' }).default(sql`timezone('utc'::text, now())`).notNull(),
	currentPeriodStart: timestamp("current_period_start", { withTimezone: true, mode: 'string' }).default(sql`timezone('utc'::text, now())`).notNull(),
	currentPeriodEnd: timestamp("current_period_end", { withTimezone: true, mode: 'string' }).default(sql`timezone('utc'::text, now())`).notNull(),
	endedAt: timestamp("ended_at", { withTimezone: true, mode: 'string' }).default(sql`timezone('utc'::text, now())`),
	cancelAt: timestamp("cancel_at", { withTimezone: true, mode: 'string' }).default(sql`timezone('utc'::text, now())`),
	canceledAt: timestamp("canceled_at", { withTimezone: true, mode: 'string' }).default(sql`timezone('utc'::text, now())`),
	trialStart: timestamp("trial_start", { withTimezone: true, mode: 'string' }).default(sql`timezone('utc'::text, now())`),
	trialEnd: timestamp("trial_end", { withTimezone: true, mode: 'string' }).default(sql`timezone('utc'::text, now())`),
}, (table) => [
	foreignKey({
			columns: [table.priceId],
			foreignColumns: [prices.id],
			name: "subscriptions_price_id_fkey"
		}),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "subscriptions_user_id_fkey"
		}),
	pgPolicy("Can only view own subs data.", { as: "permissive", for: "select", to: ["public"], using: sql`(auth.uid() = user_id)` }),
]);

export const workspaces = pgTable("workspaces", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }),
	workspaceOwner: uuid("workspace_owner").notNull(),
	title: text().notNull(),
	iconId: text("icon_id").notNull(),
	data: text(),
	inTrash: text("in_trash"),
	logo: text(),
	bannerUrl: text("banner_url"),
});

export const products = pgTable("products", {
	id: text().primaryKey().notNull(),
	active: boolean(),
	name: text(),
	description: text(),
	image: text(),
	metadata: jsonb(),
}, (table) => [
	pgPolicy("Allow public read-only access.", { as: "permissive", for: "select", to: ["public"], using: sql`true` }),
]);

export const prices = pgTable("prices", {
	id: text().primaryKey().notNull(),
	productId: text("product_id"),
	active: boolean(),
	description: text(),

	unitAmount: bigint("unit_amount", { mode: "number" }),
	currency: text(),
	type: pricingType(),
	interval: pricingPlanInterval(),
	intervalCount: integer("interval_count"),
	trialPeriodDays: integer("trial_period_days"),
	metadata: jsonb(),
}, (table) => [
	foreignKey({
			columns: [table.productId],
			foreignColumns: [products.id],
			name: "prices_product_id_fkey"
		}),
	pgPolicy("Allow public read-only access.", { as: "permissive", for: "select", to: ["public"], using: sql`true` }),
	check("prices_currency_check", sql`char_length(currency) = 3`),
]);

export const projects = pgTable("projects", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: text().notNull(),
	ownerId: uuid("owner_id").notNull(),
	folderId: uuid("folder_id").notNull(),
	description: text(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`timezone('utc'::text, now())`).notNull(),
}, (table) => [
	foreignKey({
		columns: [table.ownerId],
		foreignColumns: [users.id],
		name: "projects_owner_id_fkey"
	}).onDelete("cascade"),

	foreignKey({
		columns: [table.folderId],
		foreignColumns: [folders.id],
		name: "projects_folder_id_fkey"
	}).onDelete("cascade"),
]);
