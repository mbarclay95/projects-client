export interface NetWorthCategory {
  id: number;
  name: string;
  isActive: boolean;
  initialAmount: number;
  initialDate: Date;
  currentAmount: number;
  type: 'asset' | 'liability';
}

export function createNetWorthCategory(params: Partial<NetWorthCategory>): NetWorthCategory {
  return {
    id: params.id,
    name: params.name ?? '',
    isActive: params.isActive ?? true,
    initialAmount: Number(params.initialAmount ?? 0),
    initialDate: params.initialDate ? new Date(params.initialDate) : null,
    currentAmount: Number(params.currentAmount ?? 0),
    type: params.type ?? 'asset',
  } as NetWorthCategory;
}
