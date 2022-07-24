-- CreateTable
CREATE TABLE `User` (
    `code` INTEGER NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `birthday` DATETIME(3) NOT NULL,
    `hash` VARCHAR(191) NOT NULL,
    `salt` VARCHAR(191) NOT NULL,
    `avatar` VARCHAR(191) NOT NULL,
    `bio` VARCHAR(200) NULL,

    UNIQUE INDEX `User_code_key`(`code`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pokemon` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `weight` INTEGER NOT NULL DEFAULT 0,
    `height` INTEGER NOT NULL DEFAULT 0,
    `baseAttack` INTEGER NOT NULL DEFAULT 0,
    `baseDefense` INTEGER NOT NULL DEFAULT 0,
    `baseSpecialAttack` INTEGER NOT NULL DEFAULT 0,
    `baseSpecialDefense` INTEGER NOT NULL DEFAULT 0,
    `baseSpeed` INTEGER NOT NULL DEFAULT 0,
    `baseHp` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `Pokemon_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PokemonEvolution` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pokemonName` VARCHAR(191) NOT NULL,
    `pokemonEvolutionName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PokemonRegion` (
    `chance` INTEGER NOT NULL,
    `localName` VARCHAR(191) NOT NULL,
    `pokemonName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`localName`, `pokemonName`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Image` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `path` VARCHAR(191) NOT NULL,
    `pokemonId` INTEGER NOT NULL,

    UNIQUE INDEX `Image_path_key`(`path`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Type` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `pokemonName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Region` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `local` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Region_local_key`(`local`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Bag` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `attack` INTEGER NOT NULL,
    `defense` INTEGER NOT NULL,
    `specialAttack` INTEGER NOT NULL,
    `specialDefense` INTEGER NOT NULL,
    `hp` INTEGER NOT NULL,
    `speed` INTEGER NOT NULL,
    `level` INTEGER NOT NULL,
    `pokemonGender` CHAR(1) NOT NULL DEFAULT 'M',
    `isShiny` BOOLEAN NOT NULL DEFAULT false,
    `isTeam` BOOLEAN NOT NULL DEFAULT false,
    `isFavorite` BOOLEAN NOT NULL DEFAULT false,
    `userCode` INTEGER NOT NULL,
    `pokemonId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PokemonEvolution` ADD CONSTRAINT `PokemonEvolution_pokemonName_fkey` FOREIGN KEY (`pokemonName`) REFERENCES `Pokemon`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PokemonEvolution` ADD CONSTRAINT `PokemonEvolution_pokemonEvolutionName_fkey` FOREIGN KEY (`pokemonEvolutionName`) REFERENCES `Pokemon`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PokemonRegion` ADD CONSTRAINT `PokemonRegion_pokemonName_fkey` FOREIGN KEY (`pokemonName`) REFERENCES `Pokemon`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PokemonRegion` ADD CONSTRAINT `PokemonRegion_localName_fkey` FOREIGN KEY (`localName`) REFERENCES `Region`(`local`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_pokemonId_fkey` FOREIGN KEY (`pokemonId`) REFERENCES `Pokemon`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Type` ADD CONSTRAINT `Type_pokemonName_fkey` FOREIGN KEY (`pokemonName`) REFERENCES `Pokemon`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bag` ADD CONSTRAINT `Bag_userCode_fkey` FOREIGN KEY (`userCode`) REFERENCES `User`(`code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bag` ADD CONSTRAINT `Bag_pokemonId_fkey` FOREIGN KEY (`pokemonId`) REFERENCES `Pokemon`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
