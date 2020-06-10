import { Reducer, Effect, Subscription } from 'umi';
import { getRemoteList, editRecord, deleteRecord, addRecord } from './service';
import { message } from 'antd';
import { SingleUserType, FormValues } from './data.d';

export interface UserState {
  data: SingleUserType[];
  meta: {
    total: number;
    per_page: number;
    page: number;
  };
}

interface UserModolType {
  namespace: 'users';
  state: UserState;
  reducers: {
    getList: Reducer<UserState>;
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
  state: {
    data: [],
    meta: {
      total: 0,
      per_page: 5,
      page: 1,
    },
  },

  // reducers 同步
  reducers: {
    getList(state, { payload }) {
      console.log('reduces ->', payload);
      return payload;
    },
  },
  // effects 异步
  effects: {
    *getRemote({ payload: { page, per_page } }, { put, call }) {
      // yield put()
      const data = yield call(getRemoteList, { page, per_page });
      yield put({
        type: 'getList',
        payload: data,
      });
    },
    *edit({ payload: { id, values } }, { put, call, select }) {
      const data = yield call(editRecord, { id, values });
      if (data) {
        const { page, per_page } = yield select(state => state.users.meta);
        yield put({
          type: 'getRemote',
          payload: {
            page,
            per_page,
          },
        });
        message.success('编辑记录 成功');
      } else {
        message.error('编辑记录 失败');
      }
    },
    *add({ payload: { values } }, { put, call, select }) {
      const data = yield call(addRecord, { values });
      if (data) {
        const { page, per_page } = yield select(state => state.users.meta);
        yield put({
          type: 'getRemote',
          payload: {
            page,
            per_page,
          },
        });
        message.success('添加记录 成功');
      } else {
        message.error('添加记录 失败');
      }
    },
    *delete({ payload: { id } }, { put, call, select }) {
      const data = yield call(deleteRecord, { id });
      if (data) {
        const { page, per_page } = yield select(state => state.users.meta);
        yield put({
          type: 'getRemote',
          payload: {
            page,
            per_page,
          },
        });
        message.success('删除记录 成功');
      } else {
        message.error('删除记录 失败');
      }
    },
  },

  // 订阅
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/users') {
          dispatch({
            //   type: 'getRemote',
            type: 'getRemote',
            // });
            payload: {
              page: 1,
              per_page: 5,
            },
          });
        }
      });
    },
  },
};

export default UserModel;
