import { useRef, useState } from 'react'

function HomePage() {
  const [feedbackItems, setFeedbackItems] = useState([])

  const emailInputRef = useRef()
  const messageInputRef = useRef()

  const submitFormHandler = (e) => {
    e.preventDefault()

    const enteredEmail = emailInputRef.current.value
    const enteredMessage = messageInputRef.current.value

    const reqBody = { email: enteredEmail, text: enteredMessage }

    fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then(data => console.log(data))
  }

  const loadFeedbackHandler = () => {
    fetch('/api/feedback')
      .then(res => res.json())
      .then(data => setFeedbackItems(data.feedback))
  }

  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor='email'>Your email address</label>
          <input type='email' id='email' ref={emailInputRef}/>
        </div>
        <div>
          <label htmlFor='feedback'>Your feedback</label>
          <textarea rows='5' id='feedback' ref={messageInputRef}/>
        </div>
        <button type='submit'>Submit</button>
      </form>
      <hr />
      <button onClick={loadFeedbackHandler}>Load feedbacks</button>
      <ul>
        {feedbackItems.map(item => <li key={item.id}>{item.text}</li>)}
      </ul>
    </div>
  );
}

export default HomePage;
