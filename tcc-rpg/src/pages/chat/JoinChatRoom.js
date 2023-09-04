import React from "react";
import { useParams } from "react-router-dom";
import ChatRoom from "./ChatRoom";

const JoinRoom = ({ currentUserId }) => {
  const { inviteCode } = useParams();

  return (
    <div>
      Joining room with invite code: {inviteCode}
      <ChatRoom currentUserId={currentUserId} initialRoomId={inviteCode} />
    </div>
  );
};

export default JoinRoom;
