import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";

const InfoGrid = ({ title, ctn }) => {
  return (
    <>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        {title}
      </Typography>
      <Table>
        <TableBody>
          {Object.entries(ctn).map(([key, val]) => (
            <TableRow key={key}>
              <TableCell>{key}</TableCell>
              <TableCell>{val}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default InfoGrid;
