export type ServiceReturnType<T> = Promise<{
  data: T | null;
  error: string | null;
}>;

export interface DAOServices {
  createOne: CreateOneFunction;
  deleteOne: DeleteOneFunction;
  updateOne: UpdateOneFunction;
  getOne: GetOneFunction;
  getAll: GetAllFunction;
}

export interface DAOServicesMain {
  createOne: CreateOneWithoutEvent;
  deleteOne: DeleteOneWithoutEvent;
  updateOne: UpdateOneWithoutEvent;
  getOne: GetOneWithoutEvent;
  getAll: GetAllWithoutEvent;
}

type CreateOneFunction = (
  _event: Electron.IpcMainInvokeEvent,
  tableName: string,
  data: Record<string, unknown>
) => ServiceReturnType<unknown>;

type CreateOneWithoutEvent = (
  tableName: string,
  data: Record<string, unknown>
) => ServiceReturnType<unknown>;

type DeleteOneFunction = (
  _event: Electron.IpcMainInvokeEvent,
  tableName: string,
  id: number
) => ServiceReturnType<unknown>;

type DeleteOneWithoutEvent = (
  tableName: string,
  id: number
) => ServiceReturnType<unknown>;

type UpdateOneFunction = (
  _event: Electron.IpcMainInvokeEvent,
  tableName: string,
  id: number,
  data: Record<string, unknown>
) => ServiceReturnType<unknown>;

type UpdateOneWithoutEvent = (
  tableName: string,
  id: number,
  data: Record<string, unknown>
) => ServiceReturnType<unknown>;

type GetOneFunction = (
  _event: Electron.IpcMainInvokeEvent,
  tableName: string,
  id: number
) => ServiceReturnType<unknown>;

type GetOneWithoutEvent = (
  tableName: string,
  id: number
) => ServiceReturnType<unknown>;

type GetAllFunction = (
  _event: Electron.IpcMainInvokeEvent,
  tableName: string
) => ServiceReturnType<unknown>;

type GetAllWithoutEvent = (tableName: string) => ServiceReturnType<unknown>;
