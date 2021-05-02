/* eslint-disable no-unused-vars */

import { useState } from "react";
import { convertISODateToDate } from "../utils/utils";

// import { chatRooms } from "./mockdata";

export const ChatRoomCard = ({ chatRoom }) => {
  console.log({ chatRoom });
  const { title, agenda, hostName, users, createdAt, currentStatus } = chatRoom;
  const [dateTime] = useState(convertISODateToDate(createdAt));
  return (
    <div className="chatroom-card">
      <div className="card__title-container">
        <div className="flex">
          <div className="card__title">{title}</div>
          {currentStatus === "ongoing" && (
            <div className="live-badge">live</div>
          )}
        </div>
        <div className="card__buttons">
          <button className="btn btn-square">Join</button>
        </div>
      </div>
      <div className="card__agenda">{agenda}</div>
      <div className="card__details">
        <div className="card__details--detail">Hosted By {hostName}</div>
        <div className="card__details--detail">
          {users.length} people joined
        </div>
        <div className="card__details--detail">
          {`Created At: ${dateTime.date}
        ${dateTime.time}`}
        </div>
      </div>
    </div>
  );
};
