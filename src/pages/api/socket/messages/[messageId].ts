import ChatUrl from "@/services/url/chat-url";
import { NextApiResponseServerIo } from "@/types/socket";
import { NextApiRequest } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponseServerIo) => {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (req.method === "DELETE") {
    try {
      const { messageId, familyId, memberId, token } = req.query;

      if (!memberId || !token) {
        return res.status(400).json({ error: "Unauthorized" });
      }

      if (!familyId) {
        return res.status(400).json({ error: "Family ID is required" });
      }

      if (!messageId) {
        return res.status(400).json({ error: "Message ID is required" });
      }

      const reponse = await fetch(
        `${ChatUrl.removeMessage}/${memberId}/${messageId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await reponse.json();
      if (data.statusCode === 500) {
        return res.status(500).json({ error: "Internal Error" });
      }

      const deleteKey = `chat:${familyId}:delete`;
      res?.socket?.server?.io?.emit(
        deleteKey,
        JSON.stringify({ type: "delete", messageId })
      );
      return res.status(200).json({ message: "Message deleted" });
    } catch (error) {
      console.log("[MESSAGES_DELETE]", error);
      return res.status(500).json({ error: "Internal Error" });
    }
  }
};

export default handler;
