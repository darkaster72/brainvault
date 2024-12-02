export type ClientErrorMap<T> = Record<keyof T, { code: string; message: string }>;
