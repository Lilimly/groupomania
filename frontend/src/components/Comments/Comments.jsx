import * as React from 'react';
import {Link, withRouter} from 'react-router-dom';
import Moment from 'react-moment';
//import Button from 'react-bootstrap/Button'

class Comments extends React.Component {

    constructor (props) {
        super(props)

        this.state = {
            articleId: '',
            userId: '',
            content: '',
            comments: [],
            users: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const userConnect = JSON.parse(localStorage.getItem('userConnect'));
        let token = "Bearer " +  userConnect.token;

        const articleId = this.props.match.params.id;
        fetch("http://localhost:8080/api/articles/" + articleId + "/comments/" ,
            {headers: 
                {"Authorization" : token},
            })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({comments: result.data});
                })
            .catch(error => {
                this.setState({ Erreur: error.toString() });
                console.error('There was an error!', error);
            }
        )

        fetch("http://localhost:8080/api/users/", 
            {headers: 
                {"Authorization" : token}
            })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({users: result.data});
                }
            )
            .catch(error => {
                this.setState({ Erreur: error.toString() });
                console.error('There was an error!', error);
            }
        )
    }

    handleChange (e) {
        const articlePage = JSON.parse(localStorage.getItem('articlePage'));
        const articleId = articlePage.id;

        const userConnect = JSON.parse(localStorage.getItem('userConnect'));
        const userId = userConnect.userId;

        const name = e.target.name;
        const value =  e.target.value;
        this.setState({
            articleId: articleId,
            userId: userId,
            [name]: value
        })
    }

    handleSubmit (e) {
        e.preventDefault()

        const userConnect = JSON.parse(localStorage.getItem('userConnect'));
        let token = "Bearer " +  userConnect.token;
      
        const requestOptions = {
            method: 'post',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(this.state)
        };

        fetch(('http://localhost:8080/api/comments/'), requestOptions)
                .then(response => response.json())
                .then((result) => 
                    this.setState({comments: result}),
                    console.log(this.state),
                    alert("Commentaire publié !")
                )
                .catch(error => {
                    this.setState({ Erreur: error.toString() });
                    console.error('There was an error!', error);
            });
        
            this.setState({
                articleId: '',
                userId: '',
                content: '',
            })
    }

    render() {
        const {comments} = this.state;
        const {users} = this.state;
        const userConnect = JSON.parse(localStorage.getItem('userConnect'));

        return ( <div className="comment-div">
                    <h2>Laissez un commentaire ici  :</h2> 
                    <div className="post-comment">
                        <form>
                            <label>Commentez :</label>
                            <input type="text" name="content" value={this.state.content} onChange={this.handleChange}></input>
                        </form>
                        <div className="form-submit">
                            <button className="btn btn-outline-info" onClick={this.handleSubmit}>Post</button>
                        </div>
                    </div>
                    <h2>Article commenté {comments.length} fois.</h2>
                    {comments.map((comment) => (
                        <div className="comment-card" key={"fragment" + comment.id}>
                            {users.map((user) => {
                                if(comment.userId === user.id){
                                return <h3 key={"h3" +user.id}>Publié par <Link to={"/users/" + user.id} key={comment.id + user.id} className="nav-link">{user.firstname} {user.lastname}</Link></h3>
                                } else {
                                    return null
                                }
                            })}
                            <p key={"commenth3" + comment.id}>le <Moment format="DD MMM YYYY" date={comment.createdAt} /></p>
                            <h3 key={"comment" + comment.id}>{comment.content}</h3>
                            {comment.userId === userConnect.userId || userConnect.userAdmin === true
                                ? <div className="post-option">
                                    <Link to={"/deletecomment/" + comment.id} key={"delete"+ comment.id} className="nav-link">Supprimer</Link>
                                </div> : null
                            }
                        </div>
                    ))}
                </div>
        )
    };
};

export default withRouter(Comments);