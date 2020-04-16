import { v4 as uuidv4 } from "uuid";
export default class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.message = this.props.message;
    this.state.currentUser = this.props.currentUser;
    this.state.groupDetails = this.props.groupDetails;
    this.state.usersInGroup = this.props.usersInGroup;
    this.state.userImageChanged = this.props.userImageChanged;
  }

  render() {
    let message = this.state.message;
    let currentUser = this.state.currentUser;
    let usersDetails = this.state.usersInGroup;
    let renderedMessage;
    let date = formatDate(new Date(message.timeSent));

    let popUpText =
      usersDetails.get(message.userId).firstName +
      " " +
      usersDetails.get(message.userId).lastName +
      " - " +
      date;
    let imgPath;
    if (usersDetails.get(message.userId).profImgExists) {
      imgPath = "public/uploads/profImg_user" + message.userId + "_.png";

      if (this.state.userImageChanged == message.userId) {
        imgPath += "?v=" + uuidv4();
      }
    } else {
      imgPath = "public/info.png";
    }
    if (message.userId == currentUser.id) {
      renderedMessage = (
        <React.Fragment>
          <div className="row mt-2 mb-2 justify-content-end">
            <p
              data-toggle="tooltip"
              data-placement="right"
              data-html="false"
              title={popUpText}
              style={{
                display: "inline-block",
                maxWidth: "70%",
                overflow: "auto",
                wordWrap: "break-word"
              }}
              className="text-light bg-primary rounded p-2 mr-2"
            >
              {message.messageText}
            </p>
          </div>
        </React.Fragment>
      );
    } else {
      renderedMessage = (
        <div className="row mt-2 mb-2">
          <img
            src={imgPath}
            data-toggle="tooltip"
            data-placement="right"
            data-html="false"
            title={popUpText}
            className="mr-2 ml-2 img-thumbnail rounded-circle"
            style={{ width: "8%", height: "8%" }}
            alt="UserImg"
          />
          <p
            style={{
              display: "inline-block",
              maxWidth: "70%",
              overflow: "auto",
              wordWrap: "break-word"
            }}
            className="text-light bg-dark rounded  p-2"
          >
            {message.messageText}
          </p>
        </div>
      );
    }
    return <React.Fragment> {renderedMessage} </React.Fragment>;
  }
}

/**
 * 
 * @param {Date} date 
 * @return {string} - the formatted date E.g. "6 March 2020 - 14:58"
 */
function formatDate(date) {
  let month = [];
  month[0] = "January";
  month[1] = "February";
  month[2] = "March";
  month[3] = "April";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "August";
  month[8] = "September";
  month[9] = "October";
  month[10] = "November";
  month[11] = "December";

  let hourSent = date.getHours();
  let minuteSent = date.getMinutes();

  if (hourSent < 10) {
    hourSent = "0" + hourSent;
  }

  if (minuteSent < 10) {
    minuteSent = "0" + minuteSent;
  }

  let customDateHoursMins = " - " + hourSent + ":" + minuteSent;

  let customDate =
    date.getDate() +
    " " +
    month[date.getMonth()] +
    " " +
    date.getFullYear() +
    customDateHoursMins;

  return customDate;
}
