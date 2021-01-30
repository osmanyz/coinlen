module.exports = function (content) {
  return `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <meta name="x-apple-disable-message-reformatting">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="telephone=no" name="format-detection">
    <title></title>
    <style type="text/css">

/*
CONFIG STYLES
Please do not delete and edit CSS styles below
*/
.header {text-align: center; margin-top: 20px; margin-bottom: 15px}
.header a {text-decoration: none; font-weight: 700;}

/* IMPORTANT THIS STYLES MUST BE ON FINAL EMAIL */
#outlook a {
    padding: 0;
}

.ExternalClass {
    width: 100%;
}

.ExternalClass,
.ExternalClass p,
.ExternalClass span,
.ExternalClass font,
.ExternalClass td,
.ExternalClass div {
    line-height: 100%;
}

.es-button {
    mso-style-priority: 100 !important;
    text-decoration: none !important;
}

a[x-apple-data-detectors] {
    color: inherit !important;
    text-decoration: none !important;
    font-size: inherit !important;
    font-family: inherit !important;
    font-weight: inherit !important;
    line-height: inherit !important;
}

.es-desk-hidden {
    display: none;
    float: left;
    overflow: hidden;
    width: 0;
    max-height: 0;
    line-height: 0;
    mso-hide: all;
}

/*
END OF IMPORTANT
*/
s {
    text-decoration: line-through;
}

html,
body {
    width: 100%;
    font-family: arial, 'helvetica neue', helvetica, sans-serif;
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
}

body {
    background-color: #f6f6f6;
}

table {
    mso-table-lspace: 0pt;
    mso-table-rspace: 0pt;
    border-collapse: collapse;
    border-spacing: 0px;
}

table td,
html,
body,
.es-wrapper {
    padding: 0;
    Margin: 0;
}

.es-content,
.es-header,
.es-footer {
    table-layout: fixed !important;
    width: 100%;
}

img {
    display: block;
    border: 0;
    outline: none;
    text-decoration: none;
    -ms-interpolation-mode: bicubic;
}

table tr {
    border-collapse: collapse;
}

p,
hr {
    Margin: 0;
}

h1,
h2,
h3,
h4,
h5 {
    Margin: 0;
    line-height: 120%;
    mso-line-height-rule: exactly;
    font-family: arial, 'helvetica neue', helvetica, sans-serif;
}

p,
ul li,
ol li,
a {
    -webkit-text-size-adjust: none;
    -ms-text-size-adjust: none;
    mso-line-height-rule: exactly;
}

.es-left {
    float: left;
}

.es-right {
    float: right;
}

.es-p5 {
    padding: 5px;
}

.es-p5t {
    padding-top: 5px;
}

.es-p5b {
    padding-bottom: 5px;
}

.es-p5l {
    padding-left: 5px;
}

.es-p5r {
    padding-right: 5px;
}

.es-p10 {
    padding: 10px;
}

.es-p10t {
    padding-top: 10px;
}

.es-p10b {
    padding-bottom: 10px;
}

.es-p10l {
    padding-left: 10px;
}

.es-p10r {
    padding-right: 10px;
}

.es-p15 {
    padding: 15px;
}

.es-p15t {
    padding-top: 15px;
}

.es-p15b {
    padding-bottom: 15px;
}

.es-p15l {
    padding-left: 15px;
}

.es-p15r {
    padding-right: 15px;
}

.es-p20 {
    padding: 20px;
}

.es-p20t {
    padding-top: 20px;
}

.es-p20b {
    padding-bottom: 20px;
}

.es-p20l {
    padding-left: 20px;
}

.es-p20r {
    padding-right: 20px;
}

.es-p25 {
    padding: 25px;
}

.es-p25t {
    padding-top: 25px;
}

.es-p25b {
    padding-bottom: 25px;
}

.es-p25l {
    padding-left: 25px;
}

.es-p25r {
    padding-right: 25px;
}

.es-p30 {
    padding: 30px;
}

.es-p30t {
    padding-top: 30px;
}

.es-p30b {
    padding-bottom: 30px;
}

.es-p30l {
    padding-left: 30px;
}

.es-p30r {
    padding-right: 30px;
}

.es-p35 {
    padding: 35px;
}

.es-p35t {
    padding-top: 35px;
}

.es-p35b {
    padding-bottom: 35px;
}

.es-p35l {
    padding-left: 35px;
}

.es-p35r {
    padding-right: 35px;
}

.es-p40 {
    padding: 40px;
}

.es-p40t {
    padding-top: 40px;
}

.es-p40b {
    padding-bottom: 40px;
}

.es-p40l {
    padding-left: 40px;
}

.es-p40r {
    padding-right: 40px;
}

.es-menu td {
    border: 0;
}

.es-menu td a img {
    display: inline-block !important;
}

/*
END CONFIG STYLES
*/
a {
    font-family: arial, 'helvetica neue', helvetica, sans-serif;
    font-size: 14px;
    text-decoration: underline;
}

h1 {
    font-size: 30px;
    font-style: normal;
    font-weight: normal;
    color: #333333;
}

h1 a {
    font-size: 30px;
}

h2 {
    font-size: 24px;
    font-style: normal;
    font-weight: normal;
    color: #333333;
}

h2 a {
    font-size: 24px;
}

h3 {
    font-size: 20px;
    font-style: normal;
    font-weight: normal;
    color: #333333;
}

h3 a {
    font-size: 20px;
}

p,
ul li,
ol li {
    font-size: 14px;
    font-family: arial, 'helvetica neue', helvetica, sans-serif;
    line-height: 150%;
}

ul li,
ol li {
    Margin-bottom: 15px;
}

.es-menu td a {
    text-decoration: none;
    display: block;
}

.es-wrapper {
    width: 100%;
    height: 100%;
    /*background-image: ;*/
    background-color: #f6f6f6;
    background-repeat: repeat;
    background-position: center top;
}

.es-wrapper-color {
    background-color: #ffffff;
}

.es-content-body {
    background-color: #ffffff;
}

.es-content-body p,
.es-content-body ul li,
.es-content-body ol li {
    color: #333333;
}

.es-content-body a {
    color: #1376c8;
}

.es-header {
    background-color: transparent;
    background-image: ;
    background-repeat: repeat;
    background-position: center top;
}

.es-header-body {
    background-color: transparent;
}

.es-header-body p,
.es-header-body ul li,
.es-header-body ol li {
    color: #333333;
    font-size: 14px;
}

.es-header-body a {
    color: #1376c8;
    font-size: 14px;
}

.es-footer {
    background-color: transparent;
    background-image: ;
    background-repeat: repeat;
    background-position: center top;
}

.es-footer-body {
    background-color: transparent;
}

.es-footer-body p,
.es-footer-body ul li,
.es-footer-body ol li {
    color: #333333;
    font-size: 11px;
}

.es-footer-body a {
    color: #1376c8;
    font-size: 11px;
}

.es-infoblock,
.es-infoblock p,
.es-infoblock ul li,
.es-infoblock ol li {
    line-height: 120%;
    font-size: 12px;
    color: #cccccc;
}

.es-infoblock a {
    font-size: 12px;
    color: #2cb543;
}

a.es-button {
    border-style: solid;
    border-color: #5a67d8;
    border-width: 10px 20px 10px 20px;
    display: inline-block;
    background: #5a67d8;
    border-radius: 30px;
    font-size: 18px;
    font-family: arial, 'helvetica neue', helvetica, sans-serif;
    font-weight: normal;
    font-style: normal;
    line-height: 120%;
    color: #ffffff;
    text-decoration: none;
    width: auto;
    text-align: center;
}

.es-button-border {
    border-style: solid solid solid solid;
    border-color: #5a67d8 #5a67d8 #5a67d8 #5a67d8;
    background: #5a67d8;
    border-width: 0px 0px 2px 0px;
    display: inline-block;
    border-radius: 30px;
    margin-top: 20px;
    width: auto;
}


/*
RESPONSIVE STYLES
Please do not delete and edit CSS styles below.

If you don't need responsive layout, please delete this section.
*/
@media only screen and (max-width: 600px) {

    p,
    ul li,
    ol li,
    a {
        font-size: 16px !important;
        line-height: 150% !important;
    }

    h1 {
        font-size: 30px !important;
        text-align: center;
        line-height: 120% !important;
    }

    h2 {
        font-size: 26px !important;
        text-align: center;
        line-height: 120% !important;
    }

    h3 {
        font-size: 20px !important;
        text-align: center;
        line-height: 120% !important;
    }

    h1 a {
        font-size: 30px !important;
    }

    h2 a {
        font-size: 26px !important;
    }

    h3 a {
        font-size: 20px !important;
    }

    .es-menu td a {
        font-size: 16px !important;
    }

    .es-header-body p,
    .es-header-body ul li,
    .es-header-body ol li,
    .es-header-body a {
        font-size: 16px !important;
    }

    .es-footer-body p,
    .es-footer-body ul li,
    .es-footer-body ol li,
    .es-footer-body a {
        font-size: 16px !important;
    }

    .es-infoblock p,
    .es-infoblock ul li,
    .es-infoblock ol li,
    .es-infoblock a {
        font-size: 12px !important;
    }

    *[class="gmail-fix"] {
        display: none !important;
    }

    .es-m-txt-c,
    .es-m-txt-c h1,
    .es-m-txt-c h2,
    .es-m-txt-c h3 {
        text-align: center !important;
    }

    .es-m-txt-r,
    .es-m-txt-r h1,
    .es-m-txt-r h2,
    .es-m-txt-r h3 {
        text-align: right !important;
    }

    .es-m-txt-l,
    .es-m-txt-l h1,
    .es-m-txt-l h2,
    .es-m-txt-l h3 {
        text-align: left !important;
    }

    .es-m-txt-r img,
    .es-m-txt-c img,
    .es-m-txt-l img {
        display: inline !important;
    }

    .es-button-border {
        display: block !important;
    }

    a.es-button {
        font-size: 20px !important;
        display: block !important;
        border-width: 10px 0px 10px 0px !important;
    }

    .es-btn-fw {
        border-width: 10px 0px !important;
        text-align: center !important;
    }

    .es-adaptive table,
    .es-btn-fw,
    .es-btn-fw-brdr,
    .es-left,
    .es-right {
        width: 100% !important;
    }

    .es-content table,
    .es-header table,
    .es-footer table,
    .es-content,
    .es-footer,
    .es-header {
        width: 100% !important;
        max-width: 600px !important;
    }

    .es-adapt-td {
        display: block !important;
        width: 100% !important;
    }

    .adapt-img {
        width: 100% !important;
        height: auto !important;
    }

    .es-m-p0 {
        padding: 0px !important;
    }

    .es-m-p0r {
        padding-right: 0px !important;
    }

    .es-m-p0l {
        padding-left: 0px !important;
    }

    .es-m-p0t {
        padding-top: 0px !important;
    }

    .es-m-p0b {
        padding-bottom: 0 !important;
    }

    .es-m-p20b {
        padding-bottom: 20px !important;
    }

    .es-mobile-hidden,
    .es-hidden {
        display: none !important;
    }

    tr.es-desk-hidden,
    td.es-desk-hidden,
    table.es-desk-hidden {
        display: table-row !important;
        width: auto !important;
        overflow: visible !important;
        float: none !important;
        max-height: inherit !important;
        line-height: inherit !important;
    }

    .es-desk-menu-hidden {
        display: table-cell !important;
    }

    table.es-table-not-adapt,
    .esd-block-html table {
        width: auto !important;
    }

    table.es-social {
        display: inline-block !important;
    }

    table.es-social td {
        display: inline-block !important;
    }
}

/* INVOICE  */
.sub-table {margin: 10px auto;text-align: left;width: 100%;}
.sub-table td {padding: 5px 0;}
.sub-table .sub-table-items {width: 100%;}
.sub-table .sub-table-items td {border-top: #eee 1px solid;}
.sub-table .sub-table-items .total td {border-top: 2px solid #333;border-bottom: 2px solid #333;font-weight: 700;}


/* DARK MODE */
:root {
  color-scheme: light dark;
  supported-color-schemes: light dark;
}

/* DARK-MODE */
@media (prefers-color-scheme: dark ) {
    body {background-color:#424242 !important;}

    h1, h2, h3, h4, h5, h6, p, span, a, b { color: #ffffff !important; }

    .es-wrapper,
    .es-wrapper-color {
        background-color: #424242 !important;
    }

    .es-content-body {
        background-color: #303030 !important;
    }

    .es-content-body p,
    .es-content-body ul li,
    .es-content-body ol li {
        color: #fff !important;
    }

}
/*
END RESPONSIVE STYLES
*/
    </style>

    <!--[if (mso 16)]>
    <style type="text/css">
    a {text-decoration: none;}
    </style>
    <![endif]-->
    <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
    <!--[if gte mso 9]>
<xml>
    <o:OfficeDocumentSettings>
    <o:AllowPNG></o:AllowPNG>
    <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
</xml>
<![endif]-->
</head>

<body>
    <div class="es-wrapper-color">
        <!--[if gte mso 9]>
			<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
				<v:fill type="tile" color="#f6f6f6"></v:fill>
			</v:background>
		<![endif]-->
        <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">
            <tbody>
                <tr>
                    <td class="esd-email-paddings" valign="top">
                        <!-- HEADER -->
                        <table  class="header" role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                          <tr>
                            <td class="align-center" width="100%">
                              <h1><a href="https://coinlen.com">coinlen.com</a></h1>
                            </td>
                          </tr>
                        </table>
                        <!-- // HEADER -->
                            ${content}
                        <!-- FOOTER -->
                        <table class="es-footer" cellspacing="0" cellpadding="0" align="center">
                            <tbody>
                                <tr>
                                    <td class="esd-stripe" align="center">
                                        <table class="es-footer-body" width="600" cellspacing="0" cellpadding="0" align="center">
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
                                                                                    <td class="esd-block-text es-p10t es-p10b" align="center">
                                                                                        <p>© 2020 Coinlen | Turkey's stock market followed live crypto. </p>
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
                        <table class="esd-footer-popover es-content" cellspacing="0" cellpadding="0" align="center">
                            <tbody>
                                <tr>
                                    <td class="esd-stripe" align="center">
                                        <table width="600" cellspacing="0" cellpadding="0" align="center">
                                            <tbody>
                                                <tr>
                                                    <td class="esd-structure es-p30b es-p20r es-p20l" align="left">
                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="esd-container-frame" width="560" valign="top" align="center">
                                                                        <table width="100%" cellspacing="0" cellpadding="0">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td class="esd-block-image es-infoblock" align="center" style="font-size:0">
                                                                                        <a href="http://coinlen.com?temp_source=email&temp_view=welcome">coinlen.com</a>
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
                        <!-- /// FOOTER -->
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</body>

</html>`;;
};
