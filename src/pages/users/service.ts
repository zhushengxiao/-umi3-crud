import { request } from 'umi';
import { message } from 'antd';

export const getRemoteList = async params => {
  return request('/api/users', {
    method: 'get',
  })
    .then(response => {
      console.log(response);
      return response;
    })
    .catch(e => {
      console.log(e);
    });
};

export const editRecord = async ({ id, values }) => {
  return request(`/api/users/${id}`, {
    method: 'put',
    data: values,
  })
    .then(function(response) {
      message.success('edit success .');
    })
    .catch(function(error) {
      message.success('edit failed .');
    });
};

// 删除
export const deleteRecord = async ({ id }) => {
  return request(`/api/users/${id}`, {
    method: 'delete',
  })
    .then(function(response) {
      message.success('delete success');
    })
    .catch(function(error) {
      message.success('delete failed');
    });
};

// 添加
export const addRecord = async ({ values }) => {
  return request('/api/users', {
    method: 'post',
    data: values,
  })
    .then(function(response) {
      message.success('add success');
    })
    .catch(function(error) {
      message.success('add failed');
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
