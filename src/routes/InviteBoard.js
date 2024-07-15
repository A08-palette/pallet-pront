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
        setInviteComplete(false); // 초기화

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
            setInviteComplete(true); // 초대 완료 상태로 변경
            // 성공적으로 초대한 경우 추가적인 UI 업데이트나 알림을 여기에 추가할 수 있습니다.
        } catch (error) {
            console.error('사용자 초대 에러:', error.response);
            setError('초대에 실패하였습니다. 다시 시도해 주세요.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
                type="text"
                value={invitedUserId}
                onChange={(e) => setInvitedUserId(e.target.value)}
                placeholder="초대할 사용자의 ID를 입력하세요."
                style={{ width: '200px', marginLeft: '10px' }} // 입력 필드의 가로 길이와 왼쪽 여백 설정
            />
            <button
                onClick={handleInvite}
                disabled={loading}
                style={{
                    marginLeft: '10px',
                    width: '40px', // 정사각형 모양으로 설정
                    height: '40px', // 정사각형 모양으로 설정
                    border: '2px solid #fff', // 흰색 2px 테두리 설정
                    borderRadius: '50%', // 원형 모양으로 설정
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'transparent', // 배경은 투명하게 설정
                    cursor: 'pointer',
                    fontSize: '20px', // 아이콘 크기 설정
                }}
            >
                {loading ? '⏰' : '📧'} {/* 초대 중일 때는 로딩 아이콘, 그렇지 않으면 이모지 */}
            </button>
            {error && <p style={{ color: 'red', marginLeft: '10px' }}>{error}</p>} {/* 에러 메시지가 있을 경우 빨간색으로 표시 */}
            {inviteComplete && <p style={{ color: 'green', marginLeft: '10px' }}>초대가 완료되었습니다!</p>}
        </div>
    );
};

export default InviteBoard;
