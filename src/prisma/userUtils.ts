import prisma from "./prisma";

export const getAllUsers = async () => {
  return await prisma.user.findMany();
};

export const getUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

export const getUserById = async (id: string) => {
  return await prisma.user.findUnique({
    where: { id },
  });
};

export const deleteUserById = async (id: string) => {
  return await prisma.user.delete({
    where: { id },
  });
};

export const updateUserById = async (id: string, values: Record<string, any>) => {
  return await prisma.user.update({
    where: { id },
    data: values,
  });
};
