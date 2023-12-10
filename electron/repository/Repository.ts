// create base interface for crudRepository

type RefetchQuery = string | undefined;

export type CreateArgs<T> = [Partial<T>, RefetchQuery];
export type DeleteArgs<ID extends number | string> = [Id: ID, RefetchQuery];
export type UpdateArgs<T, ID extends number | string> = [
  Id: ID,
  Partial<T>,
  RefetchQuery
];
export type GetByIdArgs<ID extends number | string> = [Id: ID];

export interface CRUDRepository<T, ID extends number | string> {
  createOne: (...args: CreateArgs<T>) => RepositoryReturnType<T>;
  deleteOne: (...args: DeleteArgs<ID>) => RepositoryReturnType<T>;
  updateOne: (...args: UpdateArgs<T, ID>) => RepositoryReturnType<T>;
  getOne: (...args: GetByIdArgs<ID>) => RepositoryReturnType<T>;
  getAll: () => RepositoryReturnType<T>;
}

export type RepositoryReturnType<T> = Promise<{
  data: T | T[] | null;
  error: null | string;
}>;
