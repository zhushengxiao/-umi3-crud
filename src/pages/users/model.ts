// // 仓库文件
// import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
//
// export interface IndexModelState {
//   name: string;
// }
//
// const UserModel = {
//   namespace: 'users',
//
//   state: {
//     name: '',
//   },
//
//   // 异步
//   effects: {
//     *query({ payload }, { call, put }) {
//     },
//   },
//
//   // 同步
//   reducers: {
//     save(state, action) {
//
//       const data = [
//         {
//           key: '1',
//           name: 'John Brown',
//           age: 32,
//           address: 'New York No. 1 Lake Park',
//           tags: ['nice', 'developer'],
//         },
//         {
//           key: '2',
//           name: 'Jim Green',
//           age: 42,
//           address: 'London No. 1 Lake Park',
//           tags: ['loser'],
//         },
//         {
//           key: '3',
//           name: 'Joe Black',
//           age: 32,
//           address: 'Sidney No. 1 Lake Park',
//           tags: ['cool', 'teacher'],
//         },
//       ];
//       return data;
//     },
//     // 启用 immer 之后
//     // save(state, action) {
//     //   state.name = action.payload;
//     // },
//   },
//
//   // 订阅
//   subscriptions: {
//     setup({ dispatch, history }) {
//       return history.listen(({ pathname }) => {
//         if (pathname === '/users') {
//           dispatch({
//             type: 'save',
//           })
//         }
//       });
//     }
//   }
// };
//
// export default UserModel;

import { Reducer, Effect, Subscription } from 'umi';

interface UserModolType {
  namespace: 'users';
  state: {};
  reducers: {
    getList: Reducer;
  };
  effects: {};
  subscriptions: {
    setup: Subscription;
  };
}

const UserModel: UserModolType = {
  // 命名空间，这个model的唯一标识名
  namespace: 'users',

  // 仓库初始值
  state: {},

  // reducers 同步
  reducers: {
    getList(state, action) {
      // state 上一次的数据
      const data = [
        {
          key: '1',
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
          tags: ['nice', 'developer'],
        },
        {
          key: '2',
          name: 'Jim Green',
          age: 42,
          address: 'London No. 1 Lake Park',
          tags: ['loser'],
        },
        {
          key: '3',
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
          tags: ['cool', 'teacher'],
        },
      ];
      return data;
    },
  },
  // effects 异步
  effects: {
    *function_name({ type, payload }, effects) {
      // yield put()
    },
  },

  // 订阅
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/users') {
          dispatch({
            type: 'getList',
          });
        }
      });
    },
  },
};

export default UserModel;
