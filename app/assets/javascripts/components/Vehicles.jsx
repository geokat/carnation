var Vehicles = React.createClass({

  getInitialState: function() {
    return {
      values: this.props.data,
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

  handleUpdate: function(vehicle) {
    var index = this.state.values.indexOf(vehicle);
    if (index === -1)
      this.state.values.push(vehicle)
    this.forceUpdate();
  },

  handleDelete: function(vehicle) {
    var vehicles = this.state.values;
    var index = vehicles.indexOf(vehicle);
    vehicles.splice(index, 1);
    this.setState({values: vehicles});
  },

  render: function() {
    return (
      <div>
        {this.renderFlash()}
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
                               handleDelete={this.handleDelete}
                               flash={this.flash} />

            })}
            <Vehicle vehicle={{}}
                     key={this.state.values.length}
                     people={this.props.people}
                     handleUpdate={this.handleUpdate}
                     flash={this.flash} />
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
