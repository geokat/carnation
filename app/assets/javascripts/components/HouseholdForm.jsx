var HouseholdForm = React.createClass({

  getInitialState: function() {
    return {
      edit: true,
      completed: false,
      values: this.props.data,
      errors: {
        address: 'has-none',
        city:    'has-none',
        state:   'has-none',
        zip:     'has-none',
        nob:     'has-none',
      }
    };
  },

  handleCancel: function() {
    // There may be flagged errors from the previous
    // edit and save try.
    for (var field in this.state.errors) {
      this.state.errors[field] = 'has-none';
    }
    this.setState({edit: false})
  },

  handleNext: function() {
    if (!this.state.edit) {
      this.props.nextStep();
    }
  },

  handleSave: function(e) {
    e.preventDefault();

    // Validate input values.
    var errorsPresent = false;
    for (var ref in this.refs) {
      if (!ReactDOM.findDOMNode(this.refs[ref]).value) {
        this.state.errors[ref] = 'has-error';
        errorsPresent = true;
      } else {
        this.state.errors[ref] = 'has-none';
      }
    }
    if (errorsPresent) {
      this.forceUpdate();
      return;
    }

    // Save input values and refresh.
    var values = {};
    for (var ref in this.refs) {
      var val = ReactDOM.findDOMNode(this.refs[ref]).value;
      this.state.values[ref] = val;
    }
    this.setState ({
      edit: false,
      completed: true
    });
  },

  householdForm: function() {
    var cancelStyle = this.state.completed ?
                      {visibility: 'visible'} : {visibility: 'hidden'};
    return (
      <tr>
        <td className={this.state.errors.address}>
          <input className="form-control"
                 type="text"
                 defaultValue={this.state.values.address}
                 ref="address" />
        </td>
        <td className={this.state.errors.city}>
          <input className="form-control"
                 type="text"
                 defaultValue={this.state.values.city}
                 ref="city" />
        </td>
        <td className={this.state.errors.state}>
          <input className="form-control"
                 type="text"
                 defaultValue={this.state.values.state}
                 ref="state" />
        </td>
        <td className={this.state.errors.zip}>
          <input className="form-control"
                 type="text"
                 defaultValue={this.state.values.zip}
                 ref="zip" />
        </td>
        <td className={this.state.errors.nob}>
          <input className="form-control"
                 type="number"
                 defaultValue={this.state.values.nob}
                 ref="nob" />
        </td>
        <td>
          <a className="btn btn-default" onClick={this.handleSave}>
            Save
          </a>
          <a className="btn btn-default"
             style={cancelStyle}
             onClick={this.handleCancel}>
            Cancel
          </a>
        </td>
      </tr>
    );
  },

  householdRow: function() {
    return (
      <tr>
        <td>{this.state.values.address}</td>
        <td>{this.state.values.city}</td>
        <td>{this.state.values.state}</td>
        <td>{this.state.values.zip}</td>
        <td>{this.state.values.nob}</td>
        <td>
          <a className="btn btn-default" onClick={() => this.setState({edit: true})}>
            Edit
          </a>
        </td>
      </tr>
    );
  },

  render: function() {
    return (
      <div>
        <h2>Please enter your household info</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th className="col-md-4">Address</th>
              <th className="col-md-3">City</th>
              <th className="col-md-1">State</th>
              <th className="col-md-1">ZIP code</th>
              <th className="col-md-1">Number of bedrooms</th>
              <th className="col-md-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.edit ? this.householdForm() : this.householdRow()}
          </tbody>
        </table>
        <NavigationButtons disableBack={true}
                           disableNext={this.state.edit}
                           handleBack={() => {}}
                           handleNext={this.handleNext} />
      </div>
    );
  },

});
