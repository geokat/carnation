var Summary = React.createClass({

  render: function() {
    return (
      <div>
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
                           handleNext={this.props.nextStep} />

      </div>
    );
  },
});
