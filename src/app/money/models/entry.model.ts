import { Category, createCategory } from './category.model';
import { Bank, createBank } from './bank.model';
import { createSubCategory, SubCategory } from './sub-category.model';
import { CategoryTag, createCategoryTag } from './category-tag.model';
import { createNetWorthCategory, NetWorthCategory } from './net-worth-category.model';

interface BaseEntry {
  id: number;
  dateSpent: Date | null;
  description: string | null;
  categoryTags: CategoryTag[];
  netWorthCategory: NetWorthCategory | null;
  duplicate: boolean;
}

export interface IncompleteEntry extends BaseEntry {
  bank: Bank | null;
  category: Category | null;
  subCategory: SubCategory | null;
  amount: number | null;
  completed: false;
}

export interface CompleteEntry extends BaseEntry {
  bank: Bank;
  category: Category;
  subCategory: SubCategory;
  amount: number;
  completed: true;
  saveDuplicate?: boolean;
}

export function createIncompleteEntry(params: Partial<IncompleteEntry>): IncompleteEntry {
  return {
    id: params.id,
    amount: params.amount != null && isNaN(params.amount) ? null : Number(params.amount),
    dateSpent: params.dateSpent ? new Date(params.dateSpent) : null,
    description: params.description ?? null,
    category: params.category ? createCategory(params.category) : null,
    subCategory: params.subCategory ? createSubCategory(params.subCategory) : null,
    netWorthCategory: params.netWorthCategory ? createNetWorthCategory(params.netWorthCategory) : null,
    bank: params.bank ? createBank(params.bank) : null,
    categoryTags: params.categoryTags ? params.categoryTags.map((c) => createCategoryTag(c)) : [],
    duplicate: params.duplicate ?? false,
    completed: false,
  } as IncompleteEntry;
}

export function createCompleteEntry(params: Partial<CompleteEntry>): CompleteEntry {
  return {
    id: params.id,
    amount: Number(params.amount),
    dateSpent: params.dateSpent ? new Date(params.dateSpent) : undefined,
    description: params.description ?? null,
    category: params.category ? createCategory(params.category) : undefined,
    subCategory: params.subCategory ? createSubCategory(params.subCategory) : undefined,
    netWorthCategory: params.netWorthCategory ? createNetWorthCategory(params.netWorthCategory) : null,
    bank: params.bank ? createBank(params.bank) : undefined,
    categoryTags: params.categoryTags ? params.categoryTags.map((c) => createCategoryTag(c)) : [],
    duplicate: params.duplicate ?? false,
    completed: true,
  } as CompleteEntry;
}

export function createCompleteFromIncomplete(entry: IncompleteEntry): CompleteEntry {
  if (!isEntryComplete(entry)) {
    throw new Error('Not complete');
  }

  return createCompleteEntry({ ...entry, ...{ completed: true } } as CompleteEntry);
}

export function isEntryComplete(entry: IncompleteEntry): boolean {
  return (
    entry.subCategory !== null &&
    entry.amount !== null &&
    (entry.amount >= 0 || !!entry.category?.savings) &&
    entry.bank !== null &&
    entry.dateSpent !== null
  );
}
