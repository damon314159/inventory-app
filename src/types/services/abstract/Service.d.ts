type UnknownMethod = (...args: never) => unknown

export type Service = Record<string, UnknownMethod>
