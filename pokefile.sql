CREATE TABLE `User` (
    `code` INTEGER NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `birthday` DATETIME(3) NOT NULL,
    `hash` VARCHAR(191) NOT NULL,
    `salt` VARCHAR(191) NOT NULL,
    `avatar` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_code_key`(`code`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`code`)
) 

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
) 

CREATE TABLE `PokemonEvolution` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pokemonName` VARCHAR(191) NOT NULL,
    `pokemonEvolutionName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) 

CREATE TABLE `PokemonRegion` (
    `chance` INTEGER NOT NULL,
    `localName` VARCHAR(191) NOT NULL,
    `pokemonName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`localName`, `pokemonName`)
) 

CREATE TABLE `Image` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `path` VARCHAR(191) NOT NULL,
    `pokemonId` INTEGER NOT NULL,

    UNIQUE INDEX `Image_path_key`(`path`),
    PRIMARY KEY (`id`)
) 

CREATE TABLE `Type` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `pokemonName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) 

CREATE TABLE `Region` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `local` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Region_local_key`(`local`),
    PRIMARY KEY (`id`)
) 

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
) 

ALTER TABLE `PokemonEvolution` ADD CONSTRAINT `PokemonEvolution_pokemonName_fkey` FOREIGN KEY (`pokemonName`) REFERENCES `Pokemon`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `PokemonEvolution` ADD CONSTRAINT `PokemonEvolution_pokemonEvolutionName_fkey` FOREIGN KEY (`pokemonEvolutionName`) REFERENCES `Pokemon`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `PokemonRegion` ADD CONSTRAINT `PokemonRegion_pokemonName_fkey` FOREIGN KEY (`pokemonName`) REFERENCES `Pokemon`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `PokemonRegion` ADD CONSTRAINT `PokemonRegion_localName_fkey` FOREIGN KEY (`localName`) REFERENCES `Region`(`local`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `Image` ADD CONSTRAINT `Image_pokemonId_fkey` FOREIGN KEY (`pokemonId`) REFERENCES `Pokemon`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `Type` ADD CONSTRAINT `Type_pokemonName_fkey` FOREIGN KEY (`pokemonName`) REFERENCES `Pokemon`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `Bag` ADD CONSTRAINT `Bag_userCode_fkey` FOREIGN KEY (`userCode`) REFERENCES `User`(`code`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `Bag` ADD CONSTRAINT `Bag_pokemonId_fkey` FOREIGN KEY (`pokemonId`) REFERENCES `Pokemon`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;


INSERT INTO pokefile.Pokemon (name,weight,height,baseAttack,baseDefense,baseSpecialAttack,baseSpecialDefense,baseSpeed,baseHp) VALUES
	 ('bulbasaur',69,7,49,49,65,65,45,45),
	 ('ivysaur',130,10,62,63,80,80,60,60),
	 ('venusaur',1000,20,82,83,100,100,80,80),
	 ('charmander',85,6,52,43,60,50,65,39),
	 ('charmeleon',190,11,64,58,80,65,80,58),
	 ('charizard',905,17,84,78,109,85,100,78),
	 ('squirtle',90,5,48,65,50,64,43,44),
	 ('wartortle',225,10,63,80,65,80,58,59),
	 ('blastoise',855,16,83,100,85,105,78,79),
	 ('caterpie',29,3,30,35,20,20,45,45);
INSERT INTO pokefile.Pokemon (name,weight,height,baseAttack,baseDefense,baseSpecialAttack,baseSpecialDefense,baseSpeed,baseHp) VALUES
	 ('metapod',99,7,20,55,25,25,30,50),
	 ('butterfree',320,11,45,50,90,80,70,60),
	 ('weedle',32,3,35,30,20,20,50,40),
	 ('kakuna',100,6,25,50,25,25,35,45),
	 ('beedrill',295,10,90,40,45,80,75,65),
	 ('pidgey',18,3,45,40,35,35,56,40),
	 ('pidgeotto',300,11,60,55,50,50,71,63),
	 ('pidgeot',395,15,80,75,70,70,101,83),
	 ('rattata',35,3,56,35,25,35,72,30),
	 ('raticate',185,7,81,60,50,70,97,55);
INSERT INTO pokefile.Pokemon (name,weight,height,baseAttack,baseDefense,baseSpecialAttack,baseSpecialDefense,baseSpeed,baseHp) VALUES
	 ('spearow',20,3,60,30,31,31,70,40),
	 ('fearow',380,12,90,65,61,61,100,65),
	 ('ekans',69,20,60,44,40,54,55,35),
	 ('arbok',650,35,95,69,65,79,80,60),
	 ('pikachu',60,4,55,40,50,50,90,35),
	 ('raichu',300,8,90,55,90,80,110,60),
	 ('sandshrew',120,6,75,85,20,30,40,50),
	 ('sandslash',295,10,100,110,45,55,65,75),
	 ('nidoran-f',70,4,47,52,40,40,41,55),
	 ('nidorina',200,8,62,67,55,55,56,70);
INSERT INTO pokefile.Pokemon (name,weight,height,baseAttack,baseDefense,baseSpecialAttack,baseSpecialDefense,baseSpeed,baseHp) VALUES
	 ('nidoqueen',600,13,92,87,75,85,76,90),
	 ('nidoran-m',90,5,57,40,40,40,50,46),
	 ('nidorino',195,9,72,57,55,55,65,61),
	 ('nidoking',620,14,102,77,85,75,85,81),
	 ('clefairy',75,6,45,48,60,65,35,70),
	 ('clefable',400,13,70,73,95,90,60,95),
	 ('vulpix',99,6,41,40,50,65,65,38),
	 ('ninetales',199,11,76,75,81,100,100,73),
	 ('jigglypuff',55,5,45,20,45,25,20,115),
	 ('wigglytuff',120,10,70,45,85,50,45,140);
INSERT INTO pokefile.Pokemon (name,weight,height,baseAttack,baseDefense,baseSpecialAttack,baseSpecialDefense,baseSpeed,baseHp) VALUES
	 ('zubat',75,8,45,35,30,40,55,40),
	 ('golbat',550,16,80,70,65,75,90,75),
	 ('oddish',54,5,50,55,75,65,30,45),
	 ('gloom',86,8,65,70,85,75,40,60),
	 ('vileplume',186,12,80,85,110,90,50,75),
	 ('paras',54,3,70,55,45,55,25,35),
	 ('parasect',295,10,95,80,60,80,30,60),
	 ('venonat',300,10,55,50,40,55,45,60),
	 ('venomoth',125,15,65,60,90,75,90,70),
	 ('diglett',8,2,55,25,35,45,95,10);
INSERT INTO pokefile.Pokemon (name,weight,height,baseAttack,baseDefense,baseSpecialAttack,baseSpecialDefense,baseSpeed,baseHp) VALUES
	 ('dugtrio',333,7,100,50,50,70,120,35),
	 ('meowth',42,4,45,35,40,40,90,40),
	 ('persian',320,10,70,60,65,65,115,65),
	 ('psyduck',196,8,52,48,65,50,55,50),
	 ('golduck',766,17,82,78,95,80,85,80),
	 ('mankey',280,5,80,35,35,45,70,40),
	 ('primeape',320,10,105,60,60,70,95,65),
	 ('growlithe',190,7,70,45,70,50,60,55),
	 ('arcanine',1550,19,110,80,100,80,95,90),
	 ('poliwag',124,6,50,40,40,40,90,40);
INSERT INTO pokefile.Pokemon (name,weight,height,baseAttack,baseDefense,baseSpecialAttack,baseSpecialDefense,baseSpeed,baseHp) VALUES
	 ('poliwhirl',200,10,65,65,50,50,90,65),
	 ('poliwrath',540,13,95,95,70,90,70,90),
	 ('abra',195,9,20,15,105,55,90,25),
	 ('kadabra',565,13,35,30,120,70,105,40),
	 ('alakazam',480,15,50,45,135,95,120,55),
	 ('machop',195,8,80,50,35,35,35,70),
	 ('machoke',705,15,100,70,50,60,45,80),
	 ('machamp',1300,16,130,80,65,85,55,90),
	 ('bellsprout',40,7,75,35,70,30,40,50),
	 ('weepinbell',64,10,90,50,85,45,55,65);
INSERT INTO pokefile.Pokemon (name,weight,height,baseAttack,baseDefense,baseSpecialAttack,baseSpecialDefense,baseSpeed,baseHp) VALUES
	 ('victreebel',155,17,105,65,100,70,70,80),
	 ('tentacool',455,9,40,35,50,100,70,40),
	 ('tentacruel',550,16,70,65,80,120,100,80),
	 ('geodude',200,4,80,100,30,30,20,40),
	 ('graveler',1050,10,95,115,45,45,35,55),
	 ('golem',3000,14,120,130,55,65,45,80),
	 ('ponyta',300,10,85,55,65,65,90,50),
	 ('rapidash',950,17,100,70,80,80,105,65),
	 ('slowpoke',360,12,65,65,40,40,15,90),
	 ('slowbro',785,16,75,110,100,80,30,95);
INSERT INTO pokefile.Pokemon (name,weight,height,baseAttack,baseDefense,baseSpecialAttack,baseSpecialDefense,baseSpeed,baseHp) VALUES
	 ('magnemite',60,3,35,70,95,55,45,25),
	 ('magneton',600,10,60,95,120,70,70,50),
	 ('farfetchd',150,8,90,55,58,62,60,52),
	 ('doduo',392,14,85,45,35,35,75,35),
	 ('dodrio',852,18,110,70,60,60,110,60),
	 ('seel',900,11,45,55,45,70,45,65),
	 ('dewgong',1200,17,70,80,70,95,70,90),
	 ('grimer',300,9,80,50,40,50,25,80),
	 ('muk',300,12,105,75,65,100,50,105),
	 ('shellder',40,3,65,100,45,25,40,30);
INSERT INTO pokefile.Pokemon (name,weight,height,baseAttack,baseDefense,baseSpecialAttack,baseSpecialDefense,baseSpeed,baseHp) VALUES
	 ('cloyster',1325,15,95,180,85,45,70,50),
	 ('gastly',1,13,35,30,100,35,80,30),
	 ('haunter',1,16,50,45,115,55,95,45),
	 ('gengar',405,15,65,60,130,75,110,60),
	 ('onix',2100,88,45,160,30,45,70,35),
	 ('drowzee',324,10,48,45,43,90,42,60),
	 ('hypno',756,16,73,70,73,115,67,85),
	 ('krabby',65,4,105,90,25,25,50,30),
	 ('kingler',600,13,130,115,50,50,75,55),
	 ('voltorb',104,5,30,50,55,55,100,40);
INSERT INTO pokefile.Pokemon (name,weight,height,baseAttack,baseDefense,baseSpecialAttack,baseSpecialDefense,baseSpeed,baseHp) VALUES
	 ('electrode',666,12,50,70,80,80,150,60),
	 ('exeggcute',25,4,40,80,60,45,40,60),
	 ('exeggutor',1200,20,95,85,125,75,55,95),
	 ('cubone',65,4,50,95,40,50,35,50),
	 ('marowak',450,10,80,110,50,80,45,60),
	 ('hitmonlee',498,15,120,53,35,110,87,50),
	 ('hitmonchan',502,14,105,79,35,110,76,50),
	 ('lickitung',655,12,55,75,60,75,30,90),
	 ('koffing',10,6,65,95,60,45,35,40),
	 ('weezing',95,12,90,120,85,70,60,65);
INSERT INTO pokefile.Pokemon (name,weight,height,baseAttack,baseDefense,baseSpecialAttack,baseSpecialDefense,baseSpeed,baseHp) VALUES
	 ('rhyhorn',1150,10,85,95,30,30,25,80),
	 ('rhydon',1200,19,130,120,45,45,40,105),
	 ('chansey',346,11,5,5,35,105,50,250),
	 ('tangela',350,10,55,115,100,40,60,65),
	 ('kangaskhan',800,22,95,80,40,80,90,105),
	 ('horsea',80,4,40,70,70,25,60,30),
	 ('seadra',250,12,65,95,95,45,85,55),
	 ('goldeen',150,6,67,60,35,50,63,45),
	 ('seaking',390,13,92,65,65,80,68,80),
	 ('staryu',345,8,45,55,70,55,85,30);
INSERT INTO pokefile.Pokemon (name,weight,height,baseAttack,baseDefense,baseSpecialAttack,baseSpecialDefense,baseSpeed,baseHp) VALUES
	 ('starmie',800,11,75,85,100,85,115,60),
	 ('mr-mime',545,13,45,65,100,120,90,40),
	 ('scyther',560,15,110,80,55,80,105,70),
	 ('jynx',406,14,50,35,115,95,95,65),
	 ('electabuzz',300,11,83,57,95,85,105,65),
	 ('magmar',445,13,95,57,100,85,93,65),
	 ('pinsir',550,15,125,100,55,70,85,65),
	 ('tauros',884,14,100,95,40,70,110,75),
	 ('magikarp',100,9,10,55,15,20,80,20),
	 ('gyarados',2350,65,125,79,60,100,81,95);
INSERT INTO pokefile.Pokemon (name,weight,height,baseAttack,baseDefense,baseSpecialAttack,baseSpecialDefense,baseSpeed,baseHp) VALUES
	 ('lapras',2200,25,85,80,85,95,60,130),
	 ('ditto',40,3,48,48,48,48,48,48),
	 ('eevee',65,3,55,50,45,65,55,55),
	 ('vaporeon',290,10,65,60,110,95,65,130),
	 ('jolteon',245,8,65,60,110,95,130,65),
	 ('flareon',250,9,130,60,95,110,65,65),
	 ('porygon',365,8,60,70,85,75,40,65),
	 ('omanyte',75,4,40,100,90,55,35,35),
	 ('omastar',350,10,60,125,115,70,55,70),
	 ('kabuto',115,5,80,90,55,45,55,30);
INSERT INTO pokefile.Pokemon (name,weight,height,baseAttack,baseDefense,baseSpecialAttack,baseSpecialDefense,baseSpeed,baseHp) VALUES
	 ('kabutops',405,13,115,105,65,70,80,60),
	 ('aerodactyl',590,18,105,65,60,75,130,80),
	 ('snorlax',4600,21,110,65,65,110,30,160),
	 ('articuno',554,17,85,100,95,125,85,90),
	 ('zapdos',526,16,90,85,125,90,100,90),
	 ('moltres',600,20,100,90,125,85,90,90),
	 ('dratini',33,18,64,45,50,50,50,41),
	 ('dragonair',165,40,84,65,70,70,70,61),
	 ('dragonite',2100,22,134,95,100,100,80,91),
	 ('mewtwo',1220,20,110,90,154,90,130,106);
INSERT INTO pokefile.Pokemon (name,weight,height,baseAttack,baseDefense,baseSpecialAttack,baseSpecialDefense,baseSpeed,baseHp) VALUES
	 ('mew',40,4,100,100,100,100,100,100);

INSERT INTO pokefile.`Type` (name,pokemonName) VALUES
	 ('poison','bulbasaur'),
	 ('grass','bulbasaur'),
	 ('poison','ivysaur'),
	 ('grass','ivysaur'),
	 ('poison','venusaur'),
	 ('grass','venusaur'),
	 ('fire','charmander'),
	 ('fire','charmeleon'),
	 ('fire','charizard'),
	 ('flying','charizard');
INSERT INTO pokefile.`Type` (name,pokemonName) VALUES
	 ('water','squirtle'),
	 ('water','wartortle'),
	 ('water','blastoise'),
	 ('bug','caterpie'),
	 ('bug','metapod'),
	 ('bug','butterfree'),
	 ('flying','butterfree'),
	 ('poison','weedle'),
	 ('bug','weedle'),
	 ('bug','kakuna');
INSERT INTO pokefile.`Type` (name,pokemonName) VALUES
	 ('poison','kakuna'),
	 ('poison','beedrill'),
	 ('bug','beedrill'),
	 ('normal','pidgey'),
	 ('flying','pidgey'),
	 ('normal','pidgeotto'),
	 ('flying','pidgeotto'),
	 ('normal','pidgeot'),
	 ('flying','pidgeot'),
	 ('normal','rattata');
INSERT INTO pokefile.`Type` (name,pokemonName) VALUES
	 ('normal','raticate'),
	 ('normal','spearow'),
	 ('flying','spearow'),
	 ('flying','fearow'),
	 ('normal','fearow'),
	 ('poison','ekans'),
	 ('poison','arbok'),
	 ('electric','pikachu'),
	 ('electric','raichu'),
	 ('ground','sandshrew');
INSERT INTO pokefile.`Type` (name,pokemonName) VALUES
	 ('ground','sandslash'),
	 ('poison','nidoran-f'),
	 ('poison','nidorina'),
	 ('poison','nidoqueen'),
	 ('ground','nidoqueen'),
	 ('poison','nidoran-m'),
	 ('poison','nidorino'),
	 ('poison','nidoking'),
	 ('ground','nidoking'),
	 ('fairy','clefairy');
INSERT INTO pokefile.`Type` (name,pokemonName) VALUES
	 ('fairy','clefable'),
	 ('fire','vulpix'),
	 ('fire','ninetales'),
	 ('fairy','jigglypuff'),
	 ('normal','jigglypuff'),
	 ('normal','wigglytuff'),
	 ('fairy','wigglytuff'),
	 ('flying','zubat'),
	 ('poison','zubat'),
	 ('poison','golbat');
INSERT INTO pokefile.`Type` (name,pokemonName) VALUES
	 ('flying','golbat'),
	 ('grass','oddish'),
	 ('poison','oddish'),
	 ('grass','gloom'),
	 ('poison','gloom'),
	 ('poison','vileplume'),
	 ('grass','vileplume'),
	 ('bug','paras'),
	 ('grass','paras'),
	 ('bug','parasect');
INSERT INTO pokefile.`Type` (name,pokemonName) VALUES
	 ('grass','parasect'),
	 ('poison','venonat'),
	 ('bug','venonat'),
	 ('poison','venomoth'),
	 ('bug','venomoth'),
	 ('ground','diglett'),
	 ('ground','dugtrio'),
	 ('normal','meowth'),
	 ('normal','persian'),
	 ('water','psyduck');
INSERT INTO pokefile.`Type` (name,pokemonName) VALUES
	 ('water','golduck'),
	 ('fighting','mankey'),
	 ('fighting','primeape'),
	 ('fire','growlithe'),
	 ('fire','arcanine'),
	 ('water','poliwag'),
	 ('water','poliwhirl'),
	 ('fighting','poliwrath'),
	 ('water','poliwrath'),
	 ('psychic','abra');
INSERT INTO pokefile.`Type` (name,pokemonName) VALUES
	 ('psychic','kadabra'),
	 ('psychic','alakazam'),
	 ('fighting','machop'),
	 ('fighting','machoke'),
	 ('fighting','machamp'),
	 ('poison','bellsprout'),
	 ('grass','bellsprout'),
	 ('grass','weepinbell'),
	 ('poison','weepinbell'),
	 ('poison','victreebel');
INSERT INTO pokefile.`Type` (name,pokemonName) VALUES
	 ('grass','victreebel'),
	 ('water','tentacool'),
	 ('poison','tentacool'),
	 ('poison','tentacruel'),
	 ('water','tentacruel'),
	 ('ground','geodude'),
	 ('rock','geodude'),
	 ('rock','graveler'),
	 ('ground','graveler'),
	 ('ground','golem');
INSERT INTO pokefile.`Type` (name,pokemonName) VALUES
	 ('rock','golem'),
	 ('fire','ponyta'),
	 ('fire','rapidash'),
	 ('psychic','slowpoke'),
	 ('water','slowpoke'),
	 ('psychic','slowbro'),
	 ('water','slowbro'),
	 ('electric','magnemite'),
	 ('steel','magnemite'),
	 ('electric','magneton');
INSERT INTO pokefile.`Type` (name,pokemonName) VALUES
	 ('steel','magneton'),
	 ('flying','farfetchd'),
	 ('normal','farfetchd'),
	 ('normal','doduo'),
	 ('flying','doduo'),
	 ('flying','dodrio'),
	 ('normal','dodrio'),
	 ('water','seel'),
	 ('ice','dewgong'),
	 ('water','dewgong');
INSERT INTO pokefile.`Type` (name,pokemonName) VALUES
	 ('poison','grimer'),
	 ('poison','muk'),
	 ('water','shellder'),
	 ('ice','cloyster'),
	 ('water','cloyster'),
	 ('poison','gastly'),
	 ('ghost','gastly'),
	 ('ghost','haunter'),
	 ('poison','haunter'),
	 ('ghost','gengar');
INSERT INTO pokefile.`Type` (name,pokemonName) VALUES
	 ('poison','gengar'),
	 ('rock','onix'),
	 ('ground','onix'),
	 ('psychic','drowzee'),
	 ('psychic','hypno'),
	 ('water','krabby'),
	 ('water','kingler'),
	 ('electric','voltorb'),
	 ('electric','electrode'),
	 ('grass','exeggcute');
INSERT INTO pokefile.`Type` (name,pokemonName) VALUES
	 ('psychic','exeggcute'),
	 ('grass','exeggutor'),
	 ('psychic','exeggutor'),
	 ('ground','cubone'),
	 ('ground','marowak'),
	 ('fighting','hitmonlee'),
	 ('fighting','hitmonchan'),
	 ('normal','lickitung'),
	 ('poison','koffing'),
	 ('poison','weezing');
INSERT INTO pokefile.`Type` (name,pokemonName) VALUES
	 ('rock','rhyhorn'),
	 ('ground','rhyhorn'),
	 ('ground','rhydon'),
	 ('rock','rhydon'),
	 ('normal','chansey'),
	 ('grass','tangela'),
	 ('normal','kangaskhan'),
	 ('water','horsea'),
	 ('water','seadra'),
	 ('water','goldeen');
INSERT INTO pokefile.`Type` (name,pokemonName) VALUES
	 ('water','seaking'),
	 ('water','staryu'),
	 ('water','starmie'),
	 ('psychic','starmie'),
	 ('fairy','mr-mime'),
	 ('psychic','mr-mime'),
	 ('flying','scyther'),
	 ('bug','scyther'),
	 ('ice','jynx'),
	 ('psychic','jynx');
INSERT INTO pokefile.`Type` (name,pokemonName) VALUES
	 ('electric','electabuzz'),
	 ('fire','magmar'),
	 ('bug','pinsir'),
	 ('normal','tauros'),
	 ('water','magikarp'),
	 ('water','gyarados'),
	 ('flying','gyarados'),
	 ('water','lapras'),
	 ('ice','lapras'),
	 ('normal','ditto');
INSERT INTO pokefile.`Type` (name,pokemonName) VALUES
	 ('normal','eevee'),
	 ('water','vaporeon'),
	 ('electric','jolteon'),
	 ('fire','flareon'),
	 ('normal','porygon'),
	 ('rock','omanyte'),
	 ('water','omanyte'),
	 ('rock','omastar'),
	 ('water','omastar'),
	 ('rock','kabuto');
INSERT INTO pokefile.`Type` (name,pokemonName) VALUES
	 ('water','kabuto'),
	 ('rock','kabutops'),
	 ('water','kabutops'),
	 ('rock','aerodactyl'),
	 ('flying','aerodactyl'),
	 ('normal','snorlax'),
	 ('flying','articuno'),
	 ('ice','articuno'),
	 ('electric','zapdos'),
	 ('flying','zapdos');
INSERT INTO pokefile.`Type` (name,pokemonName) VALUES
	 ('flying','moltres'),
	 ('fire','moltres'),
	 ('dragon','dratini'),
	 ('dragon','dragonair'),
	 ('dragon','dragonite'),
	 ('flying','dragonite'),
	 ('psychic','mewtwo'),
	 ('psychic','mew');

INSERT INTO pokefile.Image (`path`,pokemonId) VALUES
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png',1),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png',1),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',1),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png',1),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/2.png',2),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/2.png',2),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png',2),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/2.png',2),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/3.png',3),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/female/3.png',3);
INSERT INTO pokefile.Image (`path`,pokemonId) VALUES
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/3.png',3),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/female/3.png',3),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png',3),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/female/3.png',3),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/3.png',3),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/female/3.png',3),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/4.png',4),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/4.png',4),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',4),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/4.png',4);
INSERT INTO pokefile.Image (`path`,pokemonId) VALUES
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/5.png',5),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/5.png',5),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png',5),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/5.png',5),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/6.png',6),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/6.png',6),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png',6),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/6.png',6),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/7.png',7),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/7.png',7);
INSERT INTO pokefile.Image (`path`,pokemonId) VALUES
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png',7),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/7.png',7),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/8.png',8),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/8.png',8),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png',8),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/8.png',8),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/9.png',9),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/9.png',9),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png',9),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/9.png',9);
INSERT INTO pokefile.Image (`path`,pokemonId) VALUES
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/10.png',10),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/10.png',10),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png',10),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/10.png',10),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/11.png',11),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/11.png',11),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/11.png',11),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/11.png',11),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/12.png',12),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/female/12.png',12);
INSERT INTO pokefile.Image (`path`,pokemonId) VALUES
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/12.png',12),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/female/12.png',12),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/12.png',12),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/female/12.png',12),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/12.png',12),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/female/12.png',12),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/13.png',13),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/13.png',13),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/13.png',13),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/13.png',13);
INSERT INTO pokefile.Image (`path`,pokemonId) VALUES
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/14.png',14),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/14.png',14),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/14.png',14),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/14.png',14),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/15.png',15),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/15.png',15),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/15.png',15),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/15.png',15),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/16.png',16),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/16.png',16);
INSERT INTO pokefile.Image (`path`,pokemonId) VALUES
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/16.png',16),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/16.png',16),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/17.png',17),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/17.png',17),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/17.png',17),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/17.png',17),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/18.png',18),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/18.png',18),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/18.png',18),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/18.png',18);
INSERT INTO pokefile.Image (`path`,pokemonId) VALUES
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/19.png',19),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/female/19.png',19),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/19.png',19),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/female/19.png',19),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/19.png',19),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/female/19.png',19),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/19.png',19),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/female/19.png',19),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/20.png',20),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/female/20.png',20);
INSERT INTO pokefile.Image (`path`,pokemonId) VALUES
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/20.png',20),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/female/20.png',20),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/20.png',20),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/female/20.png',20),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/20.png',20),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/female/20.png',20),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/21.png',21),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/21.png',21),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/21.png',21),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/21.png',21);
INSERT INTO pokefile.Image (`path`,pokemonId) VALUES
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/22.png',22),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/22.png',22),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/22.png',22),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/22.png',22),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/23.png',23),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/23.png',23),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/23.png',23),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/23.png',23),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/24.png',24),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/24.png',24);
INSERT INTO pokefile.Image (`path`,pokemonId) VALUES
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/24.png',24),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/24.png',24),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/25.png',25),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/female/25.png',25),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/25.png',25),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/female/25.png',25),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',25),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/female/25.png',25),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/25.png',25),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/female/25.png',25);
INSERT INTO pokefile.Image (`path`,pokemonId) VALUES
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/26.png',26),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/female/26.png',26),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/26.png',26),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/female/26.png',26),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/26.png',26),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/female/26.png',26),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/26.png',26),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/female/26.png',26),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/27.png',27),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/27.png',27);
INSERT INTO pokefile.Image (`path`,pokemonId) VALUES
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/27.png',27),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/27.png',27),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/28.png',28),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/28.png',28),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/28.png',28),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/28.png',28),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/29.png',29),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/29.png',29),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/29.png',29),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/29.png',29);
INSERT INTO pokefile.Image (`path`,pokemonId) VALUES
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/30.png',30),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/30.png',30),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/30.png',30),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/30.png',30),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/31.png',31),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/31.png',31),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/31.png',31),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/31.png',31),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/32.png',32),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/32.png',32);
INSERT INTO pokefile.Image (`path`,pokemonId) VALUES
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/32.png',32),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/32.png',32),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/33.png',33),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/33.png',33),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/33.png',33),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/33.png',33),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/34.png',34),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/34.png',34),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/34.png',34),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/34.png',34);
INSERT INTO pokefile.Image (`path`,pokemonId) VALUES
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/35.png',35),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/35.png',35),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/35.png',35),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/35.png',35),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/36.png',36),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/36.png',36),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/36.png',36),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/36.png',36),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/37.png',37),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/37.png',37);
INSERT INTO pokefile.Image (`path`,pokemonId) VALUES
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/37.png',37),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/37.png',37),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/38.png',38),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/38.png',38),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/38.png',38),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/38.png',38),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/39.png',39),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/39.png',39),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/39.png',39),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/39.png',39);
INSERT INTO pokefile.Image (`path`,pokemonId) VALUES
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/40.png',40),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/40.png',40),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/40.png',40),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/40.png',40),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/41.png',41),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/female/41.png',41),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/41.png',41),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/female/41.png',41),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/41.png',41),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/female/41.png',41);
INSERT INTO pokefile.Image (`path`,pokemonId) VALUES
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/41.png',41),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/female/41.png',41),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/42.png',42),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/42.png',42),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/42.png',42),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/female/42.png',42),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/42.png',42),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/female/42.png',42),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/43.png',43),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/43.png',43);
INSERT INTO pokefile.Image (`path`,pokemonId) VALUES
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/43.png',43),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/43.png',43),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/44.png',44),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/female/44.png',44),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/44.png',44),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/female/44.png',44),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/44.png',44),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/female/44.png',44),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/44.png',44),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/female/44.png',44);
INSERT INTO pokefile.Image (`path`,pokemonId) VALUES
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/45.png',45),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/female/45.png',45),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/45.png',45),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/female/45.png',45),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/45.png',45),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/female/45.png',45),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/45.png',45),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/female/45.png',45),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/46.png',46),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/46.png',46);
INSERT INTO pokefile.Image (`path`,pokemonId) VALUES
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/46.png',46),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/46.png',46),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/47.png',47),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/47.png',47),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/47.png',47),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/47.png',47),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/48.png',48),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/48.png',48),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/48.png',48),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/48.png',48);
INSERT INTO pokefile.Image (`path`,pokemonId) VALUES
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/49.png',49),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/49.png',49),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/49.png',49),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/49.png',49),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/50.png',50),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/50.png',50),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/50.png',50),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/50.png',50),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/51.png',51),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/51.png',51);
INSERT INTO pokefile.Image (`path`,pokemonId) VALUES
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/51.png',51),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/51.png',51),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/52.png',52),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/52.png',52),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/52.png',52),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/52.png',52),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/53.png',53),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/53.png',53),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/53.png',53),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/53.png',53);
INSERT INTO pokefile.Image (`path`,pokemonId) VALUES
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/54.png',54),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/54.png',54),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/54.png',54),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/54.png',54),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/55.png',55),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/55.png',55),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/55.png',55),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/55.png',55),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/56.png',56),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/56.png',56);
INSERT INTO pokefile.Image (`path`,pokemonId) VALUES
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/56.png',56),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/56.png',56),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/57.png',57),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/57.png',57),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/57.png',57),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/57.png',57),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/58.png',58),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/58.png',58),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/58.png',58),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/58.png',58);
INSERT INTO pokefile.Image (`path`,pokemonId) VALUES
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/59.png',59),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/59.png',59),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/59.png',59),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/59.png',59),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/60.png',60),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/60.png',60),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/60.png',60),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/60.png',60),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/61.png',61),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/61.png',61);
INSERT INTO pokefile.Image (`path`,pokemonId) VALUES
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/61.png',61),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/61.png',61),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/62.png',62),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/62.png',62),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/62.png',62),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/62.png',62),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/63.png',63),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/63.png',63),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/63.png',63),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/63.png',63);
INSERT INTO pokefile.Image (`path`,pokemonId) VALUES
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/64.png',64),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/female/64.png',64),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/64.png',64),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/female/64.png',64),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/64.png',64),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/female/64.png',64),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/64.png',64),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/female/64.png',64),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/65.png',65),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/female/65.png',65);
INSERT INTO pokefile.Image (`path`,pokemonId) VALUES
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/65.png',65),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/female/65.png',65),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/65.png',65),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/female/65.png',65),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/65.png',65),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/female/65.png',65),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/66.png',66),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/66.png',66),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/66.png',66),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/66.png',66);
INSERT INTO pokefile.Image (`path`,pokemonId) VALUES
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/67.png',67),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/67.png',67),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/67.png',67),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/67.png',67),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/68.png',68),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/68.png',68),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/68.png',68),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/68.png',68),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/69.png',69),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/69.png',69);
INSERT INTO pokefile.Image (`path`,pokemonId) VALUES
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/69.png',69),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/69.png',69),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/70.png',70),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/70.png',70),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/70.png',70),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/70.png',70),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/71.png',71),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/71.png',71),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/71.png',71),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/71.png',71);
INSERT INTO pokefile.Image (`path`,pokemonId) VALUES
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/72.png',72),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/72.png',72),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/72.png',72),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/72.png',72),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/73.png',73),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/73.png',73),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/73.png',73),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/73.png',73),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/74.png',74),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/74.png',74);
INSERT INTO pokefile.Image (`path`,pokemonId) VALUES
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/74.png',74),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/74.png',74),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/75.png',75),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/75.png',75),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/75.png',75),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/75.png',75),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/76.png',76),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/76.png',76),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/76.png',76),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/76.png',76);
INSERT INTO pokefile.Image (`path`,pokemonId) VALUES
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/77.png',77),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/77.png',77),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/77.png',77),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/77.png',77),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/78.png',78),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/78.png',78),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/78.png',78),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/78.png',78),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/79.png',79),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/79.png',79);
INSERT INTO pokefile.Image (`path`,pokemonId) VALUES
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/79.png',79),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/79.png',79),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/80.png',80),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/80.png',80),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/80.png',80),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/80.png',80),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/81.png',81),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/81.png',81),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/81.png',81),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/81.png',81);
INSERT INTO pokefile.Image (`path`,pokemonId) VALUES
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/82.png',82),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/82.png',82),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/82.png',82),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/82.png',82),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/83.png',83),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/83.png',83),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/83.png',83),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/83.png',83),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/84.png',84),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/female/84.png',84);
INSERT INTO pokefile.Image (`path`,pokemonId) VALUES
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/84.png',84),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/female/84.png',84),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/84.png',84),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/female/84.png',84),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/84.png',84),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/female/84.png',84),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/85.png',85),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/female/85.png',85),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/85.png',85),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/female/85.png',85);
INSERT INTO pokefile.Image (`path`,pokemonId) VALUES
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/85.png',85),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/female/85.png',85),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/85.png',85),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/female/85.png',85),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/86.png',86),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/86.png',86),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/86.png',86),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/86.png',86),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/87.png',87),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/87.png',87);
INSERT INTO pokefile.Image (`path`,pokemonId) VALUES
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/87.png',87),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/87.png',87),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/88.png',88),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/88.png',88),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/88.png',88),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/88.png',88),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/89.png',89),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/89.png',89),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/89.png',89),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/89.png',89);
INSERT INTO pokefile.Image (`path`,pokemonId) VALUES
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/90.png',90),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/90.png',90),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/90.png',90),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/90.png',90),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/91.png',91),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/91.png',91),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/91.png',91),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/91.png',91),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/92.png',92),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/92.png',92);
INSERT INTO pokefile.Image (`path`,pokemonId) VALUES
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/92.png',92),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/92.png',92),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/93.png',93),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/93.png',93),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/93.png',93),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/93.png',93),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/94.png',94),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/94.png',94),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png',94),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/94.png',94);
INSERT INTO pokefile.Image (`path`,pokemonId) VALUES
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/95.png',95),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/95.png',95),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/95.png',95),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/95.png',95),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/96.png',96),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/96.png',96),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/96.png',96),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/96.png',96),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/97.png',97),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/female/97.png',97);
INSERT INTO pokefile.Image (`path`,pokemonId) VALUES
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/97.png',97),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/female/97.png',97),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/97.png',97),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/female/97.png',97),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/97.png',97),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/female/97.png',97),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/98.png',98),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/98.png',98),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/98.png',98),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/98.png',98);
INSERT INTO pokefile.Image (`path`,pokemonId) VALUES
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/99.png',99),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/99.png',99),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/99.png',99),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/99.png',99),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/100.png',100),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/100.png',100),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/100.png',100),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/100.png',100),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/101.png',101),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/101.png',101);
INSERT INTO pokefile.Image (`path`,pokemonId) VALUES
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/101.png',101),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/101.png',101),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/102.png',102),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/102.png',102),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/102.png',102),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/102.png',102),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/103.png',103),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/103.png',103),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/103.png',103),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/103.png',103);
INSERT INTO pokefile.Image (`path`,pokemonId) VALUES
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/104.png',104),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/104.png',104),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/104.png',104),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/104.png',104),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/105.png',105),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/105.png',105),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/105.png',105),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/105.png',105),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/106.png',106),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/106.png',106);
INSERT INTO pokefile.Image (`path`,pokemonId) VALUES
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/106.png',106),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/106.png',106),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/107.png',107),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/107.png',107),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/107.png',107),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/107.png',107),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/108.png',108),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/108.png',108),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/108.png',108),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/108.png',108);
INSERT INTO pokefile.Image (`path`,pokemonId) VALUES
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/109.png',109),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/109.png',109),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/109.png',109),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/109.png',109),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/110.png',110),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/110.png',110),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/110.png',110),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/110.png',110),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/111.png',111),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/female/111.png',111);
INSERT INTO pokefile.Image (`path`,pokemonId) VALUES
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/111.png',111),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/female/111.png',111),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/111.png',111),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/female/111.png',111),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/111.png',111),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/female/111.png',111),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/112.png',112),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/female/112.png',112),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/112.png',112),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/female/112.png',112);
INSERT INTO pokefile.Image (`path`,pokemonId) VALUES
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/112.png',112),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/female/112.png',112),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/112.png',112),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/female/112.png',112),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/113.png',113),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/113.png',113),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/113.png',113),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/113.png',113),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/114.png',114),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/114.png',114);
INSERT INTO pokefile.Image (`path`,pokemonId) VALUES
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/114.png',114),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/114.png',114),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/115.png',115),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/115.png',115),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/115.png',115),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/115.png',115),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/116.png',116),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/116.png',116),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/116.png',116),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/116.png',116);
INSERT INTO pokefile.Image (`path`,pokemonId) VALUES
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/117.png',117),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/117.png',117),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/117.png',117),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/117.png',117),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/118.png',118),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/female/118.png',118),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/118.png',118),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/female/118.png',118),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/118.png',118),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/female/118.png',118);
INSERT INTO pokefile.Image (`path`,pokemonId) VALUES
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/118.png',118),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/female/118.png',118),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/119.png',119),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/female/119.png',119),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/119.png',119),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/female/119.png',119),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/119.png',119),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/female/119.png',119),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/119.png',119),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/female/119.png',119);
INSERT INTO pokefile.Image (`path`,pokemonId) VALUES
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/120.png',120),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/120.png',120),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/120.png',120),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/120.png',120),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/121.png',121),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/121.png',121),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/121.png',121),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/121.png',121),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/122.png',122),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/122.png',122);
INSERT INTO pokefile.Image (`path`,pokemonId) VALUES
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/122.png',122),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/122.png',122),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/123.png',123),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/female/123.png',123),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/123.png',123),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/female/123.png',123),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/123.png',123),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/female/123.png',123),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/123.png',123),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/female/123.png',123);
INSERT INTO pokefile.Image (`path`,pokemonId) VALUES
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/124.png',124),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/124.png',124),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/124.png',124),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/124.png',124),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/125.png',125),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/125.png',125),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/125.png',125),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/125.png',125),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/126.png',126),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/126.png',126);
INSERT INTO pokefile.Image (`path`,pokemonId) VALUES
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/126.png',126),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/126.png',126),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/127.png',127),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/127.png',127),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/127.png',127),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/127.png',127),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/128.png',128),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/128.png',128),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/128.png',128),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/128.png',128);
INSERT INTO pokefile.Image (`path`,pokemonId) VALUES
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/129.png',129),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/female/129.png',129),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/129.png',129),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/female/129.png',129),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/129.png',129),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/female/129.png',129),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/129.png',129),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/female/129.png',129),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/130.png',130),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/female/130.png',130);
INSERT INTO pokefile.Image (`path`,pokemonId) VALUES
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/130.png',130),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/female/130.png',130),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/130.png',130),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/female/130.png',130),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/130.png',130),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/female/130.png',130),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/131.png',131),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/131.png',131),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/131.png',131),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/131.png',131);
INSERT INTO pokefile.Image (`path`,pokemonId) VALUES
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/132.png',132),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/132.png',132),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png',132),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/132.png',132),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/133.png',133),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/133.png',133),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png',133),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/133.png',133),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/134.png',134),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/134.png',134);
INSERT INTO pokefile.Image (`path`,pokemonId) VALUES
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/134.png',134),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/134.png',134),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/135.png',135),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/135.png',135),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/135.png',135),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/135.png',135),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/136.png',136),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/136.png',136),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/136.png',136),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/136.png',136);
INSERT INTO pokefile.Image (`path`,pokemonId) VALUES
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/137.png',137),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/137.png',137),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/137.png',137),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/137.png',137),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/138.png',138),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/138.png',138),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/138.png',138),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/138.png',138),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/139.png',139),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/139.png',139);
INSERT INTO pokefile.Image (`path`,pokemonId) VALUES
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/139.png',139),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/139.png',139),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/140.png',140),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/140.png',140),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/140.png',140),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/140.png',140),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/141.png',141),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/141.png',141),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/141.png',141),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/141.png',141);
INSERT INTO pokefile.Image (`path`,pokemonId) VALUES
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/142.png',142),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/142.png',142),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/142.png',142),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/142.png',142),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/143.png',143),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/143.png',143),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/143.png',143),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/143.png',143),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/144.png',144),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/144.png',144);
INSERT INTO pokefile.Image (`path`,pokemonId) VALUES
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/144.png',144),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/144.png',144),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/145.png',145),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/145.png',145),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/145.png',145),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/145.png',145),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/146.png',146),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/146.png',146),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/146.png',146),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/146.png',146);
INSERT INTO pokefile.Image (`path`,pokemonId) VALUES
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/147.png',147),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/147.png',147),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/147.png',147),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/147.png',147),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/148.png',148),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/148.png',148),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/148.png',148),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/148.png',148),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/149.png',149),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/149.png',149);
INSERT INTO pokefile.Image (`path`,pokemonId) VALUES
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/149.png',149),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/149.png',149),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/150.png',150),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/150.png',150),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png',150),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/150.png',150),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/151.png',151),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/151.png',151),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/151.png',151),
	 ('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/151.png',151);

