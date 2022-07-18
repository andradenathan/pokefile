export function randomImages() {
    const images = [
        'https://i.imgur.com/yXzzZzS.jpg',
        'https://i.imgur.com/53JoOJo.jpg',
        'https://i.imgur.com/N6RGTPs.jpg',
        'https://i.imgur.com/Ddxmu75.jpg',
        'https://i.imgur.com/JYRcKZN.jpg',
        'https://i.imgur.com/eCDkWcY.jpg',
        'https://i.imgur.com/pLkB47s.jpg',
        'https://i.imgur.com/dvUC0LZ.jpg',
    ];

    const imagesLength = images.length;
    const randomIndex = Math.floor(Math.random() * imagesLength);

    return images[randomIndex];
}