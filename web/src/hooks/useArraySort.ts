export const arraySort = (objects: Object[], key: string, direction: string = 'desc'): any[] => {
    return objects.sort((a: any, b: any) => {
        let keyA = a[key];
        let keyB = b[key];
        switch(direction) {
            case 'asc':
                if(keyA < keyB) return -1;
                if(keyA > keyB) return 1;
                break;
            case 'desc':
                if(keyA > keyB) return -1;
                if(keyA < keyB) return 1;
                break;
            default:
                break;       
        }
        return 0;
    });
}