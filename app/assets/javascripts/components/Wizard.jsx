var _data = {
  // FIXME!!!
  household: {
    address: '123 Pine St',
    zip:     '91423',
    city:    'Oakville',
    state:   'IL',
    nob:     3,
  },
  // FIXME!!!
  people:   [
    {
      first:  'Andrew',
      last:   'Mason',
      email:  'andrew@asdf.com',
      age:    '23',
      gender: true,
    },
    {
      first:  'Jane',
      last:   'Doe',
      email:  'jane@asdf.com',
      age:    '18',
      gender: false,
    },
  ],
  vehicles: []
};

// FIXME!!!
_data.vehicles = [
  {
    make:  'Buick',
    model: 'Skylark',
    year:  1964,
    license: 'AJ124',
    person: _data.people[1]
  },
];

var Wizard = React.createClass({

  getInitialState: function() {
    return {
      step: 1,
    };
  },

  submitData: function() {
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
                       vehicles={_data.vehicles}
                       nextStep={this.nextStep}
                       prevStep={this.prevStep} />;
      case 3:
        return <Vehicles data={_data.vehicles}
                         people={_data.people}
                         nextStep={this.nextStep}
                         prevStep={this.prevStep} />;

      case 4:
        return <Summary data={_data}
                        prevStep={this.prevStep}
                        nextStep={this.submitData} />;
    };
  },

  render: function() {
    var pbarLabel = Math.round((this.state.step - 1) / 4 * 100) + '%';
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

