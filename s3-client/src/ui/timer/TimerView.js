import React from "react";
import _ from "lodash";
import moment from "moment";
import classnames from "classnames";
import { ts } from "../../utils";

import { compose, lifecycle, withHandlers, withState } from "recompose";

import { Badge } from "reactstrap";

const STOPPED = "STOPPED";
const READY = "READY";
const INSPECT = "INSPECT";
const RUNNING = "RUNNING";
const ENDED = "ENDED";

const SPACE = " ";
const CONTROL = "Control";
const SHIFT = "Shift";
const ENTER = "Enter";

let DurationDisplay = ({ duration, sms }) => (
  <div
    className={classnames("DurationDisplay", {
      "text-success": sms === READY,
      "text-black-50": sms === RUNNING,
      "text-warning": sms === INSPECT
    })}
    style={{
      fontSize: "37vw",
      transform: "scale(0.4, 1)",
      marginLeft: "-26vw",
      marginTop: "-13vw",
      marginBottom: "-13vw"
    }}
  >
    {ts(duration)}
  </div>
);

const TimerView = ({ timerState }) => (
  <div className="TimerView">
    <DurationDisplay duration={timerState.duration} sms={timerState.sms} />
    {timerState.laps.map((lap, i) => (
      <Badge color="primary" key={i}>
        {ts(lap)}
      </Badge>
    ))}
    <div>{timerState.sms}</div>
  </div>
);

const getInitialState = (sms = STOPPED) => ({
  startTime: -1,
  duration: moment.duration(0),
  endTime: 0,
  sms,
  laps: [],
  handle: null
});

export default compose(
  withState("timerState", "setTimerState", () => getInitialState()),
  withHandlers({
    updateDuration: ({ timerState, setTimerState }) => duration => {
      if (_.isNil(duration)) {
        duration = moment.duration(new Date().getTime() - timerState.startTime);
      }
      setTimerState({
        ...timerState,
        duration
      });
    }
  }),
  withHandlers({
    reset: ({ setTimerState }) => sms => setTimerState(getInitialState(sms)),
    start: ({ timerState, setTimerState, updateDuration }) => () => {
      if (!_.isNil(timerState.handle)) {
        clearInterval(timerState.handle);
      }
      setTimerState({
        startTime: new Date().getTime(),
        duration: moment.duration(0),
        endTime: 0,
        sms: RUNNING,
        laps: [],
        handle: setInterval(updateDuration, 30)
      });
    },
    stop: ({ timerState, setTimerState }) => () => {
      const endTime = new Date().getTime();
      if (!_.isNil(timerState.handle)) {
        clearInterval(timerState.handle);
      }
      setTimerState({
        ...timerState,
        endTime,
        duration: moment.duration(endTime - timerState.startTime),
        sms: ENDED,
        handle: null
      });
    },
    addLap: ({ timerState, setTimerState }) => () => {
      if (timerState.sms === RUNNING) {
        timerState.laps.push(
          moment.duration(new Date().getTime() - timerState.startTime)
        );
        setTimerState({ ...timerState });
      }
    }
  }),
  withHandlers({
    inspect: ({ start, timerState, setTimerState, updateDuration }) => () => {
      if (!_.isNil(timerState.handle)) {
        clearInterval(timerState.handle);
      }
      const countHolder = { count: 15 }; // TODO: configurable inspeection time
      setTimerState({
        startTime: new Date().getTime() + 15000,
        duration: moment.duration(15000),
        endTime: 0,
        sms: INSPECT,
        laps: [],
        handle: setInterval(() => {
          if (--countHolder.count > 0) {
            updateDuration(moment.duration(countHolder.count * 1000));
          } else {
            start();
          }
        }, 1000)
      });
    }
  }),
  lifecycle({
    componentWillMount() {
      document.addEventListener(
        "keydown",
        event => {
          const keyName = event.key;
          switch (event.key) {
            case SPACE: {
              switch (this.props.timerState.sms) {
                case STOPPED:
                case INSPECT: {
                  this.props.reset(READY);
                  break;
                }
                case RUNNING: {
                  this.props.stop();
                  break;
                }
                default:
              }

              break;
            }
            case CONTROL:
            case SHIFT: {
              if (this.props.timerState.sms === RUNNING) {
                this.props.addLap();
              }
              break;
            }
            case ENTER: {
              if (this.props.timerState.sms === STOPPED) {
                this.props.inspect();
              }
              break;
            }
            default:
          }
          console.log("DOWN", { event, keyName });
        },
        false
      );
      document.addEventListener(
        "keyup",
        event => {
          const keyName = event.key;
          switch (this.props.timerState.sms) {
            case READY: {
              this.props.start();
              break;
            }
            case ENDED: {
              this.props.setTimerState({
                ...this.props.timerState,
                sms: STOPPED
              });
              break;
            }
            default:
          }
          console.log("UP", { event, keyName });
        },
        false
      );
    },
    componentWillUnmount() {
      if (!_.isNil(this.props.timerState.handle)) {
        clearInterval(this.props.timerState.handle);
      }
    }
  })
)(TimerView);
