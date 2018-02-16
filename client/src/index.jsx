import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
    this.search = this.search.bind(this);
  }

  search (term) {
    let context = this;
    $.ajax({
      url: `/repos`,
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({term: term}),
      success: function(data) {
        $.ajax({
          url: `/repos/${term}`,
          success: function(data) {
            console.log(data);
            context.setState({repos: data});
          }
        });
        console.log(`Search term "${term}" sent`);
      },
      error: function(error) {
        console.log('Failed to send search term: ', term, ' because: ', error);
      }

    });

  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));