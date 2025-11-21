const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { useDiscountCode, createDiscountCode } = require('./discountService');
const { clearCart } = require('./cartService');

const createOrder = async (discountCode = null) => {
  const cart = await prisma.cartItem.findMany();
  if (cart.length === 0) throw new Error("Cart is empty");

  let discountPercent = 0;
  if (discountCode) {
    const code = await useDiscountCode(discountCode);
    discountPercent = code.discount;
  }

  const totalBefore = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const total = totalBefore * (1 - discountPercent / 100);

  const order = await prisma.order.create({
    data: {
      totalBeforeDiscount: totalBefore,
      discountApplied: discountPercent,
      total,
      discountCodeUsed: discountCode,
      items: {
        create: cart.map(i => ({
          productId: i.productId,
          name: i.name,
          price: i.price,
          quantity: i.quantity
        }))
      }
    },
    include: { items: true }
  });

  // Every 5th order → generate new code
  const count = await prisma.order.count();
  if (count % 5 === 0) {
    await createDiscountCode();
  }

  await clearCart();
  return order;
};

const getStats = async () => {
  const orders = await prisma.order.findMany({ include: { items: true } });
  const codes = await prisma.discountCode.findMany();

  const totalItems = orders.reduce((sum, o) => sum + o.items.reduce((s, i) => s + i.quantity, 0), 0);
  const revenue = orders.reduce((sum, o) => sum + o.total, 0);
  const discountGiven = orders.reduce((sum, o) => sum + (o.totalBeforeDiscount - o.total), 0);

  return {
    totalOrders: orders.length,
    totalItemsPurchased: totalItems,
    totalPurchaseAmount: revenue.toFixed(2),
    totalDiscountAmount: discountGiven.toFixed(2),
    discountCodes: codes.map(c => ({ code: c.code, used: c.used }))
  };
};

module.exports = { createOrder, getStats };