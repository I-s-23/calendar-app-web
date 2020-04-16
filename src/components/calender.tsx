import React, { useState, useRef } from "react";
import format from "date-fns/format";
import getDate from "date-fns/getDate";
import getDay from "date-fns/getDay";
import eachDayOfInterval from "date-fns/eachDayOfInterval";
import endOfWeek from "date-fns/endOfWeek";
import eachWeekOfInterval from "date-fns/eachWeekOfInterval";
import addMonths from "date-fns/addMonths";
import subMonths from "date-fns/subMonths";
import startOfMonth from "date-fns/startOfMonth";
import endOfMonth from "date-fns/endOfMonth";
import styled from "styled-components";
import isSameMonth from "date-fns/isSameMonth";
import isSameDay from "date-fns/isSameDay";
import blue from "@material-ui/core/colors/blue";
import red from "@material-ui/core/colors/red";
import pink from "@material-ui/core/colors/pink";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

// Material-UI のButtonをカッコで囲んで、styled の引数にしてCSS in JSを実現している.
const StyledButton = styled(Button)`
  background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
  border-radius: 3px;
  border: 0;
  color: white;
  height: 48px;
  padding: 0 30px;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);
`;

const StyledPaper = styled(Paper)`
  margin: (5, 10);
  padding: (5, 5);
`;

const StyleTypography = styled(Typography)`
  text-align: center;
  margin: (2, 0, 1, 0);
`;

const StyleTableHeadCell = styled(TableCell)`
  text-align: center;
`;

interface Props {
  wday: Number;
  isTargetMonth: Boolean;
  istargetday: boolean;
  children: any;
}

// Propsで扱っている情報を引数として日付として取得し、表示用のstyled-componentsに格納
function CalendarTableCell(props: Props) {
  const { wday, isTargetMonth, istargetday, children, ...other } = props;
  return (
    <StyleTableCell
      wday={props.wday}
      isTargetMonth={props.isTargetMonth}
      istargetday={props.istargetday}
  >{props.children}</StyleTableCell>
  );
}

// 引数に応じてCellの色を変化させる。対象月、本日、土日と平日などで色分け
const StyleTableCell = styled(TableCell)<{
  wday: Number;
  isTargetMonth: Boolean;
  istargetday: boolean;
}>`
  text-align: center;
  color: ${({ wday, isTargetMonth }): string => {
    if (isTargetMonth) {
      switch (wday) {
        case 0: // Sunday
          return red[500];
        case 6: // Saturday
          return blue[500];
        default:
          return "black";
      }
    } else {
      // previous or next month
      switch (wday) {
        case 0: // Sunday
          return red[200];
        case 6: // Saturday
          return blue[200];
        default:
          return "black";
      }
    }
  }};
  background: ${(istargetday): string => (istargetday ? pink[50] : blue[500])};
`;

// カレンダーに表示するための一月分のArrayを返す関数
const getCalendarArray = (date: Date): Date[][] => {
  const sundays = eachWeekOfInterval({
    start: startOfMonth(date),
    end: endOfMonth(date)
  });
  return sundays.map(sunday =>
    eachDayOfInterval({ start: sunday, end: endOfWeek(sunday) })
  );
};

// カレンダーを表示するReactのFunctionComponent
const calendar: React.FC = () => {
  const [targetDate, setTargetDate] = useState(new Date());

  const oneMonth = getCalendarArray(targetDate);
  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];

  return (
    <div>
      <StyledPaper>
        <Grid container justify="space-between">
          <Grid item>
            <StyledButton
              type="button"
              onClick={(): void =>
                setTargetDate(current => subMonths(current, 1))
              }
            >
              前の月
            </StyledButton>
          </Grid>
          <Grid item>
            <StyledButton
              type="button"
              onClick={(): void => setTargetDate(new Date())}
            >
              今月
            </StyledButton>
          </Grid>
          <Grid item>
            <StyledButton
              type="button"
              onClick={(): void =>
                setTargetDate(current => addMonths(current, 1))
              }
            >
              次の月
            </StyledButton>
          </Grid>
        </Grid>
        <StyleTypography>{format(targetDate, "y年M月")}</StyleTypography>
        <Table>
          <TableHead>
            <TableRow>
              {weekdays.map(day => (
                <StyleTableHeadCell key={day}>{day}</StyleTableHeadCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {oneMonth.map((weekRow, rowNum) => (
              <TableRow key={rowNum.toString()}>
                {weekRow.map(date => (
                  <CalendarTableCell
                    key={getDay(date)}
                    wday={getDay(date)}
                    isTargetMonth={isSameMonth(date, targetDate)}
                    istargetday={isSameDay(date, targetDate)}
                  >
                    {getDate(date)}
                  </CalendarTableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledPaper>
    </div>
  );
};

export default calendar;
