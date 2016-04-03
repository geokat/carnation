var _data = {
  household: {
    address: null,
    zip:     null,
    city:    null,
    state:   null,
    nob:     null,
  },
  people: [],
  vehicles: []
};

var Wizard = React.createClass({

  getInitialState: function() {
    return {
      step: 3
    };
  },

  nextStep: function() {
    this.setState({
      step: this.state.step + 1
    });
  },

  prevStep: function() {
    this.setState({
      step: this.state.step - 1
    });
  },

  renderStep: function() {
    switch(this.state.step) {
      case 1:
        return <Household data={_data.household}
                          nextStep={this.nextStep} />;
      case 2:
        return <People data={_data.people}
                       nextStep={this.nextStep}
                       prevStep={this.prevStep} />;
      case 3:
        return <Vehicles data={_data.vehicles}
                         nextStep={this.nextStep}
                         prevStep={this.prevStep} />;
    };
  },

  render: function() {
    var pbarLabel = Math.round((this.state.step - 1) / 5 * 100) + '%';
    var pbarStyle = {
      width: pbarLabel
    };

    return (
      <main>
        <div className="progress">
          <div className="progress-bar"
               role="progressbar"
               style={pbarStyle}>
            <span className="sr-only">{pbarLabel} complete</span>
          </div>
        </div>
        {this.renderStep()}
      </main>
    );
  },
});