INSERT INTO pokefile.PokemonEvolution (pokemonName,pokemonEvolutionName) VALUES
	 ('bulbasaur','ivysaur'),
	 ('ivysaur','venusaur'),
	 ('charmander','charmeleon'),
	 ('charmeleon','charizard'),
	 ('squirtle','wartortle'),
	 ('wartortle','blastoise'),
	 ('caterpie','metapod'),
	 ('metapod','butterfree'),
	 ('weedle','kakuna'),
	 ('kakuna','beedrill');
INSERT INTO pokefile.PokemonEvolution (pokemonName,pokemonEvolutionName) VALUES
	 ('pidgey','pidgeotto'),
	 ('pidgeotto','pidgeot'),
	 ('rattata','raticate'),
	 ('spearow','fearow'),
	 ('ekans','arbok'),
	 ('sandshrew','sandslash'),
	 ('nidoran-f','nidorina'),
	 ('nidorina','nidoqueen'),
	 ('nidoran-m','nidorino'),
	 ('nidorino','nidoking');
INSERT INTO pokefile.PokemonEvolution (pokemonName,pokemonEvolutionName) VALUES
	 ('vulpix','ninetales'),
	 ('zubat','golbat'),
	 ('oddish','gloom'),
	 ('gloom','vileplume'),
	 ('paras','parasect'),
	 ('venonat','venomoth'),
	 ('diglett','dugtrio'),
	 ('meowth','persian'),
	 ('psyduck','golduck'),
	 ('mankey','primeape');
