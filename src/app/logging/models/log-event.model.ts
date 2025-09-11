export interface LogEvent {
  id: number;
  createdAt: Date;
  logItems: [];
  source: string;
}

export function createLogEvent(params: Partial<LogEvent>) {
  return {
    id: params.id,
    createdAt: params.createdAt ? new Date(params.createdAt) : new Date(),
    logItems: params.logItems ?? [],
    source: params.source ?? '',
  } as LogEvent;
}
