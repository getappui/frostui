export const Utils = {
    clearArray<T>(array: T[]): T[] {
        return array.filter((e)=>e!=null)
    }
}
