import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { IconNames } from '@blueprintjs/icons';
import { doPaymentActionPure } from '../../../actions/paymentAction';
import { Button, Callout, Classes, Dialog, Drawer, Icon, Intent, H4, Position } from '@blueprintjs/core';
import WindowSizes from '../../../helpers/WindowSizes';

function DoPayment(props) {
  const [isDoPayment, setIsDoPayment] = React.useState(false);
  const [isOpenDialog, setIsOpenDialog] = React.useState(false);
  const [isOpenPaymentDrawer, setOpenPaymentDrawer] = React.useState(false);
  const crisp_website_id = '1017f9b7-ff40-435d-8978-8e81a4672800';

  const handleOpenDialogOrDrawer = () => {
    if (WindowSizes().width <= 500) {
      return handleOpenPaymentDrawer();
    } else {
      return handleOpen();
    }
  };

  const handleOpen = () => setIsOpenDialog(true);
  const handleClose = () => setIsOpenDialog(false);
  const handleOpenPaymentDrawer = () => setOpenPaymentDrawer(true);
  const handleClosePaymentDrawer = () => setOpenPaymentDrawer(false);

  const openChat = () =>
    window.open(
      `https://go.crisp.chat/chat/embed/?website_id=${crisp_website_id}&user_email=${props.auth.user.email}&user_phone=${props.auth.user.phone}`,
      '_blank',
      'height=550,width=375,toolbar=0,location=0,menubar=0'
    );

  const doPay = () => {
    setIsDoPayment(true);

    doPaymentActionPure()
      .then((res) => {
        let data = res.data;

        setTimeout(() => {
          setIsDoPayment(false);
          window.location.href = data.datum.charge.hosted_url;
        }, 1500);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const messageInfo = (
    <Callout style={{ borderRadius: 0, textAlign: 'center' }}>
      Start paying after reading what is written below.
    </Callout>
  );

  const message = (
    <React.Fragment>
      <p>
        <strong>
          Coinlen works with Coinbase and offers you the opportunity to be Premium with reliable payment methods.
        </strong>
      </p>
      <p>Your First Payment will be $5 as it will be 50% off. Subsequent payments will be $10.</p>
      <p>
        After starting to pay; Be careful not to close the Coinbase Payment page.
        The system will return you to the Coinlen, depending on whether the transaction is successful or incorrect.
      </p>
      <p>
        In Coilen, all transactions are carried out safely and all you need to do is to follow the relevant steps.
        For more information, visit{' '}
        <a href="http://coinlen.com/coinbase-payment" rel="noopener noreferrer" target="_blank">
          Coinlen's Payment page.
        </a>
      </p>
      <p>If you see an amount other than the amount you will encounter during the payment process, please return to us immediately.</p>
      <p style={{ marginBottom: 0 }}>
        Do not forget to wait for a while in case you experience any error and check on the site where your 
        balance is loaded before starting the process again.
      </p>
    </React.Fragment>
  );

  const doPayButton = (
    <Button fill={true} intent={Intent.SUCCESS} icon={IconNames.CONFIRM} onClick={doPay} loading={isDoPayment}>
      Pay 
    </Button>
  );

  return (
    <React.Fragment>
      <Callout className="callout-margin-top">
        <H4>Premium Benefits</H4>
        <ul className={classnames(Classes.TREE_NODE_LIST, Classes.TREE_ROOT)}>
          <li className={Classes.TREE_NODE_EXPANDED}>
            <div className={Classes.TREE_NODE_CONTENT}>
              <Icon icon={classnames(IconNames.STAR)} style={{ marginLeft: 5, marginRight: 5 }} />
              Stock market tracking
            </div>
          </li>
          <li className={Classes.TREE_NODE_EXPANDED}>
            <div className={Classes.TREE_NODE_CONTENT}>
              <Icon icon={classnames(IconNames.STAR)} style={{ marginLeft: 5, marginRight: 5 }} />
              Live tracking with special chart for coins
            </div>
          </li>
          <li className={Classes.TREE_NODE_EXPANDED}>
            <div className={Classes.TREE_NODE_CONTENT}>
              <Icon icon={classnames(IconNames.STAR)} style={{ marginLeft: 5, marginRight: 5 }} />
              Telegram notifications for opportunities (soon)
            </div>
          </li>
        </ul>
        <div style={{ marginTop: 5 }}>
          <Button
            intent={Intent.SUCCESS}
            icon={IconNames.CREDIT_CARD}
            onClick={handleOpenDialogOrDrawer}
            style={{ marginTop: 5, marginRight: 10 }}
          >
            Pay
          </Button>
          <Button icon={IconNames.HELP} onClick={openChat} style={{ marginTop: 5 }}>
            <span>Live Support</span>
          </Button>
        </div>
      </Callout>
      <Dialog
        autoFocus={true}
        canEscapeKeyClose={true}
        canOutsideClickClose={true}
        icon={IconNames.STAR}
        isOpen={isOpenDialog}
        onClose={handleClose}
        title="Premium Payment"
      >
        {messageInfo}
        <div className={Classes.DIALOG_BODY}>{message}</div>
        <div className={Classes.DIALOG_FOOTER}>{doPayButton}</div>
      </Dialog>
      <Drawer
        size={'100%'}
        onClose={handleClosePaymentDrawer}
        autoFocus={true}
        canEscapeKeyClose={true}
        isOpen={isOpenPaymentDrawer}
        position={Position.RIGHT}
        title="Premium Payment"
      >
        {messageInfo}
        <div className={Classes.DRAWER_BODY}>
          <div className={Classes.DIALOG_BODY}>{message}</div>
        </div>
        <div className={Classes.DRAWER_FOOTER}>{doPayButton}</div>
      </Drawer>
    </React.Fragment>
  );
}

DoPayment.propTypes = {
  auth: PropTypes.object.isRequired,
  doPayment: PropTypes.object.isRequired,
  doPaymentAction: PropTypes.func.isRequired,
};

export default DoPayment;
