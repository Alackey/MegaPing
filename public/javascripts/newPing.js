var NewPingBox = React.createClass({
  render: function() {
    return (
      <div className="newPingBox">
        <p>New Ping</p>
        <NewPingForm />
      </div>
    );
  }
});

var NewPingForm = React.createClass({
  getInitialState: function() {
    return {term: '', notifyMethod: '', quality: undefined};
  },
  handleAuthorChange: function(e) {
      this.setState({term: e.target.value});
  },
  handleNotifyMethodChange: function(e) {
      this.setState({notifyMethod: e.target.value});
  },
  handleQualityChange: function(e) {
      this.setState({quality: e.target.value});
  },
  render: function() {
    return (
      <form className="newPingForm" onSubmit={this.handleSubmit}>
        <h5>Term</h5>
        <input
          type="text"
          placeholder="Term"
          value={this.state.term}
          onChange={this.handleAuthorChange}
          className="newPingInputTerm newPingInput newPingAllInput"
        />
        <h5>Notification Method</h5>
        <div className="row">
          <div className="col-sm-1">
            <div className="newPingInputNotifyMethodType">
              <span>Email:</span>
            </div>
          </div>
          <div className="col-sm-11">
            <input
              type="text"
              placeholder="Ex. test@test.com"
              value={this.state.notifyMethod}
              onChange={this.handleNotifyMethodChange}
              className="newPingInputNotifyMethod newPingAllInput"
            />
          </div>
        </div>
        <h5>Quality</h5>
        <input
          type="number"
          placeholder="Ex. 720"
          onChange={this.handleQualityChange}
          className="newPingInputQuality newPingInput newPingAllInput"
        />
        <input type="submit" value="Ping" />
      </form>
    );
  }
});

ReactDOM.render(
  <NewPingBox />,
  document.getElementById('newPingContainer')
);
