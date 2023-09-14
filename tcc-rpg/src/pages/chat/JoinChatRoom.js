import { React, useEffect } from "react";
import { useParams } from "react-router-dom";
import ChatRoom from "./ChatRoom";

const JoinRoom = ({ currentUserId }) => {
  const { inviteCode } = useParams();

  useEffect(() => {
    if (inviteCode) {
      localStorage.setItem("roomId", inviteCode);
    }
  }, [inviteCode]);

  return (
    <div>
      Joining room with invite code: {inviteCode}
      <ChatRoom currentUserId={currentUserId} initialRoomId={inviteCode} />
    </div>
  );
};

export default JoinRoom;
