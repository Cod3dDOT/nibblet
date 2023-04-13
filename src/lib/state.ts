export type OperationState = 'SUCCESS' | 'ERROR' | 'LOADING';
export type AppState = Omit<OperationState, 'SUCCESS'> | 'FOUND' | 'NOTFOUND';
