import './App.css';
import React, { Component } from 'react';
import TaskForm from './components/TaskForm';
import TaskControl from './components/TaskControl';
import TaskList from './components/TaskList';

class App extends Component {
    constructor(props){
        super(props);
        this.state={
            tasks: [],
            isDisplayForm: false,
            taskEditing: null,
            keyword: '',
            filter: {
                name: '',
                status: -1
            },
            sortBy: 'name',
            sortValue: 1
        }
    }
    componentDidMount() {
        if (localStorage && localStorage.getItem('tasks')) {
            var tasks = JSON.parse(localStorage.getItem('tasks'));
            this.setState({
                tasks: tasks
            });
        }
    }
    onGenerate = () => {
        var tasks = [
            {
                id: this.onGenerateID(),
                name: 'Hoc lap trinh',
                status: true
            },
            {
                id: this.onGenerateID(),
                name: 'Hoc tieng anh',
                status: false
            },
            {
                id: this.onGenerateID(),
                name: 'Hoc boi',
                status: true
            }
        ];
        this.setState({
            tasks: tasks
        });
        localStorage.setItem('tasks',JSON.stringify(tasks));
        console.log(tasks);
    }
    s4() {
        return Math.random().toString(16).substring(7);
    }
    onGenerateID() {
        return this.s4();
    }
    onToggleForm = () => {
        this.setState({
            isDisplayForm: true,
            taskEditing: null
        });
    }
    onCloseForm = () => {
        this.setState({
            isDisplayForm: false
        });
    }
    onOpenForm = () => {
        this.setState({
            isDisplayForm: true
        });
    }
    onSubmit = (data) => {
        var {tasks} = this.state;
        if (data.id === '') {
            data.id = this.onGenerateID();
            tasks.push(data);
        }
        else {
            var index = this.findIndex(data.id);
            tasks[index] = data;
        }   
        this.setState({
            tasks: tasks,
            taskEditing: null
        });
        localStorage.setItem('tasks',JSON.stringify(tasks));
    }
    onUpdateStatus = (id) => {
        var {tasks} = this.state;
        tasks.map(task => {
            if (task.id === id) {
                task.status = !task.status
            }
            return task;
        });
        this.setState({
            tasks: tasks
        });
        localStorage.setItem('tasks',JSON.stringify(tasks));
    }
    onDelete =(id) => {
        var { tasks } = this.state;
        tasks.map((task,index)=> {
            if (task.id === id) {
                tasks.splice(index,1)
            }
            return task
        });
        this.setState({
            tasks: tasks
        })
        localStorage.setItem('tasks',JSON.stringify(tasks));
        this.onCloseForm();
    }
    findIndex = (id) => {
        var {tasks} = this.state;
        var result = -1;
        tasks.forEach((task,index) => {
            if (task.id === id) {
                result = index
            }
        });
        return result;
    }
    onUpdate =(id) => {
        var {tasks} = this.state;
        var index = this.findIndex(id);
        var taskEditing = tasks[index];
        this.setState({
            taskEditing: taskEditing
        });
        this.onOpenForm();
    }
    onSearch = (keyword) => {
        this.setState({
            keyword: keyword
        })
    }
    onFilter = (filterName, filterStatus) => {
        filterStatus = parseInt(filterStatus, 10);
        this.setState({
            filter: {
                name: filterName.toLowerCase(),
                status: filterStatus
            }
        })
    }
    onSort = (sortBy, sortValue) => {
        this.setState({
            sortBy: sortBy,
            sortValue: sortValue
        });
    }
  render() {
      var {tasks, isDisplayForm, taskEditing, keyword, filter, sortBy, sortValue} = this.state;
      if (filter) {
          if (filter.name) {
              tasks = tasks.filter((task) => {
                  return task.name.toLowerCase().indexOf(filter.name) !== -1;
              })
          }
          tasks = tasks.filter((task) => {
              if (filter.status === -1) {
                  return task;
              }
              else {
                  return task.status === (filter.status === 1 ? true : false)
              }
          })
      }

      var eleForm = isDisplayForm ? <TaskForm onCloseForm={this.onCloseForm} onSubmit={this.onSubmit} taskEditing={taskEditing}/> : '';

      if (keyword) {
          tasks = tasks.filter((task) => {
             return task.name.toLowerCase().indexOf(keyword) !== -1;
          });
      }
      
      if (sortBy === 'name') {
          tasks = tasks.sort((a,b)=> {
              if (a.name.toLowerCase() < b.name.toLowerCase()) return -sortValue;
              else if (a.name.toLowerCase() > b.name.toLowerCase()) return sortValue;
              else return 0;
          })
      }
      else if (sortBy === 'status') {
          tasks = tasks.sort((a,b) => {
            if (a.status < b.status) return sortValue;
            else if (a.status > b.status) return -sortValue;
            else return 0;
          })
      }
  return (
    <div className="container">
        <div className="text-center">
            <h1>Quản lý công việc</h1>
        </div><br/>
        
        <div className="row">
            {/* form */}
            <div className={isDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : ''}>
                
                {eleForm}
                
            </div>
            
            <div className={isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>            
                <button type="button" className="btn btn-primary" onClick={this.onToggleForm}><i className="fas fa-plus"></i> Thêm công việc</button>
                {/* <button type="button" className="btn btn-danger ml-15" onClick={this.onGenerate}>Thêm dữ liệu</button> */}
                
                <TaskControl onSearch={this.onSearch} onSort={this.onSort} sortBy={sortBy} sortValue={sortValue}/>
                <TaskList 
                    tasks={tasks} 
                    onUpdateStatus={this.onUpdateStatus} 
                    onDelete={this.onDelete} 
                    onUpdate={this.onUpdate}
                    onFilter={this.onFilter}
                    />
                
            </div>
                        
        </div>
        
    </div>
    
  );
}
}

export default App;
