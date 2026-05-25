import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/infrastructure/prisma/generated/client';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL is required to seed the database');
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: databaseUrl }),
});

const workTypeNames = ['Кладка перегородок', 'Монтаж опалубки'];

async function main(): Promise<void> {
  await Promise.all(
    workTypeNames.map((name) =>
      prisma.workType.upsert({
        where: { name },
        update: {},
        create: { name },
      }),
    ),
  );
}

async function seed(): Promise<void> {
  try {
    await main();
  } catch {
    console.error('Failed to seed work types');
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

void seed();
