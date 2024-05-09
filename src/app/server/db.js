import { PrismaClient } from '@prisma/client';

let prisma;

// Ensure the instance is only created once
if (!prisma) {
  prisma = new PrismaClient();
}



export async function createUserAndKey(userInfo) {
  try {
    const user = await prisma.user.create({
      data: {
        full_name: userInfo.full_name,
        image: userInfo.image || null,
        role: userInfo.role,
        status: userInfo.status || "active",
        default_Adress_lat: userInfo.default_Address.lat || null,
        default_Adress_lng: userInfo.default_Address.lng || null,
        default_time: userInfo.default_time || null,
      },
    });

    const key = await prisma.key.create({
      data: {
        userName: userInfo.userName,
        email: userInfo.email,
        user: {
          connect: { id_User: user.id_User },
        },
      },
    });

    console.log("User created:", user);
    console.log("Key created:", key);

    return { user, key };
  } catch (error) {
    console.error("Error creating user and key:", error);
    return null;
  }
}


export async function checkUserExistance(data) {
  try {
    const checkUser = await prisma.key.findFirst({
      where: {
        email: data.email,
        userName: data.userName,
      },
    });

    if (checkUser) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error checking user:", error);
    return false;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getUserRole(userData) {
  try {
    // Query the user based on email and userName
    const user = await prisma.user.findFirst({
      where: {
        key: {
          email: userData.email
        },
        AND: [
          { key: { userName: userData.userName } }
        ]
      },
      select: {
        role: true
      }
    });

    if (user) {
     return user.role;
    } else {
     return null;
    }
  } catch (error) {
    console.error('Error getting user role:', error);
    return null;
  } finally {
    await prisma.$disconnect(); // Disconnect Prisma client
  }
}