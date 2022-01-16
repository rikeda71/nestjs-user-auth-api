import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const SALT_ON_HASH = 10;
const prisma = new PrismaClient();

async function main() {
  const salt = bcrypt.genSaltSync(SALT_ON_HASH);
  await prisma.user.createMany({
    data: [
      { username: 'john', password: bcrypt.hashSync('changeme', salt) },
      { username: 'maria', password: bcrypt.hashSync('guess', salt) },
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
