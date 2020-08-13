# Migration `20200811150956-create-faqand-car`

This migration has been generated by rifandani at 8/11/2020, 11:09:56 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."FAQ" (
"id" SERIAL,
"question" text  NOT NULL ,
"answer" text  NOT NULL ,
"createDate" timestamp(3)  NOT NULL ,
PRIMARY KEY ("id"))

CREATE TABLE "public"."Car" (
"id" SERIAL,
"make" text  NOT NULL ,
"model" text  NOT NULL ,
"fuelType" text   ,
"details" text  NOT NULL ,
"photoUrl" text  NOT NULL ,
"year" integer   ,
"kilometers" integer   ,
"price" integer  NOT NULL ,
PRIMARY KEY ("id"))
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200811150956-create-faqand-car
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,30 @@
+// This is your Prisma schema file,
+// learn more about it in the docs: https://pris.ly/d/prisma-schema
+
+datasource db {
+  provider = "postgresql"
+  url = "***"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model FAQ {
+  id Int @id @default(autoincrement())
+  question String
+  answer String
+  createDate DateTime
+}
+
+model Car {
+  id Int @id @default(autoincrement())
+  make String
+  model String
+  fuelType String?
+  details String
+  photoUrl String
+  year Int?
+  kilometers Int?
+  price Int
+}
```

