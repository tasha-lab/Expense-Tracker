-- CreateTable
CREATE TABLE "public"."Users" (
    "UserId" TEXT NOT NULL,
    "Firstname" TEXT NOT NULL,
    "Lastname" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Username" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "DateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Is deleted" BOOLEAN NOT NULL DEFAULT false,
    "Profile Update" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("UserId")
);

-- CreateTable
CREATE TABLE "public"."Expenses" (
    "ExpenseId" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "Amount" DECIMAL(65,30) NOT NULL,
    "DateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UserId" TEXT NOT NULL,
    "CategoryId" TEXT NOT NULL,

    CONSTRAINT "Expenses_pkey" PRIMARY KEY ("ExpenseId")
);

-- CreateTable
CREATE TABLE "public"."Categories" (
    "CategoryId" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "Date-Created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UserId" TEXT NOT NULL,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("CategoryId")
);

-- CreateTable
CREATE TABLE "public"."Budget" (
    "budgetID" TEXT NOT NULL,
    "Amount" DECIMAL(65,30) NOT NULL,
    "Year" TIMESTAMP(3) NOT NULL,
    "CategoryId" TEXT NOT NULL,
    "UserId" TEXT NOT NULL,

    CONSTRAINT "Budget_pkey" PRIMARY KEY ("budgetID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_Email_key" ON "public"."Users"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_Username_key" ON "public"."Users"("Username");

-- AddForeignKey
ALTER TABLE "public"."Expenses" ADD CONSTRAINT "Expenses_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "public"."Users"("UserId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Expenses" ADD CONSTRAINT "Expenses_CategoryId_fkey" FOREIGN KEY ("CategoryId") REFERENCES "public"."Categories"("CategoryId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Categories" ADD CONSTRAINT "Categories_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "public"."Users"("UserId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Budget" ADD CONSTRAINT "Budget_CategoryId_fkey" FOREIGN KEY ("CategoryId") REFERENCES "public"."Categories"("CategoryId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Budget" ADD CONSTRAINT "Budget_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "public"."Users"("UserId") ON DELETE RESTRICT ON UPDATE CASCADE;
