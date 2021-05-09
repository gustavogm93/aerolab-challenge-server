export interface Product {
  _id: string;
  name: string;
  cost: number;
  category: string;
  img: {
    url: string;
    hdUrl: string;
  };
}

export interface Pagination<T> {
  data: T[];
  pagination: {
    currentPage: number;
    pages: number;
    limit: number;
    total: number;
  };
}
