export interface LogEvent {
  id: number | string;
}

export function createLogEvent(params: Partial<LogEvent>) {
  return {} as LogEvent;
}
