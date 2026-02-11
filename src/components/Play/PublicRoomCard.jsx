import React from 'react'

const PublicRoomCard = ({room}) => {
    const isFull = room.current_players >= room.max_players;

    function joinRoom() {
        if (isFull) return alert("Room is full");
        console.log("join room", room.id);
        // TODO: call joinRoom RPC
    }

    return (
        <div className={`room-card ${isFull ? "Đã đầy" : ""}`}>
            <div className="room-header">
                <span className="room-code">Mã phòng: {room.room_code}</span>
            </div>

            <div className="room-body">
                <span>
                    Mức cược: {room.bet_amount ?? 0}
                </span>
                <br />

                <span>
                    Số người chơi: {room.current_players} / {room.max_players}
                </span>
            </div>

            <button onClick={joinRoom} disabled={isFull}>
                {isFull ? "Đã đầy" : "Tham gia"}
            </button>
        </div>
    );
}

export default PublicRoomCard