INSERT INTO pokefile.PokemonEvolution (pokemonName,pokemonEvolutionName) VALUES
	 ('growlithe','arcanine'),
	 ('poliwag','poliwhirl'),
	 ('poliwhirl','poliwrath'),
	 ('abra','kadabra'),
	 ('kadabra','alakazam'),
	 ('machop','machoke'),
	 ('machoke','machamp'),
	 ('bellsprout','weepinbell'),
	 ('weepinbell','victreebel'),
	 ('tentacool','tentacruel');
INSERT INTO pokefile.PokemonEvolution (pokemonName,pokemonEvolutionName) VALUES
	 ('geodude','graveler'),
	 ('graveler','golem'),
	 ('ponyta','rapidash'),
	 ('slowpoke','slowbro'),
	 ('magnemite','magneton'),
	 ('doduo','dodrio'),
	 ('seel','dewgong'),
	 ('grimer','muk'),
	 ('shellder','cloyster'),
	 ('gastly','haunter');
INSERT INTO pokefile.PokemonEvolution (pokemonName,pokemonEvolutionName) VALUES
	 ('haunter','gengar'),
	 ('drowzee','hypno'),
	 ('krabby','kingler'),
	 ('voltorb','electrode'),
	 ('exeggcute','exeggutor'),
	 ('cubone','marowak'),
	 ('koffing','weezing'),
	 ('rhyhorn','rhydon'),
	 ('horsea','seadra'),
	 ('goldeen','seaking');
