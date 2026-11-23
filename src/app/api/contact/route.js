import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function getFirstName(fullName) {
  if (!fullName) return "Someone";
  const cleaned = fullName.trim().replace(/\s+/g, " ");
  const first = cleaned.split(" ")[0];
  return first.charAt(0).toUpperCase() + first.slice(1).toLowerCase();
}

function sanitizeForEmail(name) {
  return name.replace(/[^\p{L}\p{N} .'-]/gu, "").trim() || "Someone";
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function buildEmailHtml({ firstName, fullName, email, subject, message }) {
  const subjectBlock = subject
    ? `
      <tr>
        <td style="padding: 0 24px 8px;">
          <p style="margin: 0; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: #999;">
            Subject
          </p>
          <p style="margin: 4px 0 0; font-size: 15px; color: #1d1d1b; font-weight: 600;">
            ${escapeHtml(subject)}
          </p>
        </td>
      </tr>`
    : "";

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin: 0; padding: 0; background-color: #fafaf8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #fafaf8; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 560px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background-color: #f06a4d; padding: 28px 24px;">
              <p style="margin: 0; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.85); font-weight: 600;">
                New message
              </p>
              <h1 style="margin: 6px 0 0; font-size: 24px; font-weight: 700; color: #ffffff;">
                ${escapeHtml(firstName)} says hi
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 24px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">

                <!-- From -->
                <tr>
                  <td style="padding: 0 24px 8px;">
                    <p style="margin: 0; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: #999;">
                      From
                    </p>
                    <p style="margin: 4px 0 0; font-size: 15px; color: #1d1d1b; font-weight: 600;">
                      ${escapeHtml(fullName)} &lt;${escapeHtml(email)}&gt;
                    </p>
                  </td>
                </tr>

                ${subjectBlock}

                <!-- Divider -->
                <tr>
                  <td style="padding: 16px 24px;">
                    <div style="height: 1px; background-color: #eee;"></div>
                  </td>
                </tr>

                <!-- Message -->
                <tr>
                  <td style="padding: 0 24px 24px;">
                    <p style="margin: 0; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: #999;">
                      Message
                    </p>
                    <p style="margin: 8px 0 0; font-size: 15px; line-height: 1.6; color: #333; white-space: pre-wrap; overflow-wrap: anywhere; text-align: left;">${escapeHtml(message.trim())}</p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f7f7f5; padding: 16px 24px; border-top: 1px solid #eee;">
              <p style="margin: 0; font-size: 12px; color: #999; text-align: center;">
                Sent from <a href="https://nehuls.space" style="color: #f06a4d; text-decoration: none; font-weight: 600;">nehuls.space</a> contact form
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildEmailText({ firstName, fullName, email, subject, message }) {
  const subjectLine = subject ? `Subject: ${subject}\n\n` : "";
  return `New message from ${firstName}\n\nFrom: ${fullName} <${email}>\n${subjectLine}\n${message}\n\n— Sent from nehuls.space contact form`;
}

export async function POST(request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !message) {
      return Response.json(
        { error: "Name, email and message are required." },
        { status: 400 }
      );
    }

    const firstName = sanitizeForEmail(getFirstName(name));
    const trimmedSubject = subject ? subject.trim().slice(0, 120) : "";

    const { data, error } = await resend.emails.send({
      from: `${firstName} via nehuls.space <hello@nehuls.space>`,
      to: ["work.nehul@gmail.com"],
      replyTo: email,
      subject: trimmedSubject
        ? `${firstName}: ${trimmedSubject}`
        : `New message from ${firstName}`,
      html: buildEmailHtml({
        firstName,
        fullName: name,
        email,
        subject: trimmedSubject,
        message,
      }),
      text: buildEmailText({
        firstName,
        fullName: name,
        email,
        subject: trimmedSubject,
        message,
      }),
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json(
        { error: "Could not send your message. Please try again." },
        { status: 500 }
      );
    }

    return Response.json({ success: true, id: data.id });
  } catch (err) {
    console.error("Contact API error:", err);
    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
