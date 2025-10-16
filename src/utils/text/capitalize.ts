export function capitalize(val: string): string {
    return val
        .toLowerCase()
        .replace(/\s+/g, ' ')
        .replace(/(^\w{1})|(\s+\w{1})/g, (l) => l.toUpperCase());
}