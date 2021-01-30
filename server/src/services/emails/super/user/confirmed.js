const email = require('../../base-mail');
const view = require('../../base-view');

module.exports.confirm = function (user) {
  return email.sendEmail({
    to: user.email,
    subject: global.lang('Your Account Has Been Confirmed'),
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
                <h2>Hello ${user.name}</h2>
            </td>
        </tr>
        <tr>
            <td class="esd-block-text es-p15t" align="left">
                <p>Your Coinlen membership has been confirmed. You can start using the system.</p>
            </td>
        </tr>
        <tr>
            <td align="center" class="esd-block-button">
                <span class="es-button-border">
                    <a href="https://app.coinlen.com/" class="es-button" target="_blank"> Go to Coinlen. </a>
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
