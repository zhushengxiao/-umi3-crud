import { Reducer, Effect, Subscription } from 'umi';
import { getRemoteList, editRecord, deleteRecord, addRecord } from './service';

interface UserModolType {
  namespace: 'users';
  state: {};
  reducers: {
    getList: Reducer;
  };
  effects: {
    getRemote: Effect;
    edit: Effect;
    delete: Effect;
    add: Effect;
  };
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
    getList(state, { payload }) {
      console.log('reduces ->', payload);
      return payload;
    },
  },
  // effects 异步
  effects: {
    *getRemote(action, { put, call }) {
      // yield put()
      const data = yield call(getRemoteList);
      console.log('data->', data);
      yield put({
        type: 'getList',
        payload: data,
      });
    },
    *edit({ payload: { id, values } }, { put, call }) {
      const data = yield call(editRecord, { id, values });
      console.log('data->', id);
      console.log('data->', values);
      yield put({
        type: 'getRemote',
      });
    },
    *add({ payload: { values } }, { put, call }) {
      const data = yield call(addRecord, { values });
      console.log('data->', values);
      yield put({
        type: 'getRemote',
      });
    },
    *delete({ payload: { id } }, { put, call }) {
      const data = yield call(deleteRecord, { id });
      console.log('*delete->', id);
      yield put({
        type: 'getRemote',
      });
    },
  },

  // 订阅
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/users') {
          dispatch({
            type: 'getRemote',
          });
        }
      });
    },
  },
};

export default UserModel;
