import { NextApiResponseServerIo } from "@/types/socket";
import { NextApiRequest } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponseServerIo) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { content } = req.body;
    const { familyId, token } = req.query;
    if (!token) {
      return res.status(400).json({ error: "Unauthorized" });
    }
    if (!familyId) {
      return res.status(400).json({ error: "Family ID is required" });
    }

    const addKey = `chat:${familyId}:add`;
    res?.socket?.server?.io?.emit(addKey, {
      familyId: familyId,
      content: content,
      token: token,
    });

    return res.status(200).json({ message: "Message sent" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Error" });
  }
};

export default handler;
