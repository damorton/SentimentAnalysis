
var HeadingComponent = React.createClass({
  render: function (){
      return (
        <div class="heading">
          <h1>{this.props.name}</h1>
        </div>
      );
  }
});

ReactDOM.render(
  <HeadingComponent name="Sentiment Analysis" />,
  document.getElementById('heading')
);
