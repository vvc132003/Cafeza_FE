export interface Category {
  id?: number;                // Nếu có
  parentId?: number | null;   // Có thể null
  code?: string;
  name: string;
  slug?: string;
  description?: string;
  notes?: string;
  displayOrder?: number;
  viewCount?: number;
  isActive?: boolean;
  showOnHome?: boolean;
  icon?: string;
  colorCode?: string;
}