INSERT INTO pokefile.PokemonEvolution (pokemonName,pokemonEvolutionName) VALUES
	 ('staryu','starmie'),
	 ('magikarp','gyarados'),
	 ('eevee','vaporeon'),
	 ('eevee','jolteon'),
	 ('eevee','flareon'),
	 ('omanyte','omastar'),
	 ('kabuto','kabutops'),
	 ('dratini','dragonair'),
	 ('dragonair','dragonite');
	 
INSERT INTO pokefile.Region (name,`local`) VALUES
	 ('kanto','celadon-city'),
	 ('kanto','cerulean-city'),
	 ('kanto','cinnabar-island'),
	 ('kanto','digletts-cave'),
	 ('kanto','fuchsia-city'),
	 ('kanto','mt-moon'),
	 ('kanto','pallet-town'),
	 ('kanto','rock-tunnel'),
	 ('kanto','kanto-route-1'),
	 ('kanto','kanto-route-10');
INSERT INTO pokefile.Region (name,`local`) VALUES
	 ('kanto','kanto-route-11'),
	 ('kanto','kanto-route-12'),
	 ('kanto','kanto-route-13'),
	 ('kanto','kanto-route-14'),
	 ('kanto','kanto-route-15'),
	 ('kanto','kanto-route-16'),
	 ('kanto','kanto-route-17'),
	 ('kanto','kanto-route-18'),
	 ('kanto','kanto-sea-route-19'),
	 ('kanto','kanto-route-2');
