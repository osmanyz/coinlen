const email = require('../base-mail');
const view = require('../base-view');
const moment = require('moment');

module.exports.newUser = function (user) {
  return email.sendEmail({
    to: 'coinlendestek@gmail.com',
    subject: 'A new member has been registered!',
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
                <h2>A new member has been registered.</h2>
            </td>
        </tr>
        <tr>
            <td class="esd-block-text es-p15t" align="left">
<table class="sub-table">
    <tr>
        <td><b>Fullname</b></td>
        <td>${user.name}</td>
    </tr>
    <tr>
        <td><b>Email</b></td>
        <td>${user.email}</td>
    </tr>
     <tr>
        <td><b>Phone</b></td>
        <td>${user.phone}</td>
    </tr>
    <tr>
        <td><b>Date</b></td>
        <td>${moment(user.createdAt).format('DD.MM.YYYY HH:mm:ss')}</td>
    </tr>
</table>
            </td>
        </tr>

        <tr>
            <td class="esd-block-text es-p15t" align="left">
                https://admin.coinlen.com/
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
</table>`);
