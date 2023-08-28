import {Category, createCategory} from './category.model';
import {Bank, createBank} from './bank.model';
import {createSubCategory, SubCategory} from './sub-category.model';
import {CategoryTag, createCategoryTag} from './category-tag.model';

export interface Entry {
  id: number;
  category: Category;
  subCategory: SubCategory;
  fromSavingsSubCategory: SubCategory;
  amount: number;
  dateSpent: Date;
  description: string | null;
  bank: Bank | null;
  categoryTags: CategoryTag[];
}

export function createEntry(params: Partial<Entry>): Entry {
  return {
    id: params.id,
    amount: params.amount ? Number(params.amount) : null,
    dateSpent: params.dateSpent ? new Date(params.dateSpent) : null,
    description: params.description ?? null,
    category: !!params.category ? createCategory(params.category) : null,
    subCategory: !!params.subCategory ? createSubCategory(params.subCategory) : null,
    fromSavingsSubCategory: params.fromSavingsSubCategory ? createSubCategory(params.fromSavingsSubCategory) : null,
    bank: !!params.bank ? createBank(params.bank) : null,
    categoryTags: params.categoryTags ? params.categoryTags.map(c => createCategoryTag(c)) : [],
  } as Entry;
}
