var HouseholdForm = React.createClass({

  getInitialState: function() {
    return {
      edit: true,
      household: this.props.data
    };
  },

  handleSave: function(e) {
    e.preventDefault();
    this.setState ({
      household: {
        address: ReactDOM.findDOMNode(this.refs.address).value,
        city:    ReactDOM.findDOMNode(this.refs.city).value,
        state:   ReactDOM.findDOMNode(this.refs.state).value,
        zip:     ReactDOM.findDOMNode(this.refs.zip).value,
        nob:     ReactDOM.findDOMNode(this.refs.nob).value
      },
      edit: false
    });
  },

  householdForm: function() {
    return (
      <tr>
        <td>
          <input className="form-control"
                 type="text"
                 defaultValue={this.state.household.address}
                 ref="address" />
        </td>
        <td>
          <input className="form-control"
                 type="text"
                 defaultValue={this.state.household.city}
                 ref="city" />
        </td>
        <td>
          <input className="form-control"
                 type="text"
                 defaultValue={this.state.household.state}
                 ref="state" />
        </td>
        <td>
          <input className="form-control"
                 type="text"
                 defaultValue={this.state.household.zip}
                 ref="zip" />
        </td>
        <td>
          <input className="form-control"
                 type="number"
                 defaultValue={this.state.household.nob}
                 ref="nob" />
        </td>
        <td>
          <a className="btn btn-default" onClick={this.handleSave}>
            Save
          </a>
          <a className="btn btn-default" onClick={() => this.setState({edit: false})}>
            Cancel
          </a>
        </td>
      </tr>
    );
  },

  householdRow: function() {
    return (
      <tr>
        <td>{this.state.household.address}</td>
        <td>{this.state.household.city}</td>
        <td>{this.state.household.state}</td>
        <td>{this.state.household.zip}</td>
        <td>{this.state.household.nob}</td>
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
              <th className="col-md-1">ZIP</th>
              <th className="col-md-1">Number of bedrooms</th>
              <th className="col-md-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.edit ? this.householdForm() : this.householdRow()}
          </tbody>
        </table>

        <div className="text-center">
          <div className="btn-group" role="group">
            <a className="btn btn-default" disabled onClick={this.handleBack}>
              Back
            </a>
            <a className="btn btn-default" onClick={this.handleForward}>
              Next
            </a>
          </div>
        </div>
      </div>
    );
  },

});
