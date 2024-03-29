import { Prisma, Pokemon, Type } from "@prisma/client";
import { injectable } from "inversify";
import prismaClient from "../../database/prisma";

@injectable()
export class PokemonRepository {
  constructor() {}

  async all(): Promise<Pokemon[]> {
    return await prismaClient.pokemon.findMany({
      include: {
        image: {
          select: {
            path: true,
          },
        },
        type: {
          select: {
            name: true,
          },
        },
        pokemon: {
          select: {
            evolution: {
              include: {
                image: true,
                pokemon: {
                  select: {
                    evolution: {
                      include: {
                        image: true,
                      }
                    },
                  }
                }
              },
            },
          },
        },
        region: {
          select: {
            localName: true,
            chance: true,
          },
        },
      },
    });
  }
  
  async find(id: number): Promise<Pokemon | null> {
    return await prismaClient.pokemon.findUnique({ where: { id: id } });
  }

  async update(id: number, data: Prisma.PokemonUpdateInput): Promise<Pokemon> {
    return await prismaClient.pokemon.update({
      where: { id: id },
      data: data,
    });
  }

  async delete(id: number): Promise<void> {
    await prismaClient.pokemon.delete({ where: { id: id } });
  }

  async pokemonTypes(): Promise<Type[] | null> {
    return await prismaClient.$queryRaw<Type[]>`
      SELECT DISTINCT name FROM Type
    `;
  }

  async getPokemonByName(name: string): Promise<Pokemon | null> {
    return await prismaClient.pokemon.findFirst({ where: { name: name } });
  }

  async search(query: string, paramType: string): Promise<Pokemon[] | null> {
    switch (paramType) {
      case "type":
        return await prismaClient.$queryRaw<Pokemon[]>`
        SELECT Type.name, 
        pokemonName, 
        baseAttack, 
        baseDefense, baseSpecialAttack, baseSpecialDefense, baseSpeed, baseHp
        FROM Type 
        RIGHT OUTER JOIN Pokemon ON Pokemon.name = Type.pokemonName 
        WHERE Type.name = ${query}`;
      case "region":
        return await prismaClient.$queryRaw<Pokemon[]>`
        SELECT name, local, pokemonName, chance FROM Region
        INNER JOIN PokemonRegion pr ON local = localName
        WHERE Region.local = ${query}`;
      case "name":
        return await prismaClient.pokemon.findMany({
          where: {
            name: {
              contains: query,
            },
          },
          include: {
            image: {
              select: {
                path: true,
              },
            },
            type: {
              select: {
                name: true,
              },
            },
            pokemon: {
              select: {
                evolution: {
                  include: {
                    image: true,
                    pokemon: {
                      select: {
                        evolution: {
                          include: {
                            image: true,
                          }
                        },
                      }
                    }
                  },
                },
              },
            },
            region: {
              select: {
                localName: true,
                chance: true,
              },
            },
          },
        });
      default:
        break;
    }
    return null;
  }
}
