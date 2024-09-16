export const MAP_OBJECT_ACTION_DELETE_KEY = Symbol(
  'MAP_OBJECT_ACTION_DELETE_KEY'
);

export const mapObject = <T, TIn, TOut>(
  obj: { [index in keyof T]: TIn } & { [index: string]: TIn },
  mapFn: (
    val: TIn,
    key: keyof T,
    idx: number
  ) => TOut | typeof MAP_OBJECT_ACTION_DELETE_KEY
): { [index in keyof T]: TOut } =>
  (Object.keys(obj) as (keyof T)[]).reduce(
    (res: { [index in keyof T]: TOut }, key, idx) => {
      const mapRes = mapFn(obj[key], key, idx);
      if (mapRes !== MAP_OBJECT_ACTION_DELETE_KEY) {
        res[key] = mapRes;
      }
      return res;
    },
    {} as { [index in keyof T]: TOut }
  );

export const filterObject = <T, TValue>(
  obj: { [index in keyof T]: TValue } & { [index: string]: TValue },
  filterFn: (val: TValue, key: keyof T, idx: number) => boolean
): { [index in keyof T]: TValue } =>
  mapObject<T, TValue, TValue>(obj, (val, key, idx) =>
    filterFn(val, key, idx) ? val : MAP_OBJECT_ACTION_DELETE_KEY
  );
