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
          className="newPingInputTerm newPingInput"
        />
        <h5>Notification Method</h5>
        <span>Email: </span>
        <input
          type="text"
          placeholder="Ex. test@test.com"
          value={this.state.notifyMethod}
          onChange={this.handleNotifyMethodChange}
          className="newPingInputNotifyMethod"
        />
        <h5>Quality</h5>
        <input
          type="number"
          placeholder="Ex. 720"
          value={this.state.quality}
          onChange={this.handleQualityChange}
          className="newPingInputQuality newPingInput"
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
