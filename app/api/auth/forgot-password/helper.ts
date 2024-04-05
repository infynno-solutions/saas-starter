export const resetPasswordEmail = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SaaS Starter Password Reset</title>
</head>
<body>
  <table cellpadding="0" cellspacing="0" border="0" width="100%">
    <tr>
      <td align="center" style="padding: 50px 0;">
        <h1>SaaS Starter Password Reset</h1>
        <p>Hello,</p>
        <p>You have requested to reset your password for SaaS Starter.</p>
        <p>To reset your password, please click the link below:</p>
        <p><a href="http://localhost:3000/auth/reset-password?token=VERIFICATION_TOKEN">Reset Password</a></p>
        <p>If you did not request this password reset, please ignore this email.</p>
        <p>Thank you,<br>The SaaS Starter Team</p>
      </td>
    </tr>
  </table>
</body>
</html>
`
