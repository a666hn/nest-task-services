export interface IID {
  id: string;
}

export interface ITimestamp {
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

export interface IResHttp {
  date: string;
  code: number;
  status: string;
  message?: string;
  data?: any;
}
