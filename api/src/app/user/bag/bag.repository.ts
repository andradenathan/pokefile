import { injectable } from "inversify";
import prismaClient from "../../../database/prisma";
import { Prisma, Bag } from "@prisma/client";

@injectable()
export class BagRepository {
  async find(code: number): Promise<Bag[] | null> {
    return await prismaClient.bag.findMany({
      include: {
        pokemon: {
          include: {
            image: true,
          },
        },
      },
      where: { userCode: code },
    });
  }

  async findPokemonInTeamByCode(userCode: number): Promise<Bag[]> {
    return await prismaClient.bag.findMany({
      include: {
        pokemon: {
          include: {
            image: true,
          },
        },
      },
      where: {
        userCode: userCode,
        isTeam: {
          equals: true,
        },
      },
    });
  }

  async findFavoritePokemonByCode(code: number): Promise<Bag | null> {
    return await prismaClient.bag.findFirst({
      include: {
        pokemon: {
          include: {
            image: true,
          },
        },
      },
      where: {
        userCode: code,
        isFavorite: true,
      },
    });
  }

  async add(data: Prisma.BagCreateInput): Promise<Bag> {
    return await prismaClient.bag.create({ data: data });
  }

  async remove(bagId: number): Promise<void> {
    await prismaClient.bag.delete({ where: { id: bagId } });
  }

  async addPokemonInTeam(userCode: number, bagId: number) {
    const countPokemonInTeam = await prismaClient.bag.count({
      where: {
        userCode: userCode,
        isTeam: {
          equals: true,
        },
      },
    });

    if (countPokemonInTeam >= 6) {
      throw new Error("You can't add more than 6 pokemon in your team");
    }

    return await prismaClient.bag.update({
      where: {
        id: bagId,
      },
      data: {
        isTeam: true,
      },
    });
  }

  async addPokemonAsFavorite(code: number, bagId: number): Promise<void> {
    const favoritePokemon = await prismaClient.bag.findFirst({
      where: {
        userCode: code,
        isFavorite: true,
      },
    });

    if (favoritePokemon) {
      await prismaClient.$queryRaw`UPDATE Bag SET isFavorite = 0 
            WHERE id = ${favoritePokemon.id} AND userCode = ${code}`;
    }

    await prismaClient.$queryRaw<Bag>`UPDATE Bag SET isFavorite = true
         WHERE userCode = ${code} AND id = ${bagId}`;
  }
}
