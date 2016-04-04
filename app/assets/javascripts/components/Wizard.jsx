var _data = {
  household: {
    address: null,
    zip:     null,
    city:    null,
    state:   null,
    nob:     null
  },
  people: [],
  vehicles: []
};

var Wizard = React.createClass({

  getInitialState: function() {
    return {
      step: 1,
    };
  },

  submitData: function(e, flash) {
    e.preventDefault();

    // Perform deep copy of _data in case we fail submission
    // and the user revisits the steps.
    var data = $.extend(true, {}, _data);

    // Massage data for submission to rails.
    for (var p in data.people) {
      // Rename gender to is_male.
      data.people[p].is_male = data.people[p].gender;
      delete data.people[p].gender;

      data.people[p].vehicles_attributes = [];
    }
    for (var v in data.vehicles) {
      var person = $.grep(data.people, (p) => {
        return p.email === data.vehicles[v].person.email
      })[0];
      delete data.vehicles[v].person;
      person.vehicles_attributes.push(data.vehicles[v]);
    }
    delete data.vehicles;
    data.household.people_attributes = data.people;
    delete data.people;

    $.ajax({
      method: 'POST',
      url: '/households/',
      dataType: 'JSON',
      data: data,
      success: () => {
        this.setState({step: this.state.step + 1});
      },
      error: (jqXHR, msg) => {
        flash('Could not submit data: ' + msg);
      }
    });
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

      case 5:
        return <h1>Thank you!</h1>;
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

