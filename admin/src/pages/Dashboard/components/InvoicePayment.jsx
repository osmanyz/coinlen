import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// material
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import IconButton from '@material-ui/core/IconButton';
// icons
import PageviewIcon from '@material-ui/icons/Pageview';

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function IvoicePayments(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell key="createdAt">Created At</TableCell>
            <TableCell key="price">Price</TableCell>
            <TableCell key="name">Name</TableCell>
            <TableCell key="email">User</TableCell>
            <TableCell key="status">Status</TableCell>
            <TableCell width="2%" align="right">
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.payments.data !== null &&
            props.payments.data.length > 0 &&
            props.payments.data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <Moment date={row.createdAt} format="DD/MM/YYYY HH:mm:ss" />
                </TableCell>
                <TableCell>
                  {row.currency === 'USD' && '$'}
                  {row.price}
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{props.payments.statusesReverse[row.status]}</TableCell>
                <TableCell align="right">
                  <IconButton size="small" component={Link} to={`/payment/${row.id}`}>
                    <PageviewIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link to={'/payment'}>See more orders</Link>
      </div>
    </React.Fragment>
  );
}

IvoicePayments.propTypes = {
  payments: PropTypes.object,
};
