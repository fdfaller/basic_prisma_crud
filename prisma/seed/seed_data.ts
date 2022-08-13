import { Prisma } from '@prisma/client'

export const categoryList: Prisma.CategoryCreateInput[] = [
    { name: 'Health Care' },
    { name: 'Education' },
    { name: 'Groceries' },
    { name: 'Pharmacy' },
    { name: 'Entertainment' }
]