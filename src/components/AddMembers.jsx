import React, { useContext, useState } from 'react';
import { Form, Modal, Select, Spin, Avatar, Input, Button } from 'antd';
import { ChatContext } from '../context/ChatContext';
import { AuthContext } from '../context/AuthContext';
import { debounce } from 'lodash';
import { db } from '../firebase'

function DebounceSelect({
    fetchOptions,
    debounceTimeout = 300,
    //   curMembers,
    ...props
}) {
    // Search: abcddassdfasdf

    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);

    const debounceFetcher = React.useMemo(() => {
        const loadOptions = (value) => {
            setOptions([]);
            setFetching(true);

            fetchOptions(value, props.curMembers).then((newOptions) => {
                setOptions(newOptions);
                setFetching(false);
            });
        };

        return debounce(loadOptions, debounceTimeout);
    }, [debounceTimeout, fetchOptions]);

    React.useEffect(() => {
        return () => {
            // clear when unmount
            setOptions([]);
        };
    }, []);

    return (
        <Select
            labelInValue
            filterOption={false}
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size='small' /> : <div>Không tìm thấy user</div>}
            // notFoundContent={fetching.length === 0 ? <div>Không tìm thấy user</div> : null}
            {...props}
        >
            {options.map((opt) => (
                <Select.Option key={opt.value} value={opt.value} title={opt.label}>
                    <Avatar size='small' src={opt.photoURL}>
                        {opt.photoURL ? '' : opt.label?.charAt(0)?.toUpperCase()}
                    </Avatar>
                    {` ${opt.label}`}
                </Select.Option>
            ))}
        </Select>
    );
}

async function fetchUserList(search, curMembers) {
      return db
        .collection('users')
        .where('keywords', 'array-contains', search?.toLowerCase())
        .orderBy('displayName')
        .limit(20)
        .get()
        .then((snapshot) => {
          return snapshot.docs
            .map((doc) => ({
              label: doc.data().displayName,
              value: doc.data().uid,
              photoURL: doc.data().photoURL,
            }))
            .filter((opt) => !curMembers.includes(opt.value));
        });
}

export default function InviteMemberModal() {
    const {
        selectedRoomId,
        selectedRoom,
    } = useContext(ChatContext);
    const { User } = useContext(AuthContext)
    const [value, setValue] = useState([]);
    const [form] = Form.useForm();

    const handleOk = () => {
        // reset form value
        form.resetFields();
        // setValue([]);

        // // update members in current room
        const roomRef = db.collection('rooms').doc(selectedRoomId);

        roomRef.update({
          members: [...selectedRoom.members, ...value.map((val) => val.value)],
        });
        form.resetFields();
        setValue([]);

        // setIsInviteMemberVisible(false);
    };

    return (
        <div className='AddMembers'>
            <h4>Thêm thành viên</h4>
            <Form form={form} layout='vertical' className='FormAddMembers'>
                <DebounceSelect
                mode='multiple'
                name='search-user'
                label='Tên các thành viên'
                value={value}
                placeholder='Nhập tên thành viên'
                fetchOptions={fetchUserList}
                onChange={(newValue) => setValue(newValue)}
                style={{ width: '100%' }}
                curMembers={selectedRoom.members}
                />
                <Button onClick={handleOk}>Thêm</Button>
            </Form>
        </div>
    );
}