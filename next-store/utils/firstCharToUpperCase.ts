export const firstCharToUpperCase = (str: string | string[] | undefined): string | undefined => {
    if (str) {
        return str[0].toUpperCase() + str.slice(1)
    }
}
