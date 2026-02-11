import { useEffect } from 'react';
import { useLobbyStore } from '../../stores/lobbyStore'
import PublicRoomCard from './PublicRoomCard';

const PublicRoomsMenu = () => {
    const rooms = useLobbyStore((s) => s.rooms);
    const loadRooms = useLobbyStore((s) => s.loadRooms);
    const subscribe = useLobbyStore((s) => s.subscribe);
    const loading = useLobbyStore((s) => s.loading);
    const error = useLobbyStore((s) => s.error);

    useEffect(() => {
        loadRooms();
        subscribe();
    }, []);

    return (
        <div>
            <div className="lobby">
                <h2>Phòng công khai</h2>

                {loading && <p>Loading rooms...</p>}

                {!loading && rooms.length === 0 && (
                    <p>Không có phòng có sẵn</p>
                )}

                <div className="room-list">
                    {rooms.map((room) => (
                    <PublicRoomCard key={room.id} room={room} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PublicRoomsMenu

