import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

prisma.user.createMany({
  data: [
    // TODO: password hash
    { username: 'john', password: 'changeme' },
    { username: 'maria', password: 'guess' },
  ],
});