INSERT INTO pokefile.Region (name,`local`) VALUES
	 ('kanto','kanto-sea-route-20'),
	 ('kanto','kanto-sea-route-21'),
	 ('kanto','kanto-route-22'),
	 ('kanto','kanto-route-24'),
	 ('kanto','kanto-route-25'),
	 ('kanto','kanto-route-26'),
	 ('kanto','kanto-route-27'),
	 ('kanto','kanto-route-28'),
	 ('kanto','kanto-route-3'),
	 ('kanto','kanto-route-4');
INSERT INTO pokefile.Region (name,`local`) VALUES
	 ('kanto','kanto-route-5'),
	 ('kanto','kanto-route-6'),
	 ('kanto','kanto-route-7'),
	 ('kanto','kanto-route-8'),
	 ('kanto','kanto-route-9'),
	 ('kanto','seafoam-islands'),
	 ('kanto','cerulean-cave'),
	 ('kanto','vermilion-city'),
	 ('kanto','kanto-victory-road-1'),
	 ('kanto','viridian-city');
INSERT INTO pokefile.Region (name,`local`) VALUES
	 ('kanto','viridian-forest'),
	 ('kanto','kanto-route-23'),
	 ('kanto','power-plant'),
	 ('kanto','kanto-victory-road-2'),
	 ('kanto','pokemon-tower'),
	 ('kanto','pokemon-mansion'),
	 ('kanto','kanto-safari-zone'),
	 ('kanto','pewter-city'),
	 ('kanto','lavender-town'),
	 ('kanto','indigo-plateau');
INSERT INTO pokefile.Region (name,`local`) VALUES
	 ('kanto','saffron-city'),
	 ('kanto','monean-chamber'),
	 ('kanto','liptoo-chamber'),
	 ('kanto','weepth-chamber'),
	 ('kanto','dilford-chamber'),
	 ('kanto','scufib-chamber'),
	 ('kanto','rixy-chamber'),
	 ('kanto','viapos-chamber'),
	 ('kanto','ss-anne'),
	 ('kanto','mt-ember');
INSERT INTO pokefile.Region (name,`local`) VALUES
	 ('kanto','berry-forest'),
	 ('kanto','icefall-cave'),
	 ('kanto','pattern-bush'),
	 ('kanto','lost-cave'),
	 ('kanto','kindle-road'),
	 ('kanto','treasure-beach'),
	 ('kanto','cape-brink'),
	 ('kanto','bond-bridge'),
	 ('kanto','three-isle-port'),
	 ('kanto','resort-gorgeous');
INSERT INTO pokefile.Region (name,`local`) VALUES
	 ('kanto','water-labyrinth'),
	 ('kanto','five-isle-meadow'),
	 ('kanto','memorial-pillar'),
	 ('kanto','outcast-island'),
	 ('kanto','green-path'),
	 ('kanto','water-path'),
	 ('kanto','ruin-valley'),
	 ('kanto','trainer-tower'),
	 ('kanto','canyon-entrance'),
	 ('kanto','sevault-canyon');
INSERT INTO pokefile.Region (name,`local`) VALUES
	 ('kanto','tanoby-ruins'),
	 ('kanto','one-island'),
	 ('kanto','four-island'),
	 ('kanto','five-island'),
	 ('kanto','kanto-altering-cave'),
	 ('kanto','roaming-kanto'),
	 ('kanto','two-island'),
	 ('kanto','three-island'),
	 ('kanto','three-isle-path'),
	 ('kanto','six-island');
