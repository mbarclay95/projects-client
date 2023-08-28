export interface Bank {
  id: number;
  name: string;
}

export function createBank(params: Partial<Bank>): Bank {
  return {
    id: params.id,
    name: params.name ?? ''
  } as Bank;
}
