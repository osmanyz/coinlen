const email = require('../base-mail');
const view = require('../base-view');
const moment = require('moment');

module.exports.confirmed = function (user, payment) {
  email.sendEmail({
    to: user.email,
    subject: global.lang('Your Coinlen Subscription Payment is Successful!'),
    html: template(user, payment),
  });
};

const template = (user, payment) => view(` <!-- PAYMENT COMPLETED MODULE -->
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
                                    <h2>Your Premium Membership Payment is Successful.</h2>
                                </td>
                            </tr>
                            <tr>
                                <td valign="top" class="imageContentLast">
                                    <img src="https://images.unsplash.com/photo-1556745753-b2904692b3cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=560&q=60" width="560" class="flexibleImage" style="max-width:560px;" />
                                </td>
                            </tr>
                            <tr>
                                <td class="esd-block-text es-p15t" align="left">
                                    <p>We are happy to see you among us. Thanks for choosing Coinlen.</p>
                                </td>
                            </tr>

                            <tr>
                                <td>


                 <!-- // INVOICE TABLE -->
                    <table class="sub-table">
                        <tr>
                            <td>${user.name}<br /><br />${moment(payment.createdAt).format('DD.MM.YYYY HH:mm:ss')}</td>
                        </tr>
                        <tr>
                            <td>
                                <table class="sub-table-items" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td>${payment.name}</td>
                                        <td class="alignright">${payment.price}</td>
                                    </tr>
                                    <tr class="total">
                                        <td class="alignright" width="80%">Total</td>
                                        <td class="alignright">${payment.price}</td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                    <!-- // INVOICE TABLE -->

                                </td>
                            </tr>

                            <tr>
                                <td align="center" class="esd-block-button">
                                    <span class="es-button-border">
                                        <a href="http://app.coinlen.com/invoice/${payment.id}" class="es-button" target="_blank"> View your payment. </a>
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
<!-- ////////   PAYMENT COMPLETED MODULE -->
`);
