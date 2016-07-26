var NewPingBox = React.createClass({
  render: function() {
    return (
      <div className='newPingBox'>
        <p>New Ping</p>
        <NewPingForm />
      </div>
    );
  }
});

var NewPingForm = React.createClass({
  render: function() {
    return (
      <p>New Ping form</p>
      // <form className="commentForm" onSubmit={this.handleSubmit}>
      //   <input
      //     type="text"
      //     placeholder="Your name"
      //     value={this.state.author}
      //     onChange={this.handleAuthorChange}
      //   />
      //   <input
      //     type="text"
      //     placeholder="Say something..."
      //     value={this.state.text}
      //     onChange={this.handleTextChange}
      //   />
      //   <input type="submit" value="Post" />
      // </form>
    );
  }
});

ReactDOM.render(
  <NewPingBox />,
  document.getElementById('newPingContainer')
);
