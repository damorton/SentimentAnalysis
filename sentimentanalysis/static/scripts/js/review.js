(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

var ReviewComponent = React.createClass({displayName: "ReviewComponent",
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
        React.createElement("div", {class: "review"}, 
        "Comment: ", React.createElement("br", null), 
        React.createElement("input", {type: "text", size: "40", onChange: this.handleChange, placeholder: "Enter your comment..."}), React.createElement("br", null), 
        React.createElement("input", {type: "button", value: "Analyse", onClick: this.analyseReview}), 
        React.createElement("br", null), 
        React.createElement("p", null, 
          "Original Comment: ", this.state.commentString, React.createElement("br", null), 
          "Sentiment: ", this.state.sentimentValue
        )
        )
      );
  }
});

ReactDOM.render(
  React.createElement(ReviewComponent, null),
  document.getElementById('review')
);

},{}]},{},[1]);
