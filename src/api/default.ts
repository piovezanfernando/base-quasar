import { $axios } from 'src/boot/axios';
import { Notify } from 'quasar';
import { ApiResponse, DefaultRequest } from 'src/models/default';
import { ClassificationResponse } from 'src/models/classification';

export default function defaultService() {
  function getAll<T>(urlPath: string, filter: string, params: DefaultRequest, callback: (res: ApiResponse<T>) => void): void {
    const formatedParams = mountParam(filter, params);
    $axios.get(urlPath + formatedParams).then((response) => {
      callback(response.data);
    });
  }

  function mountParam(filter: string, params: DefaultRequest): string {
    let param = '?';
    param += !!params.rowsPerPage ? 'limit=' + params.rowsPerPage : '';
    param += !!params.page ? '&page=' + params.page : '';
    param += !!params.sortBy ? '&order=' + params.sortBy : '';
    param += '&direction=' + (params.descending ? 'DESC' : 'ASC');
    param += !!params.fields ? '&fields=' + params.fields : '';
    param += !!filter ? '&' + filter : '';

    return param;
  }

  function update<T>(urlPath: string, id: string, obj: any, callback: (res: ApiResponse<T>) => void): void {
    $axios.put(urlPath + id, obj).then((response ) => {
      showSucess(response, 'positive', 'top-right');
      callback(response.data);
    });
  }

  function create<T>(urlPath: string, obj: any, callback: (res: ApiResponse<T>) => void): void {
    $axios.post(urlPath, obj).then((response) => {
      showSucess(response, 'positive', 'top-right');
      callback(response.data);
    });
  }

  function remove<T>(urlPath: string, id: any, callback: (res: ApiResponse<T>) => void): void {
    $axios.delete(urlPath + id).then((response) => {
      showSucess(response, 'positive', 'top-right');
      callback(response.data);
    });
  }

  function showSucess(response: any, errType: string, pos: any): void {
    Notify.create({
      type: `${errType}`,
      message: `${response.data.message}`,
      position: pos,
      html: true
    });
  }

  return {
    getAll,
    update,
    create,
    remove,
  };
};