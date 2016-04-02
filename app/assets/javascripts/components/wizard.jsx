var _data = {
  household: {
    address: null,
    zip:     null,
    city:    null,
    state:   null,
    nob:     null,
  },
  people: null,
  vehicles: null
};

var Wizard = React.createClass({

  getInitialState: function() {
    return {
      step: 1
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

  submitWizard: function() {
    this.nextStep();
  },

  renderStep: function() {
    switch(this.state.step) {
      case 1:
        return <HouseholdForm data={_data.household}
                              nextStep={this.nextStep}
                              prevStep={this.prevStep}
                              saveVals={(data) => {_data.household = data}} />
    };
  },

  render: function() {
    var pbarLabel = Math.round((this.state.step - 1) / 3 * 100) + '%';
    var pbarStyle = {
      width: pbarLabel
    };

    return (
      <main>
        <div className="progress">
          <div className="progress-bar"
               role="progressbar"
               aria-valuenow={this.state.step}
               aria-valuemin={1}
               aria-valuemax={3}
               style={pbarStyle}>
            <span className="sr-only">{pbarLabel} complete</span>
          </div>
        </div>
        {this.renderStep()}
      </main>
    );
  },
});
