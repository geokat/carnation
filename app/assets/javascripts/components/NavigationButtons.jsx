var NavigationButtons = React.createClass({

  handleNext: function(e) {
    this.props.handleNext(e, this.props.flash);
  },

  render: function() {
    return (
      <div className="text-center">
        <div className="btn-group" role="group">
          <a className="btn btn-default"
             disabled={this.props.disableBack}
             onClick={this.props.handleBack}>Back</a>
          <a className="btn btn-default"
             disabled={this.props.disableNext}
             onClick={this.handleNext}>Next</a>
        </div>
      </div>
    );
  },

});
