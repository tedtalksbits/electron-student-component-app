// create base interface for crudRepository

type RefetchQuery = string | undefined;

export type CreateArgs<T> = [t: Partial<T>, RefetchQuery: RefetchQuery];
export type DeleteArgs<Id extends number | string> = [
  Id: Id,
  RefetchQuery: RefetchQuery
];
export type UpdateArgs<T, Id extends number | string> = [
  Id: Id,
  t: Partial<T>,
  RefetchQuery: RefetchQuery
];
export type GetByIdArgs<Id extends number | string> = [Id: Id];

export interface CRUDRepository<T, ID extends number | string> {
  createOne: (...args: CreateArgs<T>) => RepositoryReturnType<T>;
  deleteOne: (...args: DeleteArgs<ID>) => RepositoryReturnType<T>;
  updateOne: (...args: UpdateArgs<T, ID>) => RepositoryReturnType<T>;
  getOne: (...args: GetByIdArgs<ID>) => RepositoryReturnType<T>;
  getAll?: () => RepositoryReturnType<T>;
}

export type RepositoryReturnType<T> = Promise<{
  data: T | T[] | null;
  error: null | string;
}>;
