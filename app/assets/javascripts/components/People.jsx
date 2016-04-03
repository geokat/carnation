var People = React.createClass({

  getInitialState: function() {
    return {
      values: this.props.data,
    };
  },

  handleUpdate: function(person) {
    var index = this.state.values.indexOf(person);
    if (index === -1)
      this.state.values.push(person)
    this.forceUpdate();
  },

  handleDelete: function(person) {
    var people = this.state.values;
    var index = people.indexOf(person);
    people.splice(index, 1);
    this.setState({values: people});
  },

  render: function() {
    return (
      <div>
        <h2>Household info: people</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th className="col-md-2">First name</th>
              <th className="col-md-2">Last name</th>
              <th className="col-md-3">Email address</th>
              <th className="col-md-1">Age</th>
              <th className="col-md-1">Gender</th>
              <th className="col-md-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.values.map((v, k) => {
               return <Person person={v}
                              key={k}
                              handleUpdate={this.handleUpdate}
                              handleDelete={this.handleDelete} />
            })}
            <Person person={{}}
                    key={this.state.values.length}
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
