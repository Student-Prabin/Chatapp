import { LucidePhone, X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { useEffect, useState } from "react";
import { ZIM } from "zego-zim-web";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';


const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers, authUser } = useAuthStore();
  const [userInfo, setUserInfo] = useState({ userName: "", userId: "" })
  let pickupId = selectedUser._id;
  function init() {
    const userId = authUser._id;
    const userName = authUser.fullName;
    setUserInfo({ userName: userName, userId: userId });

  }

  useEffect(() => {
    init();
  }, []);

  function handleCall(callType) {
    const appId = 1018307753;
    const serverSecret = "311024462d2450c7530c79ae2a846744";

    const TOKEN = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appId,
      serverSecret,
      null,
      userInfo.userId,
      userInfo.userName
    );
    const zp = ZegoUIKitPrebuilt.create(TOKEN);
    zp.addPlugins({ ZIM });

    let pickup = pickupId;
    if (!pickup) {
      alert("userId not found");
      return;
    }

    zp.sendCallInvitation({
      callees: [{ userID: pickup, userName: userInfo.userName }],
      callType,
      timeout: 50,
    }).then((res) => {
      console.log(res);
      if (res.errorInvitees.length) {
        alert("Didnt picked up")
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>
        <div>

          {/* call button */}

          <button onClick={() => handleCall(ZegoUIKitPrebuilt.InvitationTypeVoiceCall)}>
            <LucidePhone />
          </button>

          {/* Close button */}
          <button onClick={() => setSelectedUser(null)}>
            <X />
          </button>

        </div>
      </div>
    </div>
  );
};
export default ChatHeader;
