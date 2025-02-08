import { useParams } from "react-router-dom"
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt"
import { useAuthStore } from "../store/useAuthStore";
export const Room = () => {
  const { authUser } = useAuthStore();
  const { roomId } = useParams();
  const meeting = async (element) => {
    const appId = 1018307753
    const serverSecret = "311024462d2450c7530c79ae2a846744";
    const kitty = ZegoUIKitPrebuilt.generateKitTokenForTest(appId, serverSecret, roomId, authUser._id, authUser.fullName);

    const zc = ZegoUIKitPrebuilt.create(kitty);
    zc.joinRoom({
      container: element,
      scenario: {
        model: ZegoUIKitPrebuilt.OneONoneCall,

      },
      showScreenSharingButton: false,
    })
  };
  return (
    <div >
      <div className="absolute bottom-[30%] left-[25%]" ref={meeting} />
    </div>
  )
}