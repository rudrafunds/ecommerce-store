const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const generateCode = () => `SAVE10-${Date.now().toString(36).toUpperCase()}`;

const createDiscountCode = async () => {
  const existing = await prisma.discountCode.findFirst({ where: { used: false } });
  if (existing) return existing;

  const code = generateCode();
  return await prisma.discountCode.create({
    data: { code, discount: 10 }
  });
};

const useDiscountCode = async (code) => {
  const discount = await prisma.discountCode.findUnique({ where: { code } });
  if (!discount || discount.used) {
    throw new Error("Invalid or already used discount code");
  }
  await prisma.discountCode.update({
    where: { id: discount.id },
    data: { used: true, usedAt: new Date() }
  });
  return discount;
};

module.exports = { createDiscountCode, useDiscountCode };