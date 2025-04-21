export type PageResult<T> = {
    STATUS_CODE?: number,
    STATUS_DESC?: string,
    data: T[];
    page: number;
    pageSize: number;
    total: number;
};