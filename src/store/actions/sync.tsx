export enum SyncTypes {
    addRequest = '[SYNC] ADD REQUEST',
    removeRequest = '[SYNC] REMOVE REQUEST' ,

    synchronize = '[SYNC] SYNCHRONIZE',
    synchronizeSuccess = '[SYNC] SYNCHRONIZE SUCCESS',
    synchronizeFailed = '[SYNC] SYNCHRONIZE FAILED',
}

export const SyncActions = {
    addRequest: (url: string, headers: RequestInit) => ({
        type: SyncTypes.addRequest,
        payload: { url: url, headers: headers }
    }),
    removeRequest: (key: string) => ({
        type: SyncTypes.removeRequest,
        payload: { key: key }
    }),

    synchronize: () => ({
        type: SyncTypes.synchronize,
        payload: {}
    }),
    synchronizeSuccess: () => ({
        type: SyncTypes.synchronizeSuccess,
        payload: {}
    }),
    synchronizeFailed: () => ({
        type: SyncTypes.synchronizeFailed,
        payload: {}
    })
};
