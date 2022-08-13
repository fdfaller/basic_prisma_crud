import { PrismaClient, Prisma } from '@prisma/client'
import { categoryList } from './seed_data'

const prisma = new PrismaClient()

async function main() {
  console.log(`Start seeding categories...`)
  for (const c of categoryList) {
    const category = await prisma.category.create({ data: c })
    console.log(`Created category with id: ${category.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
