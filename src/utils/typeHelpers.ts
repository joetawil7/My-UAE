export type Intersection<T> = (
  T extends unknown ? (x: T) => unknown : never
) extends (x: infer R) => unknown
  ? R
  : never;

export const notNullOrUndefined = <T>(x: T | null | undefined): x is T => {
  return x != null;
};

export type CombineProps<T, T2> = Omit<T, keyof T2> & T2;

export type AllOrNone<T> = T | { [K in keyof T]?: never };

export type FCC<P = unknown> = React.FC<React.PropsWithChildren<P>>;

export class TypeHelper {
  public static isDefined(value: unknown) {
    return value != null;
  }

  public static areDefined(...value: unknown[]) {
    return value.every((p_value) => TypeHelper.isDefined(p_value));
  }

  public static isBoolean(value: unknown): boolean {
    return typeof value === 'boolean';
  }

  public static areBooleans(...values: unknown[]): boolean {
    return values.every((value) => TypeHelper.isBoolean(value));
  }

  public static isNumber(value: any): boolean {
    return (
      !Number.isNaN(value as number) &&
      !Number.isNaN(parseFloat(value as string))
    );
  }

  public static areNumbers(...values: unknown[]): boolean {
    return values.every((value) => TypeHelper.isNumber(value));
  }

  public static isMinNumber(value: unknown, min: number): boolean {
    return (
      TypeHelper.isNumber(value) &&
      TypeHelper.isNumber(min) &&
      (value as number) >= min
    );
  }

  public static isMaxNumber(value: unknown, max: number): boolean {
    return (
      TypeHelper.isNumber(value) &&
      TypeHelper.isNumber(max) &&
      (value as number) <= max
    );
  }

  public static isString(value: unknown): boolean {
    return typeof value === 'string' || value instanceof String;
  }

  public static areStrings(...values: unknown[]): boolean {
    return values.every((value) => TypeHelper.isString(value));
  }

  public static isNotEmptyString(value: unknown): boolean {
    return TypeHelper.isString(value) && (value as string).length > 0;
  }

  public static areNotEmptyStrings(...values: unknown[]): boolean {
    return values.every((value) => TypeHelper.isNotEmptyString(value));
  }

  public static isDate(value: unknown): boolean {
    return value instanceof Date;
  }

  public static areDates(...values: unknown[]): boolean {
    return values.every((p_value) => TypeHelper.isDate(p_value));
  }

  public static isValidDate(value: unknown): boolean {
    return TypeHelper.isDate(value) && !Number.isNaN((value as Date).getDate());
  }

  public static areValidDates(...values: unknown[]): boolean {
    return values.every((value) => TypeHelper.isValidDate(value));
  }

  public static isArray(value: unknown): boolean {
    return Array.isArray(value);
  }

  public static areArrays(...values: unknown[]): boolean {
    return values.every((value) => TypeHelper.isArray(value));
  }

  public static isNotEmptyArray(value: unknown): boolean {
    return TypeHelper.isArray(value) && (value as unknown[]).length > 0;
  }

  public static areNotEmptyArrays(...values: unknown[]): boolean {
    return values.every((value) => TypeHelper.isNotEmptyArray(value));
  }

  public static isFunction(value: unknown): boolean {
    return typeof value === 'function' || value instanceof Function;
  }

  public static areFunctions(...values: unknown[]): boolean {
    return values.every((value) => TypeHelper.isFunction(value));
  }

  public static isEnum(p_enum: object, value: unknown): boolean {
    return (
      typeof p_enum === 'object' &&
      Object.keys(p_enum).some((p_key) => (p_enum as any)[p_key] === value)
    );
  }
}
