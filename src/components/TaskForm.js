import React, { Component } from 'react';

class TaskForm extends Component {
  constructor(props){
      super(props);
      this.state = {
          id: '',
          name: '',
          status: false
      }
  }
//   componentWillMount() {
//       if (this.props.taskEditting && this.props.taskEditting.id !== null) {
//           this.setState({
//              id: this.props.taskEditting.id,
//              name: this.props.taskEditting.name,
//              status: this.props.taskEditting.status
//           });
//       }
//       else{
//         this.onClear();
//     }
//   }
static getDerivedStateFromProps(props, state) {
    if (props.taskEditing) {
      if(props.taskEditing.id !== state.id){
        return {
          id: props.taskEditing.id,
          name: props.taskEditing.name,
          status: props.taskEditing.status
        }
      }
    }else{
      if(state.id){
        return {
          id: '',
          name: '',
          status: true
        }
      }
    }
    return null
  }
  onCloseForm = () => {
      this.props.onCloseForm();
  }
  onChange = (event) => {
      var target = event.target;
      var name = target.name;
      var value = target.value;
      if (name === 'status') {
          value = target.value === 'true' ? true : false
      }
      this.setState({
          [name]: value
      });
      
  }
  onSubmit = (event) => {
      event.preventDefault();
      this.props.onSubmit(this.state);
      this.onCloseForm();
  }
  onClear = () => {
      this.setState({
          name: '',
          status: false
      });
  }
  render() {
      var {id} = this.state;
  return (
    <div className="panel panel-warning">
        <div className="panel-heading">
        <h3 className="panel-title">{id !== '' ? 'Cập nhật công việc' : 'Thêm Công Việc'} 
        <i className="fas fa-times text-right" onClick={this.onCloseForm}></i>
        </h3>
        </div>

        <div className="panel-body">
        
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Tên : </label>
            <input 
                type="text" 
                className="form-control"  
                placeholder="Input" 
                name="name"
                value={this.state.name}
                onChange={this.onChange}
                />
          </div>

          <div className="form-group">
            <label>Trạng thái : </label>
            <select
                className="form-control"
                name="status"
                value={this.state.status}
                onChange={this.onChange}
            >
              <option value={true}>Kích hoạt</option>
              <option value={false}>Ẩn</option>
            </select>
          </div>
        
          <button type="submit" className="btn btn-warning btn-add"><i className="fas fa-plus"></i> Lưu lại</button>&nbsp;
          <button type="button" className="btn btn-danger" onClick={this.onClear}><i className="fas fa-times"></i> Huỷ bỏ</button>
        </form>
        
        </div>
    </div>
  );
}
}

export default TaskForm;
