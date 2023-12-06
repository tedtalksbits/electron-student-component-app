// import { ipcRenderer } from 'electron';
// import { ServiceReturnType } from './config/types/service';

// export const ipcRendererWrappers = {
//   invoke: async <T>(channel: string, ...args: unknown[]): Promise<T> => {
//     return ipcRenderer.invoke(channel, ...args);
//   },
// };

// export const services: Services<unknown> = {
//   flashcard: {
//     createOne: async <T>(data: T, refetchQuery?: string): Promise<T> => {
//       return ipcRenderer.invoke<ServiceReturnType<T>>('flashcard-createOne', data, refetchQuery);
//     },
//   }
//   deck: {
//     createOne: async <T>(data: T, refetchQuery?: string): Promise<T> => {
//       return ipcRenderer.invoke('deck-createOne', data, refetchQuery);
//     },
//     deleteOne: async <T>(id: number, refetchQuery?: string): Promise<T> => {
//       return ipcRenderer.invoke('deck-deleteOne', id, refetchQuery);
//     },
//     updateOne: async <T>(
//       id: number,
//       data: T,
//       refetchQuery?: string
//     ): Promise<T> => {
//       return ipcRenderer.invoke('deck-updateOne', id, data, refetchQuery);
//     },
//   },
// };

// interface Services <T> {
//   flashcard: {
//     createOne: ServiceCreate<T>;
//     deleteOne: ServiceDelete<T>;
//     updateOne: ServiceUpdate<T>;
//   };
//   deck: {
//     createOne: ServiceCreate<T>;
//     deleteOne: ServiceDelete<T>;
//     updateOne: ServiceUpdate<T>;
//   };
// }

// type ServiceGetOne<T> = (id:number) => ServiceReturnType<T>;
// type ServiceGetById<T> = (id:number) => ServiceReturnType<T>;
// type ServiceGetAll<T> = () => ServiceReturnType<T>;
// type ServiceCreate<T> = (data:T, refetchQuery?: string) => ServiceReturnType<T>;
// type ServiceUpdate<T> = (id:number, data:T, refetchQuery?: string) => ServiceReturnType<T>;
// type ServiceDelete<T> = (id:number, refetchQuery?: string) => ServiceReturnType<T>;
