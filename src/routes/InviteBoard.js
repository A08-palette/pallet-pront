import React, { useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../App';

const InviteBoard = ({ boardId }) => {
    const [invitedUserId, setInvitedUserId] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [inviteComplete, setInviteComplete] = useState(false);

    const handleInvite = async () => {
        setLoading(true);
        setError('');
        setInviteComplete(false);

        try {
            const token = localStorage.getItem('accessToken');
            const response = await axios.post(
                `${baseUrl}/api/boards/${boardId}/invite`,
                { invitedUserId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log('Invite successful:', response.data.message);
            setInviteComplete(true);
        } catch (error) {
            console.error('사용자 초대 에러:', error.response);
            setError('초대에 실패하였습니다. 다시 시도해 주세요.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setInvitedUserId(e.target.value);
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
                type="text"
                value={invitedUserId}
                onChange={handleChange}
                placeholder="초대할 사용자의 ID를 입력하세요."
                style={{ width: '200px', marginLeft: '10px' }}
                onClick={(e) => e.stopPropagation()} // 이벤트 전파 방지
                onFocus={(e) => e.stopPropagation()} // 포커스 시 이벤트 전파 방지
            />
            <button
                onClick={handleInvite}
                disabled={loading}
                style={{
                    marginLeft: '10px',
                    width: '40px',
                    height: '40px',
                    border: '2px solid #fff',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                    fontSize: '20px',
                }}
            >
                {loading ? '⏰' : '📧'}
            </button>
            {error && <p style={{ color: 'red', marginLeft: '10px' }}>{error}</p>}
            {inviteComplete && <p style={{ color: 'green', marginLeft: '10px' }}>초대가 완료되었습니다!</p>}
        </div>
    );
};

export default InviteBoard;
