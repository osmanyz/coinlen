const email = require('../base-mail');
const view = require('../base-view');

module.exports.emailActivate = function (user) {
  return email.sendEmail({
    to: user.email,
    subject: global.lang('Your Email has been activated'),
    html: template(user),
  });
};

const template = (user) => view(`
<table class="es-content" cellspacing="0" cellpadding="0" align="center">
<tbody>
<tr>
<td class="esd-stripe" align="center">
<table class="es-content-body" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
<tbody>
<tr>
<td class="esd-structure es-p20t es-p20b es-p20r es-p20l" align="left">
<table width="100%" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td class="esd-container-frame" width="560" valign="top" align="center">
<table width="100%" cellspacing="0" cellpadding="0">
    <tbody>
        <tr>
            <td class="esd-block-text es-p15b" align="left">
                <h2>Your Coinlen account has been successfully verified.</h2>
            </td>
        </tr>
        <tr>
            <td class="esd-block-text es-p15t" align="left">
                <p>Hello, ${user.name}</p>
                <p>Your account verification process has been successfully completed.</p>
            </td>
        </tr>
        <tr>
            <td align="center" class="esd-block-button">
                <span class="es-button-border">
                    <a href="https://app.coinlen.com/profile" class="es-button" target="_blank"> Go to your profile. </a>
                </span>
            </td>
        </tr>

    </tbody>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
`
);
