import request, { extend } from 'umi-request';
import { message } from 'antd';
import { SingleUserType, FormValues } from './data.d';

const errorHandler = function(error: any) {
  if (error.response) {
    if (error.response.status > 400) {
      message.error(error.data.message ? error.data.message : error.data);
    }
  } else {
    // 请求已经发送，但是没有回复
    message.error('Network Error .');
  }
};

const extendRequest = extend({ errorHandler });

export const getRemoteList = async ({ page, per_page }) => {
  return extendRequest(`/api/users?page=${page}&&per_page=${per_page}`, {
    method: 'get',
  })
    .then(response => {
      console.log(response);
      return response;
    })
    .catch(e => {
      console.log(e);
      return false;
    });
};

export const editRecord = async ({
  id,
  values,
}: {
  id: number;
  values: FormValues;
}) => {
  return extendRequest(`/api/users/${id}`, {
    method: 'put',
    data: values,
  })
    .then(function(response) {
      message.success('edit success .');
      return true;
    })
    .catch(function(error) {
      message.success('edit failed .');
      return false;
    });
};

// 删除
export const deleteRecord = async ({ id }: { id: number }) => {
  return extendRequest(`/api/users/${id}`, {
    method: 'delete',
  })
    .then(function(response) {
      message.success('delete success');
      return true;
    })
    .catch(function(error) {
      message.success('delete failed');
      return false;
    });
};

// 添加
export const addRecord = async ({ values }: { values: FormValues }) => {
  return extendRequest('/api/users', {
    method: 'post',
    data: values,
  })
    .then(function(response) {
      message.success('add success');
      return true;
    })
    .catch(function(error) {
      message.success('add failed');
      return false;
    });
};

// const data = [
//   {
//     key: '1',
//     name: 'John Brown',
//     age: 32,
//     address: 'New York No. 1 Lake Park',
//     tags: ['nice', 'developer'],
//   },
//   {
//     key: '2',
//     name: 'Jim Green',
//     age: 42,
//     address: 'London No. 1 Lake Park',
//     tags: ['loser'],
//   },
//   {
//     key: '3',
//     name: 'Joe Black',
//     age: 32,
//     address: 'Sidney No. 1 Lake Park',
//     tags: ['cool', 'teacher'],
//   },
// ];
