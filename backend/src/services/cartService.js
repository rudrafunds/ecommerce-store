const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const addToCart = async (item) => {
  const existing = await prisma.cartItem.findFirst({
    where: { productId: item.id }
  });

  if (existing) {
    return prisma.cartItem.update({
      where: { id: existing.id },
      data: { quantity: existing.quantity + 1 }
    });
  }

  return prisma.cartItem.create({
    data: {
      productId: item.id,
      name: item.name,
      price: item.price,
      quantity: 1
    }
  });
};

const getCart = async () => {
  return prisma.cartItem.findMany();
};

const clearCart = async () => {
  await prisma.cartItem.deleteMany({});
};

module.exports = { addToCart, getCart, clearCart };