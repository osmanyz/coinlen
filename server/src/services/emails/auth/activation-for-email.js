const email = require('../base-mail');
const view = require('../base-view');

module.exports.activationForEmail = function (user) {
  return email.sendEmail({
    to: user.email,
    subject: global.lang('Confirm Your Email Address'),
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
                <h2>Hello ${user.name}.</h2>
            </td>
        </tr>
        <tr>
            <td class="esd-block-text es-p15t" align="left">
                <p>You have verify your e-mail address. Click on the link below to verify your account.</p>
            </td>
        </tr>
        <tr>
            <td align="center" class="esd-block-button">
                <span class="es-button-border">
                    <a href="https://app.coinlen.com/email-activation/${user.token}?temp_source=email&temp_time=${Date.now().toString()}" class="es-button" target="_blank"> Verify it. </a>
                </span>
            </td>
        </tr>

        <tr>
            <td class="esd-block-text es-p15t" align="left">
                <p>If the above link address does not work, you can copy this address to your browser and activate your membership.
                <br/> <br/>
                https://app.coinlen.com/email-activation/${user.token}</p>
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
