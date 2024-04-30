"use server";

import MailerUrl from "@/services/url/mailer-url";

export const SendEmailConfirmation = async (token: string, email: string) => {
  try {
    const response = await fetch(MailerUrl.sendUserConfirmation, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return { error: "Something wrong!" };
  }
};
export const SendInvite = async (token: string, familyId: string) => {
  try {
    const response = await fetch(
      `${MailerUrl.sendInvitation}?id_family=${familyId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    return { error: "Something wrong!" };
  }
};
