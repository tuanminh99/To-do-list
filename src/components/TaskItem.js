import React, { Component } from 'react';

class TaskItem extends Component {
  onUpdateStatus = () => {
      this.props.onUpdateStatus(this.props.task.id);
  }
  onDelete = () => {
      this.props.onDelete(this.props.task.id);
  }
  onUpdate = () => {
      this.props.onUpdate(this.props.task.id);
  }
  render() {
    var {index,task} = this.props;
  return (
    <tr>
        <td>
            {index+1}
        </td>
        <td>
            {task.name}
        </td>
        <td>
            
  <span className={task.status?'label label-success':'label label-danger'} onClick={this.onUpdateStatus}>{task.status?'Kích hoạt': 'Ẩn'}</span>
            
        </td>
        <td>
             
            <button type="button" className="btn btn-warning btn-edit" onClick={this.onUpdate}><i className="far fa-edit"></i> Sửa</button>&nbsp;
            <button type="reset" className="btn btn-danger" onClick={this.onDelete}><i className="far fa-trash-alt"></i> Xoá</button>
            
        </td>
    </tr>
  );
}
}

export default TaskItem;
