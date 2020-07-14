import React, { Component } from 'react';

import { AuthUserContext, withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';
import './index.css';

const HomePage = (props) => (
  <div className='home-container'>
    <h1>Home Page</h1>
    <p>The Home Page is accessible by every signed in user.</p>

    <Notes {...props}/>
  </div>
);

class NotesBase extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      title: '',
      review: '',
      loading: false,
      notes: [],
    };
  }
 
  componentDidMount() {
    this.setState({ loading: true });
 
    this.props.firebase.notes(this.props.authUser.uid).on('value', snapshot => {
      const noteObject = snapshot.val();
 
      if (noteObject) {
        const noteList = Object.keys(noteObject).map(key => ({
          ...noteObject[key],
          uid: key,
        }));
        // convert notes list from snapshot
 
        this.setState({ 
          notes: noteList,
          loading: false });
      } else {
        this.setState({ notes: null, loading: false });
      }
    });
  }

  onChangeTitle = event => {
    this.setState({ title: event.target.value });
  };

  onChangeReview = event => {
    this.setState({ review: event.target.value });
  };
 
  onCreateNote = (event, authUser) => {
    this.props.firebase.notes(authUser.uid).push({
      title: this.state.title,
      review: this.state.review,
      userId: authUser.uid,
    });
 
    this.setState({ title: '', review: '' });
 
    event.preventDefault();
  };
 
  componentWillUnmount() {
    this.props.firebase.notes(this.props.authUser.uid).off();
  }
 
  render() {
    const { title, review, notes, loading } = this.state;
 
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            {loading && <div>Loading ...</div>}
    
            {notes ? (
              <NoteList notes={notes} />
            ) : (
              <div>There are no notes ...</div>
            )}

            <form onSubmit={event => this.onCreateNote(event, authUser)}>
              <input
                type="text"
                value={title}
                onChange={this.onChangeTitle}
              />
              <input
                type="text"
                value={review}
                onChange={this.onChangeReview}
              />
              <button type="submit">Send</button>
            </form>
          </div>
        )}
      </AuthUserContext.Consumer>      
    );
  }
}

const NoteList = ({ notes }) => (
  <ul>
    {notes.map(note => (
      <NoteItem key={note.uid} note={note} />
    ))}
  </ul>
);
 
const NoteItem = ({ note }) => (
  <li>
    {note.title} {note.review}
  </li>
);
 
const Notes = withFirebase(NotesBase);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);