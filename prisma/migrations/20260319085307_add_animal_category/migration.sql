-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Animal" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tagNumber" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "breed" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'rodeo',
    "dateOfBirth" DATETIME NOT NULL,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Animal" ("breed", "createdAt", "dateOfBirth", "id", "name", "notes", "status", "tagNumber", "updatedAt") SELECT "breed", "createdAt", "dateOfBirth", "id", "name", "notes", "status", "tagNumber", "updatedAt" FROM "Animal";
DROP TABLE "Animal";
ALTER TABLE "new_Animal" RENAME TO "Animal";
CREATE UNIQUE INDEX "Animal_tagNumber_key" ON "Animal"("tagNumber");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