INSERT INTO pokefile.Region (name,`local`) VALUES
	 ('kanto','seven-island'),
	 ('kanto','birth-island'),
	 ('kanto','navel-rock');
	 
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (10,'berry-forest','bellsprout'),
	 (10,'berry-forest','drowzee'),
	 (5,'berry-forest','exeggcute'),
	 (20,'berry-forest','gloom'),
	 (60,'berry-forest','goldeen'),
	 (4,'berry-forest','golduck'),
	 (15,'berry-forest','gyarados'),
	 (4,'berry-forest','hypno'),
	 (20,'berry-forest','magikarp'),
	 (10,'berry-forest','oddish');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (20,'berry-forest','pidgeotto'),
	 (10,'berry-forest','pidgey'),
	 (20,'berry-forest','poliwag'),
	 (4,'berry-forest','psyduck'),
	 (40,'berry-forest','seaking'),
	 (4,'berry-forest','slowbro'),
	 (4,'berry-forest','slowpoke'),
	 (4,'berry-forest','venomoth'),
	 (10,'berry-forest','venonat'),
	 (20,'berry-forest','weepinbell');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (20,'bond-bridge','bellsprout'),
	 (10,'bond-bridge','gloom'),
	 (15,'bond-bridge','gyarados'),
	 (60,'bond-bridge','horsea'),
	 (4,'bond-bridge','kingler'),
	 (60,'bond-bridge','krabby'),
	 (20,'bond-bridge','magikarp'),
	 (10,'bond-bridge','meowth'),
	 (20,'bond-bridge','oddish'),
	 (4,'bond-bridge','persian');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (10,'bond-bridge','pidgeotto'),
	 (20,'bond-bridge','pidgey'),
	 (1,'bond-bridge','psyduck'),
	 (4,'bond-bridge','seadra'),
	 (1,'bond-bridge','slowpoke'),
	 (60,'bond-bridge','tentacool'),
	 (4,'bond-bridge','tentacruel'),
	 (5,'bond-bridge','venonat'),
	 (10,'bond-bridge','weepinbell'),
	 (10,'canyon-entrance','fearow');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (10,'canyon-entrance','meowth'),
	 (4,'canyon-entrance','persian'),
	 (5,'canyon-entrance','psyduck'),
	 (5,'canyon-entrance','slowpoke'),
	 (20,'canyon-entrance','spearow'),
	 (20,'cape-brink','bellsprout'),
	 (10,'cape-brink','fearow'),
	 (10,'cape-brink','gloom'),
	 (20,'cape-brink','goldeen'),
	 (4,'cape-brink','golduck');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (15,'cape-brink','gyarados'),
	 (20,'cape-brink','magikarp'),
	 (10,'cape-brink','meowth'),
	 (20,'cape-brink','oddish'),
	 (4,'cape-brink','persian'),
	 (60,'cape-brink','poliwag'),
	 (40,'cape-brink','poliwhirl'),
	 (4,'cape-brink','psyduck'),
	 (4,'cape-brink','slowbro'),
	 (4,'cape-brink','slowpoke');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (20,'cape-brink','spearow'),
	 (10,'cape-brink','weepinbell'),
	 (50,'celadon-city','goldeen'),
	 (60,'celadon-city','grimer'),
	 (1,'celadon-city','koffing'),
	 (100,'celadon-city','magikarp'),
	 (10,'celadon-city','muk'),
	 (50,'celadon-city','poliwag'),
	 (25,'celadon-city','poliwhirl'),
	 (60,'celadon-city','psyduck');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (17,'celadon-city','slowpoke'),
	 (100,'cerulean-city','bulbasaur'),
	 (50,'cerulean-city','goldeen'),
	 (15,'cerulean-city','gyarados'),
	 (60,'cerulean-city','horsea'),
	 (8,'cerulean-city','krabby'),
	 (100,'cerulean-city','magikarp'),
	 (50,'cerulean-city','poliwag'),
	 (25,'cerulean-city','psyduck'),
	 (20,'cerulean-city','seaking');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (1,'cerulean-city','slowpoke'),
	 (60,'cerulean-city','tentacool'),
	 (50,'cinnabar-island','goldeen'),
	 (15,'cinnabar-island','gyarados'),
	 (8,'cinnabar-island','horsea'),
	 (20,'cinnabar-island','krabby'),
	 (100,'cinnabar-island','magikarp'),
	 (50,'cinnabar-island','poliwag'),
	 (1,'cinnabar-island','psyduck'),
	 (4,'cinnabar-island','seadra');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (17,'cinnabar-island','shellder'),
	 (4,'cinnabar-island','slowbro'),
	 (1,'cinnabar-island','slowpoke'),
	 (25,'cinnabar-island','staryu'),
	 (30,'cinnabar-island','tentacool'),
	 (20,'cinnabar-island','tentacruel'),
	 (20,'digletts-cave','diglett'),
	 (4,'digletts-cave','dugtrio'),
	 (15,'five-island','gyarados'),
	 (60,'five-island','horsea');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (4,'five-island','kingler'),
	 (60,'five-island','krabby'),
	 (20,'five-island','magikarp'),
	 (1,'five-island','psyduck'),
	 (4,'five-island','seadra'),
	 (40,'five-island','shellder'),
	 (1,'five-island','slowpoke'),
	 (40,'five-island','staryu'),
	 (60,'five-island','tentacool'),
	 (4,'five-island','tentacruel');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (15,'five-isle-meadow','gyarados'),
	 (60,'five-isle-meadow','horsea'),
	 (4,'five-isle-meadow','kingler'),
	 (60,'five-isle-meadow','krabby'),
	 (20,'five-isle-meadow','magikarp'),
	 (10,'five-isle-meadow','meowth'),
	 (4,'five-isle-meadow','persian'),
	 (10,'five-isle-meadow','pidgeotto'),
	 (20,'five-isle-meadow','pidgey'),
	 (1,'five-isle-meadow','psyduck');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (4,'five-isle-meadow','seadra'),
	 (1,'five-isle-meadow','slowpoke'),
	 (60,'five-isle-meadow','tentacool'),
	 (4,'five-isle-meadow','tentacruel'),
	 (20,'four-island','goldeen'),
	 (15,'four-island','gyarados'),
	 (20,'four-island','magikarp'),
	 (60,'four-island','poliwag'),
	 (40,'four-island','poliwhirl'),
	 (4,'four-island','psyduck');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (4,'four-island','slowpoke'),
	 (50,'fuchsia-city','goldeen'),
	 (10,'fuchsia-city','gyarados'),
	 (8,'fuchsia-city','krabby'),
	 (100,'fuchsia-city','magikarp'),
	 (50,'fuchsia-city','poliwag'),
	 (4,'fuchsia-city','psyduck'),
	 (25,'fuchsia-city','seaking'),
	 (4,'fuchsia-city','slowpoke'),
	 (15,'green-path','gyarados');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (60,'green-path','horsea'),
	 (4,'green-path','kingler'),
	 (60,'green-path','krabby'),
	 (20,'green-path','magikarp'),
	 (1,'green-path','psyduck'),
	 (4,'green-path','seadra'),
	 (1,'green-path','slowpoke'),
	 (60,'green-path','tentacool'),
	 (4,'green-path','tentacruel'),
	 (20,'kanto-route-1','pidgey');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (5,'kanto-route-1','raticate'),
	 (20,'kanto-route-1','rattata'),
	 (10,'kanto-route-10','ekans'),
	 (5,'kanto-route-10','electabuzz'),
	 (10,'kanto-route-10','fearow'),
	 (50,'kanto-route-10','goldeen'),
	 (15,'kanto-route-10','gyarados'),
	 (20,'kanto-route-10','horsea'),
	 (10,'kanto-route-10','kingler'),
	 (40,'kanto-route-10','krabby');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (4,'kanto-route-10','machop'),
	 (100,'kanto-route-10','magikarp'),
	 (20,'kanto-route-10','magnemite'),
	 (5,'kanto-route-10','marowak'),
	 (10,'kanto-route-10','nidoran-f'),
	 (10,'kanto-route-10','nidoran-m'),
	 (50,'kanto-route-10','poliwag'),
	 (25,'kanto-route-10','poliwhirl'),
	 (1,'kanto-route-10','psyduck'),
	 (5,'kanto-route-10','raticate');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (20,'kanto-route-10','rattata'),
	 (10,'kanto-route-10','sandshrew'),
	 (10,'kanto-route-10','seaking'),
	 (17,'kanto-route-10','slowpoke'),
	 (20,'kanto-route-10','spearow'),
	 (60,'kanto-route-10','tentacool'),
	 (10,'kanto-route-10','venomoth'),
	 (30,'kanto-route-10','venonat'),
	 (20,'kanto-route-10','voltorb'),
	 (100,'kanto-route-10','zapdos');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (5,'kanto-route-10','zubat'),
	 (10,'kanto-route-11','drowzee'),
	 (20,'kanto-route-11','ekans'),
	 (50,'kanto-route-11','goldeen'),
	 (15,'kanto-route-11','gyarados'),
	 (10,'kanto-route-11','horsea'),
	 (5,'kanto-route-11','hypno'),
	 (25,'kanto-route-11','krabby'),
	 (100,'kanto-route-11','magikarp'),
	 (20,'kanto-route-11','magnemite');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (30,'kanto-route-11','meowth'),
	 (5,'kanto-route-11','pidgeotto'),
	 (20,'kanto-route-11','pidgey'),
	 (50,'kanto-route-11','poliwag'),
	 (1,'kanto-route-11','psyduck'),
	 (1,'kanto-route-11','raticate'),
	 (20,'kanto-route-11','rattata'),
	 (20,'kanto-route-11','sandshrew'),
	 (17,'kanto-route-11','shellder'),
	 (1,'kanto-route-11','slowpoke');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (100,'kanto-route-11','snorlax'),
	 (20,'kanto-route-11','spearow'),
	 (40,'kanto-route-11','tentacool'),
	 (20,'kanto-route-12','bellsprout'),
	 (4,'kanto-route-12','farfetchd'),
	 (4,'kanto-route-12','gloom'),
	 (50,'kanto-route-12','goldeen'),
	 (15,'kanto-route-12','gyarados'),
	 (40,'kanto-route-12','horsea'),
	 (8,'kanto-route-12','krabby');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (100,'kanto-route-12','magikarp'),
	 (20,'kanto-route-12','oddish'),
	 (10,'kanto-route-12','pidgeotto'),
	 (20,'kanto-route-12','pidgey'),
	 (50,'kanto-route-12','poliwag'),
	 (1,'kanto-route-12','psyduck'),
	 (20,'kanto-route-12','seadra'),
	 (4,'kanto-route-12','slowbro'),
	 (20,'kanto-route-12','slowpoke'),
	 (100,'kanto-route-12','snorlax');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (25,'kanto-route-12','tentacool'),
	 (10,'kanto-route-12','tentacruel'),
	 (10,'kanto-route-12','venonat'),
	 (4,'kanto-route-12','weepinbell'),
	 (20,'kanto-route-13','bellsprout'),
	 (1,'kanto-route-13','chansey'),
	 (5,'kanto-route-13','ditto'),
	 (4,'kanto-route-13','farfetchd'),
	 (4,'kanto-route-13','gloom'),
	 (50,'kanto-route-13','goldeen');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (15,'kanto-route-13','gyarados'),
	 (40,'kanto-route-13','horsea'),
	 (8,'kanto-route-13','krabby'),
	 (100,'kanto-route-13','magikarp'),
	 (30,'kanto-route-13','nidorina'),
	 (30,'kanto-route-13','nidorino'),
	 (20,'kanto-route-13','oddish'),
	 (15,'kanto-route-13','pidgeotto'),
	 (20,'kanto-route-13','pidgey'),
	 (50,'kanto-route-13','poliwag');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (1,'kanto-route-13','psyduck'),
	 (10,'kanto-route-13','seadra'),
	 (4,'kanto-route-13','slowbro'),
	 (20,'kanto-route-13','slowpoke'),
	 (25,'kanto-route-13','tentacool'),
	 (10,'kanto-route-13','tentacruel'),
	 (10,'kanto-route-13','venomoth'),
	 (10,'kanto-route-13','venonat'),
	 (4,'kanto-route-13','weepinbell'),
	 (20,'kanto-route-14','bellsprout');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (1,'kanto-route-14','chansey'),
	 (15,'kanto-route-14','ditto'),
	 (5,'kanto-route-14','gloom'),
	 (30,'kanto-route-14','nidorina'),
	 (30,'kanto-route-14','nidorino'),
	 (20,'kanto-route-14','oddish'),
	 (4,'kanto-route-14','pidgeotto'),
	 (20,'kanto-route-14','pidgey'),
	 (1,'kanto-route-14','venomoth'),
	 (10,'kanto-route-14','venonat');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (5,'kanto-route-14','weepinbell'),
	 (20,'kanto-route-15','bellsprout'),
	 (1,'kanto-route-15','chansey'),
	 (20,'kanto-route-15','ditto'),
	 (5,'kanto-route-15','gloom'),
	 (30,'kanto-route-15','nidorina'),
	 (30,'kanto-route-15','nidorino'),
	 (20,'kanto-route-15','oddish'),
	 (4,'kanto-route-15','pidgeotto'),
	 (15,'kanto-route-15','pidgey');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (1,'kanto-route-15','venomoth'),
	 (10,'kanto-route-15','venonat'),
	 (5,'kanto-route-15','weepinbell'),
	 (10,'kanto-route-16','doduo'),
	 (5,'kanto-route-16','fearow'),
	 (30,'kanto-route-16','grimer'),
	 (4,'kanto-route-16','muk'),
	 (4,'kanto-route-16','raticate'),
	 (15,'kanto-route-16','rattata'),
	 (100,'kanto-route-16','snorlax');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (20,'kanto-route-16','spearow'),
	 (1,'kanto-route-17','dodrio'),
	 (10,'kanto-route-17','doduo'),
	 (4,'kanto-route-17','fearow'),
	 (50,'kanto-route-17','goldeen'),
	 (20,'kanto-route-17','grimer'),
	 (8,'kanto-route-17','krabby'),
	 (100,'kanto-route-17','magikarp'),
	 (4,'kanto-route-17','muk'),
	 (50,'kanto-route-17','poliwag');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (10,'kanto-route-17','ponyta'),
	 (15,'kanto-route-17','raticate'),
	 (4,'kanto-route-17','rattata'),
	 (20,'kanto-route-17','shellder'),
	 (20,'kanto-route-17','spearow'),
	 (25,'kanto-route-17','tentacool'),
	 (10,'kanto-route-18','doduo'),
	 (10,'kanto-route-18','fearow'),
	 (50,'kanto-route-18','goldeen'),
	 (30,'kanto-route-18','grimer');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (8,'kanto-route-18','krabby'),
	 (100,'kanto-route-18','magikarp'),
	 (4,'kanto-route-18','muk'),
	 (50,'kanto-route-18','poliwag'),
	 (15,'kanto-route-18','raticate'),
	 (15,'kanto-route-18','rattata'),
	 (30,'kanto-route-18','shellder'),
	 (20,'kanto-route-18','spearow'),
	 (25,'kanto-route-18','tentacool'),
	 (10,'kanto-route-22','doduo');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (4,'kanto-route-22','fearow'),
	 (50,'kanto-route-22','goldeen'),
	 (15,'kanto-route-22','gyarados'),
	 (100,'kanto-route-22','magikarp'),
	 (15,'kanto-route-22','mankey'),
	 (4,'kanto-route-22','nidoran-f'),
	 (20,'kanto-route-22','nidoran-m'),
	 (50,'kanto-route-22','poliwag'),
	 (10,'kanto-route-22','poliwhirl'),
	 (5,'kanto-route-22','ponyta');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (4,'kanto-route-22','psyduck'),
	 (20,'kanto-route-22','rattata'),
	 (4,'kanto-route-22','slowpoke'),
	 (5,'kanto-route-22','spearow'),
	 (5,'kanto-route-23','arbok'),
	 (20,'kanto-route-23','ditto'),
	 (20,'kanto-route-23','ekans'),
	 (10,'kanto-route-23','fearow'),
	 (50,'kanto-route-23','goldeen'),
	 (15,'kanto-route-23','gyarados');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (17,'kanto-route-23','kingler'),
	 (100,'kanto-route-23','magikarp'),
	 (15,'kanto-route-23','mankey'),
	 (20,'kanto-route-23','nidorina'),
	 (20,'kanto-route-23','nidorino'),
	 (50,'kanto-route-23','poliwag'),
	 (20,'kanto-route-23','poliwhirl'),
	 (4,'kanto-route-23','primeape'),
	 (4,'kanto-route-23','psyduck'),
	 (20,'kanto-route-23','sandshrew');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (5,'kanto-route-23','sandslash'),
	 (25,'kanto-route-23','seadra'),
	 (8,'kanto-route-23','seaking'),
	 (25,'kanto-route-23','slowbro'),
	 (4,'kanto-route-23','slowpoke'),
	 (15,'kanto-route-23','spearow'),
	 (10,'kanto-route-24','abra'),
	 (10,'kanto-route-24','bellsprout'),
	 (4,'kanto-route-24','butterfree'),
	 (20,'kanto-route-24','caterpie');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (100,'kanto-route-24','charmander'),
	 (4,'kanto-route-24','gloom'),
	 (50,'kanto-route-24','goldeen'),
	 (15,'kanto-route-24','gyarados'),
	 (60,'kanto-route-24','horsea'),
	 (20,'kanto-route-24','kakuna'),
	 (8,'kanto-route-24','krabby'),
	 (100,'kanto-route-24','magikarp'),
	 (20,'kanto-route-24','metapod'),
	 (10,'kanto-route-24','oddish');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (1,'kanto-route-24','pidgeotto'),
	 (15,'kanto-route-24','pidgey'),
	 (50,'kanto-route-24','poliwag'),
	 (25,'kanto-route-24','psyduck'),
	 (10,'kanto-route-24','seaking'),
	 (1,'kanto-route-24','slowpoke'),
	 (60,'kanto-route-24','tentacool'),
	 (4,'kanto-route-24','venomoth'),
	 (5,'kanto-route-24','venonat'),
	 (20,'kanto-route-24','weedle');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (10,'kanto-route-24','weepinbell'),
	 (10,'kanto-route-25','abra'),
	 (10,'kanto-route-25','bellsprout'),
	 (4,'kanto-route-25','butterfree'),
	 (1,'kanto-route-25','caterpie'),
	 (50,'kanto-route-25','goldeen'),
	 (15,'kanto-route-25','gyarados'),
	 (20,'kanto-route-25','kakuna'),
	 (20,'kanto-route-25','kingler'),
	 (8,'kanto-route-25','krabby');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (100,'kanto-route-25','magikarp'),
	 (4,'kanto-route-25','metapod'),
	 (10,'kanto-route-25','oddish'),
	 (1,'kanto-route-25','pidgeotto'),
	 (15,'kanto-route-25','pidgey'),
	 (50,'kanto-route-25','poliwag'),
	 (40,'kanto-route-25','poliwhirl'),
	 (25,'kanto-route-25','psyduck'),
	 (10,'kanto-route-25','seaking'),
	 (4,'kanto-route-25','slowpoke');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (20,'kanto-route-25','venomoth'),
	 (5,'kanto-route-25','venonat'),
	 (20,'kanto-route-25','weedle'),
	 (4,'kanto-route-25','weepinbell'),
	 (4,'kanto-route-26','arbok'),
	 (5,'kanto-route-26','beedrill'),
	 (5,'kanto-route-26','butterfree'),
	 (50,'kanto-route-26','caterpie'),
	 (4,'kanto-route-26','dodrio'),
	 (30,'kanto-route-26','doduo');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (15,'kanto-route-26','ekans'),
	 (10,'kanto-route-26','exeggcute'),
	 (15,'kanto-route-26','kakuna'),
	 (70,'kanto-route-26','magikarp'),
	 (15,'kanto-route-26','metapod'),
	 (20,'kanto-route-26','ponyta'),
	 (5,'kanto-route-26','raticate'),
	 (30,'kanto-route-26','sandslash'),
	 (10,'kanto-route-26','shellder'),
	 (15,'kanto-route-26','tentacool');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (20,'kanto-route-26','tentacruel'),
	 (50,'kanto-route-26','weedle'),
	 (30,'kanto-route-27','arbok'),
	 (5,'kanto-route-27','beedrill'),
	 (5,'kanto-route-27','butterfree'),
	 (50,'kanto-route-27','caterpie'),
	 (4,'kanto-route-27','dodrio'),
	 (30,'kanto-route-27','doduo'),
	 (15,'kanto-route-27','ekans'),
	 (10,'kanto-route-27','exeggcute');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (15,'kanto-route-27','kakuna'),
	 (70,'kanto-route-27','magikarp'),
	 (15,'kanto-route-27','metapod'),
	 (5,'kanto-route-27','ponyta'),
	 (30,'kanto-route-27','raticate'),
	 (4,'kanto-route-27','sandslash'),
	 (10,'kanto-route-27','shellder'),
	 (15,'kanto-route-27','tentacool'),
	 (20,'kanto-route-27','tentacruel'),
	 (50,'kanto-route-27','weedle');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (10,'kanto-route-28','arbok'),
	 (4,'kanto-route-28','dodrio'),
	 (5,'kanto-route-28','doduo'),
	 (20,'kanto-route-28','golbat'),
	 (70,'kanto-route-28','magikarp'),
	 (15,'kanto-route-28','poliwag'),
	 (10,'kanto-route-28','poliwhirl'),
	 (30,'kanto-route-28','ponyta'),
	 (10,'kanto-route-28','rapidash'),
	 (30,'kanto-route-28','tangela');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (5,'kanto-route-3','arbok'),
	 (4,'kanto-route-3','clefairy'),
	 (20,'kanto-route-3','ekans'),
	 (5,'kanto-route-3','jigglypuff'),
	 (15,'kanto-route-3','mankey'),
	 (1,'kanto-route-3','nidoran-f'),
	 (10,'kanto-route-3','nidoran-m'),
	 (20,'kanto-route-3','pidgey'),
	 (10,'kanto-route-3','raticate'),
	 (10,'kanto-route-3','rattata');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (10,'kanto-route-3','sandshrew'),
	 (20,'kanto-route-3','spearow'),
	 (30,'kanto-route-3','zubat'),
	 (5,'kanto-route-4','arbok'),
	 (4,'kanto-route-4','clefairy'),
	 (10,'kanto-route-4','ekans'),
	 (60,'kanto-route-4','goldeen'),
	 (15,'kanto-route-4','gyarados'),
	 (60,'kanto-route-4','horsea'),
	 (10,'kanto-route-4','jigglypuff');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (20,'kanto-route-4','krabby'),
	 (20,'kanto-route-4','magikarp'),
	 (15,'kanto-route-4','mankey'),
	 (1,'kanto-route-4','psyduck'),
	 (10,'kanto-route-4','raticate'),
	 (20,'kanto-route-4','rattata'),
	 (10,'kanto-route-4','sandshrew'),
	 (10,'kanto-route-4','seaking'),
	 (1,'kanto-route-4','slowpoke'),
	 (20,'kanto-route-4','spearow');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (60,'kanto-route-4','tentacool'),
	 (30,'kanto-route-4','zubat'),
	 (15,'kanto-route-5','abra'),
	 (20,'kanto-route-5','bellsprout'),
	 (10,'kanto-route-5','gloom'),
	 (5,'kanto-route-5','jigglypuff'),
	 (10,'kanto-route-5','mankey'),
	 (10,'kanto-route-5','meowth'),
	 (20,'kanto-route-5','oddish'),
	 (5,'kanto-route-5','pidgeotto');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (20,'kanto-route-5','pidgey'),
	 (20,'kanto-route-5','rattata'),
	 (15,'kanto-route-6','abra'),
	 (20,'kanto-route-6','bellsprout'),
	 (30,'kanto-route-6','drowzee'),
	 (50,'kanto-route-6','goldeen'),
	 (4,'kanto-route-6','golduck'),
	 (15,'kanto-route-6','gyarados'),
	 (5,'kanto-route-6','jigglypuff'),
	 (25,'kanto-route-6','krabby');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (100,'kanto-route-6','magikarp'),
	 (10,'kanto-route-6','magnemite'),
	 (10,'kanto-route-6','mankey'),
	 (10,'kanto-route-6','meowth'),
	 (20,'kanto-route-6','oddish'),
	 (5,'kanto-route-6','pidgeotto'),
	 (20,'kanto-route-6','pidgey'),
	 (50,'kanto-route-6','poliwag'),
	 (40,'kanto-route-6','poliwhirl'),
	 (20,'kanto-route-6','psyduck');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (10,'kanto-route-6','raticate'),
	 (20,'kanto-route-6','rattata'),
	 (17,'kanto-route-6','shellder'),
	 (4,'kanto-route-6','slowpoke'),
	 (10,'kanto-route-7','abra'),
	 (20,'kanto-route-7','bellsprout'),
	 (5,'kanto-route-7','growlithe'),
	 (5,'kanto-route-7','jigglypuff'),
	 (15,'kanto-route-7','mankey'),
	 (15,'kanto-route-7','meowth');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (20,'kanto-route-7','oddish'),
	 (5,'kanto-route-7','persian'),
	 (10,'kanto-route-7','pidgeotto'),
	 (20,'kanto-route-7','pidgey'),
	 (10,'kanto-route-7','raticate'),
	 (15,'kanto-route-7','rattata'),
	 (30,'kanto-route-7','spearow'),
	 (5,'kanto-route-7','vulpix'),
	 (10,'kanto-route-8','abra'),
	 (15,'kanto-route-8','ekans');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (10,'kanto-route-8','growlithe'),
	 (30,'kanto-route-8','haunter'),
	 (5,'kanto-route-8','jigglypuff'),
	 (4,'kanto-route-8','kadabra'),
	 (20,'kanto-route-8','mankey'),
	 (20,'kanto-route-8','meowth'),
	 (10,'kanto-route-8','pidgeotto'),
	 (20,'kanto-route-8','pidgey'),
	 (15,'kanto-route-8','rattata'),
	 (15,'kanto-route-8','sandshrew');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (10,'kanto-route-8','vulpix'),
	 (10,'kanto-route-9','ekans'),
	 (1,'kanto-route-9','fearow'),
	 (15,'kanto-route-9','goldeen'),
	 (70,'kanto-route-9','magikarp'),
	 (30,'kanto-route-9','mankey'),
	 (4,'kanto-route-9','marowak'),
	 (20,'kanto-route-9','nidoran-f'),
	 (20,'kanto-route-9','nidoran-m'),
	 (5,'kanto-route-9','nidorina');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (5,'kanto-route-9','nidorino'),
	 (4,'kanto-route-9','primeape'),
	 (4,'kanto-route-9','raticate'),
	 (20,'kanto-route-9','rattata'),
	 (10,'kanto-route-9','sandshrew'),
	 (10,'kanto-route-9','seaking'),
	 (20,'kanto-route-9','spearow'),
	 (10,'kanto-route-9','venomoth'),
	 (30,'kanto-route-9','venonat'),
	 (5,'kanto-route-9','zubat');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (50,'kanto-sea-route-19','goldeen'),
	 (15,'kanto-sea-route-19','gyarados'),
	 (8,'kanto-sea-route-19','horsea'),
	 (10,'kanto-sea-route-19','kingler'),
	 (15,'kanto-sea-route-19','krabby'),
	 (100,'kanto-sea-route-19','magikarp'),
	 (50,'kanto-sea-route-19','poliwag'),
	 (1,'kanto-sea-route-19','psyduck'),
	 (4,'kanto-sea-route-19','seadra'),
	 (17,'kanto-sea-route-19','shellder');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (1,'kanto-sea-route-19','slowpoke'),
	 (25,'kanto-sea-route-19','staryu'),
	 (20,'kanto-sea-route-19','tentacool'),
	 (10,'kanto-sea-route-19','tentacruel'),
	 (50,'kanto-sea-route-20','goldeen'),
	 (15,'kanto-sea-route-20','gyarados'),
	 (8,'kanto-sea-route-20','horsea'),
	 (4,'kanto-sea-route-20','kingler'),
	 (20,'kanto-sea-route-20','krabby'),
	 (100,'kanto-sea-route-20','magikarp');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (50,'kanto-sea-route-20','poliwag'),
	 (1,'kanto-sea-route-20','psyduck'),
	 (4,'kanto-sea-route-20','seadra'),
	 (17,'kanto-sea-route-20','shellder'),
	 (1,'kanto-sea-route-20','slowpoke'),
	 (25,'kanto-sea-route-20','staryu'),
	 (20,'kanto-sea-route-20','tentacool'),
	 (30,'kanto-sea-route-20','tentacruel'),
	 (50,'kanto-sea-route-21','goldeen'),
	 (15,'kanto-sea-route-21','gyarados');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (8,'kanto-sea-route-21','horsea'),
	 (4,'kanto-sea-route-21','kingler'),
	 (20,'kanto-sea-route-21','krabby'),
	 (100,'kanto-sea-route-21','magikarp'),
	 (5,'kanto-sea-route-21','mr-mime'),
	 (10,'kanto-sea-route-21','pidgeotto'),
	 (20,'kanto-sea-route-21','pidgey'),
	 (50,'kanto-sea-route-21','poliwag'),
	 (1,'kanto-sea-route-21','psyduck'),
	 (15,'kanto-sea-route-21','raticate');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (20,'kanto-sea-route-21','rattata'),
	 (4,'kanto-sea-route-21','seadra'),
	 (17,'kanto-sea-route-21','shellder'),
	 (1,'kanto-sea-route-21','slowpoke'),
	 (25,'kanto-sea-route-21','staryu'),
	 (5,'kanto-sea-route-21','tangela'),
	 (20,'kanto-sea-route-21','tentacool'),
	 (10,'kanto-sea-route-21','tentacruel'),
	 (10,'kindle-road','fearow'),
	 (60,'kindle-road','geodude');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (4,'kindle-road','graveler'),
	 (15,'kindle-road','gyarados'),
	 (60,'kindle-road','horsea'),
	 (4,'kindle-road','kingler'),
	 (60,'kindle-road','krabby'),
	 (20,'kindle-road','magikarp'),
	 (10,'kindle-road','meowth'),
	 (4,'kindle-road','persian'),
	 (20,'kindle-road','ponyta'),
	 (1,'kindle-road','psyduck');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (4,'kindle-road','rapidash'),
	 (4,'kindle-road','seadra'),
	 (1,'kindle-road','slowpoke'),
	 (20,'kindle-road','spearow'),
	 (60,'kindle-road','tentacool'),
	 (4,'kindle-road','tentacruel'),
	 (15,'memorial-pillar','gyarados'),
	 (60,'memorial-pillar','horsea'),
	 (4,'memorial-pillar','kingler'),
	 (60,'memorial-pillar','krabby');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (20,'memorial-pillar','magikarp'),
	 (1,'memorial-pillar','psyduck'),
	 (4,'memorial-pillar','seadra'),
	 (1,'memorial-pillar','slowpoke'),
	 (60,'memorial-pillar','tentacool'),
	 (4,'memorial-pillar','tentacruel'),
	 (20,'mt-ember','fearow'),
	 (60,'mt-ember','geodude'),
	 (4,'mt-ember','graveler'),
	 (10,'mt-ember','machop');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (4,'mt-ember','magmar'),
	 (20,'mt-ember','ponyta'),
	 (4,'mt-ember','rapidash'),
	 (10,'mt-ember','spearow'),
	 (15,'one-island','gyarados'),
	 (60,'one-island','horsea'),
	 (4,'one-island','kingler'),
	 (60,'one-island','krabby'),
	 (20,'one-island','magikarp'),
	 (1,'one-island','psyduck');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (4,'one-island','seadra'),
	 (40,'one-island','shellder'),
	 (1,'one-island','slowpoke'),
	 (40,'one-island','staryu'),
	 (60,'one-island','tentacool'),
	 (4,'one-island','tentacruel'),
	 (15,'outcast-island','gyarados'),
	 (60,'outcast-island','horsea'),
	 (4,'outcast-island','kingler'),
	 (60,'outcast-island','krabby');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (20,'outcast-island','magikarp'),
	 (1,'outcast-island','psyduck'),
	 (4,'outcast-island','seadra'),
	 (1,'outcast-island','slowpoke'),
	 (60,'outcast-island','tentacool'),
	 (4,'outcast-island','tentacruel'),
	 (100,'pallet-town','bulbasaur'),
	 (100,'pallet-town','charmander'),
	 (50,'pallet-town','goldeen'),
	 (15,'pallet-town','gyarados');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (60,'pallet-town','horsea'),
	 (4,'pallet-town','kingler'),
	 (20,'pallet-town','krabby'),
	 (100,'pallet-town','magikarp'),
	 (100,'pallet-town','pikachu'),
	 (50,'pallet-town','poliwag'),
	 (1,'pallet-town','psyduck'),
	 (4,'pallet-town','seadra'),
	 (10,'pallet-town','shellder'),
	 (1,'pallet-town','slowpoke');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (100,'pallet-town','squirtle'),
	 (40,'pallet-town','staryu'),
	 (25,'pallet-town','tentacool'),
	 (20,'pallet-town','tentacruel'),
	 (10,'pattern-bush','caterpie'),
	 (20,'pattern-bush','kakuna'),
	 (5,'pattern-bush','metapod'),
	 (10,'pattern-bush','weedle'),
	 (4,'power-plant','electabuzz'),
	 (100,'power-plant','electrode');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (10,'power-plant','grimer'),
	 (20,'power-plant','magnemite'),
	 (5,'power-plant','magneton'),
	 (4,'power-plant','muk'),
	 (15,'power-plant','pikachu'),
	 (4,'power-plant','raichu'),
	 (20,'power-plant','voltorb'),
	 (100,'power-plant','zapdos'),
	 (15,'resort-gorgeous','gyarados'),
	 (60,'resort-gorgeous','horsea');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (4,'resort-gorgeous','kingler'),
	 (60,'resort-gorgeous','krabby'),
	 (20,'resort-gorgeous','magikarp'),
	 (1,'resort-gorgeous','psyduck'),
	 (4,'resort-gorgeous','seadra'),
	 (1,'resort-gorgeous','slowpoke'),
	 (60,'resort-gorgeous','tentacool'),
	 (4,'resort-gorgeous','tentacruel'),
	 (10,'ruin-valley','fearow'),
	 (20,'ruin-valley','goldeen');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (15,'ruin-valley','gyarados'),
	 (20,'ruin-valley','magikarp'),
	 (10,'ruin-valley','meowth'),
	 (4,'ruin-valley','persian'),
	 (60,'ruin-valley','poliwag'),
	 (40,'ruin-valley','poliwhirl'),
	 (4,'ruin-valley','psyduck'),
	 (4,'ruin-valley','slowpoke'),
	 (20,'ruin-valley','spearow'),
	 (10,'sevault-canyon','cubone');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (10,'sevault-canyon','fearow'),
	 (60,'sevault-canyon','geodude'),
	 (30,'sevault-canyon','graveler'),
	 (10,'sevault-canyon','marowak'),
	 (10,'sevault-canyon','meowth'),
	 (5,'sevault-canyon','onix'),
	 (4,'sevault-canyon','persian'),
	 (15,'ss-anne','gyarados'),
	 (60,'ss-anne','horsea'),
	 (20,'ss-anne','krabby');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (20,'ss-anne','magikarp'),
	 (1,'ss-anne','psyduck'),
	 (40,'ss-anne','shellder'),
	 (1,'ss-anne','slowpoke'),
	 (40,'ss-anne','staryu'),
	 (60,'ss-anne','tentacool'),
	 (15,'tanoby-ruins','gyarados'),
	 (60,'tanoby-ruins','horsea'),
	 (4,'tanoby-ruins','kingler'),
	 (60,'tanoby-ruins','krabby');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (20,'tanoby-ruins','magikarp'),
	 (1,'tanoby-ruins','psyduck'),
	 (4,'tanoby-ruins','seadra'),
	 (1,'tanoby-ruins','slowpoke'),
	 (60,'tanoby-ruins','tentacool'),
	 (4,'tanoby-ruins','tentacruel'),
	 (15,'trainer-tower','gyarados'),
	 (60,'trainer-tower','horsea'),
	 (4,'trainer-tower','kingler'),
	 (60,'trainer-tower','krabby');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (20,'trainer-tower','magikarp'),
	 (1,'trainer-tower','psyduck'),
	 (4,'trainer-tower','seadra'),
	 (1,'trainer-tower','slowpoke'),
	 (60,'trainer-tower','tentacool'),
	 (4,'trainer-tower','tentacruel'),
	 (10,'treasure-beach','fearow'),
	 (15,'treasure-beach','gyarados'),
	 (60,'treasure-beach','horsea'),
	 (4,'treasure-beach','kingler');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (60,'treasure-beach','krabby'),
	 (20,'treasure-beach','magikarp'),
	 (10,'treasure-beach','meowth'),
	 (4,'treasure-beach','persian'),
	 (1,'treasure-beach','psyduck'),
	 (4,'treasure-beach','seadra'),
	 (1,'treasure-beach','slowpoke'),
	 (20,'treasure-beach','spearow'),
	 (20,'treasure-beach','tangela'),
	 (60,'treasure-beach','tentacool');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (4,'treasure-beach','tentacruel'),
	 (90,'vermilion-city','diglett'),
	 (50,'vermilion-city','goldeen'),
	 (15,'vermilion-city','gyarados'),
	 (10,'vermilion-city','horsea'),
	 (25,'vermilion-city','krabby'),
	 (100,'vermilion-city','magikarp'),
	 (50,'vermilion-city','poliwag'),
	 (1,'vermilion-city','psyduck'),
	 (17,'vermilion-city','shellder');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (1,'vermilion-city','slowpoke'),
	 (100,'vermilion-city','snorlax'),
	 (100,'vermilion-city','squirtle'),
	 (40,'vermilion-city','staryu'),
	 (40,'vermilion-city','tentacool'),
	 (20,'vermilion-city','tentacruel'),
	 (50,'viridian-city','goldeen'),
	 (15,'viridian-city','gyarados'),
	 (100,'viridian-city','magikarp'),
	 (50,'viridian-city','poliwag');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (10,'viridian-city','poliwhirl'),
	 (4,'viridian-city','psyduck'),
	 (4,'viridian-city','slowpoke'),
	 (25,'viridian-city','tentacool'),
	 (5,'viridian-forest','beedrill'),
	 (5,'viridian-forest','butterfree'),
	 (5,'viridian-forest','caterpie'),
	 (20,'viridian-forest','kakuna'),
	 (5,'viridian-forest','metapod'),
	 (1,'viridian-forest','pidgeotto');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (10,'viridian-forest','pidgey'),
	 (4,'viridian-forest','pikachu'),
	 (20,'viridian-forest','weedle'),
	 (15,'water-labyrinth','gyarados'),
	 (60,'water-labyrinth','horsea'),
	 (4,'water-labyrinth','kingler'),
	 (60,'water-labyrinth','krabby'),
	 (20,'water-labyrinth','magikarp'),
	 (1,'water-labyrinth','psyduck'),
	 (4,'water-labyrinth','seadra');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (1,'water-labyrinth','slowpoke'),
	 (60,'water-labyrinth','tentacool'),
	 (4,'water-labyrinth','tentacruel'),
	 (10,'water-path','bellsprout'),
	 (10,'water-path','fearow'),
	 (5,'water-path','gloom'),
	 (15,'water-path','gyarados'),
	 (60,'water-path','horsea'),
	 (4,'water-path','kingler'),
	 (60,'water-path','krabby');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (20,'water-path','magikarp'),
	 (10,'water-path','meowth'),
	 (10,'water-path','oddish'),
	 (4,'water-path','persian'),
	 (1,'water-path','psyduck'),
	 (4,'water-path','seadra'),
	 (1,'water-path','slowpoke'),
	 (20,'water-path','spearow'),
	 (60,'water-path','tentacool'),
	 (4,'water-path','tentacruel');
INSERT INTO pokefile.PokemonRegion (chance,localName,pokemonName) VALUES
	 (5,'water-path','weepinbell');
