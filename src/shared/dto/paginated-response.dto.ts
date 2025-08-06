export class PaginatedResponseDto<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;

  constructor(params: {
    data: T[];
    total: number;
    page: number;
    limit: number;
  }) {
    this.data = params.data;
    this.total = params.total;
    this.page = params.page;
    this.limit = params.limit;
  }
}
