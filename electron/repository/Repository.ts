// create base interface for crudRepository

export interface CRUDRepository<T, ID> {
  createOne: (data: T, refetchQuery?: string) => RepositoryReturnType<T>;
  deleteOne: (id: ID, refetchQuery?: string) => RepositoryReturnType<T>;
  updateOne: (
    id: ID,
    data: T,
    refetchQuery?: string
  ) => RepositoryReturnType<T>;
  getOne: (id: ID) => RepositoryReturnType<T>;
  getAll: () => RepositoryReturnType<T[]>;
}

export type RepositoryReturnType<T> = Promise<{
  data: T[] | null | T;
  error: null | string;
}>;
