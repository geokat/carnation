var Vehicles = React.createClass({

  getInitialState: function() {
    return {
      values: this.props.data,
    };
  },

  handleUpdate: function(vehicle) {
    var index = this.state.values.indexOf(vehicle);
    if (index === -1)
      this.state.values.push(vehicle)
    this.forceUpdate();
  },

  handleDelete: function(vehicle) {
    var vehicles = this.state.values;
    var index = people.indexOf(vehicle);
    people.splice(index, 1);
    this.setState({values: vehicles});
  },

  render: function() {
    return (
      <div>
        <h2>Household info: vehicles</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th className="col-md-2">Make</th>
              <th className="col-md-2">Model</th>
              <th className="col-md-1">Year</th>
              <th className="col-md-1">License plate</th>
              <th className="col-md-1">Owner</th>
              <th className="col-md-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.values.map((v, k) => {
               return <Vehicle vehicle={v}
                               key={k}
                               people={this.props.people}
                               handleUpdate={this.handleUpdate}
                               handleDelete={this.handleDelete} />
            })}
            <Vehicle vehicle={{}}
                     key={this.state.values.length}
                     people={this.props.people}
                     handleUpdate={this.handleUpdate} />
          </tbody>
        </table>
        <NavigationButtons disableBack={false}
                           disableNext={false}
                           handleBack={this.props.prevStep}
                           handleNext={this.props.nextStep} />
      </div>
    );
  },

});
