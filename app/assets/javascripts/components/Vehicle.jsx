var Vehicle = React.createClass({

  getInitialState: function() {
    return {
      values: this.props.vehicle,
      edit:   this.isBlank(),
      ddVal:  this.props.vehicle.person,
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
    // Validate the dropdown.
    if (!this.state.ddVal) {
      this.state.errors.person = 'has-error';
      errorsPresent = true;
    } else {
      this.state.errors.person = 'has-none';
    }

    if (errorsPresent) {
      this.props.flash('Please complete the marked fields before saving');
      return;
    }

    // Save input values.
    for (var ref in this.refs) {
      var val = ReactDOM.findDOMNode(this.refs[ref]).value;
      this.state.values[ref] = val;
    }
    // Save the dropdown value.
    this.state.values.person = this.state.ddVal;

    // Refresh.
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
        <td>{this.personLabel()}</td>
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

  personLabel: function() {
    var person = this.state.ddVal;

    return person ? person.first + ' ' + person.last : 'Select';
  },

  handlePersonSelect: function(e, person) {
    e.preventDefault();
    this.state.ddVal = person;
    this.forceUpdate();
  },

  vehicleForm: function() {
    var cancelStyle = this.isBlank()?
                      {visibility: 'hidden'} : {visibility: 'visible'};
    var ddClass = 'dropdown ' + this.state.errors.person;
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
                 type="number"
                 defaultValue={this.state.values.year}
                 ref="year" />
        </td>
        <td className={this.state.errors.license}>
          <input className="form-control"
                 type="text"
                 defaultValue={this.state.values.license}
                 ref="license" />
        </td>
        <td>
          <div className={ddClass}>
            <button className="btn btn-default dropdown-toggle form-control"
                    type="button"
                    id="personDropdown"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="true">
              {this.personLabel()}
              <span> </span>
              <span className="caret"></span>
            </button>
            <ul className="dropdown-menu" aria-labelledby="personDropdown">
              {this.props.people.map((v, k) => {
                 return (
                   <li key={k}>
                     <a href="#" onClick={(e) => this.handlePersonSelect(e, v)}>
                       {v.first + ' ' + v.last}
                     </a>
                   </li>
                 );
               })}
            </ul>
          </div>
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
