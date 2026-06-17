import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(str: string): string {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, companyName, websiteUrl } = body as {
      fullName: string; email: string; companyName: string; websiteUrl: string;
    };

    if (!fullName || !email || !companyName || !websiteUrl) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { error } = await resend.emails.send({
      // TODO: swap to a verified domain sender once one exists — e.g. noreply@mamavanja.com
      from: 'MamaVanja <onboarding@resend.dev>',
      to: ['nirmal.mamavanja@gmail.com'],
      subject: `New Free Audit Request — ${companyName}`,
      html: `
        <h2 style="margin:0 0 20px;font-family:sans-serif;color:#0F3D2E;">New Free Audit Request</h2>
        <table style="border-collapse:collapse;font-family:sans-serif;font-size:15px;color:#222;">
          <tr>
            <td style="padding:8px 24px 8px 0;font-weight:600;color:#0F3D2E;vertical-align:top;">Full Name</td>
            <td style="padding:8px 0;">${escapeHtml(fullName)}</td>
          </tr>
          <tr>
            <td style="padding:8px 24px 8px 0;font-weight:600;color:#0F3D2E;vertical-align:top;">Email</td>
            <td style="padding:8px 0;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td>
          </tr>
          <tr>
            <td style="padding:8px 24px 8px 0;font-weight:600;color:#0F3D2E;vertical-align:top;">Company</td>
            <td style="padding:8px 0;">${escapeHtml(companyName)}</td>
          </tr>
          <tr>
            <td style="padding:8px 24px 8px 0;font-weight:600;color:#0F3D2E;vertical-align:top;">Website</td>
            <td style="padding:8px 0;"><a href="${escapeHtml(websiteUrl)}">${escapeHtml(websiteUrl)}</a></td>
          </tr>
        </table>
      `,
    });

    if (error) {
      console.error('[audit-request] Resend error:', error);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[audit-request] Unexpected error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
