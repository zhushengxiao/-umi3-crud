import React, { useState, FC, useRef } from 'react';
import {
  Table,
  Tag,
  Space,
  Modal,
  Button,
  Popconfirm,
  message,
  Pagination,
} from 'antd';
import ProTable, {
  ProColumns,
  TableDropdown,
  ActionType,
} from '@ant-design/pro-table';
import { connect, Dispatch, Loading, UserState } from 'umi';
import UserModal from '@/pages/users/components/UserModal';
import { SingleUserType, FormValues } from './data.d';
import { getRemoteList } from './service';

// interface ActionType {
//   reload: () => void;
//   fetchMore: () => void;
//   reset: () => void;
// }

interface UserPageProps {
  users: UserState;
  dispatch: Dispatch;
  userListLoading: boolean;
}

const UserListPage: FC<UserPageProps> = ({
  users,
  dispatch,
  userListLoading,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [record, setRecord] = useState<SingleUserType | undefined>(undefined);
  const ref = useRef<ActionType>();

  const editHandler = (record: SingleUserType) => {
    setModalVisible(true);
    setRecord(record);
  };

  const requestHandler = async ({ pageSize, current }) => {
    const users = await getRemoteList({
      page: current,
      per_page: pageSize,
    });
    return {
      data: users.data,
      success: true,
      total: users.meta.total,
    };
  };

  // 刷新reload
  const reloadHandler = () => {
    ref.current.reload();
  };

  const paginationHandler = (page, pageSize) => {
    dispatch({
      type: 'users/getRemote',
      payload: {
        page,
        per_page: pageSize,
      },
    });
  };

  const pageSizeHandler = (current, size) => {
    console.log(current, size);
    dispatch({
      type: 'users/getRemote',
      payload: {
        page: current,
        per_page: size,
      },
    });
  };

  const closeHandler = () => {
    setModalVisible(false);
  };

  // 删除 点击确认
  const confirm = (record: SingleUserType) => {
    const id = record.id;
    console.log('confirm', id);
    console.log('delete => Click on Yes');
    dispatch({
      type: 'users/delete',
      payload: {
        id,
      },
    });
  };

  // 删除 点击取消
  const cancel = () => {
    console.log('delete => Click on No');
  };

  const onFinish = (values: FormValues) => {
    let id = 0;
    if (record) {
      id = record.id;
    }
    if (id) {
      dispatch({
        type: 'users/edit',
        payload: {
          id,
          values,
        },
      });
    } else {
      dispatch({
        type: 'users/add',
        payload: {
          values,
        },
      });
    }
    console.log('Success: onFinish ');
    setModalVisible(false);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: String) => <a>{text}</a>,
    },

    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Create Time',
      dataIndex: 'create_time',
      key: 'create_time',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: String, record: SingleUserType) => (
        <Space size="middle">
          <a
            onClick={() => {
              editHandler(record);
            }}
          >
            Edit
          </a>
          &nbsp; &nbsp; &nbsp;
          <Popconfirm
            title="你确定要删除这条记录吗？"
            onConfirm={() => {
              confirm(record);
            }}
            onCancel={cancel}
            okText="确定"
            cancelText="取消"
          >
            <a>Delete</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  //点击添加按钮，弹出编辑框
  const addHandler = () => {
    setModalVisible(true);
    setRecord(undefined);
  };

  return (
    <div className="list-table">
      <Button type="primary" onClick={addHandler}>
        添加联系人
      </Button>
      <Button onClick={reloadHandler}>刷新reload</Button>
      <ProTable
        columns={columns}
        dataSource={users.data}
        rowKey="id"
        loading={userListLoading}
        request={requestHandler}
        search={false}
        actionRef={ref}
        pagination={false}
      />
      <Pagination
        className="list-page"
        total={users.meta.total}
        onChange={paginationHandler}
        onShowSizeChange={pageSizeHandler}
        current={users.meta.page}
        pageSize={users.meta.per_page}
        showSizeChanger
        showQuickJumper
        showTotal={total => `Total ${total} items`}
      ></Pagination>
      <UserModal
        visible={modalVisible}
        closeHandler={closeHandler}
        record={record}
        onFinish={onFinish}
      ></UserModal>
    </div>
  );
};

const mapStateToProps = ({
  users,
  loading,
}: {
  users: UserState;
  loading: Loading;
}) => {
  return {
    users,
    userListLoading: loading.models.users,
  };
};

export default connect(mapStateToProps)(UserListPage);
