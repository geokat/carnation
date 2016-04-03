var Person = React.createClass({

  getInitialState: function() {
    return {
      values: this.props.person,
      edit:   this.isBlank(),
      errors: {
        first:  'has-none',
        last:   'has-none',
        email:  'has-none',
        age:    'has-none',
        gender: 'has-none',
      }
    };
  },

  isBlank: function() {
    return Object.keys(this.props.person).length === 0;
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

  personRow: function() {
    return (
      <tr>
        <td>{this.state.values.first}</td>
        <td>{this.state.values.last}</td>
        <td>{this.state.values.email}</td>
        <td>{this.state.values.age}</td>
        <td>{this.state.values.gender}</td>
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

  personForm: function() {
    var cancelStyle = this.isBlank()?
                      {visibility: 'hidden'} : {visibility: 'visible'};
    return (
      <tr>
        <td className={this.state.errors.first}>
          <input className="form-control"
                 type="text"
                 defaultValue={this.state.values.first}
                 ref="first" />
        </td>
        <td className={this.state.errors.last}>
          <input className="form-control"
                 type="text"
                 defaultValue={this.state.values.last}
                 ref="last" />
        </td>
        <td className={this.state.errors.email}>
          <input className="form-control"
                 type="text"
                 defaultValue={this.state.values.email}
                 ref="email" />
        </td>
        <td className={this.state.errors.age}>
          <input className="form-control"
                 type="text"
                 defaultValue={this.state.values.age}
                 ref="age" />
        </td>
        <td className={this.state.errors.gender}>
          <input className="form-control"
                 type="text"
                 defaultValue={this.state.values.gender}
                 ref="gender" />
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
      return this.personForm();
    else
      return this.personRow();
  },

});
