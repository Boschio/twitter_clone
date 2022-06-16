import * as React from "react"
import TweetInput from "./TweetInput"
import "./TweetBox.css"

export default function TweetBox(props) {

  let disabled = (props.tweetText.length === 0 || props.tweetText.length > 140)
  let charCount = (props.tweetText.length!=0 && 140-props.tweetText.length)

  const handleOnTweetTextChange = (event) => {
    props.setTweetText(event.target.value)
  }

  const handleOnSubmit = () => {
      const newTweet = {
        id: props.tweets.length,
        name: props.userProfile.name,
        handle: props.userProfile.handle,
        text: props.tweetText,
        comments: 0,
        retweets: 0,
        likes: 0,
      }
      props.setTweets(current => [...current, newTweet])
      props.setTweetText("")
  }

  return (
    <div className="tweet-box">
      <TweetInput userProfile={props.userProfile} setTweets={props.setTweets} value={props.tweetText} handleOnChange={handleOnTweetTextChange}/>

      <div className="tweet-box-footer">
        <TweetBoxIcons />
        <TweetCharacterCount tweetText={props.tweetText} charCount={charCount} />
        <TweetSubmitButton handleOnSubmit={handleOnSubmit} tweetText={props.tweetText} disabled={disabled} />
      </div>
    </div>
  )
}

export function TweetBoxIcons() {
  return (
    <div className="tweet-box-icons">
      <i className="fas fa-image"></i>
      <i className="icon-gif">GIF</i>
      <i className="far fa-chart-bar"></i>
      <i className="fas fa-map-marker-alt"></i>
    </div>
  )
}

export function TweetCharacterCount(props) {

  return <span className="tweet-length" style={{color: props.charCount<1 ? "red" : "black"}} >{props.charCount}</span>
}

export function TweetSubmitButton(props) {

  return (
    <div className="tweet-submit" >
      <i className="fas fa-plus-circle"></i>
      <button className="tweet-submit-button" onClick={props.handleOnSubmit} disabled={props.disabled} >Tweet</button>
    </div>
  )
}