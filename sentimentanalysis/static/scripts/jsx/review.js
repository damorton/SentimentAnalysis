
var ReviewComponent = React.createClass({
  // sets initial state
  getInitialState: function() {
    return {
      commentString: '',
      sentimentValue : '',
      sendCommentString : ''
    };
  },
  analyseReview : function() {
    var config = {
      headers: {'Access-Control-Allow-Origin': '*'}
    };

    axios.get(`http://9.162.219.154:5000/api/analyse?review=` + this.state.sendCommentString, config)
    .then( result => {
      this.setState({
        commentString : result.data.commentString,
        sentimentValue : result.data.sentimentValue
      });
    })
    .catch(function (error) {
      console.log(error);
    });

  },
  handleChange : function(e){
    this.setState({sendCommentString : e.target.value});
  },
  render: function (){
      return (
        <div class="review">
        Comment: <br/>
        <input type='text' size="40" onChange={this.handleChange} placeholder='Enter your comment...'/><br/>
        <input type='button' value='Analyse' onClick={this.analyseReview}/>
        <br/>
        <p>
          Original Comment: {this.state.commentString}<br/>
          Sentiment: {this.state.sentimentValue}
        </p>
        </div>
      );
  }
});

ReactDOM.render(
  <ReviewComponent/>,
  document.getElementById('review')
);
