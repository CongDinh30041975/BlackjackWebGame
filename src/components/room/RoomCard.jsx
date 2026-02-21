import React from 'react'

const RoomCard = ({room}) => {
    if(!room) {
        return (
            <p>Phòng không tồn tại</p>
        )
    }

    const isFull = room.current_players >= room.max_players;

    function joinRoom() {
        if (isFull) return alert("Room is full");
        console.log("join room", room.id);
        // TODO: call joinRoom RPC
    }

    return (
        <div className={`room-card ${isFull ? "full" : ""}`}>
            <div className="room-header">
                <span className="room-code">Mã phòng: {room.room_code}</span>
            </div>

            <div className="room-body">
                <span>
                    Mức cược: {room.bet_amount ?? 0}
                </span>
                <br />

                <span>
                    Số người chơi: {room.player_count} / {room.max_players}
                </span>

                <br />
                <span>
                    Trạng thái: {room.state}
                </span>
            </div>

            <button onClick={joinRoom} disabled={isFull}>
                {isFull ? "Đã đầy" : "Tham gia"}
            </button>
        </div>
    );
}

export default RoomCard
