export const Utils = {
    clearArray<T> (array: T[]): T[] {
        return array.filter((e) => e != null)
    },
    deepClone<T> (object: T): T {
        return JSON.parse(JSON.stringify(object)) as T
    }
}
