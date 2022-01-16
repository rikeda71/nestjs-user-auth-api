import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      // TODO: password hash
      { username: 'john', password: 'changeme' },
      { username: 'maria', password: 'guess' },
    ],
  });
}

main()
  .catch((e) => {
    console.log(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
