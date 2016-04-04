var Summary = React.createClass({

  getInitialState: function() {
    return {
      flash: null,
    };
  },

  flash: function(msg) {
    this.setState({flash: msg});
  },

  renderFlash: function() {
    if (!this.state.flash)
      return null;

    var msg = this.state.flash;

    // Show flash only once.
    this.state.flash = null;

    return <Flash message={msg} />;
  },

  render: function() {
    return (
      <div>
        {this.renderFlash()}
        <Household data={this.props.data.household}
                   summary={true} />

        <People data={this.props.data.people}
                vehicles={this.props.data.vehicles}
                summary={true} />

        <Vehicles data={this.props.data.vehicles}
                  people={this.props.data.people}
                  summary={true} />

        <NavigationButtons disableBack={false}
                           disableNext={false}
                           handleBack={this.props.prevStep}
                           handleNext={this.props.nextStep}
                           flash={this.flash} />

      </div>
    );
  },
});
