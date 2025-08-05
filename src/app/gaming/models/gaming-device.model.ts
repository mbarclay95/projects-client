export interface GamingDevice {
  id: number;
  deviceCommunicationId: string;
  tempName: string | null;
  lastSeen: Date;
  buttonColor: string;
}

export function createGamingDevice(params: Partial<GamingDevice>) {
  return {
    id: params.id ?? 0,
    deviceCommunicationId: params.deviceCommunicationId ?? '',
    tempName: params.tempName ?? null,
    lastSeen: params.lastSeen ? new Date(params.lastSeen) : new Date(),
    buttonColor: params.buttonColor ?? null,
  } as GamingDevice;
}
