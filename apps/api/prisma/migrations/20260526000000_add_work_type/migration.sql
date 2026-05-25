CREATE TABLE "WorkType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "WorkType_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "WorkType_name_key" ON "WorkType"("name");
