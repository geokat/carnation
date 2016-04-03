var Vehicle = React.createClass({

  getInitialState: function() {
    return {
      values: this.props.vehicle,
      edit:   this.isBlank(),
      errors: {
        make:    'has-none',
        model:   'has-none',
        year:    'has-none',
        license: 'has-none',
        person:  'has-none',
      }
    };
  },

  isBlank: function() {
    return Object.keys(this.props.vehicle).length === 0;
  },

  handleDelete: function(e) {
    e.preventDefault();
    this.props.handleDelete(this.state.values);
  },

  handleCancel: function(e) {
    // There may be flagged errors from the previous
    // edit and save try.
    for (var field in this.state.errors) {
      this.state.errors[field] = 'has-none';
    }
    this.setState({edit: false})
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
    for (var ref in this.refs) {
      var val = ReactDOM.findDOMNode(this.refs[ref]).value;
      this.state.values[ref] = val;
    }
    this.state.edit = false;
    this.props.handleUpdate(this.state.values);
  },

  vehicleRow: function() {
    return (
      <tr>
        <td>{this.state.values.make}</td>
        <td>{this.state.values.model}</td>
        <td>{this.state.values.year}</td>
        <td>{this.state.values.license}</td>
        <td>{this.state.values.person}</td>
        <td>
          <a className="btn btn-default" onClick={() => this.setState({edit: true})}>
            Edit
          </a>
          <a className="btn btn-danger" onClick={this.handleDelete}>
            Delete
          </a>
        </td>
      </tr>
    );
  },

  vehicleForm: function() {
    var cancelStyle = this.isBlank()?
                      {visibility: 'hidden'} : {visibility: 'visible'};
    return (
      <tr>
        <td className={this.state.errors.make}>
          <input className="form-control"
                 type="text"
                 defaultValue={this.state.values.make}
                 ref="make" />
        </td>
        <td className={this.state.errors.model}>
          <input className="form-control"
                 type="text"
                 defaultValue={this.state.values.model}
                 ref="model" />
        </td>
        <td className={this.state.errors.year}>
          <input className="form-control"
                 type="text"
                 defaultValue={this.state.values.year}
                 ref="year" />
        </td>
        <td className={this.state.errors.license}>
          <input className="form-control"
                 type="text"
                 defaultValue={this.state.values.license}
                 ref="license" />
        </td>
        <td className={this.state.errors.person}>
          <input className="form-control"
                 type="text"
                 defaultValue={this.state.values.person}
                 ref="person" />
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

  render: function() {
    if (this.state.edit)
      return this.vehicleForm();
    else
      return this.vehicleRow();
  },

});
